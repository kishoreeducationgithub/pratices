import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const mangoes = [
  {
    texturePath: '/mango_1.jpg',
    depthPath: '/depth_1.svg',
    position: [-4.6, 0.12, -0.35],
    scale: 1.08,
    rotationZ: -0.1,
    phase: 0.0
  },
  {
    texturePath: '/mango_2.jpg',
    depthPath: '/depth_2.svg',
    position: [-2.72, -0.18, 0.22],
    scale: 1.0,
    rotationZ: 0.08,
    phase: 0.78
  },
  {
    texturePath: '/mango_3.jpg',
    depthPath: '/depth_3.svg',
    position: [-0.9, 0.2, -0.08],
    scale: 1.03,
    rotationZ: -0.04,
    phase: 1.55
  },
  {
    texturePath: '/mango_4.jpg',
    depthPath: '/depth_4.svg',
    position: [0.9, -0.08, 0.32],
    scale: 1.03,
    rotationZ: 0.06,
    phase: 2.35
  },
  {
    texturePath: '/mango_5.jpg',
    depthPath: '/depth_5.svg',
    position: [2.72, 0.18, -0.28],
    scale: 1.04,
    rotationZ: -0.08,
    phase: 3.15
  },
  {
    texturePath: '/mango_6.jpg',
    depthPath: '/depth_6.svg',
    position: [4.58, -0.14, 0.14],
    scale: 1.1,
    rotationZ: 0.11,
    phase: 3.95
  }
]

function createSoftAlphaTexture() {
  const size = 512
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const image = context.createImageData(size, size)
  const data = image.data

  canvas.width = size
  canvas.height = size

  for (let i = 0; i < data.length; i += 4) {
    const index = i / 4
    const x = index % size
    const y = Math.floor(index / size)
    const nx = (x - size * 0.5) / (size * 0.48)
    const ny = (y - size * 0.5) / (size * 0.47)
    const oval = 1 - nx * nx - ny * ny
    const alpha = THREE.MathUtils.smoothstep(oval, 0.01, 0.15)
    const value = Math.round(alpha * 255)

    data[i] = value
    data[i + 1] = value
    data[i + 2] = value
    data[i + 3] = 255
  }

  context.putImageData(image, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.NoColorSpace
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.needsUpdate = true

  return texture
}

function initScene(mount) {
  const width = mount.clientWidth || window.innerWidth
  const height = mount.clientHeight || window.innerHeight
  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xfff0cf, 0.032)

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 0.85, 8.9)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.domElement.className = 'mango-canvas'
  mount.appendChild(renderer.domElement)

  return { scene, camera, renderer }
}

function addBackground(scene) {
  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    depthWrite: false,
    depthTest: false,
    uniforms: {
      topColor: { value: new THREE.Color(0xfffff2) },
      middleColor: { value: new THREE.Color(0xffefd3) },
      bottomColor: { value: new THREE.Color(0xf7c467) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 topColor;
      uniform vec3 middleColor;
      uniform vec3 bottomColor;

      void main() {
        float radial = smoothstep(0.95, 0.05, distance(vUv, vec2(0.48, 0.62)));
        vec3 gradient = mix(bottomColor, middleColor, smoothstep(0.0, 0.62, vUv.y));
        gradient = mix(gradient, topColor, smoothstep(0.45, 1.0, vUv.y));
        gradient += radial * vec3(0.11, 0.08, 0.03);
        gl_FragColor = vec4(gradient, 1.0);
      }
    `
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.renderOrder = -100
  mesh.frustumCulled = false
  scene.add(mesh)
}

function addLighting(scene) {
  const ambient = new THREE.AmbientLight(0xfff4dc, 1.2)
  scene.add(ambient)

  const key = new THREE.DirectionalLight(0xffffff, 3.25)
  key.position.set(-4.2, 5.4, 5.8)
  key.castShadow = true
  key.shadow.mapSize.set(1536, 1536)
  key.shadow.camera.near = 0.5
  key.shadow.camera.far = 18
  key.shadow.camera.left = -7.5
  key.shadow.camera.right = 7.5
  key.shadow.camera.top = 5.5
  key.shadow.camera.bottom = -4.8
  scene.add(key)

  const rim = new THREE.PointLight(0xffbd38, 17, 16, 1.75)
  rim.position.set(4.8, 2.4, -3.8)
  scene.add(rim)

  const coolFill = new THREE.PointLight(0x9fffba, 3.1, 13, 2.1)
  coolFill.position.set(-4.2, -1.65, 2.7)
  scene.add(coolFill)
}

function addShadowPlane(scene) {
  const geometry = new THREE.PlaneGeometry(12.8, 4.2)
  const material = new THREE.ShadowMaterial({
    color: 0x7a4114,
    opacity: 0.18,
    transparent: true
  })
  const shadow = new THREE.Mesh(geometry, material)
  shadow.position.set(0, -2.08, -0.1)
  shadow.rotation.x = -Math.PI / 2
  shadow.receiveShadow = true
  scene.add(shadow)
}

function addLightDust(scene) {
  const count = 150
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 12
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5.8
    positions[i * 3 + 2] = -3 + Math.random() * 4
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0xffc24b,
    size: 0.04,
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const dust = new THREE.Points(geometry, material)
  scene.add(dust)
  return dust
}

const textureLoader = new THREE.TextureLoader()

async function loadTextures(texturePath, depthPath) {
  const [texture, depthMap] = await Promise.all([
    textureLoader.loadAsync(texturePath),
    textureLoader.loadAsync(depthPath)
  ])

  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter

  depthMap.colorSpace = THREE.NoColorSpace
  depthMap.anisotropy = 4
  depthMap.minFilter = THREE.LinearMipmapLinearFilter
  depthMap.magFilter = THREE.LinearFilter

  return { texture, depthMap }
}

async function createMango(texturePath, depthPath, position, options = {}) {
  const { texture, depthMap } = await loadTextures(texturePath, depthPath)
  const aspect = texture.image.width / texture.image.height
  const height = 2.84 * (options.scale || 1)
  const width = height * aspect
  const geometry = new THREE.PlaneGeometry(width, height, 160, 160)
  const alphaMap = createSoftAlphaTexture()

  const material = new THREE.MeshPhysicalMaterial({
    map: texture,
    alphaMap,
    displacementMap: depthMap,
    displacementScale: options.displacementScale ?? 0.36,
    transparent: true,
    alphaTest: 0.5,
    roughness: 0.48,
    metalness: 0.08,
    clearcoat: 0.46,
    clearcoatRoughness: 0.23,
    side: THREE.DoubleSide
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.fromArray(position)
  mesh.rotation.set(
    THREE.MathUtils.degToRad(options.rotationX ?? 0),
    THREE.MathUtils.degToRad(options.rotationY ?? 0),
    options.rotationZ ?? 0
  )
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.userData = {
    basePosition: mesh.position.clone(),
    baseRotation: mesh.rotation.clone(),
    phase: options.phase ?? 0,
    rotateSpeed: options.rotateSpeed ?? 0.005,
    floatAmp: options.floatAmp ?? 0.2
  }

  return mesh
}

function disposeScene(scene, renderer) {
  scene.traverse((object) => {
    if (!object.isMesh && !object.isPoints) return

    object.geometry?.dispose()
    const materials = Array.isArray(object.material) ? object.material : [object.material]
    materials.forEach((material) => {
      if (!material) return
      Object.values(material).forEach((value) => {
        if (value?.isTexture) value.dispose()
      })
      material.dispose()
    })
  })
  renderer.dispose()
}

export default function MangoUniverse() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let animationFrameId = 0
    let isDisposed = false
    const mangoGroup = new THREE.Group()
    const pointer = new THREE.Vector2(0, 0)
    const targetPointer = new THREE.Vector2(0, 0)
    const { scene, camera, renderer } = initScene(mount)

    addBackground(scene)
    addLighting(scene)
    addShadowPlane(scene)
    const dust = addLightDust(scene)
    scene.add(mangoGroup)

    async function buildMangoes() {
      const meshes = await Promise.all(
        mangoes.map((mango, index) =>
          createMango(mango.texturePath, mango.depthPath, mango.position, {
            scale: mango.scale,
            phase: mango.phase,
            rotationX: index % 2 === 0 ? 4 : -4,
            rotationY: (index - 2.5) * 4,
            rotationZ: mango.rotationZ,
            rotateSpeed: 0.0038 + index * 0.00055,
            floatAmp: 0.16 + (index % 3) * 0.035,
            displacementScale: 0.3 + (index % 3) * 0.04
          })
        )
      )

      if (isDisposed) {
        meshes.forEach((mesh) => {
          mesh.geometry.dispose()
          mesh.material.dispose()
        })
        return
      }

      meshes.forEach((mesh) => mangoGroup.add(mesh))
    }

    function handlePointerMove(event) {
      const rect = renderer.domElement.getBoundingClientRect()
      targetPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      targetPointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    }

    function handleResize() {
      const width = mount.clientWidth || window.innerWidth
      const height = mount.clientHeight || window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate)
      const time = performance.now() * 0.001

      pointer.lerp(targetPointer, 0.045)
      mangoGroup.children.forEach((mesh, index) => {
        const { basePosition, baseRotation, phase, rotateSpeed, floatAmp } = mesh.userData
        mesh.position.x = basePosition.x + Math.sin(time * 0.38 + phase) * 0.08
        mesh.position.y = basePosition.y + Math.sin(time * 0.82 + phase) * floatAmp
        mesh.position.z = basePosition.z + Math.cos(time * 0.55 + phase) * 0.09
        mesh.rotation.y =
          baseRotation.y +
          time * rotateSpeed +
          Math.sin(time * 0.48 + phase) * 0.15 +
          pointer.x * 0.09
        mesh.rotation.x = baseRotation.x + Math.sin(time * 0.68 + phase) * 0.08 - pointer.y * 0.05
        mesh.rotation.z = baseRotation.z + Math.cos(time * 0.4 + phase) * 0.035
        mesh.material.displacementScale = THREE.MathUtils.lerp(
          mesh.material.displacementScale,
          0.34 + Math.sin(time * 0.55 + index) * 0.03,
          0.035
        )
      })

      dust.rotation.y = time * 0.025
      dust.rotation.x = Math.sin(time * 0.2) * 0.045

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.48, 0.035)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.82 + pointer.y * 0.25, 0.035)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8.7 + pointer.y * 0.05, 0.035)
      camera.lookAt(pointer.x * 0.18, pointer.y * 0.08, 0)

      renderer.render(scene, camera)
    }

    renderer.domElement.addEventListener('pointermove', handlePointerMove)

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(mount)

    buildMangoes()
    animate()

    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      renderer.domElement.removeEventListener('pointermove', handlePointerMove)

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }

      disposeScene(scene, renderer)
    }
  }, [])

  return (
    <main className="mango-stage">
      <div className="mango-scene" ref={mountRef} aria-label="Animated pseudo-3D floating mangoes" />
      <div className="studio-label">
        <span>Displacement Studio</span>
        <strong>Floating Mangoes</strong>
      </div>
    </main>
  )
}

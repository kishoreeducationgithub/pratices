import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ShoppingCart, Crosshair, HelpCircle, Check } from 'lucide-react'

export default function MangoUniverse({ onAddToCart }) {
  const mountRef = useRef(null)
  const [selectedId, setSelectedId] = useState('alphonso')
  const [addedNotify, setAddedNotify] = useState(false)

  const mangoData = {
    alphonso: {
      id: 'alphonso',
      name: 'Alphonso Elite',
      region: 'Devgad Coastline',
      price: 4.99,
      behavior: 'Royal Glow & Pulse',
      description: 'The centerpiece of our collection. Handpicked at peak ripeness. Has an unmatched buttery saffron pulp with honeyed sweetness.',
      taste: { sweetness: 98, acidity: 15, aroma: 100 }
    },
    kesar: {
      id: 'kesar',
      name: 'Kesar Royal',
      region: 'Gir Hills Foothills',
      price: 3.99,
      behavior: 'Saffron Particle Bounce',
      description: 'Intensely fragrant with a deep saffron skin hue. Balanced sweetness with a rich nectar-like texture.',
      taste: { sweetness: 92, acidity: 20, aroma: 98 }
    },
    dasheri: {
      id: 'dasheri',
      name: 'Dasheri Sweet',
      region: 'Malihabad Orchards',
      price: 3.49,
      behavior: 'Slow Drift & Spin',
      description: 'A heritage variety with historical pedigree. Elongated shape, thin seed, melting fiber-free pulp.',
      taste: { sweetness: 95, acidity: 12, aroma: 90 }
    },
    himsagar: {
      id: 'himsagar',
      name: 'Himsagar Rare',
      region: 'Bengal Plains',
      price: 4.49,
      behavior: 'Orbital Floating Spiral',
      description: 'An exotic and rare variety. Retains a rich green-yellow coat even when perfectly ripe. Creamy and sweet.',
      taste: { sweetness: 96, acidity: 10, aroma: 95 }
    },
    totapuri: {
      id: 'totapuri',
      name: 'Totapuri Tangy',
      region: 'Krishnagiri Valley',
      price: 2.99,
      behavior: 'Sharp Snap Rotation',
      description: 'Famous for its beak-like curvature. Firm, crisp yellow-green skin, punchy sweet-and-sour profile, perfect for gourmet salads.',
      taste: { sweetness: 75, acidity: 45, aroma: 80 }
    },
    langra: {
      id: 'langra',
      name: 'Langra Traditional',
      region: 'Varanasi Orchards',
      price: 3.29,
      behavior: 'Heavy Breathing Wave',
      description: 'A rich, traditional, green-skinned classic. Intense pine-like tropical aroma, highly juicy pulp.',
      taste: { sweetness: 94, acidity: 18, aroma: 97 }
    }
  }

  useEffect(() => {
    const currentMount = mountRef.current
    if (!currentMount) return

    // --- Scene Setup ---
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x12100e, 0.08)

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 2, 8)

    let animationFrameId;

    // --- WebGLRenderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    const initialWidth = currentMount.clientWidth || 600
    const initialHeight = currentMount.clientHeight || 450
    renderer.setSize(initialWidth, initialHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    currentMount.appendChild(renderer.domElement)

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xfff8e1, 0.15)
    scene.add(ambientLight)

    const spotLightGold = new THREE.SpotLight(0xffc300, 15, 20, Math.PI / 4, 0.5, 1)
    spotLightGold.position.set(-5, 8, 4)
    spotLightGold.castShadow = true
    scene.add(spotLightGold)

    const spotLightGreen = new THREE.SpotLight(0x2e7d32, 10, 20, Math.PI / 4, 0.5, 1)
    spotLightGreen.position.set(5, 8, -4)
    scene.add(spotLightGreen)

    const keyLight = new THREE.DirectionalLight(0xfff8e1, 1.5)
    keyLight.position.set(0, 5, 5)
    scene.add(keyLight)

    // --- Background Dust Particles ---
    const particleGeo = new THREE.BufferGeometry()
    const particleCount = 150
    const posArr = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArr[i] = (Math.random() - 0.5) * 15
      posArr[i + 1] = (Math.random() - 0.5) * 10
      posArr[i + 2] = (Math.random() - 0.5) * 10
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffc300,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    })
    const dustParticles = new THREE.Points(particleGeo, particleMat)
    scene.add(dustParticles)

    // --- Load Pinterest Reference Textures ---
    const textureLoader = new THREE.TextureLoader()
    const textures = {
      alphonso: textureLoader.load('/mango_1.jpg'),
      kesar: textureLoader.load('/mango_2.jpg'),
      dasheri: textureLoader.load('/mango_3.jpg'),
      himsagar: textureLoader.load('/mango_4.jpg'),
      totapuri: textureLoader.load('/mango_5.jpg'),
      langra: textureLoader.load('/mango_6.jpg')
    }

    // --- Procedural Mango Builder ---
    const createMangoMesh = (type, skinColor, roughness) => {
      const mangoGroup = new THREE.Group()

      // 1. Mango Fruit Body (deformed sphere)
      const bodyGeo = new THREE.SphereGeometry(0.7, 32, 32)
      
      // Deform sphere to create a classic curved mango shape specific to each variety
      const positions = bodyGeo.attributes.position
      for (let i = 0; i < positions.count; i++) {
        let x = positions.getX(i)
        let y = positions.getY(i)
        let z = positions.getZ(i)

        if (type === 'alphonso') {
          // Alphonso: Plump, slightly oblique slope on the shoulder
          if (x > 0) {
            y -= 0.12 * Math.pow(x, 2)
          } else {
            y += 0.05 * Math.pow(x, 2)
          }
          z *= 0.85
        } else if (type === 'kesar') {
          // Kesar: Curved, slightly smaller kidney shape
          if (x > 0) {
            y -= 0.22 * Math.pow(x, 2)
          } else {
            y += 0.06 * Math.pow(x, 2)
          }
          z *= 0.78
        } else if (type === 'dasheri') {
          // Dasheri: Very long, slender, cylindrical structure
          if (x > 0) {
            y -= 0.05 * Math.pow(x, 2)
          }
          z *= 0.65
        } else if (type === 'himsagar') {
          // Himsagar: Oval egg shape, rounded and symmetrical
          z *= 0.90
        } else if (type === 'totapuri') {
          // Totapuri: Elongated body with a hook-like beak tip at the end
          if (x > 0) {
            y -= 0.28 * Math.pow(x, 2)
            if (x > 0.45) {
              y -= 0.35 * Math.pow(x - 0.45, 2) // Parrot beak tip
            }
          } else {
            y += 0.05 * Math.pow(x, 2)
          }
          z *= 0.75
        } else if (type === 'langra') {
          // Langra: Oval-chubby shape
          if (x > 0) {
            y -= 0.15 * Math.pow(x, 2)
          }
          z *= 0.88
        }

        positions.setXYZ(i, x, y, z)
      }
      bodyGeo.computeVertexNormals()

      // Scale custom dimensions per variety
      if (type === 'alphonso') {
        bodyGeo.scale(1.25, 0.95, 0.85)
      } else if (type === 'kesar') {
        bodyGeo.scale(1.2, 0.85, 0.78)
      } else if (type === 'dasheri') {
        bodyGeo.scale(1.6, 0.72, 0.62) // Elongated slender
      } else if (type === 'himsagar') {
        bodyGeo.scale(1.15, 0.95, 0.9)
      } else if (type === 'totapuri') {
        bodyGeo.scale(1.5, 0.78, 0.7) // Curved beak
      } else if (type === 'langra') {
        bodyGeo.scale(1.22, 0.92, 0.85)
      }

      // Premium Physical Material mapping the Pinterest reference texture
      const bodyMat = new THREE.MeshPhysicalMaterial({
        map: textures[type],
        roughness: roughness,
        metalness: 0.05,
        clearcoat: 0.9,
        clearcoatRoughness: 0.15,
        sheen: 0.3,
        sheenColor: 0xffe082
      })

      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat)
      bodyMesh.castShadow = true
      bodyMesh.receiveShadow = true
      mangoGroup.add(bodyMesh)

      // 2. Stem
      const stemCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.85, 0.35, 0),
        new THREE.Vector3(-1.05, 0.65, 0.05),
        new THREE.Vector3(-1.15, 0.85, 0.1)
      ])
      const stemGeo = new THREE.TubeGeometry(stemCurve, 10, 0.035, 8, false)
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x4e342e, roughness: 0.9 })
      const stemMesh = new THREE.Mesh(stemGeo, stemMat)
      mangoGroup.add(stemMesh)

      // 3. Leaf
      const leafShape = new THREE.Shape()
      leafShape.moveTo(0, 0)
      leafShape.quadraticCurveTo(0.2, 0.4, 0.08, 0.85)
      leafShape.quadraticCurveTo(-0.15, 0.4, 0, 0)
      
      const leafGeo = new THREE.ShapeGeometry(leafShape)
      const leafMat = new THREE.MeshStandardMaterial({ 
        color: 0x1b5e20, 
        roughness: 0.5, 
        side: THREE.DoubleSide 
      })
      const leafMesh = new THREE.Mesh(leafGeo, leafMat)
      leafMesh.position.set(-1.05, 0.65, 0.05)
      leafMesh.scale.set(0.65, 0.65, 0.65)
      leafMesh.rotation.set(0.3, 0.4, -0.8)
      mangoGroup.add(leafMesh)

      return mangoGroup
    }

    // --- Instantiate Mangoes ---
    const mangoes = {}
    
    // 1. Alphonso Elite (Saffron Gold)
    mangoes.alphonso = createMangoMesh('alphonso', 0xffa726, 0.15)
    mangoes.alphonso.position.set(-3.2, 0.8, 0)
    
    // 2. Kesar Royal (Golden Orange)
    mangoes.kesar = createMangoMesh('kesar', 0xffca28, 0.2)
    mangoes.kesar.position.set(-1.3, -0.6, 2.0)

    // 3. Dasheri Sweet (Amber Yellow)
    mangoes.dasheri = createMangoMesh('dasheri', 0xfdd835, 0.22)
    mangoes.dasheri.position.set(1.3, 0.9, 1.8)

    // 4. Himsagar Rare (Green Yellow)
    mangoes.himsagar = createMangoMesh('himsagar', 0xd4e157, 0.28)
    mangoes.himsagar.position.set(3.2, -0.5, 0)

    // 5. Totapuri Tangy (Beak Curved)
    mangoes.totapuri = createMangoMesh('totapuri', 0xffee58, 0.18)
    mangoes.totapuri.position.set(1.3, -0.9, -2.0)

    // 6. Langra Traditional (Organic Green)
    mangoes.langra = createMangoMesh('langra', 0x81c784, 0.3)
    mangoes.langra.position.set(-1.3, 0.7, -2.0)

    // Add raycasting ID keys to body meshes
    Object.entries(mangoes).forEach(([id, group]) => {
      // Key the body mesh so raycaster maps it
      group.children[0].userData = { id }
      scene.add(group)
    })

    // --- Camera Orbit & Target Interpolation States ---
    const targetFocusPositions = {
      alphonso: new THREE.Vector3(-3.2, 0.8, 0),
      kesar: new THREE.Vector3(-1.3, -0.6, 2.0),
      dasheri: new THREE.Vector3(1.3, 0.9, 1.8),
      himsagar: new THREE.Vector3(3.2, -0.5, 0),
      totapuri: new THREE.Vector3(1.3, -0.9, -2.0),
      langra: new THREE.Vector3(-1.3, 0.7, -2.0)
    }

    const currentFocus = new THREE.Vector3(0, 0, 0)
    let activeId = 'alphonso'

    // --- Raycasting click triggers ---
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleCanvasClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      // Inspect only body meshes
      const targets = Object.values(mangoes).map(g => g.children[0])
      const intersects = raycaster.intersectObjects(targets)

      if (intersects.length > 0) {
        const clickedId = intersects[0].object.userData.id
        if (clickedId) {
          activeId = clickedId
          setSelectedId(clickedId)
        }
      }
    }

    renderer.domElement.addEventListener('click', handleCanvasClick)

    // Update active id from React parent state changes
    const checkStateInterval = setInterval(() => {
      // Synchronize hook state with inside loop
      setSelectedId((curr) => {
        activeId = curr
        return curr
      })
    }, 200)

    // --- Animation Kinetics Loop ---
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      // 1. Alphonso: Slow Royal Y-Rotation & Subtle Pulse Glow
      if (mangoes.alphonso) {
        // Slow royal rotation
        mangoes.alphonso.rotation.y = time * 0.12
        // Breathing scale pulse
        const pulse = 1.0 + Math.sin(time * 0.8) * 0.015
        mangoes.alphonso.scale.set(pulse, pulse, pulse)
        // Multi-frequency slow float
        mangoes.alphonso.position.y = 0.8 + (Math.sin(time * 0.4) + 0.25 * Math.cos(time * 1.1)) * 0.08
        // Gentle micro-sways
        mangoes.alphonso.rotation.x = Math.sin(time * 0.3) * 0.03
        mangoes.alphonso.rotation.z = Math.cos(time * 0.3) * 0.03
      }

      // 2. Kesar: Gentle vertical bounce with elastic easing
      if (mangoes.kesar) {
        // Elastic bounce shape (first + second harmonic)
        const bounce = (Math.sin(time * 1.2) + 0.35 * Math.sin(time * 2.4)) * 0.14
        mangoes.kesar.position.y = -0.6 + bounce
        mangoes.kesar.rotation.y = time * 0.22
        // Elastic wobbles
        mangoes.kesar.rotation.x = Math.cos(time * 1.2) * 0.06
        mangoes.kesar.rotation.z = Math.sin(time * 1.2) * 0.06
      }

      // 3. Dasheri: Smooth horizontal drift with slight organic wobble
      if (mangoes.dasheri) {
        // Slow horizontal and vertical drift
        mangoes.dasheri.position.x = 1.3 + Math.sin(time * 0.5) * 0.18
        mangoes.dasheri.position.y = 0.9 + Math.cos(time * 0.4) * 0.08
        mangoes.dasheri.rotation.y = time * 0.15
        // Organic multi-axis wobble
        mangoes.dasheri.rotation.x = (Math.sin(time * 1.8) + 0.2 * Math.cos(time * 3.6)) * 0.05
        mangoes.dasheri.rotation.z = (Math.cos(time * 1.5) + 0.2 * Math.sin(time * 3.0)) * 0.05
      }

      // 4. Himsagar: Spiral orbit motion around invisible center
      if (mangoes.himsagar) {
        const radius = 0.3
        const angle = time * 0.6
        mangoes.himsagar.position.x = 3.2 + Math.cos(angle) * radius
        mangoes.himsagar.position.z = Math.sin(angle) * radius
        mangoes.himsagar.position.y = -0.5 + Math.sin(time * 1.2) * 0.12
        mangoes.himsagar.rotation.y = -time * 0.25
        mangoes.himsagar.rotation.x = Math.sin(time * 0.8) * 0.05
      }

      // 5. Totapuri: Sharp dynamic rotation with slight directional flicks
      if (mangoes.totapuri) {
        // Calculate step and sub-progress
        const step = Math.floor(time * 0.4)
        const progress = (time * 0.4) % 1
        // Smooth sine ease-out back curve for snap flick
        const easeOutBack = Math.sin(progress * Math.PI / 2)
        const targetRot = step * (Math.PI / 2)
        
        // Apply flick-rotation with tiny high-frequency flick bounce
        mangoes.totapuri.rotation.y = targetRot + easeOutBack * (Math.PI / 2) + Math.sin(time * 8) * 0.012
        // Dynamic bouncing vertical drift
        mangoes.totapuri.position.y = -0.9 + (Math.sin(time * 2.8) + 0.3 * Math.cos(time * 5.6)) * 0.06
      }

      // 6. Langra: Slow breathing motion (expand and contract float)
      if (mangoes.langra) {
        // Calm organic breathing rhythm scale
        const breathing = 0.96 + Math.sin(time * 0.6) * 0.04
        mangoes.langra.scale.set(breathing, breathing, breathing)
        // Smooth heavy gravity float
        mangoes.langra.position.y = 0.7 + (Math.sin(time * 0.3) + 0.1 * Math.cos(time * 0.7)) * 0.08
        mangoes.langra.rotation.y = time * 0.08
        mangoes.langra.rotation.z = Math.sin(time * 0.3) * 0.04
      }

      // Floating background dust
      dustParticles.rotation.y = time * 0.015
      dustParticles.rotation.x = time * 0.005

      // --- Volumetric Camera Interpolation ---
      const activePos = targetFocusPositions[activeId]
      if (activePos) {
        // Move controls target smoothly to selected mango
        currentFocus.lerp(activePos, 0.06)
        camera.lookAt(currentFocus)

        // Interpolate camera target coordinates
        // Position camera relative to the focused item
        const offset = new THREE.Vector3(1.6, 0.8, 3.2)
        const cameraTarget = activePos.clone().add(offset)
        camera.position.lerp(cameraTarget, 0.06)
      }

      renderer.render(scene, camera)
    }

    animate()

    // --- Robust Resize Observer ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        if (width && height) {
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }
      }
    })
    resizeObserver.observe(currentMount)

    // --- Clean Up ---
    return () => {
      clearInterval(checkStateInterval)
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        renderer.domElement.removeEventListener('click', handleCanvasClick)
        currentMount.removeChild(renderer.domElement)
      }
      
      // Dispose materials & geometries
      scene.clear()
      renderer.dispose()
    }
  }, [])

  const currentMango = mangoData[selectedId]

  return (
    <section 
      id="mango-universe" 
      className="py-20 sm:py-24 bg-darkwood dark:bg-black transition-colors duration-300 relative z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-mango tracking-wider uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            3D Interactive Orchard
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-cream">
            Interactive 3D Mango Universe
          </h2>
          <div className="h-1 w-16 bg-mango mx-auto mt-3 rounded-full" />
          <p className="text-cream/60 mt-4 text-sm sm:text-base">
            Click directly on any floating 3D mango mesh to orbit the camera, reveal its taste statistics, or add it to your crate.
          </p>
        </div>

        {/* The 3D Container & Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-darkwood-dark/50 border border-white/5 rounded-[32px] p-4 sm:p-6 lg:p-8 backdrop-blur-sm min-h-[620px]">
          
          {/* Left / Selector Panel: Mango Selector items (3 cols) */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col justify-start lg:justify-center gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-3 lg:pb-0">
            {Object.values(mangoData).map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`flex-shrink-0 lg:w-full p-4 rounded-2xl border text-left transition-all duration-300 ${
                  selectedId === m.id
                    ? 'border-mango bg-mango/10 text-cream shadow-lg shadow-mango/5'
                    : 'border-white/5 bg-white/2 hover:border-white/10 text-cream/70 hover:text-cream'
                }`}
              >
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <h4 className="text-sm font-bold">{m.name}</h4>
                    <p className="text-[10px] text-cream/50 mt-0.5">{m.region}</p>
                  </div>
                  <span className="text-xl">🥭</span>
                </div>
              </button>
            ))}
          </div>

          {/* Center: The WebGL Viewport (6 cols) */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-black/45 border border-white/5 h-[450px] flex items-center justify-center">
            
            {/* The 3D Canvas Mounting Node */}
            <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Instruction layer overlay */}
            <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-full px-3.5 py-1.5 text-xs text-cream/70 backdrop-blur-sm">
              <Crosshair className="w-3.5 h-3.5 text-mango" />
              <span>Click mangoes to inspect</span>
            </div>
          </div>

          {/* Right: Selected Mango Details Sidebar (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between text-left text-cream relative">
            <AnimatePresence mode="wait">
              {currentMango && (
                <motion.div
                  key={currentMango.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between h-full space-y-6"
                >
                  <div className="space-y-5">
                    {/* Header */}
                    <div>
                      <span className="text-[10px] font-bold text-mango uppercase tracking-widest">
                        {currentMango.region}
                      </span>
                      <h3 className="font-playfair text-xl sm:text-2xl font-bold mt-1">
                        {currentMango.name}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-cream/80 mt-2 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Physics: {currentMango.behavior}
                      </div>
                    </div>

                    {/* Paragraph */}
                    <p className="text-xs text-cream/70 leading-relaxed">
                      {currentMango.description}
                    </p>

                    {/* Dials stats */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-cream/50">Tasting Metrics</h4>
                      
                      {/* Sweetness */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-cream/70">
                          <span>Brix Sweetness</span>
                          <span>{currentMango.taste.sweetness}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-mango rounded-full" style={{ width: `${currentMango.taste.sweetness}%` }} />
                        </div>
                      </div>

                      {/* Aroma */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-cream/70">
                          <span>Tropical Aroma</span>
                          <span>{currentMango.taste.aroma}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${currentMango.taste.aroma}%` }} />
                        </div>
                      </div>

                      {/* Acidity */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-cream/70">
                          <span>Acidity & Tang</span>
                          <span>{currentMango.taste.acidity}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-leaf rounded-full" style={{ width: `${currentMango.taste.acidity}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Actions */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10.5px] font-bold text-cream/50 uppercase">Harvest Price</span>
                      <span className="text-xl font-black text-mango">${currentMango.price}</span>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart({
                          id: currentMango.id,
                          name: currentMango.name,
                          description: `Premium single mango from ${currentMango.region}`,
                          price: currentMango.price,
                          unit: 'each',
                          quantity: 1
                        })
                        setAddedNotify(true)
                        setTimeout(() => setAddedNotify(false), 2000)
                      }}
                      className="w-full py-3.5 bg-mango hover:bg-mango-dark text-darkwood font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-mango/5 transition-all duration-300"
                    >
                      {addedNotify ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Crate!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}

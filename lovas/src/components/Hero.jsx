import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, ArrowDown } from 'lucide-react'

export default function Hero() {
  // Particles data for background animation
  const particles = [
    { emoji: '🥭', size: 'text-3xl', x: '10%', y: '20%', duration: 12, delay: 0 },
    { emoji: '🍃', size: 'text-2xl', x: '80%', y: '15%', duration: 15, delay: 2 },
    { emoji: '✨', size: 'text-xl', x: '25%', y: '75%', duration: 8, delay: 1 },
    { emoji: '🥭', size: 'text-4xl', x: '75%', y: '65%', duration: 14, delay: 3 },
    { emoji: '🍃', size: 'text-xl', x: '5%', y: '60%', duration: 10, delay: 4 },
    { emoji: '🌸', size: 'text-2xl', x: '90%', y: '45%', duration: 16, delay: 1.5 },
    { emoji: '✨', size: 'text-lg', x: '50%', y: '85%', duration: 9, delay: 5 },
  ]

  const handleScrollToShop = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const navHeight = 80
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-light via-cream to-white dark:from-darkwood dark:via-darkwood-light dark:to-darkwood transition-colors duration-300"
    >
      {/* Floating background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${p.emoji === '✨' ? 'opacity-40' : 'opacity-20'} ${p.size} filter blur-[0.5px]`}
            style={{ left: p.x, top: p.y }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      {/* Hero content grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Brand Text & CTAs */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col text-left space-y-6 lg:pr-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-leaf-light/60 dark:bg-leaf/20 border border-leaf/10 dark:border-leaf/30 rounded-full px-4 py-1.5 w-fit">
            <Sparkles className="w-4 h-4 text-leaf dark:text-mango-light" />
            <span className="text-xs font-semibold tracking-wider uppercase text-leaf dark:text-mango-light">
              100% Organic Farm Fresh
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-softbrown-dark dark:text-cream leading-[1.1] sm:leading-[1.15]">
            Taste Nature's <br />
            <span className="text-gradient-mango font-extrabold italic">Sweetest Gift</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-softbrown dark:text-cream/70 max-w-xl leading-relaxed">
            Handpicked at peak ripeness, our premium organic mangoes are harvested at dawn and delivered to your doorstep within 24 hours. Indulge in the ultimate tropical luxury.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <motion.a
              href="#products"
              onClick={(e) => handleScrollToShop(e, '#products')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-mango to-orange-500 hover:from-mango-dark hover:to-orange-600 text-softbrown-dark font-bold text-base rounded-2xl shadow-lg shadow-mango/20 hover:shadow-mango/30 transition-all duration-300 gap-2 text-center"
            >
              Shop Fresh Mangoes
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#bundle-builder"
              onClick={(e) => handleScrollToShop(e, '#bundle-builder')}
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(46, 125, 50, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-leaf text-leaf hover:bg-leaf/5 dark:border-mango dark:text-mango dark:hover:bg-mango/5 font-semibold text-base rounded-2xl transition-all duration-300 text-center"
            >
              Custom Nest Box
            </motion.a>
          </div>
        </motion.div>

        {/* Right Side: High End Interactive Product Shot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 60 }}
          className="flex justify-center items-center relative"
        >
          {/* Subtle glowing halo behind mango */}
          <div className="absolute w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-gradient-to-r from-mango/30 to-leaf/20 dark:from-mango/20 dark:to-leaf/10 rounded-full blur-[60px] -z-10" />

          {/* Interactive Tilt card Container */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative max-w-[280px] sm:max-w-[400px] cursor-grab active:cursor-grabbing"
          >
            <img 
              src="/premium_mango.png" 
              alt="Premium Mango Nest Alphonso Mango" 
              className="w-full h-auto select-none filter drop-shadow-[0_20px_40px_rgba(139,92,26,0.15)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
              draggable="false"
            />
            {/* Small floating info bubble */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 glass px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-white/50"
            >
              <span className="text-xl">✨</span>
              <div className="text-left">
                <p className="text-[10px] text-softbrown uppercase tracking-wider font-bold">Premium Grade</p>
                <p className="text-xs text-softbrown-dark font-extrabold">Alphonso Elite</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating indicator to scroll down */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
        <a 
          href="#features" 
          onClick={(e) => handleScrollToShop(e, '#features')}
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="text-xs tracking-wider uppercase font-semibold text-softbrown dark:text-cream/60">Discover More</span>
            <ArrowDown className="w-4 h-4 text-leaf dark:text-mango" />
          </motion.div>
        </a>
      </div>
    </section>
  )
}

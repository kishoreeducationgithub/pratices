import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Award } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureStrip from './components/FeatureStrip'
import StorySection from './components/StorySection'
import BundleBuilder from './components/BundleBuilder'
import ProductGrid from './components/ProductGrid'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import MangoUniverse from './components/MangoUniverse'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false)

  // Manage dark mode class on document body
  useEffect(() => {
    const bodyClass = document.body.classList
    if (isDarkMode) {
      bodyClass.add('dark')
    } else {
      bodyClass.remove('dark')
    }
  }, [isDarkMode])

  // Cart Handlers
  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + (productToAdd.quantity || 1) }
            : item
        )
      }
      return [...prevCart, { ...productToAdd, quantity: productToAdd.quantity || 1 }]
    })
    
    // Open cart drawer for visual feedback
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (itemId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + change
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const handleCheckout = () => {
    setShowCheckoutSuccess(true)
    setCart([])
    setIsCartOpen(false)
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Navigation */}
      <Navbar 
        cartCount={cartCount} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <FeatureStrip />
        <MangoUniverse onAddToCart={handleAddToCart} />
        <StorySection />
        <BundleBuilder onAddBundleToCart={handleAddToCart} />
        <ProductGrid onAddToCart={handleAddToCart} />
        <Testimonials />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky CTA Button (fades in on scroll or shows dynamically) */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden flex justify-center pointer-events-none">
        <motion.a
          href="#products"
          onClick={(e) => {
            e.preventDefault()
            const targetElement = document.querySelector('#products')
            if (targetElement) {
              const navHeight = 80
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight
              window.scrollTo({ top: targetPosition, behavior: 'smooth' })
            }
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 100 }}
          className="pointer-events-auto w-full max-w-sm py-4 bg-gradient-to-r from-mango to-orange-500 hover:from-mango-dark hover:to-orange-600 text-softbrown-dark font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 border border-white/20 select-none text-center"
        >
          <ShoppingBag className="w-4 h-4" />
          Shop Fresh Mangoes
        </motion.a>
      </div>

      {/* Sliding Cart Drawer Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-darkwood/60 dark:bg-black/80 backdrop-blur-sm"
            />

            {/* Cart Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-screen max-w-md glass flex flex-col justify-between shadow-2xl border-l border-white/20 dark:border-white/5"
              >
                {/* Header */}
                <div className="p-6 border-b border-cream-dark/20 dark:border-darkwood-light/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-leaf dark:text-mango" />
                    <h2 className="font-playfair text-lg font-bold text-softbrown-dark dark:text-cream">
                      Your Mango Nest
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-full hover:bg-mango/20 dark:hover:bg-mango/20 text-softbrown dark:text-cream/90 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <span className="text-5xl">🥭</span>
                      <p className="text-sm text-softbrown dark:text-cream/50 font-bold uppercase tracking-wider">
                        Your crate is empty
                      </p>
                      <p className="text-xs text-softbrown/70 dark:text-cream/40 max-w-xs">
                        Add some fresh premium organic mangoes or build a custom Nest Box to fill your cart.
                      </p>
                      <button
                        onClick={() => {
                          setIsCartOpen(false)
                          const target = document.querySelector('#products')
                          if (target) {
                            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' })
                          }
                        }}
                        className="px-5 py-2.5 bg-leaf text-white text-xs font-bold rounded-xl"
                      >
                        Start Browsing
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="p-4 rounded-2xl bg-white/70 dark:bg-darkwood-light/40 border border-cream-dark/20 dark:border-white/5 flex items-center gap-4 relative"
                      >
                        {/* Mango thumbnail representation */}
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-cream to-white dark:from-darkwood dark:to-darkwood-light flex items-center justify-center border border-cream-dark/10 flex-shrink-0">
                          <span className="text-3xl select-none">🥭</span>
                        </div>

                        {/* Name and count */}
                        <div className="flex-grow text-left">
                          <h4 className="text-sm font-bold text-softbrown-dark dark:text-cream line-clamp-1">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="text-[10px] text-softbrown dark:text-cream/50 mt-0.5 line-clamp-1 italic">
                              {item.description}
                            </p>
                          )}
                          <p className="text-xs font-black text-leaf dark:text-mango mt-1">
                            ${item.price} <span className="font-normal text-[10px] text-softbrown/60">/ {item.unit || 'item'}</span>
                          </p>
                        </div>

                        {/* Actions: change qty or remove */}
                        <div className="flex flex-col items-end justify-between h-14">
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center bg-cream border border-cream-dark/40 dark:bg-darkwood dark:border-darkwood-light/20 rounded-lg p-0.5">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="p-1 rounded-md text-softbrown hover:bg-mango/20 transition-colors"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-extrabold text-softbrown-dark dark:text-cream">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="p-1 rounded-md text-softbrown hover:bg-mango/20 transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Subtotal & Checkout Button */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-cream-dark/20 dark:border-darkwood-light/20 bg-cream/10 dark:bg-darkwood/10 space-y-4">
                    <div className="flex justify-between items-center text-sm font-semibold text-softbrown dark:text-cream/80">
                      <span>Subtotal</span>
                      <span className="text-lg font-black text-leaf dark:text-mango">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-[10px] text-softbrown/70 dark:text-cream/40 leading-normal text-left">
                      Taxes and shipping calculated at checkout. Delivery scheduled within 24 hours of harvest dispatch.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      className="w-full py-4 bg-gradient-to-r from-leaf to-emerald-600 hover:from-leaf-dark hover:to-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-leaf/10 flex items-center justify-center gap-1.5"
                    >
                      Proceed to Secure Checkout
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Success Thank You Modal Overlay */}
      <AnimatePresence>
        {showCheckoutSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckoutSuccess(false)}
              className="fixed inset-0 bg-darkwood/60 dark:bg-black/80 backdrop-blur-md"
            />

            {/* Content card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-md w-full p-8 rounded-3xl text-center relative z-10 space-y-6 border border-white/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-leaf/10 dark:bg-mango/20 text-leaf dark:text-mango flex items-center justify-center text-3xl mx-auto border border-leaf/20 shadow-inner">
                🎉
              </div>

              <div className="space-y-2">
                <h3 className="font-playfair text-2xl font-black text-softbrown-dark dark:text-cream">
                  Harvest Scheduled!
                </h3>
                <p className="text-xs text-leaf dark:text-mango font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Order ID: #NEST-{Math.floor(1000 + Math.random() * 9000)}
                </p>
                <p className="text-sm text-softbrown dark:text-cream/70 leading-relaxed pt-2">
                  Thank you for ordering with **MangoNest**! Your selection has been assigned to our orchard team. We will harvest your mangoes at dawn tomorrow and dispatch them immediately.
                </p>
              </div>

              <div className="pt-4 border-t border-cream-dark/20 dark:border-darkwood-light/20">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowCheckoutSuccess(false)}
                  className="w-full py-3 bg-gradient-to-r from-mango to-orange-500 text-softbrown-dark font-bold text-sm rounded-xl shadow-md hover:shadow-lg"
                >
                  Return to Storefront
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default App

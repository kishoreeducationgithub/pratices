import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Plus, Minus, ShieldCheck, Heart } from 'lucide-react'

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)

  // Listen to escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!product) return null

  const handleAddClick = () => {
    onAddToCart({ ...product, quantity })
    onClose()
  }

  const tasteProfile = product.tasteProfile || { sweetness: 90, fiber: 10, juiciness: 95 }
  const nutrition = product.nutrition || { calories: 60, sugar: '14g', vitaminC: '60%', potassium: '168mg' }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-darkwood/60 dark:bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative w-full max-w-3xl bg-cream-light dark:bg-darkwood-light rounded-3xl overflow-hidden shadow-2xl border border-white dark:border-darkwood-light/30 z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-cream dark:bg-darkwood/60 hover:bg-mango/20 dark:hover:bg-mango/20 text-softbrown-dark dark:text-cream/90 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image and Badges */}
          <div className="md:col-span-5 bg-gradient-to-b from-mango/20 to-cream/20 dark:from-mango/10 dark:to-darkwood/20 flex flex-col justify-center items-center p-6 sm:p-8 relative min-h-[220px] md:min-h-0 border-b md:border-b-0 md:border-r border-cream-dark/20 dark:border-darkwood-light/20">
            <motion.img
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
              src="/premium_mango.png"
              alt={product.name}
              className="w-48 h-auto object-contain filter drop-shadow-xl"
            />
            
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-leaf/10 dark:bg-leaf/30 text-leaf dark:text-cream text-xs font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                Naturally Ripened
              </span>
            </div>
          </div>

          {/* Right Column: Content, Tasting Profiles, Nutrients, CTAs */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6">
            
            {/* Title & Description */}
            <div>
              <span className="text-xs font-bold text-leaf dark:text-mango uppercase tracking-wider">{product.region} origin</span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-softbrown-dark dark:text-cream mt-1 mb-2">
                {product.name}
              </h3>
              <p className="text-softbrown dark:text-cream/70 text-xs sm:text-sm leading-relaxed">
                {product.longDesc || product.description}
              </p>
            </div>

            {/* Tasting Dials */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-softbrown-dark dark:text-cream tracking-wide flex items-center gap-1">
                Tasting Profile
              </h4>
              <div className="space-y-2">
                {/* Sweetness */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-softbrown dark:text-cream/70">
                    <span>Sweetness</span>
                    <span>{tasteProfile.sweetness}%</span>
                  </div>
                  <div className="h-2 w-full bg-cream-dark/30 dark:bg-darkwood/40 rounded-full overflow-hidden mt-1">
                    <motion.div 
                      className="h-full bg-mango rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${tasteProfile.sweetness}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                {/* Juiciness */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-softbrown dark:text-cream/70">
                    <span>Juiciness & Aroma</span>
                    <span>{tasteProfile.juiciness}%</span>
                  </div>
                  <div className="h-2 w-full bg-cream-dark/30 dark:bg-darkwood/40 rounded-full overflow-hidden mt-1">
                    <motion.div 
                      className="h-full bg-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${tasteProfile.juiciness}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                    />
                  </div>
                </div>
                {/* Fiber */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-softbrown dark:text-cream/70">
                    <span>Fiber Content</span>
                    <span>{tasteProfile.fiber}% (Low Fiber)</span>
                  </div>
                  <div className="h-2 w-full bg-cream-dark/30 dark:bg-darkwood/40 rounded-full overflow-hidden mt-1">
                    <motion.div 
                      className="h-full bg-leaf rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${tasteProfile.fiber}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Nutrition Facts */}
            <div className="p-4 rounded-2xl bg-cream-dark/20 dark:bg-darkwood/40 border border-cream-dark/10 dark:border-white/5">
              <h4 className="text-xs font-bold uppercase text-softbrown-dark dark:text-cream tracking-wide mb-2.5">
                Nutrition Facts (Per 100g)
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-1">
                  <p className="text-[10px] text-softbrown dark:text-cream/50 uppercase">Calories</p>
                  <p className="text-sm font-extrabold text-softbrown-dark dark:text-cream mt-0.5">{nutrition.calories}</p>
                </div>
                <div className="p-1">
                  <p className="text-[10px] text-softbrown dark:text-cream/50 uppercase">Nat. Sugar</p>
                  <p className="text-sm font-extrabold text-softbrown-dark dark:text-cream mt-0.5">{nutrition.sugar}</p>
                </div>
                <div className="p-1">
                  <p className="text-[10px] text-softbrown dark:text-cream/50 uppercase">Vitamin C</p>
                  <p className="text-sm font-extrabold text-softbrown-dark dark:text-cream mt-0.5">{nutrition.vitaminC}</p>
                </div>
                <div className="p-1">
                  <p className="text-[10px] text-softbrown dark:text-cream/50 uppercase">Potassium</p>
                  <p className="text-sm font-extrabold text-softbrown-dark dark:text-cream mt-0.5">{nutrition.potassium}</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add button */}
            <div className="flex items-center justify-between pt-4 border-t border-cream-dark/20 dark:border-darkwood-light/20">
              <div>
                <p className="text-xs text-softbrown dark:text-cream/50 font-semibold">Total Price</p>
                <p className="text-2xl font-black text-leaf dark:text-mango">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity picker */}
                <div className="flex items-center bg-cream border border-cream-dark/40 dark:bg-darkwood dark:border-darkwood-light/30 rounded-xl p-1">
                  <button
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(quantity - 1)}
                    className="p-1.5 rounded-lg text-softbrown-dark dark:text-cream/90 hover:bg-mango/15 disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-extrabold text-softbrown-dark dark:text-cream">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-lg text-softbrown-dark dark:text-cream/90 hover:bg-mango/15 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddClick}
                  className="px-6 py-3.5 bg-gradient-to-r from-mango to-orange-500 text-softbrown-dark font-bold text-sm rounded-xl shadow-md shadow-mango/10 flex items-center gap-1.5 hover:shadow-lg"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}

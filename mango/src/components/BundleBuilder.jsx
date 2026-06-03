import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Trash2, Plus, Minus, Check } from 'lucide-react'

export default function BundleBuilder({ onAddBundleToCart }) {
  const [boxSize, setBoxSize] = useState(6) // 6 or 12
  const [selectedMangoes, setSelectedMangoes] = useState([]) // list of mango names

  const mangoTypes = [
    { id: 'alphonso', name: 'Alphonso Elite', emoji: '🥭', color: 'bg-amber-400 text-amber-950 border-amber-300' },
    { id: 'kesar', name: 'Kesar Royal', emoji: '🥭', color: 'bg-yellow-400 text-yellow-950 border-yellow-300' },
    { id: 'dasheri', name: 'Dasheri Sweet', emoji: '🥭', color: 'bg-orange-400 text-orange-950 border-orange-300' },
    { id: 'totapuri', name: 'Totapuri Tangy', emoji: '🥭', color: 'bg-lime-400 text-lime-950 border-lime-300' },
  ]

  const handleAddMango = (name) => {
    if (selectedMangoes.length < boxSize) {
      setSelectedMangoes([...selectedMangoes, name])
    }
  }

  const handleRemoveMango = (indexToRemove) => {
    setSelectedMangoes(selectedMangoes.filter((_, idx) => idx !== indexToRemove))
  }

  const handleReset = () => {
    setSelectedMangoes([])
  }

  const handleAddBoxToCart = () => {
    if (selectedMangoes.length === boxSize) {
      // Calculate a description of what is in the box
      const counts = {}
      selectedMangoes.forEach(m => { counts[m] = (counts[m] || 0) + 1 })
      const contentsStr = Object.entries(counts).map(([name, qty]) => `${qty}x ${name.split(' ')[0]}`).join(', ')
      
      const price = boxSize === 6 ? 29.99 : 49.99
      
      onAddBundleToCart({
        id: `custom-box-${Date.now()}`,
        name: `Custom Nest Box (${boxSize} Mangoes)`,
        description: contentsStr,
        price: price,
        isCustom: true,
        quantity: 1
      })
      
      // Reset after adding
      handleReset()
    }
  }

  const isFull = selectedMangoes.length === boxSize
  const progressPercent = (selectedMangoes.length / boxSize) * 100

  return (
    <section 
      id="bundle-builder" 
      className="py-20 sm:py-24 bg-white dark:bg-darkwood transition-colors duration-300 relative z-20 border-t border-cream-dark/10 dark:border-darkwood-light/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-leaf dark:text-mango tracking-wider uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Experience
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-softbrown-dark dark:text-cream mt-2">
            Build Your Custom Nest Box
          </h2>
          <div className="h-1 w-16 bg-mango mx-auto mt-3 rounded-full" />
          <p className="text-softbrown dark:text-cream/60 mt-4 text-sm sm:text-base">
            Mix and match your favorite varieties. We pack them gently in cushioned natural straw inside our signature wooden crates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Select Varieties */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Step 1: Choose Size */}
            <div className="text-left space-y-4">
              <h3 className="text-lg font-bold text-softbrown-dark dark:text-cream flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-leaf text-white flex items-center justify-center text-xs font-bold dark:bg-mango dark:text-darkwood">1</span>
                Select Crate Size
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => { setBoxSize(6); handleReset(); }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                    boxSize === 6
                      ? 'border-leaf bg-leaf/5 dark:border-mango dark:bg-mango/5 shadow-md'
                      : 'border-cream-dark/30 dark:border-darkwood-light/30 hover:border-leaf/50 dark:hover:border-mango/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-softbrown-dark dark:text-cream">6 Mangoes</span>
                    {boxSize === 6 && <Check className="w-4 h-4 text-leaf dark:text-mango" />}
                  </div>
                  <p className="text-xs text-softbrown dark:text-cream/60">Perfect for single sharing.</p>
                  <p className="text-sm font-extrabold text-leaf dark:text-mango mt-2">$29.99</p>
                </button>

                <button
                  onClick={() => { setBoxSize(12); handleReset(); }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                    boxSize === 12
                      ? 'border-leaf bg-leaf/5 dark:border-mango dark:bg-mango/5 shadow-md'
                      : 'border-cream-dark/30 dark:border-darkwood-light/30 hover:border-leaf/50 dark:hover:border-mango/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-softbrown-dark dark:text-cream">12 Mangoes</span>
                    {boxSize === 12 && <Check className="w-4 h-4 text-leaf dark:text-mango" />}
                  </div>
                  <p className="text-xs text-softbrown dark:text-cream/60">Family sharing box.</p>
                  <p className="text-sm font-extrabold text-leaf dark:text-mango mt-2">$49.99</p>
                </button>
              </div>
            </div>

            {/* Step 2: Add Mangoes */}
            <div className="text-left space-y-4">
              <h3 className="text-lg font-bold text-softbrown-dark dark:text-cream flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-leaf text-white flex items-center justify-center text-xs font-bold dark:bg-mango dark:text-darkwood">2</span>
                Choose Varieties
              </h3>
              <div className="space-y-3">
                {mangoTypes.map((type) => {
                  const qtyInBox = selectedMangoes.filter(m => m === type.name).length
                  return (
                    <div 
                      key={type.id}
                      className="p-3 sm:p-4 rounded-xl border border-cream-dark/30 dark:border-darkwood-light/20 flex items-center justify-between hover:bg-cream-light/30 dark:hover:bg-cream-dark/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border ${type.color}`}>
                          {type.emoji}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-softbrown-dark dark:text-cream">{type.name}</h4>
                          <p className="text-[11px] text-softbrown dark:text-cream/60">Rich tropical sweetness</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2.5">
                        {qtyInBox > 0 && (
                          <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={() => {
                              const firstIdx = selectedMangoes.indexOf(type.name)
                              if (firstIdx > -1) {
                                handleRemoveMango(firstIdx)
                              }
                            }}
                            className="p-1 rounded-full text-softbrown hover:bg-red-500/10 hover:text-red-500 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                        )}
                        {qtyInBox > 0 && (
                          <span className="text-sm font-bold text-softbrown-dark dark:text-cream w-4 text-center">
                            {qtyInBox}
                          </span>
                        )}
                        <button
                          disabled={isFull}
                          onClick={() => handleAddMango(type.name)}
                          className={`p-1 rounded-full transition-colors ${
                            isFull 
                              ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                              : 'text-leaf dark:text-mango hover:bg-leaf/10 dark:hover:bg-mango/15'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Progress bar */}
            <div className="text-left space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-semibold text-softbrown dark:text-cream/70">
                <span>Box Progress</span>
                <span>{selectedMangoes.length} / {boxSize} Packed</span>
              </div>
              <div className="w-full h-3 bg-cream-dark/30 dark:bg-darkwood-light/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-mango to-orange-500"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                />
              </div>
            </div>

          </div>

          {/* Right Side: Visual Straw Crate */}
          <div className="lg:col-span-7 flex flex-col justify-between glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-white/90 via-cream/10 to-cream-light/30 border border-white/50">
            
            {/* Visual Box Frame */}
            <div className="text-left mb-4 flex justify-between items-center border-b border-cream-dark/20 dark:border-darkwood-light/20 pb-4">
              <div>
                <h4 className="font-bold text-softbrown-dark dark:text-cream text-lg">Crate Visualizer</h4>
                <p className="text-xs text-softbrown dark:text-cream/60">Items rest on natural straw nesting.</p>
              </div>
              {selectedMangoes.length > 0 && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-red-500 font-medium hover:underline transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Box
                </button>
              )}
            </div>

            {/* The Wooden/Straw Crate Grid */}
            <div className="flex-grow flex items-center justify-center py-6">
              <div className={`grid gap-4 w-full max-w-md ${boxSize === 6 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {Array.from({ length: boxSize }).map((_, idx) => {
                  const item = selectedMangoes[idx]
                  const matchingType = mangoTypes.find(t => t.name === item)
                  
                  return (
                    <div 
                      key={idx} 
                      className="aspect-square rounded-2xl bg-amber-950/5 dark:bg-cream/5 border-2 border-dashed border-amber-900/10 dark:border-cream/10 flex items-center justify-center relative group overflow-hidden shadow-inner"
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(139,92,26,0.03) 0%, rgba(139,92,26,0) 80%)'
                      }}
                    >
                      {/* Straw aesthetic lines */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute w-6 h-0.5 bg-yellow-600 rotate-[35deg] left-2 top-4" />
                        <div className="absolute w-8 h-0.5 bg-yellow-600 -rotate-[15deg] right-2 top-8" />
                        <div className="absolute w-7 h-0.5 bg-yellow-600 rotate-[65deg] left-6 bottom-3" />
                      </div>

                      <AnimatePresence mode="popLayout">
                        {item ? (
                          <motion.div
                            initial={{ scale: 0, y: -40, rotate: -20 }}
                            animate={{ scale: 1.1, y: 0, rotate: [0, 5, -5, 0] }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                            className={`w-[80%] h-[80%] rounded-full flex flex-col items-center justify-center shadow-lg border cursor-pointer select-none ${matchingType?.color}`}
                            onClick={() => handleRemoveMango(idx)}
                          >
                            <span className="text-2xl sm:text-3xl leading-none">🥭</span>
                            <span className="text-[8px] font-bold tracking-tight text-center leading-none mt-1 opacity-90 max-w-[85%] truncate">
                              {item.split(' ')[0]}
                            </span>
                          </motion.div>
                        ) : (
                          <span className="text-[10px] font-semibold text-softbrown/40 dark:text-cream/20">Empty</span>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Checkout / Finish Crate */}
            <div className="pt-4 border-t border-cream-dark/20 dark:border-darkwood-light/20">
              <motion.button
                disabled={!isFull}
                onClick={handleAddBoxToCart}
                className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                  isFull
                    ? 'bg-gradient-to-r from-leaf to-emerald-600 hover:from-leaf-dark hover:to-emerald-700 text-white cursor-pointer hover:shadow-leaf/25 shadow-md'
                    : 'bg-cream-dark/40 dark:bg-darkwood-light/40 text-softbrown/40 dark:text-cream/20 cursor-not-allowed shadow-none'
                }`}
                whileHover={isFull ? { scale: 1.02 } : {}}
                whileTap={isFull ? { scale: 0.98 } : {}}
              >
                {isFull ? (
                  <>
                    <Check className="w-5 h-5" />
                    Add Custom Crate to Cart
                  </>
                ) : (
                  `Fill Crate to Add (${selectedMangoes.length} / ${boxSize})`
                )}
              </motion.button>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'

export default function CTA({ onExploreClick }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1500)
  }

  const handleScrollToProducts = (e) => {
    e.preventDefault()
    const targetElement = document.querySelector('#products')
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
      id="cta" 
      className="py-16 sm:py-24 bg-white dark:bg-darkwood transition-colors duration-300 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Shifting Gradient Box */}
        <div 
          className="relative rounded-[32px] overflow-hidden px-6 py-12 sm:p-16 lg:p-20 text-center shadow-2xl bg-gradient-to-br from-leaf via-emerald-700 to-mango bg-[length:300%_300%] animate-gradient-shift border border-white/20"
        >
          {/* Subtle overlay grid/dots */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10 space-y-8">
            {/* Header Text */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
                Limited Harvest Offer
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Get Fresh Mangoes <br className="sm:hidden" /> Delivered Today
              </h2>
              <p className="text-cream-light/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Our harvest season is brief. Secure your crate of handpicked Alphonso and Kesar mangoes before the morning harvest is fully booked.
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <motion.a
                href="#products"
                onClick={handleScrollToProducts}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="w-full sm:w-auto px-8 py-4 bg-white text-leaf dark:text-leaf-dark font-black text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center cursor-pointer"
              >
                Order Fresh Crate Now
              </motion.a>
            </div>

            {/* Divider line */}
            <div className="w-12 h-px bg-white/30 mx-auto" />

            {/* Newsletter Subscription */}
            <div className="max-w-md mx-auto space-y-3">
              <h3 className="text-xs font-bold uppercase text-white tracking-widest">
                Join our VIP Harvest List
              </h3>
              <p className="text-[11px] text-cream-light/70 leading-normal">
                Receive notifications when the first mangoes of the season ripen, plus exclusive access to limited Reserve Grade harvests.
              </p>
              
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-5 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-cream-light/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                  disabled={status === 'loading' || status === 'success'}
                />
                
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 bg-mango text-softbrown-dark hover:bg-mango-dark font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                  {status === 'idle' && <Send className="w-4 h-4" />}
                  {status === 'success' ? 'Subscribed' : 'Subscribe'}
                </motion.button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

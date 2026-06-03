import { motion } from 'framer-motion'
import { Sparkles, Clock, MapPin, CheckCircle2 } from 'lucide-react'

export default function StorySection() {
  const steps = [
    { time: '05:00 AM', title: 'Dawn Harvesting', desc: 'Our farmers hand-select fruit at precise natural ripeness.' },
    { time: '09:00 AM', title: 'Laser Grading', desc: 'Mangoes are graded by weight, density, and natural sugar content.' },
    { time: '02:00 PM', title: 'Eco-Packaging', desc: 'Wrapped in breathable protective organic nests.' },
    { time: '06:00 PM', title: 'Same-Day Dispatch', desc: 'Shipped via Express temperature-controlled courier networks.' },
  ]

  return (
    <section 
      id="story" 
      className="py-20 sm:py-24 bg-cream/30 dark:bg-darkwood-light/10 transition-colors duration-300 relative z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-softbrown-dark dark:text-cream">
            Orchard to Table in 24 Hours
          </h2>
          <div className="h-1 w-16 bg-leaf mx-auto mt-3 rounded-full" />
          <p className="text-softbrown dark:text-cream/60 mt-4 text-sm sm:text-base">
            Taste mangoes exactly as they are enjoyed at the farm. Pure, sweet, and bursting with tropical juices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Beautiful Orchard Image Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 relative group"
          >
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-leaf/10 to-mango/10 rounded-3xl blur-2xl group-hover:scale-105 transition-transform duration-500 -z-10" />
            
            {/* Main Image Frame */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white dark:border-darkwood-light">
              <motion.img 
                src="/mango_orchard.png" 
                alt="MangoNest organic mango orchard harvest" 
                className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkwood/70 via-transparent to-transparent opacity-60" />
              
              {/* Badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl flex items-center justify-between border border-white/30 text-left">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-leaf text-white text-xl">🌳</span>
                  <div>
                    <h4 className="text-sm font-bold text-softbrown-dark dark:text-cream">Devgad Orchards</h4>
                    <p className="text-[10.5px] text-softbrown dark:text-cream/70">Maharashtra, Western Ghats</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-leaf font-bold text-xs uppercase dark:text-mango">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified origin
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Story Text & Interactive Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-6 flex flex-col space-y-8 text-left"
          >
            <div>
              <span className="text-xs font-bold text-leaf dark:text-mango tracking-wider uppercase">Our Philosophy</span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-softbrown-dark dark:text-cream mt-2 mb-4 leading-snug">
                Nature dictates our schedule. We never hasten perfection.
              </h3>
              <p className="text-softbrown dark:text-cream/70 text-sm sm:text-base leading-relaxed">
                Most commercial store-bought mangoes are picked green and chemically forced to ripen in dark warehouses. At MangoNest, our fruit remains on the tree, absorbing sunlight until the exact moment of natural maturity. The difference is in the aroma, sugar levels, and texture.
              </p>
            </div>

            {/* Micro timeline */}
            <div className="relative pl-6 border-l-2 border-leaf/20 dark:border-mango/20 space-y-6">
              {steps.map((s, idx) => (
                <motion.div 
                  key={idx}
                  className="relative group/step"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  {/* Timeline point */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-cream border-2 border-leaf dark:border-mango group-hover/step:bg-leaf dark:group-hover/step:bg-mango transition-colors duration-300" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <span className="text-xs font-bold text-leaf dark:text-mango uppercase tracking-wider">{s.time}</span>
                    <h4 className="text-sm font-bold text-softbrown-dark dark:text-cream">{s.title}</h4>
                  </div>
                  <p className="text-[12.5px] sm:text-xs text-softbrown dark:text-cream/60 mt-1 leading-normal max-w-md">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Sprout, Truck, ShieldCheck, Award } from 'lucide-react'

export default function FeatureStrip() {
  const features = [
    {
      icon: Sprout,
      title: '100% Organic Farms',
      description: 'Cultivated in pristine certified pesticide-free soil.',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      glow: 'hover:shadow-emerald-500/10'
    },
    {
      icon: Truck,
      title: 'Same Day Harvest Delivery',
      description: 'Picked at sunrise, delivered to you by sunset.',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      glow: 'hover:shadow-amber-500/10'
    },
    {
      icon: ShieldCheck,
      title: 'No Added Chemicals',
      description: 'Naturally ripened without carbide or chemical accelerators.',
      color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      glow: 'hover:shadow-sky-500/10'
    },
    {
      icon: Award,
      title: 'Premium Hand-Grading',
      description: 'Only the top 5% of harvest meets our sizing and sugar metrics.',
      color: 'bg-mango/15 text-yellow-600 dark:text-mango',
      glow: 'hover:shadow-yellow-500/10'
    }
  ]

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  return (
    <section 
      id="features" 
      className="py-16 sm:py-20 bg-white dark:bg-darkwood transition-colors duration-300 relative z-20 border-y border-cream-dark/10 dark:border-darkwood-light/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-softbrown-dark dark:text-cream">
            The MangoNest Standard
          </h2>
          <div className="h-1 w-16 bg-mango mx-auto mt-3 rounded-full" />
          <p className="text-softbrown dark:text-cream/60 mt-4 text-sm sm:text-base">
            Every bite is a testament to our quality philosophy. We bridge the gap between traditional organic orchards and premium luxury delivery.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {features.map((f, idx) => {
            const Icon = f.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`glass-card p-6 sm:p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 cursor-pointer ${f.glow}`}
              >
                {/* Icon Container with hover spin */}
                <motion.div
                  className={`p-4 rounded-xl ${f.color} mb-5 flex items-center justify-center`}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-softbrown-dark dark:text-cream mb-2">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-softbrown dark:text-cream/70 leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

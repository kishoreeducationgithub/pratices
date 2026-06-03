import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react'

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Samantha Rogers',
      role: 'Organic Food Advocate',
      rating: 5,
      text: 'I have never tasted Alphonso mangoes like this outside of Maharashtra! They arrived in perfect condition, resting in their straw nests, and smelled absolutely divine. Worth every single penny.',
      avatar: '🥑'
    },
    {
      id: 2,
      name: 'Dr. Vivek Mehta',
      role: 'Mango Connoisseur',
      rating: 5,
      text: 'The Kesar mangoes are a revelation. Zero chemical aftertaste, perfectly naturally ripened. You can immediately tell they were harvested at dawn and sent straight over. MangoNest is my new summer ritual.',
      avatar: '👑'
    },
    {
      id: 3,
      name: 'Marcus Chen',
      role: 'Pastry Chef',
      rating: 5,
      text: 'Using these mangoes for my seasonal mango tarts. The low-fiber structure of the Alphonso Elite makes pureeing a dream. Excellent quality consistency, prompt delivery, and stunning luxury packaging.',
      avatar: '👨‍🍳'
    },
    {
      id: 4,
      name: 'Elena Rostova',
      role: 'Healthy Living Blogger',
      rating: 5,
      text: 'The Custom Nest Box builder is so fun and interactive! I love being able to mix sweet Kesar with tangy Totapuri for salads. Ordering was simple, and the box makes the most gorgeous gift.',
      avatar: '🧘'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    })
  }

  return (
    <section 
      id="testimonials" 
      className="py-20 sm:py-24 bg-cream/30 dark:bg-darkwood-light/10 transition-colors duration-300 relative z-20 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Decorative Quote Icon in background */}
        <Quote className="absolute top-0 left-4 sm:left-12 w-28 h-28 text-mango/10 dark:text-mango/5 -z-10" />

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-softbrown-dark dark:text-cream">
            Loved By Mango Lovers
          </h2>
          <div className="h-1 w-16 bg-leaf mx-auto mt-3 rounded-full" />
        </div>

        {/* Review Box Wrapper */}
        <div className="relative min-h-[320px] sm:min-h-[260px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="glass-card p-6 sm:p-10 rounded-3xl w-full text-center relative flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-5">
                  {Array.from({ length: reviews[currentIndex].rating }).map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-mango text-mango" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-base sm:text-lg italic text-softbrown-dark dark:text-cream/90 leading-relaxed font-medium">
                  "{reviews[currentIndex].text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="text-3xl p-2 rounded-full bg-cream dark:bg-darkwood shadow-sm">
                  {reviews[currentIndex].avatar}
                </span>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-softbrown-dark dark:text-cream flex items-center gap-1.5">
                    {reviews[currentIndex].name}
                    <span className="text-[10px] bg-leaf/10 text-leaf dark:bg-mango/20 dark:text-mango px-2 py-0.5 rounded-full flex items-center gap-0.5 font-bold">
                      <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                    </span>
                  </h4>
                  <p className="text-xs text-softbrown dark:text-cream/50">{reviews[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center gap-4 mt-8 sm:mt-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="p-3 rounded-full bg-white dark:bg-darkwood-light hover:bg-mango/20 dark:hover:bg-mango/20 border border-cream-dark/20 dark:border-white/5 text-softbrown dark:text-cream transition-colors shadow-sm"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1)
                  setCurrentIndex(idx)
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-leaf dark:bg-mango' : 'w-2.5 bg-cream-dark dark:bg-darkwood-light'
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-3 rounded-full bg-white dark:bg-darkwood-light hover:bg-mango/20 dark:hover:bg-mango/20 border border-cream-dark/20 dark:border-white/5 text-softbrown dark:text-cream transition-colors shadow-sm"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, Sun, Moon, Sparkles } from 'lucide-react'

export default function Navbar({ cartCount, isDarkMode, setIsDarkMode, onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Our Story', href: '#story' },
    { name: 'Build a Box', href: '#bundle-builder' },
    { name: 'Shop Mangoes', href: '#products' },
    { name: 'Reviews', href: '#testimonials' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const targetElement = document.querySelector(href)
    if (targetElement) {
      const navHeight = 80 // height of navbar
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full glass transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-2 group"
          >
            <motion.span 
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 4, ease: "easeInOut" }}
            >
              🥭
            </motion.span>
            <span className="font-playfair text-2xl font-bold tracking-tight text-leaf dark:text-mango">
              Mango<span className="text-mango dark:text-cream">Nest</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-softbrown-dark dark:text-cream/90 hover:text-leaf dark:hover:text-mango transition-colors duration-200 relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-leaf dark:bg-mango transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Dark Mode Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full bg-softbrown/5 dark:bg-cream/5 text-softbrown dark:text-cream/90 hover:bg-mango/20 dark:hover:bg-mango/20 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-mango" /> : <Moon className="w-5 h-5 text-leaf" />}
            </motion.button>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-leaf text-white hover:bg-leaf-dark dark:bg-mango dark:text-darkwood dark:hover:bg-mango-dark transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-leaf/10 dark:shadow-mango/10"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-orange-600 dark:bg-leaf text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-cream dark:border-darkwood"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Dark Mode Toggle (Mobile) */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full text-softbrown dark:text-cream/90"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-mango" /> : <Moon className="w-5 h-5 text-leaf" />}
            </button>

            {/* Cart (Mobile) */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-softbrown dark:text-cream/90"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 dark:bg-leaf text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-softbrown dark:text-cream/90 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass border-t border-cream-dark/20 dark:border-darkwood-light/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-softbrown-dark dark:text-cream/90 hover:bg-mango/10 dark:hover:bg-mango/10 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

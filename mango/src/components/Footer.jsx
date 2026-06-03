import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500 hover:bg-pink-500/10' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600 hover:bg-blue-600/10' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500 hover:bg-sky-500/10' }
  ]

  const quickLinks = [
    { name: 'Shop Alphonso', href: '#products' },
    { name: 'Build a Box', href: '#bundle-builder' },
    { name: 'Harvest Timeline', href: '#story' },
    { name: 'Reviews', href: '#testimonials' }
  ]

  const companyLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Orchard Locations', href: '#story' },
    { name: 'Sustainability', href: '#features' },
    { name: 'Careers', href: '#' }
  ]

  const handleFooterLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetElement = document.querySelector(href)
      if (targetElement) {
        const navHeight = 80
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <footer className="bg-cream-dark/30 dark:bg-darkwood border-t border-cream-dark/20 dark:border-darkwood-light/10 transition-colors duration-300 pt-16 pb-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-cream-dark/20 dark:border-darkwood-light/10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <a href="#home" onClick={(e) => handleFooterLinkClick(e, '#home')} className="flex items-center space-x-2 w-fit">
              <span className="text-2xl">🥭</span>
              <span className="font-playfair text-xl font-bold text-leaf dark:text-mango">
                Mango<span className="text-mango dark:text-cream">Nest</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-softbrown dark:text-cream/60 leading-relaxed max-w-sm">
              Cultivating tropical excellence. We bring the rich heritage of organic, naturally tree-ripened Indian mangoes directly from our sunrise-dappled orchards straight to your table.
            </p>
            {/* Social icons */}
            <div className="flex space-x-3 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2.5 rounded-full border border-cream-dark/40 dark:border-darkwood-light/40 text-softbrown dark:text-cream/80 transition-colors ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Shop Links (2.5 cols) */}
          <div className="lg:col-span-2.5 text-left space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-softbrown-dark dark:text-cream">
              Shop Collections
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleFooterLinkClick(e, link.href)}
                    className="text-xs sm:text-sm text-softbrown dark:text-cream/60 hover:text-leaf dark:hover:text-mango hover:underline transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links (2.5 cols) */}
          <div className="lg:col-span-2.5 text-left space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-softbrown-dark dark:text-cream">
              Our Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleFooterLinkClick(e, link.href)}
                    className="text-xs sm:text-sm text-softbrown dark:text-cream/60 hover:text-leaf dark:hover:text-mango hover:underline transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 text-left space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-softbrown-dark dark:text-cream">
              Contact & Support
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-softbrown dark:text-cream/60">
                <MapPin className="w-4 h-4 text-leaf dark:text-mango flex-shrink-0 mt-0.5" />
                <span>Devgad Coastline, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs sm:text-sm text-softbrown dark:text-cream/60">
                <Phone className="w-4 h-4 text-leaf dark:text-mango flex-shrink-0" />
                <span>+1 (800) 555-NEST</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs sm:text-sm text-softbrown dark:text-cream/60">
                <Mail className="w-4 h-4 text-leaf dark:text-mango flex-shrink-0" />
                <a href="mailto:hello@mangonest.com" className="hover:underline hover:text-leaf dark:hover:text-mango">
                  hello@mangonest.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11.5px] sm:text-xs text-softbrown/60 dark:text-cream/40 space-y-4 sm:space-y-0 text-center sm:text-left">
          <p>© {currentYear} MangoNest Premium Organic. All rights reserved.</p>
          <p className="flex items-center gap-1 justify-center sm:justify-start">
            Made with <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse" /> for fresh tropical living.
          </p>
        </div>

      </div>
    </footer>
  )
}

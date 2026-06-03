import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Eye, Sparkles, HelpCircle } from 'lucide-react'
import ProductModal from './ProductModal'

export default function ProductGrid({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const products = [
    {
      id: 'alphonso',
      name: 'Alphonso Elite',
      description: 'The prized "King of Mangoes" from Devgad orchards. Rich, saffron pulp, incredibly sweet.',
      longDesc: 'Alphonso mangoes are globally celebrated for their rich, non-fibrous texture, heavenly aroma, and unique honey-like sweetness. Harvested at sunrise from Devgad, each mango is individually hand-graded to ensure optimal sugar brix levels and perfect color saturation.',
      price: 4.99,
      unit: 'each',
      region: 'Devgad',
      badge: 'Bestseller',
      tasteProfile: { sweetness: 98, fiber: 5, juiciness: 95 },
      nutrition: { calories: 60, sugar: '14g', vitaminC: '95%', potassium: '168mg' }
    },
    {
      id: 'kesar',
      name: 'Kesar Royal',
      description: 'Known as the "Queen of Mangoes". Intensely aromatic, bright orange flesh, slightly tangy undertone.',
      longDesc: 'Hailing from the foot of Gir Hills, Kesar mangoes are known for their distinct saffron color and unmatched fragrance that fills the room. It has a smooth, fiber-free texture and is perfect for fresh eating, desserts, or purees.',
      price: 3.99,
      unit: 'each',
      region: 'Gir Hills',
      badge: 'Aromatic',
      tasteProfile: { sweetness: 92, fiber: 8, juiciness: 90 },
      nutrition: { calories: 62, sugar: '13.5g', vitaminC: '85%', potassium: '160mg' }
    },
    {
      id: 'dasheri',
      name: 'Dasheri Sweet',
      description: 'Slim, long shape. Thin skin, fiberless, sweet melting pulp with a history tracing back to royal gardens.',
      longDesc: 'Originating from Malihabad royal orchards, Dasheri is a highly prized heritage variety with an elongated shape, thin skin, and an extremely sweet, melting fiberless pulp that slides off the seed. A true connoisseur\'s choice.',
      price: 3.49,
      unit: 'each',
      region: 'Malihabad',
      badge: 'Heritage',
      tasteProfile: { sweetness: 95, fiber: 4, juiciness: 88 },
      nutrition: { calories: 58, sugar: '14.5g', vitaminC: '75%', potassium: '150mg' }
    },
    {
      id: 'totapuri',
      name: 'Totapuri Tangy',
      description: 'Curved beak-like tip. Crisp, yellow-green skin, balanced sweet and sour profile. Ideal for salads.',
      longDesc: 'Famous for its parrot-beak shape, Totapuri is highly sought after by those who appreciate a balanced sweet-and-sour profile. Excellent for fresh gourmet salads, chutneys, or eating raw with a pinch of salt and chili.',
      price: 2.99,
      unit: 'each',
      region: 'Krishnagiri',
      badge: 'Tangy-Sweet',
      tasteProfile: { sweetness: 75, fiber: 15, juiciness: 85 },
      nutrition: { calories: 55, sugar: '11g', vitaminC: '90%', potassium: '180mg' }
    },
    {
      id: 'festive-crate',
      name: 'Royal Festive Crate',
      description: 'Curated box of 8 handpicked Alphonso and Kesar mangoes in our premium signature wooden box.',
      longDesc: 'The ultimate luxury fruit gift. Features 4 Alphonso Elites and 4 Kesar Royals resting on a soft bed of natural, organic straw. Hand-painted wooden casing. Ideal for festivals, corporate gifting, or self-indulgence.',
      price: 39.99,
      unit: 'crate',
      region: 'Orchard Mix',
      badge: 'Premium Gift',
      tasteProfile: { sweetness: 96, fiber: 6, juiciness: 92 },
      nutrition: { calories: 480, sugar: '110g', vitaminC: '600%', potassium: '1300mg' }
    },
    {
      id: 'tasting-flight',
      name: 'Sunshine Tasting Flight',
      description: 'A curated variety pack of 8 mangoes (2 Alphonso, 2 Kesar, 2 Dasheri, 2 Totapuri). Compare and enjoy.',
      longDesc: 'Can\'t decide? Taste them all. Our Sunshine Flight contains two of each of our signature organic mango varieties. Comes with a detailed tasting wheel card describing origin, notes, and perfect recipe pairings.',
      price: 34.99,
      unit: 'crate',
      region: 'Full Flight',
      badge: 'Popular',
      tasteProfile: { sweetness: 90, fiber: 8, juiciness: 89 },
      nutrition: { calories: 470, sugar: '105g', vitaminC: '580%', potassium: '1250mg' }
    }
  ]

  return (
    <section 
      id="products" 
      className="py-20 sm:py-24 bg-cream/10 dark:bg-darkwood-light/5 transition-colors duration-300 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-softbrown-dark dark:text-cream">
            Our Premium Harvest
          </h2>
          <div className="h-1 w-16 bg-mango mx-auto mt-3 rounded-full" />
          <p className="text-softbrown dark:text-cream/60 mt-4 text-sm sm:text-base">
            Each mango is harvested by hand at sunrise, washed in fresh mountain water, graded, and nested. Select a variety to view its sugar metrics and origin.
          </p>
        </div>

        {/* Desktop Grid & Mobile Swipeable Row */}
        {/* Mobile: Horizontal scroll wrapper | Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -8 }}
              className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-auto snap-center glass-card rounded-3xl p-5 flex flex-col justify-between border border-cream-dark/20 dark:border-darkwood-light/10 cursor-pointer group transition-all duration-300 hover:shadow-xl hover:shadow-mango/5 dark:hover:shadow-black/40"
              onClick={() => setSelectedProduct(product)}
            >
              <div>
                {/* Image and badge */}
                <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-b from-cream to-white dark:from-darkwood dark:to-darkwood-light flex items-center justify-center mb-5 overflow-hidden border border-cream-dark/10 dark:border-white/5">
                  
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-leaf dark:bg-mango text-white dark:text-darkwood text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                      {product.badge}
                    </span>
                  )}
                  
                  <motion.img
                    src="/premium_mango.png"
                    alt={product.name}
                    className="w-[60%] h-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 filter drop-shadow-md"
                  />

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-0 bg-darkwood/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="p-3 bg-white text-softbrown-dark rounded-full hover:bg-mango transition-all duration-200"
                      title="View Tasting Profile"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Info */}
                <div className="text-left px-1">
                  <span className="text-[10.5px] font-bold text-leaf dark:text-mango uppercase tracking-wider">
                    {product.region}
                  </span>
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-softbrown-dark dark:text-cream mt-0.5 group-hover:text-leaf dark:group-hover:text-mango transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-softbrown dark:text-cream/60 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Add to Cart button */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-cream-dark/10 dark:border-darkwood-light/10 px-1">
                <div className="text-left">
                  <p className="text-[10px] text-softbrown/60 dark:text-cream/40 uppercase">Price</p>
                  <p className="text-lg font-black text-softbrown-dark dark:text-cream">
                    ${product.price}
                    <span className="text-xs font-normal text-softbrown/60 dark:text-cream/50"> / {product.unit}</span>
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart({ ...product, quantity: 1 });
                  }}
                  className="p-3 rounded-2xl bg-leaf hover:bg-leaf-dark text-white dark:bg-mango dark:text-darkwood dark:hover:bg-mango-dark transition-all duration-200 flex items-center justify-center shadow-md shadow-leaf/10 dark:shadow-mango/10"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={onAddToCart}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { useMenu } from '../hooks/useMenu';
import { MenuItem, MenuCategory, DietaryFilter } from '../types';
import Badge from '../components/ui/Badge';
import { SkeletonMenuRow } from '../components/ui/Skeleton';

const categories: MenuCategory[] = ['All', 'Starters', 'Breads', 'Mains', 'Biryanis', 'Desserts', 'Drinks'];

const dietaryFilters: { value: DietaryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'veg', label: 'Vegetarian Only' },
  { value: 'non-veg', label: 'Non-Vegetarian Only' },
  { value: 'special', label: "Chef's Specials" },
];

function SpiceLevel({ level }: { level: number }) {
  return (
    <span className="text-text-tertiary text-sm" title={`Spice level: ${level}/3`}>
      {'🌶'.repeat(level)}
    </span>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');
  const [expandedDish, setExpandedDish] = useState<number | null>(null);
  const { data: menuItems, isLoading, error, refetch } = useMenu();
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Intersection Observer for active category tracking
  useEffect(() => {
    if (activeCategory !== 'All') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cat = entry.target.getAttribute('data-category');
            if (cat) setActiveCategory(cat as MenuCategory);
          }
        }
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    if (!menuItems) return [];
    let items = menuItems;
    if (activeCategory !== 'All') {
      items = items.filter((item) => item.category === activeCategory);
    }
    switch (dietaryFilter) {
      case 'veg':
        items = items.filter((item) => item.is_veg);
        break;
      case 'non-veg':
        items = items.filter((item) => !item.is_veg);
        break;
      case 'special':
        items = items.filter((item) => item.is_special);
        break;
    }
    return items;
  }, [menuItems, activeCategory, dietaryFilter]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    for (const item of filteredItems) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filteredItems]);

  const scrollToCategory = (cat: MenuCategory) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      window.scrollTo({ top: 400, behavior: 'smooth' });
      return;
    }
    const el = sectionRefs.current[cat];
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800"
            alt="Elegant restaurant dining area"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(13,10,7,0.4)] via-[rgba(13,10,7,0.7)] to-[#0D0A07]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-body text-sm text-text-secondary mb-2">
              Home / <span className="text-text-primary">Menu</span>
            </p>
            <h1 className="font-display italic text-5xl md:text-6xl text-text-primary">Our Menu</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-28 space-y-1">
              <p className="font-body text-[11px] uppercase tracking-[0.15em] text-text-tertiary mb-4">
                Categories
              </p>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-body transition-all rounded-r-lg ${
                    activeCategory === cat
                      ? 'text-gold border-l-2 border-gold bg-gold/5'
                      : 'text-text-secondary hover:text-text-primary border-l-2 border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {/* Mobile category tabs */}
            <div className="lg:hidden overflow-x-auto pb-4 mb-6 -mx-2 px-2 scrollbar-hide">
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => scrollToCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 text-sm font-body rounded-full transition-all ${
                      activeCategory === cat
                        ? 'bg-gold text-primary font-medium'
                        : 'border border-[rgba(201,168,76,0.2)] text-text-secondary hover:text-gold'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <SlidersHorizontal size={16} className="text-text-tertiary" />
              {dietaryFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setDietaryFilter(filter.value)}
                  className={`px-4 py-1.5 text-[13px] font-body rounded-full transition-all ${
                    dietaryFilter === filter.value
                      ? 'bg-gold/15 text-gold border border-gold/30'
                      : 'border border-[rgba(201,168,76,0.12)] text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
              <span className="ml-auto text-[13px] font-body text-text-tertiary">
                Showing {filteredItems.length} dishes
              </span>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="space-y-0">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border-b border-[rgba(201,168,76,0.08)]">
                    <SkeletonMenuRow />
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center py-16">
                <p className="text-error font-body mb-4">Failed to load menu items.</p>
                <button
                  onClick={() => refetch()}
                  className="font-body text-sm text-gold hover:text-gold-light transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && filteredItems.length === 0 && (
              <div className="text-center py-16">
                <p className="text-text-secondary font-body mb-4">No dishes match your current filters.</p>
                <button
                  onClick={() => {
                    setDietaryFilter('all');
                    setActiveCategory('All');
                  }}
                  className="font-body text-sm text-gold hover:text-gold-light transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Menu items */}
            {!isLoading && !error && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${dietaryFilter}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div
                      key={category}
                      ref={(el) => { sectionRefs.current[category] = el; }}
                      data-category={category}
                      className="mb-12"
                    >
                      <h2 className="font-display italic text-2xl text-text-primary mb-6 pb-3 border-b border-[rgba(201,168,76,0.15)]">
                        {category}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            className="flex items-start gap-4 py-5 border-b border-[rgba(201,168,76,0.08)] hover:bg-[rgba(201,168,76,0.04)] hover:border-l-2 hover:border-l-[rgba(201,168,76,0.5)] hover:pl-3 transition-all duration-200 group"
                          >
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-[100px] h-[100px] object-cover rounded-[10px] flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h3 className="font-body text-[17px] font-medium text-text-primary">
                                    {item.name}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    {item.is_veg ? (
                                      <Badge variant="veg">Veg</Badge>
                                    ) : (
                                      <Badge variant="non-veg">Non-Veg</Badge>
                                    )}
                                    {item.is_special === 1 && (
                                      <Badge variant="special">Chef's Special</Badge>
                                    )}
                                  </div>
                                </div>
                                <span className="text-gold font-body text-base font-medium whitespace-nowrap">
                                  ₹{item.price}
                                </span>
                              </div>
                              <div className="mt-2">
                                <p
                                  className={`font-body text-sm text-text-secondary ${
                                    expandedDish === item.id ? '' : 'line-clamp-2'
                                  }`}
                                >
                                  {item.description}
                                </p>
                                {item.description.length > 80 && (
                                  <button
                                    onClick={() =>
                                      setExpandedDish(expandedDish === item.id ? null : item.id)
                                    }
                                    className="text-gold text-[13px] font-body mt-1 hover:text-gold-light"
                                  >
                                    {expandedDish === item.id ? 'show less' : 'read more'}
                                  </button>
                                )}
                              </div>
                              <div className="mt-2">
                                <SpiceLevel level={item.spice_level} />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { TECH_PRODUCTS } from '../data/mockData';
import { Star, CheckCircle, Zap, Shield, Image as ImageIcon } from 'lucide-react';

interface FeaturesGridProps {
  highContrast: boolean;
  optimizedImages: boolean;
  lazyLoad: boolean;
  contentVisibility: boolean;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  highContrast,
  optimizedImages,
  lazyLoad,
  contentVisibility,
}) => {
  return (
    <section id="products" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-3 border border-slate-200">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Responsive Grid Demo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Developer Product Ecosystem
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${highContrast ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>
            1 column on mobile (375px), 2 columns on tablet (768px), and 3 columns on desktop (1024px+).
          </p>
        </div>

        {/* Product Cards Grid: 1 col on mobile, 2 on sm/md, 3 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TECH_PRODUCTS.map((product) => {
            const imgSrc = optimizedImages ? product.imageUrl : product.unoptimizedUrl;

            return (
              <div
                key={product.id}
                style={
                  contentVisibility
                    ? {
                        contentVisibility: 'auto',
                        containIntrinsicSize: '1px 380px',
                      }
                    : {}
                }
                className="card-grid-item group rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-indigo-300 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col overflow-hidden"
              >
                {/* Image Container with Aspect Ratio and Explicit Attributes */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
                  <img
                    src={imgSrc}
                    alt={product.title}
                    width="400"
                    height="225"
                    loading={lazyLoad ? 'lazy' : 'eager'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-md">
                    {product.tag}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-indigo-600 font-bold mb-1">
                      <span>{product.category}</span>
                      <div className="flex items-center space-x-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-slate-800 font-semibold">{product.rating}</span>
                        <span className="text-slate-500">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {product.title}
                    </h3>

                    {/* WCAG AA Compliant Text Contrast Toggle */}
                    <p
                      className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                        highContrast
                          ? 'text-slate-950 font-bold'
                          : 'text-slate-600'
                      }`}
                    >
                      {product.description}
                    </p>
                  </div>

                  {/* Features Bullet List */}
                  <ul className="space-y-1.5 pt-2 border-t border-slate-200 text-xs">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-slate-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Action Footer */}
                  <div className="pt-3 flex items-center justify-between border-t border-slate-200/80">
                    <div>
                      <span className="text-xs text-slate-500 block">Starting at</span>
                      <span className="text-lg font-extrabold text-slate-900">{product.price}</span>
                    </div>

                    <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-colors shadow-sm">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

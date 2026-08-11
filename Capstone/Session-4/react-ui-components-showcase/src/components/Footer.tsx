import React from 'react';
import { SocialLink } from '../types';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Github,
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  HelpCircle,
  Truck,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  /** Array of social media link items passed as props */
  socialLinks: SocialLink[];
  /** Optional copyright holder text */
  companyName?: string;
  /** Optional customer support phone */
  supportPhone?: string;
}

export const Footer: React.FC<FooterProps> = ({
  socialLinks,
  companyName = 'Flipkart Internet Private Limited',
  supportPhone = '044-45614700 / 044-67415800',
}) => {
  const getSocialIcon = (platform: string) => {
    const iconClass = 'w-5 h-5 transition-transform duration-200 group-hover:scale-110';
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className={iconClass} />;
      case 'twitter':
        return <Twitter className={iconClass} />;
      case 'instagram':
        return <Instagram className={iconClass} />;
      case 'youtube':
        return <Youtube className={iconClass} />;
      case 'linkedin':
        return <Linkedin className={iconClass} />;
      case 'github':
        return <Github className={iconClass} />;
      default:
        return <ExternalLink className={iconClass} />;
    }
  };

  return (
    <footer className="bg-[#172337] text-slate-300 font-sans border-t-4 border-yellow-400">
      {/* Top Value Propositions Ribbon */}
      <div className="border-b border-slate-700/80 bg-[#121c2c] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <ShoppingBag className="w-8 h-8 text-yellow-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Authentic Products</p>
              <p className="text-xs text-slate-400">100% Genuine Guaranteed</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <ShieldCheck className="w-8 h-8 text-yellow-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Safe & Secure</p>
              <p className="text-xs text-slate-400">Encrypted Payments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Truck className="w-8 h-8 text-yellow-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Express Delivery</p>
              <p className="text-xs text-slate-400">Fast pan-India shipping</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <HelpCircle className="w-8 h-8 text-yellow-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">24x7 Helpdesk</p>
              <p className="text-xs text-slate-400">{supportPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-slate-700/60 pb-10">
          
          {/* Column 1: ABOUT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#about" className="hover:text-yellow-400 hover:underline transition-colors">Contact Us</a></li>
              <li><a href="#careers" className="hover:text-yellow-400 hover:underline transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-yellow-400 hover:underline transition-colors">Careers</a></li>
              <li><a href="#stories" className="hover:text-yellow-400 hover:underline transition-colors">Flipkart Stories</a></li>
              <li><a href="#press" className="hover:text-yellow-400 hover:underline transition-colors">Press & Corporate</a></li>
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              HELP
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#payments" className="hover:text-yellow-400 hover:underline transition-colors">Payments</a></li>
              <li><a href="#shipping" className="hover:text-yellow-400 hover:underline transition-colors">Shipping</a></li>
              <li><a href="#returns" className="hover:text-yellow-400 hover:underline transition-colors">Cancellation & Returns</a></li>
              <li><a href="#faq" className="hover:text-yellow-400 hover:underline transition-colors">FAQ</a></li>
              <li><a href="#infringement" className="hover:text-yellow-400 hover:underline transition-colors">Report Infringement</a></li>
            </ul>
          </div>

          {/* Column 3: POLICY */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              CONSUMER POLICY
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#terms" className="hover:text-yellow-400 hover:underline transition-colors">Terms Of Use</a></li>
              <li><a href="#security" className="hover:text-yellow-400 hover:underline transition-colors">Security</a></li>
              <li><a href="#privacy" className="hover:text-yellow-400 hover:underline transition-colors">Privacy Policy</a></li>
              <li><a href="#sitemap" className="hover:text-yellow-400 hover:underline transition-colors">Sitemap</a></li>
              <li><a href="#grievance" className="hover:text-yellow-400 hover:underline transition-colors">Grievance Redressal</a></li>
            </ul>
          </div>

          {/* Column 4: SOCIAL (Renders socialLinks prop array) */}
          <div className="col-span-2 md:col-span-2 bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-400 mb-2">
              CONNECT WITH US
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Stay tuned for mega festive sales, lightning deals, and exclusive offers.
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks && socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <a
                    key={link.id}
                    id={`social-link-${link.platform}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-900 hover:text-yellow-400 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    title={`Visit our ${link.name} page`}
                  >
                    {getSocialIcon(link.platform)}
                    <span>{link.name}</span>
                  </a>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No social links provided.</p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-slate-400">
              <p className="font-semibold text-white mb-1">Registered Address:</p>
              <p className="leading-relaxed">
                Buildings Alyssa, Begonia & Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Payment Icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-yellow-400 text-slate-950 font-black flex items-center justify-center text-xs">
              f
            </div>
            <span>© 2026 {companyName}. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Payment Partners:</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-slate-800 text-slate-300 font-bold text-[10px] rounded border border-slate-700">VISA</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 font-bold text-[10px] rounded border border-slate-700">MasterCard</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 font-bold text-[10px] rounded border border-slate-700">UPI</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 font-bold text-[10px] rounded border border-slate-700">RuPay</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-[rgba(201,168,76,0.15)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div>
            <Link to="/" className="font-display text-2xl text-gold tracking-[0.2em] font-semibold">
              SAFFRON
            </Link>
            <p className="mt-3 text-text-secondary font-display italic text-lg">
              Where every meal is a memory.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Menu' },
                { to: '/about', label: 'About' },
                { to: '/book', label: 'Reserve a Table' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-text-secondary hover:text-text-primary transition-colors font-body text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-6">
              Opening Hours
            </h4>
            <div className="space-y-2 text-sm font-body">
              <div className="flex justify-between text-text-secondary">
                <span>Mon – Fri</span>
                <span className="text-text-primary">12 PM – 11 PM</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Saturday</span>
                <span className="text-text-primary">12 PM – 12 AM</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Sunday</span>
                <span className="text-text-primary">11 AM – 11 PM</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-6">
              Contact
            </h4>
            <div className="space-y-3 text-sm font-body text-text-secondary">
              <p>42 Malabar Hill Road,<br />Mumbai 400006, India</p>
              <p>
                <a href="tel:+912240001234" className="hover:text-gold transition-colors">
                  +91 22 4000 1234
                </a>
              </p>
              <p>
                <a href="mailto:hello@saffronmumbai.com" className="hover:text-gold transition-colors">
                  hello@saffronmumbai.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[rgba(201,168,76,0.15)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-sm font-body">
            © {new Date().getFullYear()} Saffron. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Twitter, label: 'Twitter' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-text-tertiary hover:text-gold transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

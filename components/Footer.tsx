import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-morocco-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-morocco-clay rounded flex items-center justify-center">
                    <span className="font-bold text-lg">M</span>
                </div>
                <span className="font-serif font-bold text-xl">Visit Morocco Today</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your ultimate guide to the Kingdom of Morocco. Discover the colors, tastes, and sounds of North Africa.
            </p>
            <div className="flex space-x-4">
               {/* Social Placeholders */}
               {/* {['fb', 'tw', 'in', 'yt'].map(social => (
                   <div key={social} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-morocco-clay transition-colors cursor-pointer">
                       <div className="w-4 h-4 bg-white/50"></div>
                   </div>
               ))} */}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-morocco-sand">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/blog?category=destinations" className="hover:text-white transition">Destinations</Link></li>
              <li><Link to="/blog?category=culture" className="hover:text-white transition">Culture & History</Link></li>
              <li><Link to="/blog?category=food" className="hover:text-white transition">Food & Drink</Link></li>
              <li><Link to="/blog?category=tips" className="hover:text-white transition">Travel Tips</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-morocco-sand">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-morocco-sand">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for the latest travel guides and hidden gems.</p>
            <form className="flex flex-col gap-2">
                <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-morocco-clay"
                />
                <button className="bg-morocco-clay hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors">
                    Subscribe
                </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Visit Morocco Today. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

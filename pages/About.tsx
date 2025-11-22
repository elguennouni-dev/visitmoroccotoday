import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-morocco-sand/20 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-morocco-clay mb-6">About Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We are passionate travelers dedicated to sharing the authentic beauty, rich history, and warm hospitality of Morocco with the world.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-morocco-clay/10 rounded-xl"></div>
                <img 
                    src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1776&auto=format&fit=crop" 
                    alt="Moroccan Tea" 
                    className="relative rounded-xl shadow-xl w-full"
                />
            </div>
            <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                    Visit Morocco Today started as a small journal by two backpackers who fell in love with the Atlas Mountains. Today, it is a comprehensive resource for anyone looking to explore the Kingdom.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                    Our goal is to provide up-to-date, respectful, and inspiring travel guides that help you connect with the local culture, support local artisans, and travel sustainably.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="text-center p-4 border border-gray-100 rounded-lg shadow-sm">
                        <span className="block text-3xl font-bold text-morocco-blue mb-1">50+</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Cities Covered</span>
                    </div>
                    <div className="text-center p-4 border border-gray-100 rounded-lg shadow-sm">
                        <span className="block text-3xl font-bold text-morocco-blue mb-1">10k+</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Happy Travelers</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;

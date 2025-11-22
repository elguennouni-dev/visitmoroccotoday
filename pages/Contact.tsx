import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-morocco-clay py-10 px-8 text-center">
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Get in Touch</h1>
                <p className="text-orange-100">Have a question? We'd love to hear from you.</p>
            </div>
            
            <div className="p-8 md:p-12">
                {submitted ? (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                        <p className="text-gray-600">Thank you for contacting us. We will get back to you shortly.</p>
                        <button onClick={() => setSubmitted(false)} className="mt-6 text-morocco-clay font-bold hover:underline">Send another message</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input required type="text" id="name" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-morocco-clay focus:ring-1 focus:ring-morocco-clay outline-none" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input required type="email" id="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-morocco-clay focus:ring-1 focus:ring-morocco-clay outline-none" />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <select id="subject" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-morocco-clay focus:ring-1 focus:ring-morocco-clay outline-none bg-white">
                                <option>General Inquiry</option>
                                <option>Travel Advice</option>
                                <option>Partnership</option>
                                <option>Report a Bug</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea required id="message" rows={5} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-morocco-clay focus:ring-1 focus:ring-morocco-clay outline-none"></textarea>
                        </div>

                        <div className="flex items-start">
                            <input id="newsletter" type="checkbox" className="h-4 w-4 text-morocco-clay focus:ring-morocco-clay border-gray-300 rounded mt-1" />
                            <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                                Subscribe to our weekly newsletter for travel tips and updates.
                            </label>
                        </div>

                        <button type="submit" className="w-full bg-morocco-blue hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg">
                            Send Message
                        </button>
                    </form>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

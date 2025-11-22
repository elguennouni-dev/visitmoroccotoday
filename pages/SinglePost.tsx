import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostBySlug } from '../services/wpService';
import { WPPost } from '../types';

const SinglePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      try {
        const data = await fetchPostBySlug(slug);
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-morocco-clay"></div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h2>
        <Link to="/blog" className="text-morocco-clay hover:underline">Back to Blog</Link>
    </div>
  );

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/1200/600';
  const author = post._embedded?.author?.[0]?.name || 'Editor';
  const date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Clean title for display
  const cleanTitle = post.title.rendered.replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"');

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Image */}
      <div className="h-[50vh] w-full relative overflow-hidden">
        <img src={featuredImage} alt={cleanTitle} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="max-w-4xl mx-auto px-4 pb-12 w-full text-white">
                 <div className="flex items-center gap-3 mb-4 text-sm font-medium opacity-90">
                     <span className="bg-morocco-clay px-3 py-1 rounded-full text-xs uppercase tracking-wider">Destination</span>
                     <span>{date}</span>
                     <span>by {author}</span>
                 </div>
                 <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight">{cleanTitle}</h1>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            {/* Social Share (Mock) */}
            <div className="flex gap-4 mb-8 border-b border-gray-100 pb-8 justify-end">
                <span className="text-gray-500 text-sm uppercase tracking-wide font-bold self-center mr-auto">Share this post</span>
                {['Facebook', 'Twitter', 'Pinterest'].map(net => (
                    <button key={net} className="text-gray-400 hover:text-morocco-clay text-sm font-bold">{net}</button>
                ))}
            </div>

            {/* WP Content Render */}
            <article 
                className="wp-content text-gray-700 text-lg leading-8"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
            />
            
            {/* Map Placeholder (since WP content might not have one) */}
            <div className="mt-12 bg-morocco-sand/20 p-6 rounded-xl border border-morocco-sand">
                <h3 className="font-serif font-bold text-xl mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-morocco-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location Guide
                </h3>
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Morocco&zoom=6&size=600x300&sensor=false&key=YOUR_API_KEY')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                    {/* Mock Map Overlay */}
                    <div className="z-10 text-center">
                        <p className="text-gray-800 font-bold mb-2">Explore this location on Maps</p>
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.title.rendered)}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-block bg-white text-morocco-blue px-4 py-2 rounded-full shadow-sm hover:shadow-md font-bold text-sm"
                        >
                            Open Google Maps
                        </a>
                    </div>
                </div>
            </div>

            {/* Comments Section Mock */}
            <div className="mt-16 pt-10 border-t border-gray-100">
                <h3 className="text-2xl font-serif font-bold mb-8">Comments</h3>
                
                <div className="space-y-8 mb-10">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                        <div>
                            <h4 className="font-bold text-gray-900">Ahmed B.</h4>
                            <p className="text-xs text-gray-500 mb-2">October 12, 2023</p>
                            <p className="text-gray-700 text-sm">This is a wonderful guide! I visited last year and the colors are exactly as you described.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                        <div>
                            <h4 className="font-bold text-gray-900">Sarah J.</h4>
                            <p className="text-xs text-gray-500 mb-2">November 05, 2023</p>
                            <p className="text-gray-700 text-sm">Thanks for the tips on where to eat. Can't wait to try the Tagine!</p>
                        </div>
                    </div>
                </div>

                <form className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-4">Leave a Reply</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input type="text" placeholder="Name" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-morocco-clay" />
                        <input type="email" placeholder="Email" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-morocco-clay" />
                    </div>
                    <textarea rows={4} placeholder="Your comment..." className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-morocco-clay mb-4"></textarea>
                    <button type="submit" className="bg-morocco-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition">Post Comment</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

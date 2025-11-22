import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { fetchPosts, getMockPosts } from '../services/wpService';
import { WPPost } from '../types';

const Home: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchPosts(1, 6);
        if (posts && posts.length > 0) {
          setLatestPosts(posts);
        } else {
          // Fallback to mock data if API fails (e.g., CORS)
          console.log("Using mock data for Home");
          setLatestPosts(getMockPosts());
        }
      } catch (err) {
        setLatestPosts(getMockPosts());
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop" 
                alt="Sahara Desert" 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4 animate-fade-in-up">
            <span className="text-morocco-sand tracking-[0.2em] uppercase text-sm font-bold mb-4 block">Welcome to North Africa</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Discover the Magic <br/> of <span className="text-morocco-clay">Morocco</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
                From the blue streets of Chefchaouen to the golden dunes of Merzouga. 
                Experience a journey like no other.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/blog" className="bg-morocco-clay text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition transform hover:scale-105 shadow-lg">
                    Start Exploring
                </Link>
                <Link to="/about" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-morocco-dark transition">
                    Learn More
                </Link>
            </div>
        </div>
      </div>

      {/* Featured Categories Strip */}
      <div className="bg-white py-16 -mt-20 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-t-3xl shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Marrakech', 'Sahara Desert', 'Atlas Mountains', 'Chefchaouen'].map((place, i) => (
                <div key={i} className="p-6 rounded-xl bg-morocco-sand/30 hover:bg-morocco-sand/60 transition cursor-pointer group">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center text-morocco-blue group-hover:text-morocco-clay group-hover:scale-110 transition-all">
                         {/* Simple Icon Placeholder */}
                         <span className="font-serif font-bold text-xl">{place.charAt(0)}</span>
                    </div>
                    <h3 className="font-bold text-gray-800">{place}</h3>
                </div>
            ))}
        </div>
      </div>

      {/* Latest Posts */}
      <section className="py-20 bg-morocco-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Latest Journal Entries</h2>
                <div className="w-24 h-1 bg-morocco-clay mx-auto rounded-full"></div>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Explore our newest stories, travel tips, and cultural insights straight from the heart of the Maghreb.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1,2,3].map(i => (
                        <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
            
            <div className="mt-12 text-center">
                <Link to="/blog" className="inline-flex items-center gap-2 text-morocco-blue font-bold hover:text-morocco-clay transition">
                    View All Posts
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

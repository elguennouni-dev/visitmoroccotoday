import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { fetchPosts, fetchCategories, getMockPosts } from '../services/wpService';
import { WPPost, WPCategory } from '../types';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        // 1. Fetch Categories
        const cats = await fetchCategories();
        setCategories(cats);

        // 2. Resolve Category ID if query param exists (WP API needs ID, not slug usually, but let's assume we filter on client or simple search)
        let catId = undefined;
        if (categoryQuery && cats.length) {
            const found = cats.find(c => c.slug === categoryQuery);
            if (found) catId = found.id;
        }

        // 3. Fetch Posts
        const data = await fetchPosts(1, 12, searchQuery, catId);
        if (data.length > 0) {
          setPosts(data);
        } else {
          // If API empty or fail, show mock if searching wasn't specific
          if (!searchQuery && !categoryQuery) setPosts(getMockPosts());
          else setPosts([]); 
        }
      } catch (error) {
        setPosts(getMockPosts());
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [searchQuery, categoryQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const term = formData.get('q') as string;
      setSearchParams({ search: term });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="mb-12 text-center">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">Travel Journal</h1>
            
            <div className="max-w-xl mx-auto mb-8">
                <form onSubmit={handleSearch} className="relative">
                    <input 
                        name="q"
                        defaultValue={searchQuery}
                        type="text" 
                        placeholder="Search Morocco..." 
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:border-morocco-clay focus:ring-2 focus:ring-orange-100 outline-none transition shadow-sm"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </form>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3">
                <button 
                    onClick={() => setSearchParams({})}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${!categoryQuery ? 'bg-morocco-clay text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat.id}
                        onClick={() => setSearchParams({ category: cat.slug })}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${categoryQuery === cat.slug ? 'bg-morocco-clay text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>

        {/* Content */}
        {loading ? (
             <div className="flex justify-center py-20">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-morocco-clay"></div>
             </div>
        ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <h3 className="text-xl text-gray-600">No posts found matching your criteria.</h3>
                <button onClick={() => setSearchParams({})} className="mt-4 text-morocco-blue hover:underline">Clear filters</button>
            </div>
        )}

      </div>
    </div>
  );
};

export default Blog;

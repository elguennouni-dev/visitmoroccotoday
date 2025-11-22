import React from 'react';
import { Link } from 'react-router-dom';
import { WPPost } from '../types';

interface PostCardProps {
  post: WPPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/800/600';
  const authorName = post._embedded?.author?.[0]?.name || 'Morocco Guide';
  
  // Strip HTML tags and decode HTML entities
  const cleanExcerpt = post.excerpt.rendered
    .replace(/<[^>]+>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .trim()
    .slice(0, 120) + '...';

  const cleanTitle = post.title.rendered
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&[^;]+;/g, ' ');

  // Format date nicely
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Get category from embedded data or default
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Travel';

  return (
    <article className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out border border-gray-100 overflow-hidden hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img 
          src={featuredImage} 
          alt={post.title.rendered} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-morocco-clay uppercase tracking-wide shadow-lg">
            {category}
          </span>
        </div>
        
        {/* Read Time Estimate */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs text-white font-medium">
          {Math.ceil(post.content.rendered.split(' ').length / 200)} min read
        </div>
      </div>
      
      {/* Content Container */}
      <div className="flex flex-col flex-grow p-7">
        {/* Meta Information */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <span className="font-medium text-morocco-clay">{authorName}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <time className="text-gray-500" dateTime={post.date}>
            {formattedDate}
          </time>
        </div>
        
        {/* Title */}
        <Link to={`/post/${post.slug}`} className="block group/title">
          <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover/title:text-morocco-clay transition-colors duration-300 mb-4 leading-tight line-clamp-2">
            {cleanTitle}
          </h3>
        </Link>
        
        {/* Excerpt */}
        <p className="text-gray-600 leading-relaxed flex-grow mb-6 line-clamp-3">
          {cleanExcerpt}
        </p>
        
        {/* Footer with CTA */}
        <div className="pt-5 border-t border-gray-100/80">
          <Link 
            to={`/post/${post.slug}`} 
            className="inline-flex items-center gap-2 text-morocco-clay font-semibold text-sm hover:text-orange-700 transition-all duration-300 group/cta"
          >
            <span className="relative">
              Read Full Story
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-morocco-clay group-hover/cta:w-full transition-all duration-300"></span>
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transform group-hover/cta:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
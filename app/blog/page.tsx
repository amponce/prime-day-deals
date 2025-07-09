'use client';

import Link from 'next/link';

interface BlogPostPreview {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  publishDate: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPostPreview[] = [
  {
    slug: 'small-space-tv-solutions',
    title: 'Best TV Setups for Small Spaces',
    subtitle: 'Maximize your living area with these space-saving TV solutions and mounting ideas',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000',
    publishDate: 'July 9, 2025',
    readTime: '5 min',
    category: 'Space Optimization'
  },
  {
    slug: 'hide-tv-cables',
    title: 'How to Hide TV Cables Like a Pro',
    subtitle: 'Professional cable management tips that will transform your TV setup',
    heroImage: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2000',
    publishDate: 'July 9, 2025',
    readTime: '7 min',
    category: 'Cable Management'
  },
  {
    slug: 'tv-room-lighting-guide',
    title: 'Perfect TV Room Lighting Setup',
    subtitle: 'Create the ultimate viewing experience with proper ambient and bias lighting',
    heroImage: 'https://images.unsplash.com/photo-1565195992957-6188c9f58ba2?q=80&w=2000',
    publishDate: 'July 9, 2025',
    readTime: '6 min',
    category: 'Lighting Guide'
  }
];

export default function BlogPage() {
  return (
    <main className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            TV Setup Guides & Tips
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Expert advice to help you create the perfect home entertainment setup
          </p>
        </div>

        {/* Featured Post */}
        <Link href={`/blog/${blogPosts[0].slug}`} className="block mb-12">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={blogPosts[0].heroImage}
              alt={blogPosts[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            <div className="absolute top-6 left-6">
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                Featured Guide
              </span>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="text-white mb-2 text-sm">
                {blogPosts[0].category} • {blogPosts[0].readTime} read
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {blogPosts[0].title}
              </h2>
              <p className="text-lg text-white/90 max-w-3xl">
                {blogPosts[0].subtitle}
              </p>
            </div>
          </div>
        </Link>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group cursor-pointer">
                <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-black/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {post.publishDate} • {post.readTime} read
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {post.subtitle}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Pinterest-style CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-card p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Save These Guides for Later
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Follow us on Pinterest for more home entertainment tips and exclusive Prime Day deals
            </p>
            <button
              onClick={() => window.open('https://pinterest.com', '_blank')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-.998 2.352-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
              Follow on Pinterest
            </button>
          </div>
        </div>
    </main>
  );
}
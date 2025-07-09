import Link from 'next/link';

const blogPosts = [
  {
    slug: 'small-space-tv-solutions',
    title: 'Best TV Setups for Small Spaces',
    description: 'Maximize your living area with smart mounting solutions',
    icon: '📐',
    color: 'from-blue-500 to-blue-600'
  },
  {
    slug: 'hide-tv-cables',
    title: 'Hide TV Cables Like a Pro',
    description: 'Professional cable management tips and tricks',
    icon: '🔌',
    color: 'from-green-500 to-green-600'
  },
  {
    slug: 'tv-room-lighting-guide',
    title: 'Perfect TV Room Lighting',
    description: 'Create the ultimate viewing experience',
    icon: '💡',
    color: 'from-amber-500 to-amber-600'
  }
];

export default function BlogPreview() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            TV Setup Guides
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Expert tips to help you create the perfect home entertainment setup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6 h-full cursor-pointer group">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${post.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{post.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>
                <p className="text-primary dark:text-primary font-medium mt-4 flex items-center gap-1">
                  Read guide 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary dark:text-primary hover:underline font-medium">
            View all guides
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Handl PDF',
    description: 'Insights better PDF management, security, and productivity.',
};

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-2 tracking-tight">Handl Blog</h1>
            <p className="text-xl text-slate-600 mb-12">Tips, guides, and insights for better PDF management.</p>

            <div className="grid gap-8">
                {BLOG_POSTS.map((post) => (
                    <article key={post.slug} className="group border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-white">
                        <Link href={`/blog/${post.slug}`} className="block">
                            <div className="flex flex-col gap-3">
                                <span className="text-sm font-medium text-blue-600">{post.date}</span>
                                <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <span className="text-sm font-medium text-slate-900 mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Read Article &rarr;
                                </span>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}

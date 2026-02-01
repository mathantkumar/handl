import { BLOG_POSTS } from '@/lib/blog-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Handl Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <Link href="/blog" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
            </Link>

            <article>
                <header className="mb-10">
                    <time className="text-sm font-medium text-blue-600 mb-2 block">{post.date}</time>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                        {post.title}
                    </h1>
                </header>

                <div
                    className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            <hr className="my-12 border-slate-200" />

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Try Handl for Free</h3>
                <p className="text-slate-600 mb-6">Secure, local PDF tools right in your browser.</p>
                <Link href="/" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Explore All Tools
                </Link>
            </div>
        </div>
    );
}

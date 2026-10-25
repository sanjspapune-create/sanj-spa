import React, { useState } from 'react';
import { AppTab, Article } from '../types';
import { ARTICLES_DATA } from '../data/spaData';
import { ArrowRight, Sparkles, Flower2, CheckCircle2, BookOpen, Clock, Tag } from 'lucide-react';

interface BlogScreenProps {
  onSelectTab: (tab: AppTab) => void;
  onOpenArticle: (article: Article) => void;
  onBookService: (serviceId: string) => void;
}

export const BlogScreen: React.FC<BlogScreenProps> = ({
  onSelectTab,
  onOpenArticle,
  onBookService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = ['All', 'Therapy', 'Self-Care', 'Lifestyle'];

  const filteredArticles =
    selectedCategory === 'All'
      ? ARTICLES_DATA
      : ARTICLES_DATA.filter((a) => a.category === selectedCategory);

  const featuredArticle = ARTICLES_DATA[0]; // Benefits of Deep Tissue
  const article2 = ARTICLES_DATA[1]; // 5 Tips for Post-Massage Care
  const article3 = ARTICLES_DATA[2]; // Finding Peace in Baner

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
      {/* Header Section */}
      <section className="mb-10 text-center md:text-left md:flex justify-between items-end border-b border-[#dde3eb]/70 pb-8">
        <div className="max-w-2xl">
          <span className="font-sans text-xs font-semibold text-[#735c00] tracking-[0.2em] uppercase block mb-2">
            WELLNESS JOURNAL & MASSAGE GUIDES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#334537] mb-3">
            Wellness Insights & Spa Guides
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#434843] leading-relaxed">
            Discover deep relaxation techniques, posture care, and holistic wellness guides from certified massage therapists in Baner, Pune.
          </p>
        </div>
        <div className="hidden md:flex flex-col items-center text-[#735c00] opacity-80 pb-2">
          <Flower2 className="w-10 h-10 text-[#334537]/70" />
          <span className="font-serif text-xs italic text-[#737872] mt-1">Sanj Sanctuary</span>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-bold text-[#737872] uppercase tracking-wider mr-2 hidden sm:inline">
          Filter Topics:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-[#334537] text-white shadow-xs'
                : 'bg-white text-[#434843] hover:bg-[#eff4fc] border border-[#dde3eb]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mb-16">
        {/* Featured Article (Span 8 cols on desktop) */}
        <a
          id="featured-article-card"
          href={`/blog/${featuredArticle.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onOpenArticle(featuredArticle);
          }}
          className="md:col-span-8 group cursor-pointer h-full transition-transform duration-300 hover:scale-[1.01] block"
        >
          <div className="relative rounded-2xl overflow-hidden h-[380px] sm:h-[420px] mb-4 ambient-shadow bg-[#eff4fc] border border-[#dde3eb]">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.altText}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b261d]/95 via-[#1b261d]/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-white">
              <div className="flex gap-2 mb-3">
                <span className="bg-[#4a5d4e]/90 backdrop-blur-md text-white font-sans text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {featuredArticle.category}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white font-sans text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {featuredArticle.readTime}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-2.5 font-bold group-hover:text-[#ffe088] transition-colors leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#dde3eb] line-clamp-2 max-w-2xl mb-4 leading-relaxed">
                {featuredArticle.snippet}
              </p>
              <span className="text-[#ffe088] font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </a>

        {/* Article 2 (Span 4 cols) */}
        <a
          id="article-card-post-care"
          href={`/blog/${article2.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onOpenArticle(article2);
          }}
          className="md:col-span-4 group cursor-pointer h-full flex flex-col transition-transform duration-300 hover:scale-[1.01] block"
        >
          <div className="relative rounded-2xl overflow-hidden h-[220px] mb-3 ambient-shadow bg-[#eff4fc] border border-[#dde3eb]">
            <img
              src={article2.image}
              alt={article2.altText}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex-grow flex flex-col bg-white p-5 sm:p-6 rounded-2xl ambient-shadow border border-[#dde3eb]">
            <div className="flex gap-2 mb-2.5">
              <span className="bg-[#eff4fc] text-[#334537] font-sans text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider">
                {article2.category}
              </span>
              <span className="text-xs text-[#737872] font-sans flex items-center">
                {article2.readTime}
              </span>
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#334537] mb-2 group-hover:text-[#735c00] transition-colors leading-snug">
              {article2.title}
            </h2>
            <p className="font-sans text-xs text-[#434843] line-clamp-3 mb-4 flex-grow leading-relaxed">
              {article2.snippet}
            </p>
            <span className="text-[#735c00] font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </a>

        {/* Article 3 (Span 6 cols) */}
        <a
          id="article-card-baner"
          href={`/blog/${article3.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onOpenArticle(article3);
          }}
          className="md:col-span-6 group cursor-pointer flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden ambient-shadow min-h-[240px] transition-transform duration-300 hover:scale-[1.01] border border-[#dde3eb] block"
        >
          <div className="w-full sm:w-2/5 h-44 sm:h-auto relative overflow-hidden bg-[#eff4fc]">
            <img
              src={article3.image}
              alt={article3.altText}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="w-full sm:w-3/5 p-5 sm:p-6 flex flex-col justify-center">
            <div className="flex gap-2 mb-2">
              <span className="bg-[#eff4fc] text-[#334537] font-sans text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider">
                {article3.category}
              </span>
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#334537] mb-2 group-hover:text-[#735c00] transition-colors leading-snug">
              {article3.title}
            </h2>
            <p className="font-sans text-xs text-[#434843] line-clamp-2 mb-4 leading-relaxed">
              {article3.snippet}
            </p>
            <span className="text-[#735c00] font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </a>

        {/* Newsletter Signup (Span 6 cols) */}
        <div className="md:col-span-6 bg-[#334537] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden min-h-[240px] shadow-md">
          <span className="font-sans text-[11px] font-semibold text-[#fed65b] uppercase tracking-[0.2em] block mb-1 relative z-10">
            SANCTUARY NEWSLETTER
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2 relative z-10">
            Cultivate Calm in Your Inbox
          </h3>
          <p className="font-sans text-xs text-[#d3e8d5] mb-5 relative z-10 leading-relaxed">
            Receive monthly massage wellness guides and exclusive seasonal retreat offers in Baner.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-xl flex items-center gap-3 relative z-10">
              <CheckCircle2 className="w-5 h-5 text-[#fed65b] shrink-0" />
              <span className="font-sans text-xs font-medium text-white">
                Thank you! You have been subscribed to our wellness journal.
              </span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 relative z-10 w-full">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow bg-white border-0 rounded-xl px-4 py-2.5 text-[#161c22] placeholder:text-[#737872] focus:ring-2 focus:ring-[#fed65b] outline-none font-sans text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="bg-[#fed65b] hover:bg-[#ffe088] text-[#745c00] px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-xs shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};


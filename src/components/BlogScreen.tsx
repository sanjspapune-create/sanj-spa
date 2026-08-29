import React, { useState } from 'react';
import { AppTab, Article } from '../types';
import { ARTICLES_DATA } from '../data/spaData';
import { ArticleModal } from './ArticleModal';
import { ArrowRight, Sparkles, Flower2, CheckCircle2 } from 'lucide-react';

interface BlogScreenProps {
  onSelectTab: (tab: AppTab) => void;
  onBookService: (serviceId: string) => void;
}

export const BlogScreen: React.FC<BlogScreenProps> = ({
  onSelectTab,
  onBookService,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 py-10">
      {/* Header Section */}
      <section className="mb-14 text-center md:text-left md:flex justify-between items-end border-b border-[#dde3eb]/70 pb-10">
        <div className="max-w-2xl">
          <span className="font-sans text-xs font-semibold text-[#735c00] tracking-[0.2em] uppercase block mb-3">
            JOURNAL OF RETREAT & RESTORATION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#334537] mb-4">
            Wellness Insights
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#434843] leading-relaxed">
            Discover tranquility and holistic health through our curated articles. Practical advice and philosophical musings for your journey to peace.
          </p>
        </div>
        <div className="hidden md:flex flex-col items-center text-[#735c00] opacity-80 pb-2">
          <Flower2 className="w-12 h-12 text-[#334537]/70" />
          <span className="font-serif text-xs italic text-[#737872] mt-1">Sanj Sanctuary</span>
        </div>
      </section>

      {/* Bento Grid Layout (Screen 4) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
        {/* Featured Article (Span 8 cols on desktop) */}
        <article
          id="featured-article-card"
          onClick={() => setSelectedArticle(featuredArticle)}
          className="md:col-span-8 group cursor-pointer h-full transition-transform duration-300 hover:scale-[1.01]"
        >
          <div className="relative rounded-2xl overflow-hidden h-[400px] mb-6 ambient-shadow bg-[#eff4fc] border border-[#dde3eb]">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.altText}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#334537]/90 via-[#334537]/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full text-white">
              <div className="flex gap-2 mb-3">
                <span className="bg-[#4a5d4e]/90 backdrop-blur-md text-white font-sans text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {featuredArticle.category}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white font-sans text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {featuredArticle.readTime}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-3 font-bold group-hover:text-[#ffe088] transition-colors leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="font-sans text-sm md:text-base text-[#dde3eb] line-clamp-2 max-w-2xl mb-4 leading-relaxed">
                {featuredArticle.snippet}
              </p>
              <span className="text-[#ffe088] font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </article>

        {/* Article 2 (Span 4 cols) */}
        <article
          id="article-card-post-care"
          onClick={() => setSelectedArticle(article2)}
          className="md:col-span-4 group cursor-pointer h-full flex flex-col transition-transform duration-300 hover:scale-[1.01]"
        >
          <div className="relative rounded-2xl overflow-hidden h-[240px] mb-4 ambient-shadow bg-[#eff4fc] border border-[#dde3eb]">
            <img
              src={article2.image}
              alt={article2.altText}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex-grow flex flex-col bg-white p-6 rounded-2xl ambient-shadow border border-[#dde3eb]">
            <div className="flex gap-2 mb-3">
              <span className="bg-[#eff4fc] text-[#334537] font-sans text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {article2.category}
              </span>
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#334537] mb-3 group-hover:text-[#735c00] transition-colors leading-snug">
              {article2.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#434843] line-clamp-3 mb-5 flex-grow leading-relaxed">
              {article2.snippet}
            </p>
            <span className="text-[#735c00] font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
              <span>Read More</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </article>

        {/* Article 3 (Span 6 cols) */}
        <article
          id="article-card-baner"
          onClick={() => setSelectedArticle(article3)}
          className="md:col-span-6 group cursor-pointer flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden ambient-shadow min-h-[250px] transition-transform duration-300 hover:scale-[1.01] border border-[#dde3eb]"
        >
          <div className="w-full sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-[#eff4fc]">
            <img
              src={article3.image}
              alt={article3.altText}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="w-full sm:w-3/5 p-6 md:p-8 flex flex-col justify-center">
            <div className="flex gap-2 mb-3">
              <span className="bg-[#eff4fc] text-[#334537] font-sans text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {article3.category}
              </span>
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#334537] mb-3 group-hover:text-[#735c00] transition-colors leading-snug">
              {article3.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#434843] line-clamp-2 mb-4 leading-relaxed">
              {article3.snippet}
            </p>
            <span className="text-[#735c00] font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
              <span>Read More</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </article>

        {/* Newsletter Signup (Span 6 cols) */}
        <div className="md:col-span-6 bg-[#4a5d4e] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden min-h-[250px] shadow-lg">
          {/* Abstract background blur */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#334537] rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <span className="font-sans text-[11px] font-semibold text-[#fed65b] uppercase tracking-[0.2em] block mb-2 relative z-10">
            SANCTUARY NEWSLETTER
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2 relative z-10">
            Cultivate Calm in Your Inbox
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#c0d5c2] mb-6 relative z-10 leading-relaxed">
            Join our newsletter for weekly wellness insights and exclusive retreat offers in Baner.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-3 relative z-10">
              <CheckCircle2 className="w-5 h-5 text-[#fed65b]" />
              <span className="font-sans text-xs sm:text-sm font-medium text-white">
                Thank you. You have been added to our quiet journal dispatch list.
              </span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 relative z-10 w-full max-w-md">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow bg-white border-0 rounded-xl px-4 py-3 text-[#161c22] placeholder:text-[#737872] focus:ring-2 focus:ring-[#fed65b] outline-none font-sans text-sm"
              />
              <button
                type="submit"
                className="bg-[#735c00] hover:bg-[#fed65b] text-white hover:text-[#745c00] px-6 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onBookRelatedService={(serviceId) => {
          onBookService(serviceId);
        }}
      />
    </div>
  );
};

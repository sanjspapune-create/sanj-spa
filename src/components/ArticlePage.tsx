import React, { useState } from 'react';
import { Article, AppTab } from '../types';
import { ARTICLES_DATA, SERVICES_DATA, SPA_INFO } from '../data/spaData';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  Sparkles,
  ArrowRight,
  BookOpen,
  Tag,
  Compass,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface ArticlePageProps {
  article: Article;
  onSelectTab: (tab: AppTab) => void;
  onOpenArticle: (article: Article) => void;
  onBookService: (serviceId: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  onSelectTab,
  onOpenArticle,
  onBookService,
}) => {
  const [copied, setCopied] = useState(false);

  // Find related service if any
  const relatedService = article.relatedServiceId
    ? SERVICES_DATA.find((s) => s.id === article.relatedServiceId)
    : null;

  // Other articles for recommendations (excluding current)
  const otherArticles = ARTICLES_DATA.filter((a) => a.id !== article.id);

  const articleUrl = typeof window !== 'undefined' ? window.location.href : `https://sanjspamassage.com/blog/${article.slug}`;

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Read "${article.title}" on Sanj Spa Baner Blog:\n${articleUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(articleUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // fallback
    }
  };

  return (
    <article id={`article-page-${article.slug}`} className="w-full max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-sans text-[#737872] flex-wrap">
        <button
          onClick={() => onSelectTab('home')}
          className="hover:text-[#334537] hover:underline font-medium transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#a8ada6]" />
        <button
          onClick={() => onSelectTab('blog')}
          className="hover:text-[#334537] hover:underline font-medium transition-colors"
        >
          Wellness Blog
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#a8ada6]" />
        <span className="text-[#334537] font-semibold truncate max-w-[280px] sm:max-w-md">
          {article.title}
        </span>
      </nav>

      {/* Back to Blog Button */}
      <div className="mb-8">
        <button
          onClick={() => onSelectTab('blog')}
          className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#735c00] hover:text-[#334537] hover:-translate-x-1 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>
      </div>

      {/* Header Section */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="bg-[#eff4fc] text-[#334537] font-sans text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-[#dde3eb]">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#5d645e] font-sans">
            <Clock className="w-3.5 h-3.5 text-[#735c00]" />
            <span>{article.readTime}</span>
          </span>
          <span className="text-[#a8ada6]">•</span>
          <span className="flex items-center gap-1.5 text-xs text-[#5d645e] font-sans">
            <Calendar className="w-3.5 h-3.5 text-[#735c00]" />
            <span>{article.publishedDate}</span>
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#161c22] mb-6 leading-tight">
          {article.title}
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#434843] leading-relaxed max-w-3xl mb-6 font-medium">
          {article.snippet}
        </p>

        {/* Author Info Bar & Share Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-y border-[#dde3eb]/80">
          <div className="flex items-center gap-3">
            {article.author.avatar ? (
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border border-[#dde3eb]"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-[#d3e8d5] text-[#334537] font-serif font-bold text-base flex items-center justify-center">
                {article.author.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-sans text-sm font-bold text-[#161c22]">
                {article.author.name}
              </div>
              <div className="font-sans text-xs text-[#737872]">
                {article.author.role} • Sanj Spa Baner
              </div>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-sans font-medium text-[#737872] mr-1 hidden sm:inline">
              Share:
            </span>
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 bg-[#eaf8f0] hover:bg-[#25D366] text-[#1e954c] hover:text-white px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-colors duration-200 border border-[#a3e4be]"
              title="Share on WhatsApp"
            >
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 bg-white hover:bg-[#eff4fc] text-[#434843] px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-colors duration-200 border border-[#dde3eb]"
              title="Copy Article Link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-700 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#735c00]" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative rounded-3xl overflow-hidden mb-10 h-72 sm:h-96 md:h-[460px] ambient-shadow border border-[#dde3eb] bg-[#eff4fc]">
        <img
          src={article.image}
          alt={article.altText}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Key Takeaways Callout Box */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <div className="mb-10 bg-[#eff4fc]/80 rounded-2xl p-6 sm:p-8 border border-[#c1d9f8] ambient-shadow">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#735c00]" />
            <h2 className="font-sans text-xs font-bold text-[#735c00] tracking-[0.18em] uppercase">
              KEY TAKEAWAYS & SPA INSIGHTS
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-[#334537]">
                <CheckCircle2 className="w-4 h-4 text-[#735c00] shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Content & Headings */}
      <div className="prose prose-lg max-w-none text-[#334537] font-sans leading-relaxed space-y-6 mb-12">
        {article.content.map((paragraph, index) => (
          <p key={index} className="text-base sm:text-lg text-[#334537] leading-relaxed">
            {paragraph}
          </p>
        ))}

        {article.headings?.map((section, idx) => (
          <div key={idx} className="mt-8 pt-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#161c22] mb-4">
              {section.title}
            </h2>
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-base sm:text-lg text-[#434843] leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Article Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#dde3eb] mb-12">
        <span className="flex items-center gap-1.5 text-xs font-bold text-[#735c00] uppercase tracking-wider mr-2">
          <Tag className="w-3.5 h-3.5" />
          <span>Tags:</span>
        </span>
        {article.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-white text-[#434843] text-xs font-medium px-3 py-1 rounded-full border border-[#dde3eb]"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Recommended Related Service Callout Box */}
      {relatedService && (
        <div className="mb-14 bg-gradient-to-br from-[#334537] to-[#1f2b22] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#fed65b]/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-xl">
              <span className="font-sans text-xs font-bold text-[#fed65b] tracking-[0.2em] uppercase block mb-2">
                RECOMMENDED RETREAT IN BANER
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
                {relatedService.title}
              </h3>
              <p className="font-sans text-sm text-[#d3e8d5] leading-relaxed mb-3">
                {relatedService.description}
              </p>
              <div className="flex items-center gap-4 text-xs font-sans text-[#fed65b]">
                <span>{relatedService.duration}</span>
                <span>•</span>
                <span className="font-bold text-sm text-white">{relatedService.price}</span>
              </div>
            </div>

            <button
              onClick={() => onBookService(relatedService.id)}
              className="bg-[#fed65b] hover:bg-[#ffe088] text-[#745c00] px-6 py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 shrink-0 flex items-center gap-2"
            >
              <span>Book This Therapy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Author Bio Box */}
      <div className="mb-16 bg-white rounded-2xl p-6 sm:p-8 border border-[#dde3eb] ambient-shadow flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {article.author.avatar ? (
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#735c00]/30 shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#d3e8d5] text-[#334537] font-serif font-bold text-2xl flex items-center justify-center shrink-0">
            {article.author.name.charAt(0)}
          </div>
        )}
        <div>
          <span className="text-xs font-sans font-bold text-[#735c00] tracking-widest uppercase block mb-1">
            WRITTEN BY WELLNESS EXPERT
          </span>
          <h3 className="font-serif text-xl font-bold text-[#161c22] mb-1">
            {article.author.name}
          </h3>
          <p className="font-sans text-xs font-medium text-[#737872] mb-2">
            {article.author.role} at Sanj Spa Baner
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#434843] leading-relaxed">
            Dedicated to bringing authentic therapeutic modalities, myofascial release practices, and holistic stillness to Pune’s community.
          </p>
        </div>
      </div>

      {/* More Articles Section */}
      {otherArticles.length > 0 && (
        <section className="pt-10 border-t border-[#dde3eb]">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="font-sans text-xs font-bold text-[#735c00] tracking-[0.2em] uppercase block mb-1">
                CONTINUE READING
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#334537]">
                Related Wellness Articles
              </h2>
            </div>
            <button
              onClick={() => onSelectTab('blog')}
              className="text-xs font-sans font-bold text-[#735c00] hover:text-[#334537] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherArticles.slice(0, 2).map((other) => (
              <div
                key={other.id}
                onClick={() => onOpenArticle(other)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#dde3eb] ambient-shadow transition-all duration-300 hover:scale-[1.01] hover:shadow-lg flex flex-col"
              >
                <div className="h-44 overflow-hidden relative bg-[#eff4fc]">
                  <img
                    src={other.image}
                    alt={other.altText}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#334537]/80 backdrop-blur-md text-white text-[11px] font-sans font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {other.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-[11px] text-[#737872] font-sans mb-1 flex items-center gap-2">
                    <span>{other.publishedDate}</span>
                    <span>•</span>
                    <span>{other.readTime}</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#161c22] mb-2 group-hover:text-[#735c00] transition-colors leading-snug">
                    {other.title}
                  </h4>
                  <p className="text-xs text-[#434843] line-clamp-2 leading-relaxed mb-4 flex-grow">
                    {other.snippet}
                  </p>
                  <span className="text-xs font-sans font-bold text-[#735c00] flex items-center gap-1 mt-auto">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

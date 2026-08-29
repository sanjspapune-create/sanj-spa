import React from 'react';
import { Article } from '../types';
import { X, Clock, Calendar, ArrowRight, Share2, Sparkles } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onBookRelatedService?: (serviceId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onBookRelatedService,
}) => {
  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.snippet,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#dde3eb] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-[#161c22] hover:bg-white flex items-center justify-center shadow-md transition-colors"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#eff4fc]">
          <img
            src={article.image}
            alt={article.altText}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#4a5d4e]/90 text-white font-sans text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {article.category}
              </span>
              <span className="bg-white/20 backdrop-blur-md font-sans text-[11px] px-3 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 md:p-10 font-sans">
          {/* Metadata & Author */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#dde3eb] text-xs text-[#737872]">
            <div>
              <span className="font-semibold text-[#161c22] block">{article.author.name}</span>
              <span>{article.author.role} • {article.publishedDate}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#dde3eb] hover:bg-[#eff4fc] text-[#434843] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Insights</span>
            </button>
          </div>

          {/* Paragraphs */}
          <div className="space-y-5 text-[#434843] text-base sm:text-lg leading-relaxed font-normal">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-8 mt-8 border-t border-[#dde3eb]">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#eff4fc] text-[#334537] text-xs px-3 py-1.5 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Booking Prompt */}
          {article.relatedServiceId && onBookRelatedService && (
            <div className="mt-8 bg-[#d3e8d5]/40 border border-[#b7ccb9] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-sans text-xs font-semibold text-[#735c00] uppercase tracking-wider block mb-1">
                  EXPERIENCE THIS THERAPY
                </span>
                <h4 className="font-serif text-lg font-bold text-[#334537]">
                  Ready to feel the restorative benefits firsthand?
                </h4>
              </div>
              <button
                onClick={() => {
                  const sId = article.relatedServiceId!;
                  onClose();
                  onBookRelatedService(sId);
                }}
                className="bg-[#334537] hover:bg-[#263529] text-white font-sans text-xs font-semibold px-6 py-3 rounded-full flex items-center gap-2 uppercase tracking-wider shrink-0 transition-transform active:scale-95 shadow-sm"
              >
                <span>Book This Therapy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export type AppTab = 'home' | 'services' | 'booking' | 'blog' | 'article' | 'contact';

export interface Service {
  id: string;
  title: string;
  category: 'massage' | 'facial' | 'ritual' | 'wellness';
  duration: string;
  durationMinutes: number;
  price: string;
  priceNum: number;
  image: string;
  altText: string;
  description: string;
  benefits: string[];
  recommendedFor: string;
  includes: string[];
}

export interface ArticleHeading {
  title: string;
  paragraphs: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  category: 'Therapy' | 'Self-Care' | 'Lifestyle' | 'Mindfulness';
  readTime: string;
  readMinutes: number;
  image: string;
  altText: string;
  snippet: string;
  content: string[];
  headings?: ArticleHeading[];
  keyTakeaways?: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedDate: string;
  publishedIsoDate: string;
  tags: string[];
  relatedServiceId?: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceName: string;
  servicePrice: string;
  serviceDuration: string;
  date: string;
  time: string;
  guests: number;
  addOns: string[];
  specialRequests?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

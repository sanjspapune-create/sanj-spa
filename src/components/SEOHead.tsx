import React, { useEffect } from 'react';
import { AppTab, Article } from '../types';
import { SPA_INFO, SERVICES_DATA } from '../data/spaData';

interface SEOHeadProps {
  currentTab: AppTab;
  currentArticle?: Article | null;
  selectedServiceId?: string | null;
}

interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  pageType: 'WebSite' | 'CollectionPage' | 'ContactPage' | 'ItemPage' | 'Article';
  image?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  currentTab,
  currentArticle,
  selectedServiceId,
}) => {
  // Base canonical URL from window location or default domain
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sanjspamassage.com';

  const getSEOConfig = (): PageSEOConfig => {
    if (currentTab === 'article' && currentArticle) {
      return {
        title: currentArticle.metaTitle || `${currentArticle.title} | Sanj Spa Baner Blog`,
        description: currentArticle.metaDescription || currentArticle.snippet,
        keywords: currentArticle.keywords || 'Spa in Baner, Massage in Baner, Wellness Pune',
        canonicalPath: `/blog/${currentArticle.slug}`,
        pageType: 'Article',
        image: currentArticle.image,
      };
    }

    switch (currentTab) {
      case 'home':
        return {
          title: 'Spa in Baner | Massage in Baner | Sanj Spa Baner - Best Luxury Retreat Pune',
          description:
            'Looking for the best spa in Baner or authentic massage in Baner, Pune? Sanj Spa Baner offers premium Swedish massage, deep tissue therapy, Thai massage & bespoke body rituals on Baner - Mahalunge Road.',
          keywords:
            'Spa in Baner, Massage in Baner, Best Spa in Baner, Best Massage in Baner Pune, Luxury Spa Baner, Body Massage Baner, Thai Massage Baner, Deep Tissue Massage Baner, Swedish Massage Baner, Spa Baner Mahalunge Road',
          canonicalPath: '/',
          pageType: 'WebSite',
        };
      case 'services':
        return {
          title: 'Spa & Massage Services in Baner Pune | Swedish, Deep Tissue, Thai Massage | Sanj Spa',
          description:
            'Explore world-class massage and wellness therapies at Sanj Spa Baner. Certified therapists offering Swedish massage (₹1,299), Deep Tissue therapy (₹2,499), Thai massage (₹2,499), and Glow facials.',
          keywords:
            'Massage in Baner, Spa in Baner, Swedish massage Baner, Deep tissue massage Baner, Thai massage Pune Baner, Aromatherapy massage Baner, Hot stone therapy Baner, Facial spa Baner, Body massage packages Baner',
          canonicalPath: '/services',
          pageType: 'CollectionPage',
        };
      case 'booking':
        return {
          title: 'Book Appointment | Best Spa in Baner & Massage Center Pune | Sanj Spa Baner',
          description:
            'Reserve your luxury massage session in Baner today. Instant slot confirmation for Swedish massage, Thai massage, and couple rituals at Sanj Spa Baner, Pune. Call/WhatsApp +91 78754 31212.',
          keywords:
            'Book spa in Baner, Book massage in Baner, Spa appointment Baner Pune, Massage center near me Baner, Best massage booking Pune, Baner spa deals, Sanj Spa booking',
          canonicalPath: '/booking',
          pageType: 'ItemPage',
        };
      case 'blog':
        return {
          title: 'Wellness & Massage Guides | Spa in Baner Lifestyle Blog | Sanj Spa Baner',
          description:
            'Expert wellness insights, massage benefits, and self-care tips from certified therapists at Sanj Spa Baner. Learn about stress relief, posture recovery, and botanical therapies in Pune.',
          keywords:
            'Massage in Baner benefits, Spa in Baner blog, Wellness tips Pune, Deep tissue benefits, Swedish massage guide, Relaxation tips Baner, Self-care Baner Pune, Massage in Baner',
          canonicalPath: '/blog',
          pageType: 'CollectionPage',
        };
      case 'contact':
        return {
          title: 'Contact & Location | Spa in Baner - Baner Mahalunge Road Pune | Sanj Spa Baner',
          description:
            'Visit Sanj Spa Baner on Baner - Mahalunge Road, 1-A SN 77/1 Sun Flower Baner, Pune 411045. Open 7 days a week from 8:00 AM to 9:30 PM. Call +91 78754 31212 for directions & appointments.',
          keywords:
            'Spa in Baner location, Massage in Baner address, Sanj Spa Baner directions, Spa near Sun Flower Baner, Baner Mahalunge Road massage center, Spa contact number Pune',
          canonicalPath: '/contact',
          pageType: 'ContactPage',
        };
      default:
        return {
          title: 'Spa in Baner | Massage in Baner | Sanj Spa Baner',
          description: 'A sanctuary of quiet luxury and authentic healing massages in Baner, Pune.',
          keywords: 'Spa in Baner, Massage in Baner, Luxury Spa Pune',
          canonicalPath: '/',
          pageType: 'WebSite',
        };
    }
  };

  const config = getSEOConfig();
  const fullCanonicalUrl = `${baseUrl}${config.canonicalPath}`;
  const ogImageUrl =
    config.image ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAuxWkjvze0dprWt49SL7JIvX1cajju4sa31vnM_mg1gAZ5WVbckourcoZkgy1w68-gDtNFw7jCNhjN7Ub69Fc-xy2lZeF3yxVtYPleWlLeusRIckBKx2zf8vY1TBJIPRHcAfg6D-d-nG521zRdydRfa7t6OVS7QigXDouzHrTCdjxFyVGF8VQBGhy9jY5y9setKObdGZTYLG4VAQh8gktnfSf_MG4k1IbLUv0jwGeDDWCsPavDxZQl8w';

  useEffect(() => {
    // 1. Update Document Title
    document.title = config.title;

    // Helper to set or create meta tag
    const setMetaTag = (attribute: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard SEO Meta Tags
    setMetaTag('name', 'description', config.description);
    setMetaTag('name', 'keywords', config.keywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'Sanj Spa Baner');
    setMetaTag('name', 'geo.region', 'IN-MH');
    setMetaTag('name', 'geo.placename', 'Baner, Pune');
    setMetaTag('name', 'geo.position', `${SPA_INFO.mapCoordinates.lat};${SPA_INFO.mapCoordinates.lng}`);
    setMetaTag('name', 'ICBM', `${SPA_INFO.mapCoordinates.lat}, ${SPA_INFO.mapCoordinates.lng}`);

    // 3. Open Graph Meta Tags
    setMetaTag('property', 'og:title', config.title);
    setMetaTag('property', 'og:description', config.description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:type', config.pageType === 'Article' ? 'article' : 'website');
    setMetaTag('property', 'og:site_name', 'Sanj Spa Baner');
    setMetaTag('property', 'og:locale', 'en_IN');
    setMetaTag('property', 'og:image', ogImageUrl);

    // Article Specific Open Graph tags
    if (config.pageType === 'Article' && currentArticle) {
      setMetaTag('property', 'article:published_time', currentArticle.publishedIsoDate);
      setMetaTag('property', 'article:author', currentArticle.author.name);
      setMetaTag('property', 'article:section', currentArticle.category);
      currentArticle.tags.forEach((tag, idx) => {
        setMetaTag('property', `article:tag:${idx}`, tag);
      });
    }

    // 4. Twitter Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', config.title);
    setMetaTag('name', 'twitter:description', config.description);
    setMetaTag('name', 'twitter:image', ogImageUrl);

    // 5. Canonical Link Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullCanonicalUrl);

    // 6. JSON-LD Structured Data Schema Generation
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
    ];

    if (currentTab === 'blog') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Wellness Blog',
        item: `${baseUrl}/blog`,
      });
    } else if (currentTab === 'article' && currentArticle) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Wellness Blog',
        item: `${baseUrl}/blog`,
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: currentArticle.title,
        item: fullCanonicalUrl,
      });
    } else if (currentTab !== 'home') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: currentTab.charAt(0).toUpperCase() + currentTab.slice(1),
        item: fullCanonicalUrl,
      });
    }

    const schemaGraph: any[] = [
      {
        '@type': ['DaySpa', 'HealthAndBeautyBusiness', 'LocalBusiness'],
        '@id': `${baseUrl}/#localbusiness`,
        name: 'Sanj Spa Baner',
        alternateName: ['New Sanj Spa & Massage - Best Spa in Baner', 'Sanj Spa Pune'],
        description:
          'Premier destination for authentic massage in Baner and luxury wellness spa rituals. Certified therapists offering Swedish massage, Thai massage, deep tissue therapy, and organic facials.',
        url: baseUrl,
        telephone: SPA_INFO.phone,
        email: SPA_INFO.email,
        image: [ogImageUrl],
        priceRange: '₹1,299 - ₹3,499',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Google Pay, PhonePe, Paytm',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1-A SN 77/1, Sun Flower Baner, Baner - Mahalunge Road',
          addressLocality: 'Baner, Pune',
          addressRegion: 'Maharashtra',
          postalCode: '411045',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SPA_INFO.mapCoordinates.lat,
          longitude: SPA_INFO.mapCoordinates.lng,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00',
            closes: '21:30',
          },
        ],
        hasMap: `https://www.google.com/maps/search/?api=1&query=New+Sanj+Spa+Baner&query_place_id=${SPA_INFO.placeId}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '184',
          bestRating: '5',
          worstRating: '1',
        },
        areaServed: [
          { '@type': 'City', name: 'Baner, Pune' },
          { '@type': 'City', name: 'Mahalunge, Pune' },
          { '@type': 'City', name: 'Balewadi, Pune' },
          { '@type': 'City', name: 'Aundh, Pune' },
          { '@type': 'City', name: 'Hinjawadi, Pune' },
          { '@type': 'City', name: 'Pashan, Pune' },
          { '@type': 'City', name: 'Wakad, Pune' },
        ],
        keywords: 'Spa in Baner, Massage in Baner, Best Spa in Baner, Body Massage in Baner, Thai Massage Baner',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Spa & Massage Services in Baner',
          itemListElement: SERVICES_DATA.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              '@id': `${baseUrl}/#service-${service.id}`,
              name: service.title,
              description: service.description,
              provider: {
                '@type': 'DaySpa',
                name: 'Sanj Spa Baner',
              },
              offers: {
                '@type': 'Offer',
                price: service.priceNum.toString(),
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
              },
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
    ];

    // If viewing an article, add BlogPosting Schema
    if (currentTab === 'article' && currentArticle) {
      schemaGraph.push({
        '@type': 'BlogPosting',
        '@id': fullCanonicalUrl,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullCanonicalUrl,
        },
        headline: currentArticle.title,
        description: currentArticle.metaDescription,
        image: [currentArticle.image],
        datePublished: currentArticle.publishedIsoDate,
        dateModified: currentArticle.publishedIsoDate,
        author: {
          '@type': 'Person',
          name: currentArticle.author.name,
          jobTitle: currentArticle.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Sanj Spa Baner',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: ogImageUrl,
          },
        },
        keywords: currentArticle.keywords,
        articleSection: currentArticle.category,
        articleBody: currentArticle.content.join(' '),
      });
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': schemaGraph,
    };

    let scriptTag = document.getElementById('spa-schema-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'spa-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(structuredData);
  }, [
    config.title,
    config.description,
    config.keywords,
    fullCanonicalUrl,
    config.pageType,
    currentTab,
    currentArticle,
  ]);

  return null;
};


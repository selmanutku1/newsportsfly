import { BlogPost } from '../types';
import { BLOG_SEO_CONFIG } from '../data/blogData';

export interface SeoUpdateOptions {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  authorName?: string;
  jsonLd?: object | object[];
}

/**
 * Dynamically sets document title, meta tags, social share tags, and JSON-LD schema.
 */
export function setPageSeo({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  publishedTime,
  authorName = 'Selman UTKU',
  jsonLd,
}: SeoUpdateOptions) {
  if (typeof document === 'undefined') return;

  // 1. Title
  document.title = title;

  // 2. Helper to set or create meta tag
  const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta Tags
  setMeta('meta[name="description"]', 'name', 'description', description);
  setMeta('meta[name="title"]', 'name', 'title', title);
  if (keywords && keywords.length > 0) {
    setMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
  }
  setMeta('meta[name="author"]', 'name', 'author', authorName);

  // OpenGraph Tags
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
  if (canonicalUrl) {
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  }
  if (publishedTime) {
    setMeta('meta[property="article:published_time"]', 'property', 'article:published_time', publishedTime);
    setMeta('meta[property="article:author"]', 'property', 'article:author', authorName);
  }

  // Twitter Cards
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

  // Canonical Link
  if (canonicalUrl) {
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);
  }

  // JSON-LD Structured Data
  if (jsonLd) {
    let scriptEl = document.getElementById('sportsfly-dynamic-seo-ldjson');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.setAttribute('id', 'sportsfly-dynamic-seo-ldjson');
      scriptEl.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLd);
  }
}

/**
 * Generates Schema.org BlogPosting structured data for single blog articles
 */
export function buildArticleJsonLd(post: BlogPost, language: 'tr' | 'en') {
  const currentLang = language === 'tr' ? 'tr' : 'en';
  const postUrl = `https://sportsfly.app/#blog-${post.slug}`;
  const canonicalUrl = `https://sportsfly.app/blog/${post.slug}`;
  const title = post.seo?.metaTitle[currentLang] || post.title[currentLang];
  const description = post.seo?.metaDescription[currentLang] || post.excerpt[currentLang];

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    headline: title,
    description: description,
    image: [
      post.author.avatar,
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop&q=80',
    ],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: currentLang === 'tr' ? 'tr-TR' : 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: postUrl,
    keywords: post.seo?.focusKeywords?.join(', ') || post.tags.join(', '),
    articleSection: post.categoryLabel[currentLang],
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role[currentLang],
      worksFor: {
        '@type': 'Organization',
        name: 'SportsFly',
        url: 'https://sportsfly.app',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'SportsFly',
      url: 'https://sportsfly.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sportsfly.app/favicon.ico',
      },
    },
    isAccessibleForFree: 'True',
  };
}

/**
 * Generates Schema.org CollectionPage / Blog structured data for the blog hub
 */
export function buildBlogHubJsonLd(posts: BlogPost[], language: 'tr' | 'en') {
  const currentLang = language === 'tr' ? 'tr' : 'en';
  const hubConfig = BLOG_SEO_CONFIG.hub;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://sportsfly.app/blog#collection',
    name: hubConfig.title[currentLang],
    description: hubConfig.description[currentLang],
    url: 'https://sportsfly.app/#blog',
    inLanguage: currentLang === 'tr' ? 'tr-TR' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'SportsFly',
      url: 'https://sportsfly.app',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://sportsfly.app/#blog-${post.slug}`,
        name: post.title[currentLang],
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: currentLang === 'tr' ? 'Ana Sayfa' : 'Home',
          item: 'https://sportsfly.app/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: currentLang === 'tr' ? 'Akademi Blogu' : 'Academy Blog',
          item: 'https://sportsfly.app/#blog',
        },
      ],
    },
  };
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { books } from '../data/books';

const siteUrl = 'https://www.booksbygrahamsutherland.com';
const pages = {
  '/': {
    title: 'Graham Sutherland | Historical Author & Crime Writer',
    description: 'Explore books by Graham Sutherland, including the Warwick Detective Trilogy, Leamington Spa, The Unwanted Inheritance and British history titles.'
  },
  '/about': {
    title: 'About Graham Sutherland | Author & Warwick Historian',
    description: 'Meet Graham Sutherland, author of historical crime fiction and books about Warwick and Leamington Spa.'
  },
  '/books': {
    title: 'Books by Graham Sutherland | Mayfield, Leamington Spa & More',
    description: 'Browse Graham Sutherland books, including Mayfield, the Warwick Detective Trilogy, Leamington Spa, The Unwanted Inheritance and Secret Royal Leamington Spa.'
  },
  '/contact': {
    title: 'Contact Graham Sutherland | Author Enquiries',
    description: 'Get in touch with Graham Sutherland about his books, historical writing and author enquiries.'
  }
};

function setMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pages[pathname] ? pathname : '/';
    const { title, description } = pages[path];
    const canonicalUrl = siteUrl + path;

    document.title = title;
    setMeta('meta[name="description"]', { name: 'description' }, description);
    setMeta('meta[property="og:title"]', { property: 'og:title' }, title);
    setMeta('meta[property="og:description"]', { property: 'og:description' }, description);
    setMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    document.getElementById('books-structured-data')?.remove();
    if (path === '/books') {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        url: canonicalUrl,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: books.map((book, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Book',
              '@id': siteUrl + '/books#book-' + book.id,
              name: book.title,
              author: { '@type': 'Person', name: 'Graham Sutherland' },
              image: siteUrl + book.image,
              url: siteUrl + '/books#book-' + book.id
            }
          }))
        }
      };
      const script = document.createElement('script');
      script.id = 'books-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
}

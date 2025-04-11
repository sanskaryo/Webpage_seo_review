import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the HTML content
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract SEO tags
    const seoData = {
      url,
      title: $('title').text(),
      description: $('meta[name="description"]').attr('content') || '',
      canonical: $('link[rel="canonical"]').attr('href') || '',
      robots: $('meta[name="robots"]').attr('content') || '',
      viewport: $('meta[name="viewport"]').attr('content') || '',
      language: $('html').attr('lang') || '',
      
      // Open Graph tags
      ogTitle: $('meta[property="og:title"]').attr('content') || '',
      ogDescription: $('meta[property="og:description"]').attr('content') || '',
      ogImage: $('meta[property="og:image"]').attr('content') || '',
      ogUrl: $('meta[property="og:url"]').attr('content') || '',
      ogType: $('meta[property="og:type"]').attr('content') || '',
      
      // Twitter Card tags
      twitterCard: $('meta[name="twitter:card"]').attr('content') || '',
      twitterTitle: $('meta[name="twitter:title"]').attr('content') || '',
      twitterDescription: $('meta[name="twitter:description"]').attr('content') || '',
      twitterImage: $('meta[name="twitter:image"]').attr('content') || '',
      twitterSite: $('meta[name="twitter:site"]').attr('content') || '',
      
      // Additional meta tags
      keywords: $('meta[name="keywords"]').attr('content') || '',
      author: $('meta[name="author"]').attr('content') || '',
      
      // Structured data
      hasStructuredData: $('script[type="application/ld+json"]').length > 0,
    };

    return NextResponse.json(seoData);
  } catch (error: unknown) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

"use client";

import { useState, FormEvent, useMemo } from "react";
import { FaSearch, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaTimes, FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import Image from "next/image";

// Define the SEO data interface
interface SeoData {
  url: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  viewport: string;
  language: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  keywords: string;
  author: string;
  hasStructuredData: boolean;
}

// Define the SeoCheckItem props interface
interface SeoCheckItemProps {
  title: string;
  value: string;
  status: 'pass' | 'warning' | 'fail';
  recommendation: string;
  explanation?: string;
}

// Define the SEO score categories
interface SeoScoreSummary {
  passed: number;
  warnings: number;
  failed: number;
  score: number;
  rating: string;
  categories: {
    basic: CategoryScore;
    openGraph: CategoryScore;
    twitter: CategoryScore;
  };
}

interface CategoryScore {
  name: string;
  description: string;
  total: number;
  passed: number;
  warnings: number;
  failed: number;
  score: number;
}

interface SeoCheck {
  name: string;
  status: 'pass' | 'warning' | 'fail';
  weight: number;
  category: 'basic' | 'openGraph' | 'twitter';
  title: string;
  value: string;
  recommendation: string;
  explanation: string;
}

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [seoData, setSeoData] = useState<SeoData | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  // Calculate SEO score based on the analysis results
  const seoScore = useMemo<SeoScoreSummary | null>(() => {
    if (!seoData) return null;

    // Define the checks and their status with categories
    const checks: SeoCheck[] = [
      // Essential SEO elements (higher weight)
      { 
        name: 'title', 
        status: !seoData.title ? 'fail' : 
                seoData.title.length > 60 ? 'warning' : 'pass', 
        weight: 3,
        category: 'basic',
        title: 'Title Tag',
        value: seoData.title,
        recommendation: !seoData.title ? "Missing title tag" : seoData.title.length > 60 ? "Title too long (should be under 60 characters)" : "",
        explanation: "The title tag defines the title of your web page. It appears in browser tabs and search results. Keep it under 60 characters for best results."
      },
      { 
        name: 'description', 
        status: !seoData.description ? 'fail' : 
                seoData.description.length > 160 ? 'warning' : 'pass', 
        weight: 3,
        category: 'basic',
        title: 'Meta Description',
        value: seoData.description,
        recommendation: !seoData.description ? "Missing meta description" : seoData.description.length > 160 ? "Description too long (should be under 160 characters)" : "",
        explanation: "The meta description summarizes your page content. Search engines often display this in search results. Aim for 50-160 characters."
      },
      { 
        name: 'canonical', 
        status: !!seoData.canonical ? 'pass' : 'fail', 
        weight: 2,
        category: 'basic',
        title: 'Canonical URL',
        value: seoData.canonical,
        recommendation: !seoData.canonical ? "Missing canonical URL tag" : "",
        explanation: "The canonical tag tells search engines which version of a page is the original when you have similar content on multiple URLs."
      },
      { 
        name: 'robots', 
        status: !!seoData.robots ? 'pass' : 'fail', 
        weight: 1,
        category: 'basic',
        title: 'Robots Meta',
        value: seoData.robots,
        recommendation: !seoData.robots ? "Missing robots meta tag" : "",
        explanation: "The robots meta tag tells search engines if they should index your page or follow its links."
      },
      { 
        name: 'viewport', 
        status: !!seoData.viewport ? 'pass' : 'fail', 
        weight: 1,
        category: 'basic',
        title: 'Viewport',
        value: seoData.viewport,
        recommendation: !seoData.viewport ? "Missing viewport meta tag" : "",
        explanation: "The viewport meta tag helps your page display properly on mobile devices, which is crucial for mobile SEO."
      },
      { 
        name: 'language', 
        status: !!seoData.language ? 'pass' : 'fail', 
        weight: 1,
        category: 'basic',
        title: 'Language',
        value: seoData.language,
        recommendation: !seoData.language ? "Missing language attribute" : "",
        explanation: "The language attribute helps search engines understand what language your content is in."
      },
      
      // Open Graph tags (medium weight)
      { 
        name: 'ogTitle', 
        status: !!seoData.ogTitle ? 'pass' : 'fail', 
        weight: 2,
        category: 'openGraph',
        title: 'OG Title',
        value: seoData.ogTitle,
        recommendation: !seoData.ogTitle ? "Missing og:title tag" : "",
        explanation: "The og:title tag defines how your page title appears when shared on Facebook and other platforms that support Open Graph."
      },
      { 
        name: 'ogDescription', 
        status: !!seoData.ogDescription ? 'pass' : 'fail', 
        weight: 2,
        category: 'openGraph',
        title: 'OG Description',
        value: seoData.ogDescription,
        recommendation: !seoData.ogDescription ? "Missing og:description tag" : "",
        explanation: "The og:description defines how your page description appears when shared on social platforms."
      },
      { 
        name: 'ogImage', 
        status: !!seoData.ogImage ? 'pass' : 'fail', 
        weight: 2,
        category: 'openGraph',
        title: 'OG Image',
        value: seoData.ogImage,
        recommendation: !seoData.ogImage ? "Missing og:image tag" : "",
        explanation: "The og:image defines what image appears when your page is shared on social platforms. Recommended size is 1200×630 pixels."
      },
      { 
        name: 'ogUrl', 
        status: !!seoData.ogUrl ? 'pass' : 'fail', 
        weight: 1,
        category: 'openGraph',
        title: 'OG URL',
        value: seoData.ogUrl,
        recommendation: !seoData.ogUrl ? "Missing og:url tag" : "",
        explanation: "The og:url helps social platforms identify the canonical URL for your shared content."
      },
      
      // Twitter Card tags (medium weight)
      { 
        name: 'twitterCard', 
        status: !!seoData.twitterCard ? 'pass' : 'fail', 
        weight: 1,
        category: 'twitter',
        title: 'Twitter Card',
        value: seoData.twitterCard,
        recommendation: !seoData.twitterCard ? "Missing twitter:card tag" : "",
        explanation: "The twitter:card tag defines how your content appears when shared on Twitter. Common values are 'summary', 'summary_large_image', etc."
      },
      { 
        name: 'twitterTitle', 
        status: !!seoData.twitterTitle ? 'pass' : 'fail', 
        weight: 1,
        category: 'twitter',
        title: 'Twitter Title',
        value: seoData.twitterTitle,
        recommendation: !seoData.twitterTitle ? "Missing twitter:title tag" : "",
        explanation: "The twitter:title defines the title of your content when shared on Twitter."
      },
      { 
        name: 'twitterDescription', 
        status: !!seoData.twitterDescription ? 'pass' : 'fail', 
        weight: 1,
        category: 'twitter',
        title: 'Twitter Description',
        value: seoData.twitterDescription,
        recommendation: !seoData.twitterDescription ? "Missing twitter:description tag" : "",
        explanation: "The twitter:description defines the description of your content when shared on Twitter."
      },
      { 
        name: 'twitterImage', 
        status: !!seoData.twitterImage ? 'pass' : 'fail', 
        weight: 1,
        category: 'twitter',
        title: 'Twitter Image',
        value: seoData.twitterImage,
        recommendation: !seoData.twitterImage ? "Missing twitter:image tag" : "",
        explanation: "The twitter:image defines what image appears when your content is shared on Twitter."
      },
    ];
    
    // Count passed, warnings, and failed checks
    const passed = checks.filter(check => check.status === 'pass').length;
    const warnings = checks.filter(check => check.status === 'warning').length;
    const failed = checks.filter(check => check.status === 'fail').length;
    
    // Calculate weighted score
    const totalWeight = checks.reduce((sum, check) => sum + check.weight, 0);
    const earnedWeight = checks.reduce((sum, check) => {
      if (check.status === 'pass') return sum + check.weight;
      if (check.status === 'warning') return sum + (check.weight * 0.5); // Half points for warnings
      return sum;
    }, 0);
    
    const score = Math.round((earnedWeight / totalWeight) * 100);
    
    // Calculate category scores
    const basicChecks = checks.filter(check => check.category === 'basic');
    const ogChecks = checks.filter(check => check.category === 'openGraph');
    const twitterChecks = checks.filter(check => check.category === 'twitter');
    
    const calculateCategoryScore = (categoryChecks: SeoCheck[]): CategoryScore => {
      const total = categoryChecks.length;
      const passed = categoryChecks.filter(check => check.status === 'pass').length;
      const warnings = categoryChecks.filter(check => check.status === 'warning').length;
      const failed = categoryChecks.filter(check => check.status === 'fail').length;
      
      const totalWeight = categoryChecks.reduce((sum, check) => sum + check.weight, 0);
      const earnedWeight = categoryChecks.reduce((sum, check) => {
        if (check.status === 'pass') return sum + check.weight;
        if (check.status === 'warning') return sum + (check.weight * 0.5);
        return sum;
      }, 0);
      
      const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
      
      return {
        name: '',
        description: '',
        total,
        passed,
        warnings,
        failed,
        score
      };
    };
    
    // Determine rating based on score
    let rating = 'Poor';
    if (score >= 90) rating = 'Excellent';
    else if (score >= 80) rating = 'Very Good';
    else if (score >= 70) rating = 'Good';
    else if (score >= 50) rating = 'Average';
    
    const basicScore = calculateCategoryScore(basicChecks);
    const ogScore = calculateCategoryScore(ogChecks);
    const twitterScore = calculateCategoryScore(twitterChecks);
    
    // Add names and descriptions
    basicScore.name = 'Basic SEO';
    basicScore.description = 'These are the fundamental tags search engines use to understand your page.';
    
    ogScore.name = 'Open Graph';
    ogScore.description = 'These tags control how your page appears when shared on Facebook and other social platforms.';
    
    twitterScore.name = 'Twitter Cards';
    twitterScore.description = 'These tags control how your page appears when shared on Twitter.';
    
    return {
      passed,
      warnings,
      failed,
      score,
      rating,
      categories: {
        basic: basicScore,
        openGraph: ogScore,
        twitter: twitterScore
      }
    };
  }, [seoData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic URL validation
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    let formattedUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = `https://${url}`;
    }

    try {
      setLoading(true);
      setError("");
      setSeoData(null);
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: formattedUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch website data");
      }

      const data = await response.json();
      setSeoData(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred while analyzing the website");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="text-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2">
            SEO Tag Analyzer
          </h1>
          <p className="text-sm md:text-base text-blue-200">
            Analyze your website's SEO tags with AI precision
          </p>
        </header>

        <div className="max-w-3xl mx-auto bg-gray-900/50 backdrop-blur-lg rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.3)] border border-blue-500/20 p-4 md:p-6 mb-6 md:mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g., example.com)"
                className="w-full px-3 md:px-4 py-2 md:py-3 pr-10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-800/50 text-white text-sm md:text-base placeholder-blue-300/50"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-cyan-400">
                <FaSearch />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg flex items-center gap-2 text-sm">
              <FaExclamationTriangle className="flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center my-8 md:my-10">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>
          </div>
        )}

        {seoData && seoScore && (
          <div className="max-w-5xl mx-auto">
            {/* SEO Score Section */}
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.3)] border border-blue-500/20 p-4 md:p-6 mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">SEO Score</h2>
              
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                {/* Score Circle */}
                <div className="relative w-28 h-28 md:w-36 md:h-36 mb-2 md:mb-0">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      className="text-gray-800 stroke-current" 
                      strokeWidth="10" 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent"
                    />
                    <circle 
                      className={`${
                        seoScore.score >= 80 ? 'text-emerald-500' : 
                        seoScore.score >= 60 ? 'text-amber-500' : 
                        'text-rose-500'
                      } stroke-current`}
                      strokeWidth="10" 
                      strokeLinecap="round" 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent"
                      strokeDasharray={`${2.5 * Math.PI * 40 * seoScore.score / 100} ${2.5 * Math.PI * 40 * (1 - seoScore.score / 100)}`}
                      strokeDashoffset={(2.5 * Math.PI * 40) / 4}
                      filter="drop-shadow(0 0 6px rgba(16, 185, 129, 0.7))"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold">{seoScore.score}</span>
                    <span className="text-xs md:text-sm text-blue-300">/100</span>
                  </div>
                </div>
                
                <div className="flex-1 w-full">
                  <h3 className="text-base md:text-lg font-medium mb-2 text-center md:text-left text-blue-200">SEO Summary</h3>
                  
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    {/* Passed Checks */}
                    <div className="bg-emerald-900/20 border border-emerald-500/30 p-2 md:p-4 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FaCheckCircle className="text-emerald-400 mr-1 md:mr-2 text-xs md:text-sm" />
                        <span className="text-xs md:text-sm font-medium text-emerald-300">Passed Checks</span>
                      </div>
                      <span className="text-xl md:text-2xl font-bold text-white">{seoScore.passed}</span>
                    </div>
                    
                    {/* Warnings */}
                    <div className="bg-amber-900/20 border border-amber-500/30 p-2 md:p-4 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FaExclamationTriangle className="text-amber-400 mr-1 md:mr-2 text-xs md:text-sm" />
                        <span className="text-xs md:text-sm font-medium text-amber-300">Warnings</span>
                      </div>
                      <span className="text-xl md:text-2xl font-bold text-white">{seoScore.warnings}</span>
                    </div>
                    
                    {/* Failed Checks */}
                    <div className="bg-rose-900/20 border border-rose-500/30 p-2 md:p-4 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FaTimes className="text-rose-400 mr-1 md:mr-2 text-xs md:text-sm" />
                        <span className="text-xs md:text-sm font-medium text-rose-300">Failed Checks</span>
                      </div>
                      <span className="text-xl md:text-2xl font-bold text-white">{seoScore.failed}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 md:mt-4 text-center md:text-left">
                    <span className="text-base md:text-lg font-medium text-blue-200">Overall SEO Score</span>
                    <p className={`text-base md:text-lg font-bold ${
                      seoScore.score >= 80 ? 'text-emerald-400' : 
                      seoScore.score >= 60 ? 'text-amber-400' : 
                      'text-rose-400'
                    }`}>
                      {seoScore.rating}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <div className="flex items-start">
                  <FaInfoCircle className="text-cyan-400 mt-1 mr-2 flex-shrink-0 text-sm md:text-base" />
                  <div>
                    <p className="text-xs md:text-sm text-blue-200">
                      This score is based on the presence and quality of key SEO elements. 
                      A higher score indicates better SEO implementation, but remember that 
                      content quality and relevance are also crucial for search rankings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overall SEO Score Card */}
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.3)] border border-blue-500/20 p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-lg md:text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Overall SEO Score</h2>
                  <p className="text-sm text-blue-200 max-w-md">
                    This score represents how well your website follows SEO best practices. Higher scores indicate better optimization for search engines.
                  </p>
                </div>
                
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      className="text-gray-800 stroke-current" 
                      strokeWidth="8" 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent"
                    />
                    <circle 
                      className={`${
                        seoScore.score >= 80 ? 'text-emerald-500' : 
                        seoScore.score >= 60 ? 'text-amber-500' : 
                        'text-rose-500'
                      } stroke-current`}
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40 * seoScore.score / 100} ${2 * Math.PI * 40 * (1 - seoScore.score / 100)}`}
                      strokeDashoffset={(2 * Math.PI * 40) / 4}
                      filter="drop-shadow(0 0 6px rgba(16, 185, 129, 0.7))"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-4xl font-bold">{seoScore.score}</span>
                    <span className="text-xs md:text-sm text-gray-300">out of 100</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-2 md:gap-4">
                <div className="bg-emerald-900/20 border border-emerald-500/30 p-2 md:p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <FaCheckCircle className="text-emerald-400 mr-1 md:mr-2 text-xs md:text-sm" />
                    <span className="text-xs md:text-sm font-medium text-emerald-300">Passed</span>
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-white">{seoScore.passed}</span>
                  <span className="text-xs md:text-sm text-gray-400 ml-1">checks</span>
                </div>
                <div className="bg-amber-900/20 border border-amber-500/30 p-2 md:p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <FaExclamationTriangle className="text-amber-400 mr-1 md:mr-2 text-xs md:text-sm" />
                    <span className="text-xs md:text-sm font-medium text-amber-300">Warnings</span>
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-white">{seoScore.warnings}</span>
                  <span className="text-xs md:text-sm text-gray-400 ml-1">checks</span>
                </div>
                <div className="bg-rose-900/20 border border-rose-500/30 p-2 md:p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <FaTimes className="text-rose-400 mr-1 md:mr-2 text-xs md:text-sm" />
                    <span className="text-xs md:text-sm font-medium text-rose-300">Failed</span>
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-white">{seoScore.failed}</span>
                  <span className="text-xs md:text-sm text-gray-400 ml-1">checks</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* SEO Analysis Section */}
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.3)] border border-blue-500/20 p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">SEO Analysis</h2>
                
                {/* Category Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {Object.keys(seoScore.categories).map((category) => {
                    const categoryKey = category as keyof typeof seoScore.categories;
                    const categoryData = seoScore.categories[categoryKey];
                    
                    return (
                      <div key={category} className="bg-gray-900/30 p-4 rounded-xl border border-blue-500/20 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                        <div className="flex items-center">
                          {/* Circular Progress */}
                          <div className="relative w-16 h-16 md:w-20 md:h-20">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle 
                                className="text-gray-800 stroke-current" 
                                strokeWidth="10" 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                fill="transparent"
                              />
                              <circle 
                                className={`${
                                  categoryData.score >= 80 ? 'text-emerald-500' : 
                                  categoryData.score >= 60 ? 'text-amber-500' : 
                                  'text-rose-500'
                                } stroke-current`}
                                strokeWidth="10" 
                                strokeLinecap="round" 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                fill="transparent"
                                strokeDasharray={`${2.5 * Math.PI * 40 * categoryData.score / 100} ${2.5 * Math.PI * 40 * (1 - categoryData.score / 100)}`}
                                strokeDashoffset={(2.5 * Math.PI * 40) / 4}
                                filter="drop-shadow(0 0 4px rgba(16, 185, 129, 0.7))"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-lg md:text-xl font-bold">{categoryData.score}</span>
                            </div>
                          </div>
                          
                          <div className="ml-4">
                            <h3 className="text-base md:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                              {categoryData.name}
                            </h3>
                            <p className="text-xs text-blue-200">
                              {categoryData.passed} of {categoryData.total} checks passed
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <div className="text-xs text-blue-200 flex-1 line-clamp-2">
                            {categoryData.description}
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleCategory(category)}
                            className="ml-2 flex-shrink-0 text-xs text-blue-300 hover:text-blue-400 transition-colors duration-200 bg-blue-900/30 px-2 py-1 rounded-md"
                          >
                            {expandedCategory === category ? "Hide" : "Details"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex flex-col gap-4">
                  {Object.keys(seoScore.categories).map((category) => {
                    // Type assertion to fix TypeScript errors
                    const categoryKey = category as keyof typeof seoScore.categories;
                    const categoryData = seoScore.categories[categoryKey];
                    
                    return (
                      <div key={category} className="bg-gray-900/20 p-3 md:p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base md:text-lg font-medium text-blue-200">{categoryData.name}</h3>
                          <button
                            type="button"
                            onClick={() => toggleCategory(category)}
                            className="text-sm md:text-base text-blue-300 hover:text-blue-400 transition-colors duration-200"
                          >
                            {expandedCategory === category ? (
                              <FaChevronUp className="inline-block mr-1" />
                            ) : (
                              <FaChevronDown className="inline-block mr-1" />
                            )}
                            Details
                          </button>
                        </div>
                        {expandedCategory === category && (
                          <div>
                            <p className="text-xs md:text-sm text-blue-200">{categoryData.description}</p>
                            <div className="grid grid-cols-3 gap-2 md:gap-4 mt-3">
                              <div className="bg-emerald-900/20 border border-emerald-500/30 p-2 md:p-4 rounded-lg">
                                <div className="flex items-center mb-1">
                                  <FaCheckCircle className="text-emerald-400 mr-1 md:mr-2 text-xs md:text-sm" />
                                  <span className="text-xs md:text-sm font-medium text-emerald-300">Passed</span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-white">{categoryData.passed}</span>
                              </div>
                              <div className="bg-amber-900/20 border border-amber-500/30 p-2 md:p-4 rounded-lg">
                                <div className="flex items-center mb-1">
                                  <FaExclamationTriangle className="text-amber-400 mr-1 md:mr-2 text-xs md:text-sm" />
                                  <span className="text-xs md:text-sm font-medium text-amber-300">Warnings</span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-white">{categoryData.warnings}</span>
                              </div>
                              <div className="bg-rose-900/20 border border-rose-500/30 p-2 md:p-4 rounded-lg">
                                <div className="flex items-center mb-1">
                                  <FaTimes className="text-rose-400 mr-1 md:mr-2 text-xs md:text-sm" />
                                  <span className="text-xs md:text-sm font-medium text-rose-300">Failed</span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-white">{categoryData.failed}</span>
                              </div>
                            </div>
                            <div className="mt-3 md:mt-4 text-center md:text-left">
                              <span className="text-base md:text-lg font-medium text-blue-200">Category Score</span>
                              <p className={`text-base md:text-lg font-bold ${
                                categoryData.score >= 80 ? 'text-emerald-400' : 
                                categoryData.score >= 60 ? 'text-amber-400' : 
                                'text-rose-400'
                              }`}>
                                {categoryData.score}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Preview Section */}
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.3)] border border-blue-500/20 p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Previews</h2>
                
                <div className="mb-5 md:mb-6">
                  <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-blue-200">Google Search Result</h3>
                  <div className="border border-gray-700 rounded-lg p-3 md:p-4 bg-gray-800/70 shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                    <div className="text-blue-400 text-base md:text-xl mb-1 truncate">
                      {seoData.title || "No title available"}
                    </div>
                    <div className="text-emerald-400 text-xs md:text-sm mb-1 md:mb-2 truncate">
                      {seoData.url}
                    </div>
                    <div className="text-gray-300 text-xs md:text-sm line-clamp-2">
                      {seoData.description || "No description available"}
                    </div>
                  </div>
                </div>
                
                <div className="mb-5 md:mb-6">
                  <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-blue-200">Facebook Preview</h3>
                  <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/70 shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                    {seoData.ogImage ? (
                      <div className="h-40 md:h-48 bg-gray-800 relative">
                        <Image 
                          src={seoData.ogImage} 
                          alt="OG Image Preview"
                          fill
                          style={{ objectFit: 'cover' }}
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-40 md:h-48 bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No OG image available</span>
                      </div>
                    )}
                    <div className="p-3 md:p-4">
                      <div className="text-gray-400 text-xs uppercase mb-1">
                        {seoData.url}
                      </div>
                      <div className="font-bold text-white mb-1 text-sm md:text-base">
                        {seoData.ogTitle || seoData.title || "No title available"}
                      </div>
                      <div className="text-gray-300 text-xs md:text-sm">
                        {seoData.ogDescription || seoData.description || "No description available"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-blue-200">Twitter Card Preview</h3>
                  <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/70 shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                    {seoData.twitterImage ? (
                      <div className="h-40 md:h-48 bg-gray-800 relative">
                        <Image 
                          src={seoData.twitterImage} 
                          alt="Twitter Image Preview"
                          fill
                          style={{ objectFit: 'cover' }}
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-40 md:h-48 bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Twitter image available</span>
                      </div>
                    )}
                    <div className="p-3 md:p-4">
                      <div className="font-bold text-white mb-1 text-sm md:text-base">
                        {seoData.twitterTitle || seoData.ogTitle || seoData.title || "No title available"}
                      </div>
                      <div className="text-gray-300 text-xs md:text-sm mb-1 md:mb-2">
                        {seoData.twitterDescription || seoData.ogDescription || seoData.description || "No description available"}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {seoData.url}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Responsive Footer */}
      <footer className="mt-8 py-4 md:py-6 text-center text-xs md:text-sm text-blue-300 bg-gray-900/70 border-t border-blue-500/20">
        <p>SEO Tag Analyzer &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">Made by AI and ❤️ by sanskar khandelwal</p>
      </footer>
    </div>
  );
}

// Component for individual SEO check items
function SeoCheckItem({ title, value, status, recommendation, explanation }: SeoCheckItemProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="mb-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="mr-2 mt-1">
            {status === "pass" && <FaCheckCircle className="text-emerald-400" />}
            {status === "warning" && <FaExclamationTriangle className="text-amber-400" />}
            {status === "fail" && <FaTimes className="text-rose-400" />}
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="text-sm md:text-base font-medium text-blue-200">{title}</h4>
              <button 
                className="ml-2 text-blue-300 hover:text-blue-400"
                onClick={() => setShowTooltip(!showTooltip)}
                aria-label="Show explanation"
              >
                <FaQuestionCircle className="text-xs md:text-sm" />
              </button>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mt-1">{value}</p>
          </div>
        </div>
      </div>
      
      {showTooltip && (
        <div className="mt-3 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30 text-xs md:text-sm">
          <p className="text-blue-200 mb-2"><span className="font-medium">What this means:</span> {explanation}</p>
          {recommendation && (
            <p className="text-emerald-300"><span className="font-medium">Recommendation:</span> {recommendation}</p>
          )}
        </div>
      )}
    </div>
  );
}

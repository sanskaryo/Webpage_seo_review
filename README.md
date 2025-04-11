# SEO Tag Analyzer

An interactive web application that analyzes SEO (meta) tags for any website and provides visual feedback on their implementation. This tool helps you check if your website's SEO tags are properly implemented according to best practices.

> This project was developed as part of the [Vibe Coding 101 with Replit](https://learn.deeplearning.ai/courses/vibe-coding-101-with-replit/) course by Replit and DeepLearning.AI.

## Features

- **URL Analysis**: Enter any website URL to analyze its SEO tags
- **Comprehensive SEO Check**: Evaluates title tags, meta descriptions, canonical URLs, and more
- **Visual Category Summaries**: Color-coded circular progress indicators for each SEO category
- **Interactive Tooltips**: Detailed explanations of SEO concepts for beginners
- **Social Media Previews**: Shows how your site appears on Google, Facebook, and Twitter
- **Best Practice Recommendations**: Provides specific suggestions for improving your SEO tags

## Visual Elements

- **Overall SEO Score**: A prominent circular progress chart showing the overall SEO health
- **Category Cards**: Visual summaries for Basic SEO, Open Graph, and Twitter tags
- **Status Indicators**: Color-coded indicators (green for passed, amber for warnings, red for failed)
- **Collapsible Sections**: Detailed information available on demand for a cleaner interface
- **Beginner-Friendly Explanations**: Tooltips explaining SEO concepts in simple terms

## Technology Stack

- Next.js 14 (App Router)
- React with TypeScript
- Tailwind CSS for styling
- Axios for HTTP requests
- Cheerio for HTML parsing

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How to Use

1. Enter a website URL in the input field (e.g., example.com)
2. Click "Analyze" to fetch and analyze the website's SEO tags
3. Review the visual summaries and detailed breakdowns of SEO elements
4. Use the tooltips to learn more about each SEO concept
5. Follow the recommendations to improve your website's SEO

## SEO Tags Analyzed

- **Basic SEO Tags**: Title, Meta Description, Canonical URL, Robots, Viewport, Language
- **Open Graph Tags**: og:title, og:description, og:image, og:url
- **Twitter Card Tags**: twitter:card, twitter:title, twitter:description, twitter:image

## License

This project is open source and available under the MIT license.




# SEO Review Tool

The **SEO Review Tool** is a web application designed to evaluate a website's SEO health by analyzing its meta tags, Open Graph implementation, Twitter Cards, and other SEO-related elements. This tool provides detailed ratings and recommendations to improve your website's visibility and performance on search engines and social media platforms.

## Features

- **Website Analysis**: Enter a website URL to analyze its SEO properties, including meta tags, structured data, and social media previews.
- **SEO Ratings**: Receive a score for each category, including meta tags, Open Graph, and Twitter Card implementation.
- **Social Media Previews**: Get a visual preview of how your website appears on:
  - Google Search results
  - Facebook (Open Graph preview)
  - Twitter (Twitter Card preview)
- **Recommendations**: Detailed feedback and suggestions to improve the SEO and social media presence of your website.
- **Error Handling**: Identifies and reports issues such as missing meta tags, Open Graph data, or invalid URLs.

## How It Works

1. **Input the Website URL**:
   - Paste the URL of the website you want to analyze.
2. **SEO Analysis**:
   - The tool fetches the HTML content of the website and extracts SEO-related data using `axios` and `cheerio`.
3. **Data Extraction**:
   - The following properties are analyzed:
     - Meta Tags: Title, description, canonical URL, robots, viewport, language, and keywords.
     - Open Graph Tags: Title, description, URL, type, and image.
     - Twitter Cards: Title, description, site, and image.
     - Structured Data: Checks for the presence of JSON-LD structured data.
4. **Results**:
   - Displays a detailed report with scores, warnings, and failures for each category.
   - Generates previews for Google Search, Facebook, and Twitter.

## Example Output

### Google Search Preview
Shows how the website appears in Google search results:
- **Title**
- **URL**
- **Description**

### Facebook Open Graph Preview
Displays the Open Graph metadata such as:
- **Image** (if available)
- **Title**
- **Description**

### Twitter Card Preview
Visualizes how the website appears on Twitter:
- **Image** (if available)
- **Title**
- **Description**

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/sanskaryo/Webpage_seo_review_replit.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Webpage_seo_review_replit
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Frontend**: React with Next.js
- **Backend**: Node.js API for fetching and analyzing website data
- **Libraries**:
  - `axios`: For fetching website content.
  - `cheerio`: For parsing and extracting HTML data.
  - `react-icons`: For visual indicators in the UI.

## Future Improvements

- Add support for analyzing additional SEO factors like page speed and mobile compatibility.
- Improve structured data validation.
- Add multilingual support for global audience analysis.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**Developed by [Sanskar Khandelwal](https://github.com/sanskaryo) with ❤️**
```

This `README.md` provides a comprehensive overview of your project, its features, and how to use it. Let me know if you'd like further modifications!

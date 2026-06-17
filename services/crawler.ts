import axios from 'axios';
import * as cheerio from 'cheerio';

export interface CrawlResult {
  html: string;
  $: cheerio.CheerioAPI;
  url: string;
  statusCode: number;
}

export class WebCrawler {
  private static readonly USER_AGENT = 'Mozilla/5.0 (compatible; SEOToolkit/1.0; +https://seotoolkit.com/bot)';
  private static readonly TIMEOUT = 10000; // 10 seconds
  private static readonly ALLOWED_PROTOCOLS = ['http:', 'https:'];

  private static validateUrl(url: string): void {
    try {
      const urlObj = new URL(url);
      
      // Only allow http and https protocols
      if (!this.ALLOWED_PROTOCOLS.includes(urlObj.protocol)) {
        throw new Error(`Invalid protocol: ${urlObj.protocol}. Only HTTP and HTTPS are allowed.`);
      }

      // Prevent access to localhost and private IP ranges
      const hostname = urlObj.hostname.toLowerCase();
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '0.0.0.0' ||
        hostname.match(/^10\./) ||
        hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./) ||
        hostname.match(/^192\.168\./) ||
        hostname.match(/^169\.254\./) ||
        hostname.match(/^::1$/) ||
        hostname.match(/^fc00:/) ||
        hostname.match(/^fe80:/)
      ) {
        throw new Error('Access to private/local networks is not allowed');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Invalid URL format');
    }
  }

  static async crawl(url: string): Promise<CrawlResult> {
    // Validate URL before making request
    this.validateUrl(url);

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.USER_AGENT,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        timeout: this.TIMEOUT,
        maxRedirects: 5,
        validateStatus: (status) => status < 500, // Accept any status code below 500
      });

      const html = response.data;
      const $ = cheerio.load(html);

      return {
        html,
        $,
        url: response.request.res.responseUrl || url,
        statusCode: response.status,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to crawl ${url}: ${error.message}`);
      }
      throw new Error(`Failed to crawl ${url}: Unknown error`);
    }
  }

  static async fetchXML(url: string): Promise<string> {
    // Validate URL before making request
    this.validateUrl(url);

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.USER_AGENT,
          'Accept': 'application/xml,text/xml,*/*',
        },
        timeout: this.TIMEOUT,
        maxRedirects: 5,
      });

      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch XML from ${url}: ${error.message}`);
      }
      throw new Error(`Failed to fetch XML from ${url}: Unknown error`);
    }
  }

  static async checkResource(url: string): Promise<boolean> {
    // Validate URL before making request
    try {
      this.validateUrl(url);
    } catch {
      return false;
    }

    try {
      const response = await axios.head(url, {
        headers: {
          'User-Agent': this.USER_AGENT,
        },
        timeout: 5000,
        maxRedirects: 5,
        validateStatus: (status) => status >= 200 && status < 400,
      });

      return response.status >= 200 && response.status < 400;
    } catch {
      return false;
    }
  }
}

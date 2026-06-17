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

  static async crawl(url: string): Promise<CrawlResult> {
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
    } catch (error: any) {
      throw new Error(`Failed to crawl ${url}: ${error.message}`);
    }
  }

  static async fetchXML(url: string): Promise<string> {
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
    } catch (error: any) {
      throw new Error(`Failed to fetch XML from ${url}: ${error.message}`);
    }
  }

  static async checkResource(url: string): Promise<boolean> {
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

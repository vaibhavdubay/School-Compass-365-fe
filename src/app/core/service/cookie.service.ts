import { Inject, Injectable, Optional } from '@angular/core';
import { Request } from 'express';

@Injectable({ providedIn: 'root' })
export class CookieService {
  isBrowser: boolean = false;
  private serverCookies!: { [k: string]: string };

  constructor(@Optional() @Inject('REQUEST') req: Request) {
    const serverCookies: string = req?.headers?.cookie || '';
    if (serverCookies) {
      this.serverCookies = this.parseCookies(serverCookies);
    }
    this.isBrowser = typeof document !== 'undefined';
  }

  /**
   * Get a cookie by name
   * @param name The name of the cookie
   * @returns {string} The cookie value
   */
  get(name: string): string | undefined {
    const cookies = this.getAll();
    if (!name || !cookies) {
      throw new Error('Invalid cookie name or no cookies found.');
    }
    return cookies[name];
  }

  /**
   * Get all cookies as an object
   * @returns {Object} An object containing all the cookies
   */
  getAll(): { [name: string]: string } {
    const cookies = this.isBrowser
      ? this.parseCookies(document.cookie)
      : this.serverCookies;
    return cookies || {};
  }

  /**
   * Delete a cookie by name
   * @param name The name of the cookie
   */
  delete(name: string): void {
    if (!name) {
      throw new Error('Invalid cookie name to delete.');
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  /**
   * Delete all cookies
   */
  deleteAll(): void {
    Object.keys(this.getAll()).forEach(this.delete);
  }

  /**
   * Parse a cookie string into an object (internal helper)
   * @param cookiesString The cookie string to parse into an object
   * @returns An object containing the parsed cookies
   */
  private parseCookies(cookiesString: string): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const pairs = cookiesString.split(';');
    pairs.forEach((pair) => {
      const [key, value] = pair.trim().split('=');
      cookies[key] = decodeURIComponent(value);
    });
    return cookies;
  }

  /**
   * Set a cookie.
   *
   * @param name The name of the cookie. Must be a non-empty string without special characters (except =, ;, \).
   * @param value The value of the cookie. Must be a string.
   * @param options (Optional) Cookie options:
   *   - expires (number or Date): The expiration time for the cookie in seconds (milliseconds) or a Date object. If not set, the cookie expires when the browser is closed.
   *   - path (string): The path on which the cookie is accessible. Defaults to the current path.
   *   - domain (string): The domain for which the cookie is valid. Defaults to the current domain.
   *   - secure (boolean): Whether the cookie should only be transmitted over a secure HTTPS connection (true) or not (false). Defaults to false.
   *   - sameSite (string): The SameSite attribute for the cookie, which controls how the cookie is sent with cross-site requests. Must be "Lax", "Strict", or "None". Defaults to an empty string (browser behavior may vary).
   *
   * @throws Error
   *   - If the name is invalid (empty string or contains special characters).
   *   - If the value is invalid (not a string).
   *   - If the expires option is invalid (not a number or a Date object).
   *   - If the sameSite option is invalid (not "Lax", "Strict", or "None").
   */
  set(name: string, value: string, options: CookieOptions = {}): void {
    // Validate name and value
    if (!name || !/^[^;\s=\\]+$/.test(name)) {
      throw new Error(
        'Invalid cookie name. Must be a non-empty string without special characters (except =, ;, \\).',
      );
    }
    if (!value) {
      throw new Error('Invalid cookie value. Must be a string.');
    }

    // Encode value to prevent security issues
    value = encodeURIComponent(value);

    // Set expiration (if provided)
    let expires = '';
    if (options.expires) {
      if (typeof options.expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 1000); // Milliseconds
        expires = `; expires=${date.toUTCString()}`;
      } else if (options.expires instanceof Date) {
        expires = `; expires=${options.expires.toUTCString()}`;
      } else {
        throw new Error(
          'Invalid expires option. Must be a number (seconds) or a Date object.',
        );
      }
    }

    // Set path, domain, secure, and sameSite (if provided)
    const path = options.path ? `; path=${options.path}` : '';
    const domain = options.domain ? `; domain=${options.domain}` : '';
    const secure = options.secure ? '; secure' : '';
    const sameSite = options.sameSite ? `; SameSite=${options.sameSite}` : '';

    // Validate sameSite value (if provided)
    if (
      options.sameSite &&
      !['Lax', 'Strict', 'None'].includes(options.sameSite)
    ) {
      throw new Error(
        'Invalid sameSite option. Must be "Lax", "Strict", or "None".',
      );
    }
    const cookie = `${name}=${value}${expires}${path}${domain}${secure}${sameSite}`;
    // Construct and set the cookie
    document.cookie = cookie;
  }
}

type CookieSameSite = 'Lax' | 'Strict' | 'None';

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: CookieSameSite;
}

import { Injectable, NgZone, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '@environments/environment';

export enum AnalyticsEvent {
  PageView = 'page_view',
  BlogListView = 'blog_list_view',
  BlogArticleOpen = 'blog_article_open',
  BlogArticleRead = 'blog_article_read',
  BlogScrollDepth = 'blog_scroll_depth',
  BlogFilter = 'blog_filter',
  BlogPagination = 'blog_pagination',
  OutboundLink = 'outbound_link'
}

interface BlogArticleReadPayload extends Record<string, string | number | boolean | undefined> {
  slug: string;
  time_spent_ms: number;
  word_count?: number;
  scroll_depth_max?: number;
}

interface ScrollDepthPayload extends Record<string, string | number | boolean | undefined> {
  slug: string;
  depth: number;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private routerInitialized = false;
  private currentRouteStart = performance.now();
  private currentArticleSlug: string | null = null;
  private maxScrollDepth = 0;
  private scrollListenerAdded = false;
  private router = inject(Router);
  private zone = inject(NgZone);

  init(): void {
    if (this.routerInitialized) return;
    this.routerInitialized = true;

    this.zone.runOutsideAngular(() => {
      this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((e) => {
        const url = e.urlAfterRedirects;
        this.trackPageView(url, document.title);
        this.handleBlogRoute(url);
      });
    });
  }

  trackPageView(path: string, title?: string): void {
    this.sendEvent(AnalyticsEvent.PageView, {
      page_location: environment.appUrl + path.replace(/^\//, ''),
      page_path: path,
      page_title: title || document.title
    });
  }

  trackBlogListView(): void {
    this.sendEvent(AnalyticsEvent.BlogListView, {});
  }

  trackBlogArticleOpen(slug: string): void {
    this.currentArticleSlug = slug;
    this.currentRouteStart = performance.now();
    this.maxScrollDepth = 0;
    this.attachScrollDepthListener();
    this.sendEvent(AnalyticsEvent.BlogArticleOpen, { slug });
  }

  trackBlogArticleRead(payload: BlogArticleReadPayload): void {
    this.sendEvent(AnalyticsEvent.BlogArticleRead, payload);
    this.detachScrollDepthListener();
    this.currentArticleSlug = null;
  }

  trackScrollDepth(payload: ScrollDepthPayload): void {
    this.sendEvent(AnalyticsEvent.BlogScrollDepth, payload);
  }

  trackBlogFilter(appliedTags: string[]): void {
    this.sendEvent(AnalyticsEvent.BlogFilter, { tags: appliedTags.join(','), count: appliedTags.length });
  }

  trackBlogPagination(page: number): void {
    this.sendEvent(AnalyticsEvent.BlogPagination, { page });
  }

  trackOutboundLink(url: string): void {
    this.sendEvent(AnalyticsEvent.OutboundLink, { url });
  }

  private handleBlogRoute(url: string): void {
    const wasOnArticle = this.currentArticleSlug;
    if (wasOnArticle && !url.includes('/blog-ressources/')) {
      const timeSpent = performance.now() - this.currentRouteStart;
      const wordCount = this.estimateArticleWordCount();
      this.trackBlogArticleRead({
        slug: wasOnArticle,
        time_spent_ms: Math.round(timeSpent),
        word_count: wordCount,
        scroll_depth_max: Math.round(this.maxScrollDepth)
      });
    }

    if (url === '/blog-ressources' || url.startsWith('/blog-ressources?')) {
      this.trackBlogListView();
    }

    const articleMatch = url.match(/^\/blog-ressources\/(.+)/);
    if (articleMatch) {
      const slug = articleMatch[1].split('?')[0];
      if (slug) this.trackBlogArticleOpen(slug);
    }
  }

  private attachScrollDepthListener(): void {
    if (this.scrollListenerAdded) return;
    this.scrollListenerAdded = true;
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  private detachScrollDepthListener(): void {
    if (!this.scrollListenerAdded) return;
    window.removeEventListener('scroll', this.onScroll);
    this.scrollListenerAdded = false;
  }

  private onScroll = () => {
    if (!this.currentArticleSlug) return;
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const viewportHeight = window.innerHeight;
    const fullHeight = doc.scrollHeight;
    const depth = Math.min(100, ((scrollTop + viewportHeight) / fullHeight) * 100);
    if (depth > this.maxScrollDepth) {
      this.maxScrollDepth = depth;
      const milestones = [25, 50, 75, 100];
      for (const m of milestones) {
        if (depth >= m && this.maxScrollDepth - depth < 1) {
          this.trackScrollDepth({ slug: this.currentArticleSlug, depth: Math.round(m) });
        }
      }
    }
  };

  /** Estimate number of words in article content (very rough) */
  private estimateArticleWordCount(): number | undefined {
    const articleEl = document.querySelector('[data-article-content]');
    if (!articleEl) return undefined;
    const text = articleEl.textContent || '';
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
  }

  /** Safe gtag wrapper */
  private sendEvent(name: string, params: Record<string, string | number | boolean | undefined>): void {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params);
  }
}

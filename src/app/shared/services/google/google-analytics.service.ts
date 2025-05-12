import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'environments/environment';

let gtag: (...args: unknown[]) => void;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  #router = inject(Router);

  initialize() {
    this.onRouteChange();
    try {
      const url = 'https://www.googletagmanager.com/gtag/js?id=';
      const gTagScript = document.createElement('script');
      gTagScript.async = true;
      gTagScript.src = `${url}${environment.googleAnalyticsId}`;
      document.head.appendChild(gTagScript);
      const dataLayerScript = document.createElement('script');
      dataLayerScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${environment.googleAnalyticsId}', {'send_page_view': false});`;
      document.head.appendChild(dataLayerScript);
    } catch {
      console.error('Google Analytics script failed to load.');
    }
  }

  onRouteChange(): void {
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.googleAnalyticsId, {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }

  event(action: string, eventCategory?: string, eventLabel?: string, value?: string) {
    gtag('event', action, {
      ...(eventCategory && { event_category: eventCategory }),
      ...(eventLabel && { event_label: eventLabel }),
      ...(value && { value: value })
    });
  }
}

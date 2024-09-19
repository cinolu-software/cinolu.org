import { AfterViewInit, Directive, ElementRef, input, OnDestroy, OnInit } from '@angular/core';
import { delay, filter, Subject } from 'rxjs';

@Directive({
  selector: '[observeVisibility]',
  standalone: true
})
export class ObserveVisibilityDirective implements OnDestroy, OnInit, AfterViewInit {
  debounceTime = input<number>(0);

  private observer: IntersectionObserver | undefined;
  private subject$ = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.createObserver();
  }

  ngAfterViewInit() {
    this.startObservingElements();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
    this.subject$.unsubscribe();
  }

  private isVisible(element: HTMLElement) {
    return new Promise((resolve) => {
      const observer = new IntersectionObserver(([entry]) => {
        resolve(entry.intersectionRatio === 1);
        observer.disconnect();
      });
      observer.observe(element);
    });
  }

  private createObserver() {
    const options = {
      rootMargin: '0px',
      threshold: 0.1
    };
    if (typeof window === 'undefined') return;
    const isIntersecting = (entry: IntersectionObserverEntry) => entry.isIntersecting || entry.intersectionRatio > 0;
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (isIntersecting(entry)) {
          this.subject$.next({ entry, observer });
        }
      });
    }, options);
  }

  private startObservingElements() {
    if (!this.observer) return;
    this.observer.observe(this.element.nativeElement);
    this.subject$.pipe(delay(this.debounceTime()), filter(Boolean)).subscribe(async ({ entry, observer }) => {
      const target = entry.target as HTMLElement;
      target.classList.replace('hidde', 'show');
      const isStillVisible = await this.isVisible(target);
      if (isStillVisible) observer.unobserve(target);
    });
  }
}

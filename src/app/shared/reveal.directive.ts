import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

// Faded Host-Element per CSS ein, sobald es in den Viewport scrollt.
// JS übernimmt nur die Erkennung (IntersectionObserver setzt .is-visible),
// die eigentliche Animation ist reines CSS (siehe .reveal in styles.scss).
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal'
  }
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.el.nativeElement.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }
      this.el.nativeElement.classList.add('is-visible');
      this.observer?.disconnect();
    }, { threshold: 0.15 });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

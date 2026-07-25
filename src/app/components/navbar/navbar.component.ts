import { AfterViewInit, Component, ElementRef, OnDestroy, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private sentinel = viewChild<ElementRef<HTMLElement>>('sentinel');

  readonly navLinks = [
    { fragment: 'ueber-uns', label: 'Über uns' },
    { fragment: 'leistungen', label: 'Leistungen' },
    { fragment: 'referenzen', label: 'Referenzen' },
    { fragment: 'karriere', label: 'Karriere' },
    { fragment: 'kontakt', label: 'Kontakt' },
  ];

  menuOpen = signal(false);
  scrolled = signal(false);

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const el = this.sentinel()?.nativeElement;
    if (!el) {
      return;
    }

    this.observer = new IntersectionObserver(([entry]) => {
      this.scrolled.set(!entry.isIntersecting);
    });
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}

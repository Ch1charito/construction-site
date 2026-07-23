import { AfterViewInit, Component, ElementRef, OnDestroy, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private sentinel = viewChild<ElementRef<HTMLElement>>('sentinel');

  readonly navLinks = [
    { href: '#ueber-uns', label: 'Über uns' },
    { href: '#leistungen', label: 'Leistungen' },
    { href: '#referenzen', label: 'Referenzen' },
    { href: '#karriere', label: 'Karriere' },
    { href: '#kontakt', label: 'Kontakt' },
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

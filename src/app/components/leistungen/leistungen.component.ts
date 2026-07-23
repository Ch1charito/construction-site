import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-leistungen',
  imports: [RevealDirective],
  templateUrl: './leistungen.component.html',
  styleUrl: './leistungen.component.scss'
})
export class LeistungenComponent {
  readonly leistungen = [
    { title: 'Rohbau', text: 'Fundament, Wände, Decken — der tragende Kern, maßgenau und termingerecht.' },
    { title: 'Ausbau', text: 'Trockenbau, Böden, Innenausbau bis ins Detail — aus Rohbauten werden nutzbare Räume.' },
    { title: 'Sanierung & Renovierung', text: 'Altbausanierung, energetische Modernisierung, Renovierung im Bestand.' },
    { title: 'Straßenbau', text: 'Erschließung, Pflasterarbeiten, Asphaltierung rund ums Gebäude.' },
    { title: 'Forst & Winterdienst', text: 'Baumpflege, Grünschnitt, Winterdienst für Privat- und Gewerbekunden.' },
  ];
}

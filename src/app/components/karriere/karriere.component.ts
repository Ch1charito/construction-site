import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-karriere',
  imports: [RevealDirective],
  templateUrl: './karriere.component.html',
  styleUrl: './karriere.component.scss'
})
export class KarriereComponent {
  readonly stellen = [
    { title: 'Maurer / Rohbauer (m/w/d)', type: 'Vollzeit', description: 'Erfahrung im Hoch- und Rohbau, Führerschein Klasse B von Vorteil.' },
    { title: 'Trockenbaumonteur (m/w/d)', type: 'Vollzeit', description: 'Selbstständiges Arbeiten im Innenausbau, sauberes Verarbeiten von Ständerwerk und Beplankung.' },
    { title: 'Bauhelfer (m/w/d)', type: 'Vollzeit', description: 'Für Baustellen im Raum München, Berufseinstieg möglich, Zuverlässigkeit wichtiger als Erfahrung.' },
    { title: 'Baugeräteführer (m/w/d)', type: 'Vollzeit', description: 'Bedienung von Bagger und Radlader im Tief- und Straßenbau, entsprechender Führerschein erforderlich.' },
    { title: 'Auszubildender zum Hochbaufacharbeiter (m/w/d)', type: 'Ausbildung', description: 'Start jährlich im September, Interesse am Handwerk und Teamgeist vorausgesetzt.' },
  ];
}

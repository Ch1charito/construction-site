import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-referenzen',
  imports: [RevealDirective],
  templateUrl: './referenzen.component.html',
  styleUrl: './referenzen.component.scss'
})
export class ReferenzenComponent {
  readonly referenzen = [
    { src: 'ref-rohbau.webp', width: 1200, height: 800, title: 'Rohbau Mehrfamilienhaus', alt: 'Zwei Bauarbeiter auf dem Rohbau eines mehrstöckigen Gebäudes' },
    { src: 'ref-trockenbau.webp', width: 1200, height: 675, title: 'Trockenbau Gewerbefläche', alt: 'Trockenbau-Deckenkonstruktion in einem Rohbau-Innenraum' },
    { src: 'ref-sanierung.webp', width: 1200, height: 800, title: 'Fassadensanierung', alt: 'Eingerüstete Hausfassaden während der Sanierung' },
    { src: 'ref-innenausbau.webp', width: 1200, height: 801, title: 'Innenausbau Wohnhaus', alt: 'Hochwertig ausgebauter Wohnraum mit Holzboden und Einbauregal' },
    { src: 'ref-strassenbau.webp', width: 1200, height: 680, title: 'Straßenbau Erschließung', alt: 'Bauarbeiter beim Verlegen von Asphalt im Straßenbau' },
    { src: 'ref-forst.webp', width: 1200, height: 799, title: 'Forstarbeiten & Holzernte', alt: 'Forstmaschine bei der Holzernte im Wald' },
  ];
}

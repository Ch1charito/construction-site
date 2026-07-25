# Bautista GmbH — Projektkontext

Statische Angular-19-Website für ein fiktives Bauunternehmen. Portfolioprojekt,
wird nur auf der eigenen Domain gehostet und nicht produktiv eingesetzt.
Alle Inhalte sind Beispieltexte und später in den Components austauschbar.

Sprache im Projekt und in der Kommunikation: Deutsch.

## Ordnerlage

Das Referenzprojekt liegt eine Ebene über diesem Repo und wird nur gelesen,
nie verändert:

```
Projekte/
  new-Cacao-Site/      Referenz — git clone https://github.com/Ch1charito/new-Cacao-Site.git
  construction-site/   dieses Repo
```

Falls `new-Cacao-Site` fehlt, dorthin klonen. Nicht in dieses Repo hinein.

## Stack

Angular 19, standalone Components, HTML + SCSS + TypeScript. Sonst nichts.

- Kein i18n. Die Referenz nutzt `@ngx-translate` — das wird hier vollständig
  weggelassen. Texte stehen direkt im Template.
- Keine UI-Library, kein Tailwind, kein Animations-Framework.
- `provideHttpClient()` wird gebraucht, aber nur fürs Kontaktformular.
- Animationen ausschließlich per CSS, kein JS. Ausnahme: Scroll-Reveal (siehe
  eigener Abschnitt) — JS erkennt nur den Zeitpunkt, animiert wird per CSS.

## Aufbau, übernommen von der Referenz

- `app.component.html` enthält nur `<router-outlet>`
- `app.routes.ts`: `''` → MainPage, `impressum`, `datenschutz`
- `main-page.component.html` komponiert alle Sections
- Section-Components unter `src/app/components/<name>/`
- `impressum` und `datenschutz` liegen direkt unter `src/app/`
- `src/sendMail.php` im Wurzelverzeichnis von `src/`
- Bilder und Fonts unter `public/assets/`

## Sections in dieser Reihenfolge

1. `navbar`
2. `hero`
3. `ueber-uns` — Unternehmen und Geschäftsführung
4. `leistungen` — fünf Karten: Rohbau, Ausbau (Trockenbau + Innenausbau),
   Sanierung & Renovierung, Straßenbau, Forst & Winterdienst
5. `referenzen` — Bildraster mit sechs Projekten
6. `karriere` — bewusst schlank, kurzer Aufruf, keine aufgeblähte Stellenbörse
7. `kontakt` — Formular, Logik 1:1 aus der Referenz
8. `footer` — Links zu Impressum und Datenschutz

## Design-Tokens

Alle Farben als CSS-Variablen in `:root` in `styles.scss`. Keine Hex-Werte
in Component-SCSS.

```scss
--bg:      #16171A;   // Graphit
--surface: #202226;
--line:    #33363B;   // verzinktes Gerüstrohr
--text:    #EDEBE7;
--muted:   #85888E;
--accent:  #D4A017;   // Schalungsträger-Ocker
```

Der Ockerton stammt aus den Schalungsträgern auf `ref-rohbau.jpg`. Er ist die
einzige Farbe im Layout und wird sparsam eingesetzt: Linien, Hover-Zustände,
aktiver Navigationspunkt. Nicht für Flächen.

## Typografie

- Display: **Archivo**, breit getrackt, Versalien
- Fließtext: **IBM Plex Sans**
- Eyebrows, Labels, Zahlen: **IBM Plex Mono**

Alle Schnitte lokal als `woff2` unter `public/assets/fonts/` einbinden, per
`@font-face` in `styles.scss`. Keine Google-Fonts-CDN. Nur die tatsächlich
benutzten Schnitte laden.

## Hero

Kein Vollbildfoto mit Overlay — das ist der Standard-Hero jeder
Bauunternehmensseite und wird hier bewusst vermieden.

Stattdessen: dunkler, weitgehend leerer Screen. Zentral die Wortmarke
`BAUTISTA` als Inline-SVG, darunter klein `GMBH` in Mono. Eine dünne
Ockerlinie, eine knappe Zeile Text. Unten ein Scroll-Hinweis wie in der
Referenz.

**Signature-Animation:** Die Wortmarke baut sich beim Laden auf wie eine
technische Zeichnung. Zuerst erscheinen dünne Hilfslinien in `--line`, dann
werden die Buchstabenkonturen per `stroke-dasharray` / `stroke-dashoffset`
gezeichnet, zuletzt füllt sich die Fläche und die Hilfslinien blenden aus.
Ein orchestrierter Moment, keine verstreuten Effekte.

Kein Bildzeichen, kein Bagger-Icon, kein Haus-Symbol. Reine Wortmarke.

`prefers-reduced-motion` überall respektieren.

## Scroll-Reveal

Section-Inhalte faden per `appReveal`-Directive ein, sobald sie in den
Viewport scrollen (`src/app/shared/reveal.directive.ts`, wiederverwendbar,
nicht pro Component neu bauen).

- Directive hängt einen `IntersectionObserver` an, setzt bei Eintritt in den
  Viewport die Klasse `.is-visible`, die eigentliche Animation (Opacity +
  Transform) läuft über `.reveal` / `.reveal.is-visible` in `styles.scss`.
- Nach dem ersten Auslösen `disconnect()` — kein wiederholtes Ein-/Ausblenden
  beim Hoch-/Runterscrollen.
- `prefers-reduced-motion: reduce`: Directive setzt `.is-visible` sofort ohne
  Observer, Inhalt ist direkt sichtbar, kein Fade.
- Anwendung: `appReveal`-Attribut auf das zu animierende Element setzen, fertig.

## Bilder

Liegen bereit und müssen **vor** dem Einbinden verarbeitet werden. Aktuell
zusammen rund 34 MB, einzelne Dateien bis 7841 px Breite.

- Hero auf 2000 px Breite, alle anderen auf 1200 px
- Nach WebP konvertieren, Original-JPGs nicht einchecken
- Ziel: keine Datei über 250 KB

Dateien:

```
hero.jpg              Betonwand, neutrales Grau
ueber-uns.jpg
ref-rohbau.jpg
ref-trockenbau-2.jpg  → als ref-trockenbau.webp ablegen
ref-sanierung.jpg
ref-innenausbau.jpg
ref-strassenbau.jpg
ref-forst.jpg
karriere.jpg
```

`ref-trockenbau.jpg` (die erste Variante) wird nicht verwendet.

Die Referenzbilder werden **nicht** in Graustufen gezeigt — sie sind von
Anfang an farbig, kein Akzentfarb-Effekt beim Hover. Hover-Feedback (nur
`@media (hover: hover)`, also nicht auf Touch-Geräten) läuft rein über
Bewegung: leichtes Anheben der Kachel (`translateY`), minimaler Zoom aufs
Bild im `overflow: hidden`-Rahmen.
Der Hero bekommt zusätzlich eine dunkle Abdunklung, damit die Wortmarke steht.

## Kontaktformular

Aus `../new-Cacao-Site/src/app/components/kontakt/` übernehmen, dabei:

- `TranslatePipe` und alle `| translate` entfernen
- `endPoint` auf die neue Domain anpassen
- In `sendMail.php` `$recipient` und den `From:`-Header anpassen
- Das `mailTest`-Flag sauber kommentieren: `true` = lokal simulieren,
  `false` = echt senden. Der Kommentar in der Referenz ist widersprüchlich.

## Setup

Angular CLI legt beim `ng new` bereits ein Git-Repo mit erstem Commit an.
Also nicht vorher `git init` oder ein `README.md` von Hand anlegen — das
kollidiert mit dem generierten.

```bash
ng new construction-site --style=scss --ssr=false
cd construction-site
git branch -M main
git remote add origin https://github.com/Ch1charito/construction-site.git
git push -u origin main
```

## Arbeitsweise

Branches, ein Schritt pro Branch:

```
feature/setup           Fonts, styles.scss, Tokens, Bildverarbeitung
feature/navbar
feature/hero            inkl. Wortmarke und Animation
feature/ueber-uns
feature/leistungen
feature/referenzen
feature/karriere
feature/kontakt
feature/footer-legal
```

Ablauf pro Schritt: Branch anlegen, arbeiten, committen, pushen, dann stoppen
und Robin reviewen lassen. Erst nach seiner Freigabe nach `main` mergen und
den Branch löschen. Nichts wird ungeprüft nach `main` gebracht.

Push nach jedem abgeschlossenen Punkt, nicht erst am Ende.

## Zusammenarbeit mit Robin

- Frontend-Entwickler, Angular und SCSS sind vertraut. Keine Grundlagen erklären.
- Kurze, direkte Antworten. Keine Füllsätze, kein Lob.
- Bei Unsicherheit nachfragen statt raten oder erfinden.
- Pro Component erst Einschätzung und ehrliches Feedback, dann Umsetzung.
- Der gestalterische Durchgang kommt vor funktionalem Refactoring.
- Er bevorzugt reduziertes Design. Im Zweifel ein Element weglassen.

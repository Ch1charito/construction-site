import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HeroComponent } from '../components/hero/hero.component';
import { UeberUnsComponent } from '../components/ueber-uns/ueber-uns.component';

@Component({
  selector: 'app-main-page',
  imports: [NavbarComponent, HeroComponent, UeberUnsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}

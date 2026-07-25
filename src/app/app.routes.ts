import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
];

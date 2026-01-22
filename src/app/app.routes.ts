import { Routes } from '@angular/router';
import {JuguetesList} from './components/web/juguetes/juguetes-list/juguetes-list';
import {JuguetesDetail} from './components/web/juguetes/juguetes-detail/juguetes-detail';
import {CosmeticosList} from './components/web/cosmeticos/cosmeticos-list/cosmeticos-list';
import {CosmeticosDetail} from './components/web/cosmeticos/cosmeticos-detail/cosmeticos-detail';
import {CosmeticosCartPage} from './components/web/cosmeticos/cosmeticos-cart-page/cosmeticos-cart-page';
import {JuguetesCartPage} from './components/web/juguetes/juguetes-cart-page/juguetes-cart-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'juguetes/list',
    pathMatch: 'full',
  },
  {
    path: 'juguetes/list',
    component: JuguetesList
  },
  {
    path: 'juguetes/cart',
    component: JuguetesCartPage
  },
  {
    path: 'juguetes/add',
    component: JuguetesDetail
  },
  {
    path: 'juguetes/edit/:id',
    component: JuguetesDetail
  },
  {
    path: 'cosmeticos/list',
    component: CosmeticosList
  },
  {
    path: 'cosmeticos/cart',
    component: CosmeticosCartPage
  },
  {
    path: 'cosmeticos/add',
    component: CosmeticosDetail
  },
  {
    path: 'cosmeticos/edit/:id',
    component: CosmeticosDetail
  },
  {
    path: '**',
    redirectTo: 'juguetes/list',
    pathMatch: 'full',
  }
];

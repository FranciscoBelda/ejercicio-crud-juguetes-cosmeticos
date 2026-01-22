import {Component, inject, Signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {JugueteCartService} from '../../../services/juguete-cart-service';
import {CosmeticoCartService} from '../../../services/cosmetico-cart-service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    CurrencyPipe
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly jugueteCartService: JugueteCartService = inject(JugueteCartService);
  private readonly cosmeticoCartService: CosmeticoCartService = inject(CosmeticoCartService);

  cartJuguetesTotalItems: Signal<number> = this.jugueteCartService.cartTotalItems;
  cartJuguetesTotalPrice: Signal<number> = this.jugueteCartService.cartTotalPrice;

  cartCosmeticosTotalItems: Signal<number> = this.cosmeticoCartService.cartTotalItems;
  cartCosmeticosTotalPrice: Signal<number> = this.cosmeticoCartService.cartTotal;
}

import {Component, inject} from '@angular/core';
import {JugueteCartService} from '../../../../services/juguete-cart-service';

@Component({
  selector: 'app-juguetes-cart-page',
  imports: [],
  templateUrl: './juguetes-cart-page.html',
  styleUrl: './juguetes-cart-page.css',
})
export class JuguetesCartPage {
  private readonly jugueteCartService: JugueteCartService = inject(JugueteCartService);
  cartItems = this.jugueteCartService.cartItems;
  cartTotalItems = this.jugueteCartService.cartTotalItems;
  cartTotalPrice = this.jugueteCartService.cartTotalPrice;
}

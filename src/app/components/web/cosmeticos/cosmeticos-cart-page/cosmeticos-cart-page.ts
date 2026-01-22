import {Component, inject} from '@angular/core';
import {CosmeticoCartService} from '../../../../services/cosmetico-cart-service';

@Component({
  selector: 'app-cosmeticos-cart-page',
  imports: [],
  templateUrl: './cosmeticos-cart-page.html',
  styleUrl: './cosmeticos-cart-page.css',
})
export class CosmeticosCartPage {
  private readonly cosmeticoCartService: CosmeticoCartService = inject(CosmeticoCartService);
  cartItems = this.cosmeticoCartService.cartItems;
  cartTotalItems = this.cosmeticoCartService.cartTotalItems;
  cartTotalPrice = this.cosmeticoCartService.cartTotal;
}

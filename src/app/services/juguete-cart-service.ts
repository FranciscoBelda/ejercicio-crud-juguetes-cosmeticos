import {computed, Injectable, signal, WritableSignal} from '@angular/core';
import {JugueteItem} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class JugueteCartService {
  private cartItemsSignal: WritableSignal<JugueteItem[]> = signal<JugueteItem[]>([]);
  readonly cartItems = this.cartItemsSignal.asReadonly();

  readonly cartTotalPrice = computed(() => {
    return this.cartItems().reduce(
      (sum, item) => sum + item.precio * item.quantity, 0
    )
  });

  readonly cartTotalItems = computed(() => {
    return this.cartItems().reduce(
      (sum, item) => sum + item.quantity, 0
    )
  });

  addToCart(juguete: Omit<JugueteItem, 'quantity'>){
    this.cartItemsSignal.update(items => {
      const existingItem = items.find(i => i._id === juguete._id);

      if (existingItem){
        return items.map(i => i._id === juguete._id ? {...i, quantity: i.quantity + 1} : i);
      }else {
        return [...items, {...juguete, quantity: 1}];
      }
    })
  }

  removeFromCart(jugueteId: string){
    this.cartItemsSignal.update(items => items.filter(i => i._id !== jugueteId));
  }

  updateQuantity(jugueteId: string, newQuantity: number){
    if (newQuantity <= 0){
      this.removeFromCart(jugueteId);
      return;
    }
    this.cartItemsSignal.update(items => {
      return items.map(item => item._id === jugueteId ? {...item, quantity: newQuantity} : item);
    })
  }

  clearCart(){
    this.cartItemsSignal.set([]);
  }

}

import {computed, Injectable, signal, WritableSignal} from '@angular/core';
import {CosmeticoItem} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CosmeticoCartService {
  private cartItemsSignal: WritableSignal<CosmeticoItem[]> = signal<CosmeticoItem[]>([]);
  readonly cartItems = this.cartItemsSignal.asReadonly();

  readonly cartTotal = computed(() => {
    return this.cartItems().reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    )
  });

  readonly cartTotalItems = computed(() => {
    return this.cartItems().reduce(
      (sum, item) => sum + item.quantity, 0
    )
  });

  addToCart(cosmetico: Omit<CosmeticoItem, 'quantity'>){
    this.cartItemsSignal.update(items => {
      const existingItem = items.find(i => i._id === cosmetico._id);

      if (existingItem){
        return items.map(i => i._id === cosmetico._id ? {...i, quantity: i.quantity + 1} : i);
      }else {
        return [...items, {...cosmetico, quantity: 1}]
      }
    })
  }

  removeFromCart(cosmeticoId: string){
    this.cartItemsSignal.update(items => items.filter(item => item._id !== cosmeticoId));
  }

  updateQuantity(cosmeticoId: string, newQuantity: number){
    if (newQuantity <= 0){
      this.removeFromCart(cosmeticoId);
      return;
    }
    this.cartItemsSignal.update(items => {
      return items.map(item => item._id === cosmeticoId ? {...item, quantity: newQuantity} : item);
    })
  }

  clearCart(){
    this.cartItemsSignal.set([]);
  }

}

import { Component, inject } from '@angular/core';
import { CartItemComponent } from "./ui/cart-item/cart-item.component";
import { CartStateService } from '../share/data-access/cart-state.service';
import { ProductItemCart } from '../share/interfaces/product.inerface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export default class CartComponent {
  state = inject(CartStateService).state;

  onRemove(id: number) {
    this.state.remove(id);
  }

  onIncrement(product: ProductItemCart){
    this.state.addMore({
      product: product.product,
      quantity: product.quantity + 1,
    });
  }
  
  onDecrement(product: ProductItemCart){
    //this.state.decrement(product.productCartItem);

    if (product.quantity > 1) {
      this.state.addMore({
        ...product,
        quantity: product.quantity - 1
      })
    } else {
      alert("No se puede decrementar la cantidad a 0, por favor elimine el producto");
    }   
    
  }
}

import { Component, input, output} from '@angular/core';
import { ProductItemCart } from '../../../share/interfaces/product.inerface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  productCartItem = input.required<ProductItemCart>();

  // eliminar el producto del carrito
  onRemove = output<number>();

  // Incrementar
  onIncrement = output<ProductItemCart>();
  // decrementar
  onDecrement = output<ProductItemCart>();
}

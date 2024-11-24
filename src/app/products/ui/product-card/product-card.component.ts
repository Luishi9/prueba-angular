import { Component, input, output } from '@angular/core';
import { Product } from '../../../share/interfaces/product.inerface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  product = input.required<Product>();

  
  addToCart = output<Product>();

  add(event:Event) {
    event.stopPropagation();
    event.preventDefault();

    //console.log(this.product);
    this.addToCart.emit(this.product());

  }
}

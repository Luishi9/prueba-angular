import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../data-access/product-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { CartStateService } from '../../../share/data-access/cart-state.service';
import { Product } from '../../../share/interfaces/product.inerface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsStateService],
})

export default class ProductListComponent {
  //importamos los productos
  //private productsService = inject(ProductService);
  /*
  constructor () {
    this.productsService.getProducts().subscribe((products) => {
      console.log(products);
    })
  }
  */

  productsState =  inject(ProductsStateService);

  // cambio de estado a que se agrego al carrito
  cartState = inject(CartStateService).state;

  changePage(){
    // constante que nos trairia las paginas
    const pages = this.productsState.state.page() + 1;
    this.productsState.changePage$.next(pages);
  }

  // agregamos la funcion que nos permitira agregar un producto al carrito
  // se encuentra en el input del html
  addToCart(product:Product){
    this.cartState.add({
      product,
      quantity: 1,
    })
  }

  
}

import { Component, effect, inject, input } from '@angular/core';
import { ProductDetailStateService } from '../../data-access/product-detail-state.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  providers: [ProductDetailStateService],
})
export default class ProductDetailComponent {
  productDetailState = inject(ProductDetailStateService).state;  
  id = input.required<string>();

  constructor() {
    effect(() => {
      console.log("id recibido en el constructor: ", this.id());
      this.productDetailState.getById(this.id());
    });
  }
  
  // Aquí, inyectamos `ProductDetailStateService` en una propiedad
  private productDetailService = inject(ProductDetailStateService);
  ngOnInit() {
    if (this.id) {
      console.log("ID recibido en el componente:", this.id());
      this.productDetailService.loadProductById(this.id())  // Llama al método
    }
  }
 
}

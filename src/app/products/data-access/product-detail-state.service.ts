import { Injectable, inject } from '@angular/core';
import { Product } from '../../share/interfaces/product.inerface';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductsService } from './products.service';
import { Observable, map, switchMap } from 'rxjs';

interface State {
  product: Product | null;
  status: 'loading' | 'success' | 'error';
}

@Injectable()
export class ProductDetailStateService {
  private productsService = inject(ProductsService);

  private initialState: State = {
    product: null,
    status: 'loading' as const,
  };

  // Usamos signalSlice para definir las acciones
  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<string>) =>
        $.pipe(
          switchMap((id) => {
            console.log("Obteniendo producto con id:", id);
            return this.productsService.getProduct(id);
          }),
          map((data) => {
            console.log("Producto obtenido y actualizado en el estado:", data);
            return { product: data, status: 'success' as const };
          }),
        ),
    },
  });

  // Método de prueba
  loadProductById(id: string) {
    this.state.getById(id);
  }

}

import { Injectable, Signal, inject } from "@angular/core";
import { ProductItemCart } from "../interfaces/product.inerface";
import { signalSlice } from "ngxtension/signal-slice";
import { StorageService } from "./storange.service";
import { count, map, Observable, retry, switchMap } from "rxjs";

interface State {
    // Lista de productos
    products: ProductItemCart[];
    // ya fue cargado o no
    loaded: boolean;
}

@Injectable({
    providedIn: 'root',
})

export class CartStateService {

    private _storageService = inject(StorageService);

    // como iniciara el estado
    private initialState: State = {
        products: [],
        loaded: false,
    };

    // Obserbable
    loadProducts$ = this._storageService
        .loadProducts()
        .pipe(
            map((products) => ({products, loaded: true }))
        );

    state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadProducts$],
        // selectores para la parte de subtotal, total del carrito
        selectors: (state) => ({
            //contador
            count:() => 
                state().products.reduce((acc, product) => acc + product.quantity, 0),
            
            // precio
            price: () => {
                return state().products.reduce(
                    (acc, product) => acc + product.product.price * product.quantity, 0,
                );
            },

        }),

        // action source para trigerear en base a las acciones
        actionSources: {
            // agregamos el estado de agregar
            add: (state, action$: Observable<ProductItemCart>) =>
                action$.pipe(
                    map((product) => this.add(state, product))
                ),
            
            // agregamos el estado de remover
            remove: (state, action$: Observable<number>) => 
                action$.pipe(
                    map((id) => this.remove(state, id))
                ),

            // agregaos el estado de agregar un producto mas desde el carrito
            addMore: (state, action$: Observable<ProductItemCart>) =>
                action$.pipe(
                    map((product) => this.addMore(state, product))
                ),
        },
        // efecto de sideslice
        effects: (state) => ({
            load: () => {
                if (state().loaded) {
                    this._storageService.saveProducts(state().products)
                }
                console.log(state.products());
            },
        }),
    });

    private add(state: Signal<State>, product: ProductItemCart) {
        const isInCart = state().products.find(
            (productInCart) => productInCart.product.id === product.product.id,
        );

        // si no esta en el carrito obtenemos el producto y aumentamos la cantidad en 1
        if(!isInCart){
            return {
                products: [...state().products, {...product, quantity: 1}],
            }
        }

        // si esta en el carrito aumentamos 1 a la cantidad
        isInCart.quantity += 1;
        return {
            products: [...state().products],
        }
    }

    private remove (state: Signal<State>, id: number) {
        return {
            products: state().products.filter((product) => product.product.id !== id),
        }
    }

    private addMore(state: Signal<State>, product: ProductItemCart) {
        
        const products = state().products.map((productInCart) => {
            if(productInCart.product.id === product.product.id) {
                return {...productInCart, quantity: product.quantity}
            }
            return productInCart;
        });        
        return {products}
    }
}
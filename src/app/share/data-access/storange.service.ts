import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ProductItemCart } from "../interfaces/product.inerface";

@Injectable ({
    providedIn: 'root'
})

export class StorageService {
    loadProducts(): Observable<ProductItemCart[]> {
        // productos que vamos a obtener del localStorange
        const rawProducts = localStorage.getItem('products');
        
        return of(rawProducts ?  JSON.parse(rawProducts) : []);

    }

    // guardar productos
    saveProducts(products: ProductItemCart[]): void {
        localStorage.setItem('products', JSON.stringify(products));
    }
}
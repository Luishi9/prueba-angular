// Interfaz para los productos
export interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
}

// exportamos la interfaz que se va a utilizar para carrito de compras
export interface ProductItemCart {
  product: Product;
  quantity: number;
  
}
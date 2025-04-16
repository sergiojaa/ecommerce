interface Product {
    _id: string;
    image: string;
    name: string;
    description: string;
    price: number | string;
    category: "vodka" | "whiskey" | "beer";
}

interface CartItem {
    product: Product;
    quantity: number;
    totalPrice: number;
    typeId?: string;
    typeName?: string;
}

interface CartResponse {
    cartItems: CartItem[];
    totalPrice: number;
}


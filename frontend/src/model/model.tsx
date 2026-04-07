export type CartItem = {
    id: number;
    quantity: number;
    name: string;
  };
  
  export type Cart = {
    items: CartItem[];
  };
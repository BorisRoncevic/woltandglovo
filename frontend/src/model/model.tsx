export type CartItem = {
    id: number;
    quantity: number;
    name: string;
  };
  
  export type Cart = {
    items: CartItem[];
  };

  export type Restaurant = {
    id: number;
    name: string;
  };

  export type Item = {
    id: number;
    name: string;
    description: string;
    price : number;
  };


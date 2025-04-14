import React from "react";
import { ShoppingCart } from "lucide-react";

const Cart = () => (
  <div className="flex items-center ml-3">
    <div className="relative">
      <ShoppingCart size={30} />
      <span className="absolute -top-1 right-0 bg-yellow-500 text-black rounded-full px-1 text-xs font-bold">
        0
      </span>
    </div>
    <span className="font-bold ml-1">Cart</span>
  </div>
);

export default Cart;
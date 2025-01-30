import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash } from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wristwatch Model A", price: 100, quantity: 1 },
    { id: 2, name: "Wristwatch Model B", price: 150, quantity: 1 },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <ShoppingCart className="mr-2" /> Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-4 p-4 flex justify-between items-center">
              <CardContent className="flex-1">
                <h2 className="font-medium">{item.name}</h2>
                <p className="text-gray-500">${item.price} x {item.quantity}</p>
              </CardContent>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                  <Minus size={16} />
                </Button>
                <span>{item.quantity}</span>
                <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                  <Plus size={16} />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => removeItem(item.id)}>
                  <Trash size={16} />
                </Button>
              </div>
            </Card>
          ))}
          <div className="text-right mt-4">
            <p className="text-lg font-bold">Total: ${totalAmount}</p>
            <Button className="mt-2 w-full">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

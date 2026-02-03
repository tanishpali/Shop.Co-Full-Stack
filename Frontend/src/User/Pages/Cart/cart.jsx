import React, { useEffect, useState } from "react";
import { ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import Footer from "../../Pages/Homepage/Footer";
import all_product from "../../../Components/Assets/all_product";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = Cookies.get("token");

  // ================================
  //        FETCH CART API & LOCAL
  // ================================
  useEffect(() => {
    // If no token, we might still want to show static cart? 
    // For now, keeping original logic: require login to see cart page generally,
    // but we can mix both.

    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchCart() {
      let combinedItems = [];

      // 1. Fetch Backend Cart
      try {
        const response = await fetch("http://localhost:4000/getCart", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          combinedItems = [...(data.cart?.items || [])];
        } else {
          // If token invalid etc, might throw
          if (data.msg === "Access Denied! Login First !!!") {
            // handle silently or redirect
          }
          // Don't crash entire cart for backend failure if we have static items
          console.warn("Backend cart fetch failed", data.msg);
        }
      } catch (error) {
        console.error("Cart fetch error:", error.message);
      }

      // 2. Fetch Static Cart (LocalStorage)
      try {
        const staticCart = JSON.parse(localStorage.getItem("static_cart") || "[]");

        const expandedStaticItems = staticCart.map(item => {
          const productDetails = all_product.find(p => p.id === item.productId);
          if (!productDetails) return null;

          return {
            _id: `static_${item.productId}`, // Unique ID for key
            isStatic: true,
            productId: {
              _id: item.productId, // meaningful for static
              productName: productDetails.name,
              price: productDetails.new_price || productDetails.price,
              productImage: productDetails.image // This is the imported image object/string
            },
            quantity: item.quantity
          };
        }).filter(Boolean); // Remove nulls if product not found

        combinedItems = [...combinedItems, ...expandedStaticItems];

      } catch (err) {
        console.error("Static cart load error", err);
      }

      setCartItems(combinedItems);
      setLoading(false);
    }

    fetchCart();
  }, [token, navigate]);

  // ================================
  //      LOCAL STATE HANDLERS
  // ================================
  const handleQuantityChange = (id, quantity) => {
    // Update State
    setCartItems((items) =>
      items.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );

    // If Static, Update LocalStorage
    if (id.toString().startsWith("static_")) {
      const trueId = Number(id.replace("static_", ""));
      const existingCart = JSON.parse(localStorage.getItem("static_cart") || "[]");
      const updatedCart = existingCart.map(item =>
        item.productId === trueId ? { ...item, quantity } : item
      );
      localStorage.setItem("static_cart", JSON.stringify(updatedCart));
    }
  };

  const handleRemoveItem = async (id) => {
    // 1. Find item (needed for Backend ID)
    const itemToRemove = cartItems.find((item) => item._id === id);

    // 2. Optimistic UI Update
    setCartItems((items) => items.filter((item) => item._id !== id));

    // 3. Handle Static vs Backend
    if (id.toString().startsWith("static_")) {
      const trueId = Number(id.replace("static_", ""));
      const existingCart = JSON.parse(localStorage.getItem("static_cart") || "[]");
      const updatedCart = existingCart.filter(item => item.productId !== trueId);
      localStorage.setItem("static_cart", JSON.stringify(updatedCart));
      toast.success("Item removed");
    } else {
      // Backend Delete
      if (itemToRemove && itemToRemove.productId?._id) {
        try {
          const response = await fetch(`http://localhost:4000/removeItem/${itemToRemove.productId._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            toast.success("Item removed");
          } else {
            toast.error("Failed to remove item from account");
          }
        } catch (error) {
          console.error("Remove error:", error);
          toast.error("Failed to remove item");
        }
      }
    }
  };

  // ================================
  //        PRICE CALCULATION
  // ================================
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = cartItems.length ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  // ================================
  //              UI
  // ================================
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Cart</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
          YOUR CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {loading ? (
              <p>Loading cart...</p>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Your cart is empty
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  id={item._id}
                  name={item.productId?.productName || "Product Unavailable"}
                  price={item.productId?.price || 0}
                  quantity={item.quantity}
                  image={
                    item.productId?.productImage ||
                    "/fallback-product.png"
                  }
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              deliveryFee={deliveryFee}
              total={total}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;

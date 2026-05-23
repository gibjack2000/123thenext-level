import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  priceDisplay: string;
  stripePriceId: string;
  image: string;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  currencySymbol: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('antigravity_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('antigravity_cart', JSON.stringify(items));
  };

  const addToCart = (rawItem: any) => {
    // Map item keys dynamically to handle both camelCase and snake_case models
    const id = rawItem.id;
    if (isInCart(id)) return; // Prevent duplicates since they are digital PDFs

    const item: CartItem = {
      id,
      slug: rawItem.slug,
      title: rawItem.title,
      priceDisplay: rawItem.priceDisplay || rawItem.price_display,
      stripePriceId: rawItem.stripePriceId || rawItem.stripe_price_id,
      image: rawItem.image,
      category: rawItem.category
    };

    saveCart([...cartItems, item]);
  };

  const removeFromCart = (id: string) => {
    saveCart(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    saveCart([]);
  };

  const isInCart = (id: string) => {
    return cartItems.some(item => item.id === id);
  };

  // Helper to parse numeric values from price display strings (e.g. "£19.00" -> 19.0)
  const parsePrice = (priceStr: string) => {
    const numericStr = priceStr.replace(/[^0-9.]/g, '');
    const price = parseFloat(numericStr);
    return isNaN(price) ? 0 : price;
  };

  const cartSubtotal = cartItems.reduce((sum, item) => sum + parsePrice(item.priceDisplay), 0);
  const cartCount = cartItems.length;

  // Infer currency symbol from the first item, defaulting to £ (GBP)
  const currencySymbol = cartItems.length > 0 
    ? cartItems[0].priceDisplay.replace(/[0-9.\s]/g, '') || '£'
    : '£';

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      cartCount,
      cartSubtotal,
      currencySymbol
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

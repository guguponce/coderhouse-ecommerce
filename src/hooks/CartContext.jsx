import { useReducer, createContext, useMemo } from "react";

export const ShoppingCartContext = createContext();

const updateLocalStorage = (newState) => {
  localStorage.setItem("shoppingCart", JSON.stringify(newState));
};
const getLocalStorage = () => {
  const localStorageCart = localStorage.getItem("shoppingCart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

const cartInitialState = getLocalStorage();

function cartReducer(state, action) {
  const { type: actionType, payload: actionPayload } = action;
  const { id, quantity } = actionPayload;
  switch (actionType) {
    case "ADD_TO_CART": {
      const productFromCartIndex = state.findIndex((prod) => prod.id === id);

      if (productFromCartIndex >= 0) {
        const newCart = structuredClone(state);
        newCart[productFromCartIndex].quantity = quantity;
        updateLocalStorage(newCart);
        return newCart;
      } else {
        updateLocalStorage([
          ...state,
          { ...actionPayload, quantity: quantity },
        ]);

        return [...state, { ...actionPayload, quantity }];
      }
    }
    case "REMOVE_FROM_CART":
      updateLocalStorage(state.filter((prod) => prod.id !== id));

      return state.filter((prod) => prod.id !== id);

    case "CLEAR_CART":
      updateLocalStorage([]);
      return [];
    default:
      return state;
  }
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);
  const subtotalAmount = useMemo(() => {
    return state.length
      ? state.reduce((tot, p) => tot + p.data.saleprice * p.quantity, 0)
      : 0;
  }, [state]);

  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  const removeFromCart = (product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });
  const clearCart = () =>
    dispatch({
      type: "CLEAR_CART",
      payload: {
        id: 1,
        quantity: 1,
        type: "",
        price: 1,
        name: "",
        img: "",
        text: "",
      },
    });
  return (
    <ShoppingCartContext.Provider
      value={{ subtotalAmount, state, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

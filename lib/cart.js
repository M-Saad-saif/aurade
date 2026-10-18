import { getProduct } from './catalog.js';
export const STORAGE_KEY = 'aurade:shopping:v1';
export const initialState = { cart: [], wishlist: [] };
export const lineKey = (id, strap) => `${id}::${strap}`;

// Build a synchronous `id -> product` lookup from any catalog (static + database watches).
export function createLookup(catalog = []) {
  const map = new Map(
    (Array.isArray(catalog) ? catalog : []).map((product) => [product.id, product]),
  );
  return (id) => map.get(id);
}

// Never trust localStorage. Rebuild saved data against the current catalog.
export function sanitizeState(value, lookup = getProduct) {
  const cart = [];
  for (const item of Array.isArray(value?.cart) ? value.cart : []) {
    const product = lookup(item?.id);
    if (!product || !product.straps.includes(item.strap) || !Number.isFinite(item.quantity))
      continue;
    const quantity = Math.min(product.stock, Math.max(0, Math.floor(item.quantity)));
    if (!quantity) continue;
    const existing = cart.find((line) => line.id === item.id && line.strap === item.strap);
    if (existing) existing.quantity = Math.min(product.stock, existing.quantity + quantity);
    else cart.push({ id: product.id, strap: item.strap, quantity });
  }
  // Stock is shared across strap options in this demo catalog.
  const remaining = new Map();
  const safeCart = cart.flatMap((line) => {
    const available = remaining.has(line.id) ? remaining.get(line.id) : lookup(line.id).stock;
    const quantity = Math.min(line.quantity, available);
    remaining.set(line.id, available - quantity);
    return quantity > 0 ? [{ ...line, quantity }] : [];
  });
  const wishlist = [
    ...new Set((Array.isArray(value?.wishlist) ? value.wishlist : []).filter((id) => lookup(id))),
  ];
  return { cart: safeCart, wishlist };
}
export function shoppingReducer(state, action, lookup = getProduct) {
  switch (action.type) {
    case 'HYDRATE':
      return sanitizeState(action.payload, lookup);
    case 'ADD': {
      const { id, strap, quantity = 1 } = action;
      const product = lookup(id);
      if (!product || !product.straps.includes(strap) || !Number.isFinite(quantity) || quantity < 1)
        return state;
      const index = state.cart.findIndex((item) => item.id === id && item.strap === strap);
      const cart = state.cart.map((item) => ({ ...item }));
      if (index >= 0) cart[index].quantity += Math.floor(quantity);
      else cart.push({ id, strap, quantity: Math.floor(quantity) });
      return sanitizeState({ ...state, cart }, lookup);
    }
    case 'QUANTITY':
      return sanitizeState(
        {
          ...state,
          cart: state.cart.map((item) =>
            lineKey(item.id, item.strap) === action.key
              ? { ...item, quantity: action.quantity }
              : item,
          ),
        },
        lookup,
      );
    case 'REMOVE':
      return {
        ...state,
        cart: state.cart.filter((item) => lineKey(item.id, item.strap) !== action.key),
      };
    case 'WISHLIST': {
      if (!lookup(action.id)) return state;
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id)
          ? state.wishlist.filter((id) => id !== action.id)
          : [...state.wishlist, action.id],
      };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}
export const cartSubtotal = (cart, lookup = getProduct) =>
  cart.reduce((sum, item) => sum + (lookup(item.id)?.price || 0) * item.quantity, 0);

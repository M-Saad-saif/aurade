'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { createLookup, initialState, shoppingReducer, STORAGE_KEY } from '@/lib/cart';
import { getProduct } from '@/lib/catalog';
const StoreContext = createContext(null);
export function StoreProvider({ catalog = [], children }) {
  const lookup = useMemo(() => createLookup(catalog), [catalog]);
  const [state, dispatch] = useReducer(
    (current, action) => shoppingReducer(current, action, lookup),
    initialState,
  );
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState('');
  const [storageError, setStorageError] = useState(false);
  const timer = useRef(null);
  const findProduct = useCallback((id) => lookup(id) || getProduct(id), [lookup]);
  const notify = useCallback((message) => {
    setNotice(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(''), 3500);
  }, []);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
    } catch {
      setStorageError(true);
    }
    setReady(true);
    const sync = (event) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      try {
        dispatch({
          type: 'HYDRATE',
          payload: event.newValue ? JSON.parse(event.newValue) : initialState,
        });
      } catch {
        setStorageError(true);
      }
    };
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('storage', sync);
      clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      const serialized = JSON.stringify(state);
      if (localStorage.getItem(STORAGE_KEY) !== serialized)
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch {
      setStorageError(true);
    }
  }, [state, ready]);
  return (
    <StoreContext.Provider
      value={{ ...state, products: catalog, findProduct, dispatch, ready, notify }}
    >
      {storageError && (
        <div className="storage-warning" role="status">
          Browser storage is unavailable or was reset. Your selections may not survive a refresh.
        </div>
      )}
      {children}
      <div className={`toast ${notice ? 'visible' : ''}`} role="status" aria-live="polite">
        {notice}
      </div>
    </StoreContext.Provider>
  );
}
export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore must be used within StoreProvider');
  return store;
}

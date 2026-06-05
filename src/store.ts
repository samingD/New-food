import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { supabase } from "./lib/supabase";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  outOfStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CountryRate {
  id: string;
  country: string;
  cargo: number;
  shipping: number;
}



export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shippingInfo: any;
  billingInfo: any;
  status: string;
  paymentId?: string;
  paymentMethod?: string;
  created_at: string;
}

interface AppState {
  products: Product[];
  orders: Order[];
  galleryImages: {id: string, image: string}[];
  cart: CartItem[];
  isAdmin: boolean;
  adminToken: string | null;
  isLoading: boolean;
  shippingRates: CountryRate[];
  selectedCountryId: string | null;
  shippingType: "cargo" | "shipping";

  // Actions
  fetchProducts: () => Promise<void>;
  fetchGalleryImages: () => Promise<void>;
  addGalleryImage: (image: string) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;
  fetchShippingRates: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  setCheckoutCountry: (id: string) => void;
  setShippingType: (type: "cargo" | "shipping") => void;
  addToCart: (product: Product, quantityKg?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Admin Actions
  loginAdmin: (token: string) => void;
  logoutAdmin: () => void;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateShippingRates: (rates: CountryRate[]) => Promise<void>;
}

const defaultCountryNames = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (DRC)",
  "Congo (Republic)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const defaultShippingRates = defaultCountryNames.map((country, idx) => ({
  id: String(idx + 1),
  country: country,
  cargo: 150,
  shipping: 50,
}));

const defaultProducts: Product[] = [];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      products: [],
      orders: [],
        galleryImages: [],
      cart: [],
      isAdmin: !!localStorage.getItem("adminToken"),
      adminToken: localStorage.getItem("adminToken"),
      isLoading: false,
      shippingRates: [],
      selectedCountryId: null,
      shippingType: "cargo",

      setCheckoutCountry: (id) => set({ selectedCountryId: id }),
      setShippingType: (type) => set({ shippingType: type }),

      
      fetchGalleryImages: async () => {
        try {
          const res = await fetch("/api/gallery");
          if (res.ok) {
            const data = await res.json();
            set({ galleryImages: data });
          }
        } catch (error) {
          console.error("Failed to fetch gallery images", error);
        }
      },
      addGalleryImage: async (image) => {
        const { fetchGalleryImages, adminToken } = get();
        if (!adminToken) return;
        try {
          const res = await fetch("/api/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
            body: JSON.stringify({ image })
          });
          if (res.ok) await fetchGalleryImages();
        } catch (e) { console.error(e); }
      },
      deleteGalleryImage: async (id) => {
        const { fetchGalleryImages, adminToken } = get();
        if (!adminToken) return;
        try {
          const res = await fetch(`/api/gallery/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${adminToken}` }
          });
          if (res.ok) await fetchGalleryImages();
        } catch (e) { console.error(e); }
      },

      fetchOrders: async () => {
        const { adminToken } = get();
        if (!adminToken) return;
        try {
          const res = await fetch("/api/orders", {
            headers: { Authorization: `Bearer ${adminToken}` },
          });
          if (res.ok) {
            const data = await res.json();
            set({ orders: data });
          }
        } catch (err) {
          console.error("Failed to fetch orders:", err);
        }
      },

      updateOrderStatus: async (id: string, status: string) => {
        const { adminToken } = get();
        if (!adminToken) return;
        try {
          const res = await fetch(`/api/orders/${id}/status`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({ status }),
          });
          if (res.ok) {
            const updated = await res.json();
            set((state) => ({
              orders: state.orders.map((o) =>
                o.id === updated.id ? updated : o,
              ),
            }));
          }
        } catch (err) {
          console.error("Failed to update status:", err);
        }
      },

      fetchProducts: async () => {
        set({ isLoading: true });
        try {
          const res = await fetch("/api/products");
          if (res.ok) {
            const data = await res.json();
            set({ products: data, isLoading: false });
          } else {
            set({ products: [], isLoading: false });
          }
        } catch (error) {
          console.error("Failed to fetch products:", error);
          set({ products: [], isLoading: false });
        }
      },

      fetchShippingRates: async () => {
        try {
          const res = await fetch("/api/shipping-rates");
          if (res.ok) {
            const data = await res.json();
            set({ shippingRates: data });
            return;
          }
        } catch (e) {
          console.error("Failed to fetch shipping rates", e);
        }

        const backup = localStorage.getItem("shippingRatesBackup");
        if (backup) {
          set({ shippingRates: JSON.parse(backup) });
        } else {
          set({ shippingRates: defaultShippingRates });
          localStorage.setItem(
            "shippingRatesBackup",
            JSON.stringify(defaultShippingRates),
          );
        }
      },

      addToCart: (product, quantityKg = 1) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantityKg }
                : item,
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: quantityKg }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      loginAdmin: (token) => {
        localStorage.setItem("adminToken", token);
        set({ isAdmin: true, adminToken: token });
      },

      logoutAdmin: () => {
        localStorage.removeItem("adminToken");
        set({ isAdmin: false, adminToken: null });
      },

      addProduct: async (product) => {
        const { fetchProducts, adminToken } = get();
        if (!adminToken) return;
        try {
          const res = await fetch("/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify(product),
          });
          if (!res.ok) throw new Error("Failed to add product");
          await fetchProducts();
        } catch (error: any) {
          console.error("Failed to add product", error);
          alert("Error adding product.");
        }
      },

      updateProduct: async (id, product) => {
        const { fetchProducts, adminToken } = get();
        if (!adminToken) return;
        try {
          const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify(product),
          });
          if (!res.ok) throw new Error("Failed to update product");
          await fetchProducts();
        } catch (error: any) {
          console.error("Failed to update product", error);
          alert("Error updating product.");
        }
      },

      deleteProduct: async (id) => {
        const { fetchProducts, adminToken } = get();
        if (!adminToken) return;
        try {
          const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          });
          if (!res.ok) throw new Error("Failed to delete product");
          await fetchProducts();
        } catch (error: any) {
          console.error("Failed to delete product", error);
        }
      },

      updateShippingRates: async (rates) => {
        const { adminToken } = get();
        if (!adminToken) return;
        set({ shippingRates: rates });
        localStorage.setItem("shippingRatesBackup", JSON.stringify(rates));
        try {
          await fetch(`/api/shipping-rates`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify(rates),
          });
        } catch (e) {
          console.error("Failed to persist to express server", e);
        }
      },
    }),
    {
      name: "imaniglobal-storage-v2",
      partialize: (state) => ({
        cart: state.cart.map((item) => {
          const copy = { ...item };
          delete copy.image;
          delete copy.description;
          return copy;
        }),
        selectedCountryId: state.selectedCountryId,
        shippingType: state.shippingType,
      }),
    },
  ),
);

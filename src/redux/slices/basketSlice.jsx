import { createSlice } from "@reduxjs/toolkit";

// storage'dan urunleri getir
const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return []; // yoksa bos bir array don
};

const initialState = {
  products: getBasketFromStorage(), //Sepetteki ürünlerin listesi, başlangıçta localStorage'dan alınır.Sayfa yenilendiginde state'deki degerleri kaybedecegimiz icin bunu storage'da tanim;ayarak bunun onune gecmis olucaz. Sayfa yenilendiginde  redux icindeki sepet degerleri bosalir. o yuzden storage'da sakliyoruz.
  drawer: false, //Sepet görüntüleme bölmesinin (çekmece) açık mı kapalı mı olduğunu kontrol eden bir durum.
  totalAmount: 0, //Sepetteki ürünlerin toplam tutarı başlangıçta 0 olarak ayarlanır.
};

//sepetteki urunleri storage'a yaz
const writeFromBasketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const findProduct =
        state.products &&
        state.products.find((product) => product.id === action.payload.id);
      if (findProduct) {
        //daha once eklenmistir
        const extractedProducts = state.products.filter(
          (product) => product.id != action.payload.id
        );
        findProduct.count += action.payload.count;
        state.products = [...extractedProducts, findProduct];
        writeFromBasketToStorage(state.products);
      } else {
        state.products = [...state.products, action.payload];
        writeFromBasketToStorage(state.products);
      }
    },
    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },

    calculateBasket: (state) => {
      state.totalAmount = 0;
      state.products &&
        state.products.map((product) => {
          state.totalAmount += product.price * product.count;
        });
    },

    removeFromBasket: (state, action) => {
      // Belirtilen ürünü ID'sine göre çıkar
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.products = updatedProducts;
      writeFromBasketToStorage(updatedProducts); // Storage'ı güncelle
    },
  },
});

export const { addToBasket, setDrawer, calculateBasket, removeFromBasket } =
  basketSlice.actions;
export default basketSlice.reducer;

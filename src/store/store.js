import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export const useStore = create(
  persist(
    (set, get) => ({
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      ProductsList: [],

      // Action to fetch products and update the state
      fetchProducts: async () => {
        try {
          const response = await axios.get('https://fakestoreapi.com/products');
          set((state) => ({
            ...state,
            ProductsList: response.data,
          }));

          console.log(ProductsList)

        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
    }),
    {
      name: 'ddx-fakestore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductCardType } from '../types/ProductCardType';
import { getProducts } from '@/services/clientRequests';
import { CategoryType } from '@/types/CategoryType';
import { FilterStatus } from '@/types/FilterStatusType';
import { ItemsPerPage } from '@/types/ItemsPerPageType';

interface ProductsState {
  productsList: ProductCardType[];
  isLoading: boolean;
  error: null | string;
  filter: {
    sortBy: FilterStatus;
    itemsPerPage: ItemsPerPage;
    currentPage: number;
  };
}

const initialState: ProductsState = {
  productsList: [],
  isLoading: false,
  error: null,
  filter: {
    sortBy: FilterStatus.newest,
    itemsPerPage: ItemsPerPage.sixteen,
    currentPage: 1,
  },
};

export const fetchProducts = createAsyncThunk<
  ProductCardType[],
  {
    category: CategoryType;
    sortBy: FilterStatus;
  }
>('phones/fetchProducts', async ({ category, sortBy }) => {
  const data = await getProducts(category);

  const sortedData = [...data].sort((a, b) => {
    switch (sortBy) {
      case FilterStatus.newest:
        return b.year - a.year;
      case FilterStatus.oldest:
        return a.year - b.year;
      case FilterStatus.cheapest:
        return a.price - b.price;
      case FilterStatus.mostExpensive:
        return b.price - a.price;
      default:
        return 0;
    }
  });
  return sortedData;
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setStatus: (
      state,
      action: PayloadAction<{
        sortBy?: FilterStatus;
        itemsPerPage?: ItemsPerPage;
        currentPage?: number;
      }>,
    ) => {
      const { sortBy, itemsPerPage, currentPage } = action.payload;
      if (sortBy) state.filter.sortBy = sortBy;
      if (itemsPerPage) state.filter.itemsPerPage = itemsPerPage;
      if (currentPage) state.filter.currentPage = currentPage;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        (state.productsList = []),
          (state.isLoading = true),
          (state.error = null);
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductCardType[]>) => {
          (state.productsList = action.payload),
            (state.isLoading = false),
            (state.error = null);
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error = action.error.message || 'phones loading error');
      });
  },
});

export const { setStatus } = productsSlice.actions;

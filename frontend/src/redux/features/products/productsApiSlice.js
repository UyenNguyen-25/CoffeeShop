/* eslint-disable no-unused-vars */
import { apiSlice } from "@/redux/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const PRODUCTS_URL = "/api/product";

const productsAdapter = createEntityAdapter({});

const initialState = productsAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (arg) => ({
        url: `${PRODUCTS_URL}/get-all-product`,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    getSoldProducts: builder.query({
      query: (arg) => ({
        url: `${PRODUCTS_URL}/get-sold-product`,
      }),
    }),
    getProductDetail: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/get-product-by-id/${id}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSoldProductsQuery,
  useGetProductDetailQuery,
} = productsApiSlice;

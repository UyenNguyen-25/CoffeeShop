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
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Posts", id: "LIST" }],
    }),
    getSoldProducts: builder.query({
      query: (arg) => ({
        url: `${PRODUCTS_URL}/get-sold-product`,
      }),
    }),
    getProductDetail: builder.query({
      query: ({ id }) => ({
        url: `${PRODUCTS_URL}/get-product-by-id/${id}`,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSoldProductsQuery,
  useGetProductDetailQuery,
} = productsApiSlice;

import { apiSlice } from '../api/api-slice';

export const dataApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => 'categories',
    }),
    getBooks: build.query({
      query: () => 'books',
    }),
    getBookById: build.query({
      query: (id) => `books/${id}`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetBooksQuery, useGetBookByIdQuery } = dataApi;
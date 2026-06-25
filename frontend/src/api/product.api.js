import api from "./axios";

export const getProducts = async ({
  search = "",
  category = "",
  page = 1
} = {}) => {

  const { data } =
    await api.get(
      "/products",
      {
        params: {
          search,
          category,
          page
        }
      }
    );

  return data;
};

  export const getProductById =
  async (id) => {

    const response =
      await api.get(
        `/products/${id}`
      );

    return response.data;
  };
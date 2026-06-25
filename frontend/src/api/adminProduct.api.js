import api from "./axios";

export const createProduct =
  async (productData) => {

    const response =
      await api.post(
        "/products",
        productData
      );

    return response.data;
  };

export const deleteProduct =
  async (id) => {

    const response =
      await api.delete(
        `/products/${id}`
      );

    return response.data;
  };

  export const updateProduct =
  async (
    id,
    productData
  ) => {

    const { data } =
      await api.put(
        `/products/${id}`,
        productData
      );

    return data;
  };
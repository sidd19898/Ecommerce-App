import api from "./axios";

export const getAddresses =
  async () => {

    const response =
      await api.get(
        "/users/address"
      );

    return response.data;
  };

export const addAddress =
  async (address) => {

    const response =
      await api.post(
        "/users/address",
        address
      );

    return response.data;
  };
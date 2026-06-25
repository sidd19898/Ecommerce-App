import api from "./axios";

export const getAddresses = async () => {
  const { data } = await api.get(
    "/users/address"
  );

  return data;
};

export const addAddress = async (
  addressData
) => {

  const { data } = await api.post(
    "/users/address",
    addressData
  );

  return data;
};

export const updateAddress = async (
  id,
  addressData
) => {

  const { data } = await api.put(
    `/users/address/${id}`,
    addressData
  );

  return data;
};

export const deleteAddress = async (
  id
) => {

  const { data } = await api.delete(
    `/users/address/${id}`
  );

  return data;
};
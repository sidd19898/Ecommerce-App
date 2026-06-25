import api from "./axios";

export const getAllOrders =
  async () => {

    const response =
      await api.get(
        "/orders/all"
      );

    return response.data;
  };

export const updateOrderStatus =
  async (
    orderId,
    status
  ) => {

    const response =
      await api.put(
        `/orders/${orderId}/status`,
        { status }
      );

    return response.data;
  };
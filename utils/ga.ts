export function generatePurchaseObject(order) {
  let object = {
    transaction_id: order?.order_number,
    value: order?.total,
    currency: "AUD",
    tax: null,
    shipping: order?.delivery?.price,
    coupon: order?.discount?.title,
    items: [],
  };


  order.items.forEach((item) => {
    object.items.push({
      id: item?.id,
      name: item?.title,
      category: item?.type,
      variant: item?.size,
      list_position: 1,
      quantity: item?.quantity,
      price: item?.price,
    });
  });
  return JSON.stringify(object);
}

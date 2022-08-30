import API from '../helper/axios';

export const GetOrders = async () => {
    try {
      let url = "Order/GetOrders";
      var response = await API.get(url);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

export const GetById = async id => {
  try {
    let url = 'order/getbyid/' + id;
    var response = await API.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const CreateOrder = async values => {
  try {
    let url = 'order/createorder';
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    var json = {
      total: values.total,
      orderItem: [],
      address: values.address,
    };
    values.data.forEach(element => {
      json.orderItem.push({
        idCartItem: element.id,
        productId: element.productId,
        amount: element.amount,
      });
    });
    var response = await API.post(url, json, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

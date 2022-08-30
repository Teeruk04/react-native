import API from '../helper/axios';

const url ="payment/createpaymment"


export const CraetePayment = async (OrderId, upfiles) => {
  try {
    let formData = new FormData();
    formData.append('OrderId', OrderId);
    if (upfiles) formData.append('Slip', {
      uri: upfiles.uri,
      type:'iamge/jpeg',
      name:'photo.jpg'
    });
    var response = await API.post(url, formData);
    return response;
  } catch (e) {
    console.log(JSON.stringify(e));
    return e;
  }
};

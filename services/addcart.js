import { Value } from 'react-native-reanimated'
import API from '../helper/axios'

export const AddCartItem = async (values)=>{
    try {
        let url = "cart/createcartItem"
        var fromData = new FormData();
        fromData.append("userId",values.userId)
        fromData.append("productId",values.productId)
        fromData.append("amount",values.amount)
        var response =await API.post(url, fromData);
        console.log(response);
        return response.data
    }catch(e){
        console.log(e)
        return e;
    }
}


export const Delete = async (id) =>{
    try{
        let url = "cart/deletecartitem/" + id;
        var response = await API.delete(url);
        return response.data;
    }catch(e){
        console.log(e);
        return e;
    }
}

export const Plus = async (id) =>{
    try{
        let url ="cart/itemplus" +id
        var response =await API.put(url);
        return response.data;
    }catch (e){
        console.log(e);
        return e;
    }
}

export const GetOrders = async ()=>{
    try{
        let url ="cart/itemremove" +id
        var response = await API.get(url);
        return response.data;
    }catch(e){
        console.log(e);
        return e;
    }
}

export const GetByUserId = async (id) =>{
    try{
        let url = "cart/getbyuserid/" +id
        var response =await API.get(url);
        return response.data;
    }catch(e){
        console.log(e);
        return e;
    }
}
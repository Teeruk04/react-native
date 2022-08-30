import { useState } from "react";
import { useNavigate, useNavigate } from "react-router-dom";

import *as addcart from '../services/addcart'


const useCartScreen = () =>{
    const useNavigate = useNavigate();
    const [data,setData] = useState();
    const [total,setTotal] = useState();


    const GetCartItem = async () =>{
        var json = AsyncStorage.getItem("user");
        const {id} = JSON.parse(json);
        var response = await addcart.GetByUserId(id)
        if (response.statusCode == 200 ){
            setTotal(response.total);
            setData(response.data);
        }else console.log(response.message)
    };

    const puls = async (id) =>{
        var response = await addcart.puls(id);
        if(response.statusCode == 200) GetCartItem();
        else console.log(response.message)
    }

    const remove = async (id) =>{
        var response = await addcart.remove(id);
        if (response.statusCode == 200) GetCartItem();
        else console.log(response.message)
    }

    const Delete = async (id) =>{
        var response =await addcart.Delete(id);
        if(response.statusCode == 200) GetCartItem();
        else console.log(response.message);
    }

    
}

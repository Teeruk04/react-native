import { useState } from "react";

import *as addcart from '../services/addcart'
import { useNavigate } from "react-router-dom";

const useShowDetailProduct =()=>{
    const [amount, setAmount] = useState(1)

    const navigation = useNavigate();

    const plus = (data) =>{
        if(data.stock > amount) setAmount(amount +1);
    }
    const remove = () =>{
        if(amount > 1) setAmount(amount -1);
    }

    const addCartItem =async (productId) =>{
        var json = AsyncStorage.getItem("user");
        var {id} =JSON.parse(json);
        var response = await addcart.AddCartItem({
            productId,
            amount,
            userId:id
        });
        if(response.statusCode ===200) navigation("/cart")
        else console.log(response.message)
    };
    return {addCartItem, amount,plus,remove};
}
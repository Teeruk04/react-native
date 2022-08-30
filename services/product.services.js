import API from '../helper/axios';


export const GetProducts = async () =>{
    try{
        let url ="product";
        var response  =await API.get(url)
        console.log(response)
        return response.data;
    }catch (e){
        console.log(e);
        return e;
    }
};

export const GetById = async id =>{
    let url ="product";
    try{
        var response = await API.get(url+"/"+id)
        return response
    }catch(e){
        return console.log(error);
    }
}
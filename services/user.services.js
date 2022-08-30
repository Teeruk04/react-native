import API from '../helper/axios';

export const APILogin = async (UserName,Password) =>{
    
    try {
        var url = "api/user/login"

        var formData = new FormData();
        formData.append("UserName", UserName);
        formData.append("Password", Password);
        var response = await API.post(url, formData);
        return response.data;

    }catch (e){
        console.log(e);
        return e;
    }
}

export const GetByToken = async token =>{
    try {
        let url ="api/user/getbytoken";
        var config={
            headers :{Authorization: "Bearer " +token},
        };
        var response =await API.get(url, config);
        return response.data;
    }catch(e){
        console.log(e);
        return e;
    }
};


export const Register = async (value)=>{
    try {
        let url='api/user/register'
        var formData = new FormData();
        formData.append("username", value.username);
        formData.append("password", value.password);
        formData.append("name", value.name);
        formData.append("lastname", value.lastname);    
        formData.append("phone", value.phone);
        formData.append("roleId", 2);
        var response = API.post(url,formData)
        return response.data;
    }catch (e){
        return e
        console.log(e);
    }
}
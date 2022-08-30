import {Text, View,ScrollView,TouchableOpacity,Image} from 'react-native';
import React, {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserScreen  ({navigation}) {


 
const [token, setToken] = useState()  
useEffect(() => {
  Gettoken()
}, [])

const Gettoken =async()=>{
  
  var response = await AsyncStorage.getItem('token') 
  setToken(response)
  
}



  const logout =async()=>{
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('user')
    
    navigation.navigate("Login")

  }

  
 
    return (
     <View>
        <ScrollView>
            <View style={{padding:10,width:'100%',backgroundColor:'#000',height:150}}>
              <TouchableOpacity>
                <Image source={require('../src/img/img.jpg')} style={{width:30,height:30}}/>
                <View></View>
                <View></View>
              </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
              <Image source={require('../src/img/img.jpg')} style={{width:140,height:140,borderRadius:100,marginTop:-70}}></Image>
              <Text style={{fontSize:25,fontWeight:'bold',padding:10}}>UserName</Text>
              <Text style={{fontSize:25,fontWeight:'bold',color:'grey'}}>Lastname</Text>
              <Text style={{fontSize:25,fontWeight:'bold',color:'grey'}}>pfsd</Text>
              
            </View>
            <TouchableOpacity onPress={() =>  navigation.navigate('Cart')}>
            <View style={{
              alignSelf:'center',
              flexDirection:'row',
              justifyContent:'center',
              backgroundColor:'#fff',
              width:'90%',
              padding:20,
              paddingBottom:22,
              borderRadius:10,
              shadowOpacity:80,
              elevation:15,
              marginTop:20
          }}> 
              <Text style={{fontSize:20}}>Cart</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>  navigation.navigate('Order')}>
            <View style={{
              alignSelf:'center',
              flexDirection:'row',
              justifyContent:'center',
              backgroundColor:'#fff',
              width:'90%',
              padding:20,
              paddingBottom:22,
              borderRadius:10,
              shadowOpacity:80,
              elevation:15,
              marginTop:20
          }}> 
              <Text style={{fontSize:20}}>Orders</Text>
            </View>
            </TouchableOpacity>

            
            
            {!token && <TouchableOpacity onPress={() =>  navigation.navigate('Login')}>
            <View style={{
              alignSelf:'center',
              flexDirection:'row',
              justifyContent:'center',
              backgroundColor:'#fff',
              width:'90%',
              padding:20,
              paddingBottom:22,
              borderRadius:10,
              shadowOpacity:80,
              elevation:15,
              marginTop:20
          }}> 
              <Text style={{fontSize:20}}>Login</Text>
            </View>
            </TouchableOpacity>}

           {token &&  <TouchableOpacity onPress={()=>logout()}>
            <View style={{
              alignSelf:'center',
              flexDirection:'row',
              justifyContent:'center',
              backgroundColor:'#FF0000',
              width:'90%',
              padding:20,
              paddingBottom:22,
              borderRadius:10,
              shadowOpacity:80,
              elevation:15,
              marginTop:20
          }}> 
          
              <Text style={{fontSize:20}}>Logout</Text>
            </View>
            </TouchableOpacity>}
            <Text></Text>
            <Text></Text>

            <Text></Text>

            <Text></Text>


        </ScrollView>
     </View>
    );
  
}





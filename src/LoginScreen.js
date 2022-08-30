import { 
  View, 
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated ,
  Keyboard,
  Alert
} from 'react-native'
import React, {useEffect,useState} from 'react'
import { APILogin, GetByToken } from '../services/user.services'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login(props) {

  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")


  const onLogin =async()=>{
    alert(Username,Password)
   var response = await APILogin(Username,Password)
   console.log(response)
   if(response.msg === "เข้าสู่ระบบสำเร็จ"){
    props.navigation.navigate("Home")
   }
    setStateUser(response.token)
  
  
  };

  const setStateUser = async token =>{
    var response =await GetByToken(token);
    if(response.statusCode === 200){
      await AsyncStorage.setItem("token" ,token);
      await AsyncStorage.setItem("user" ,JSON.stringify(response.data))
    }
    console.log(response)
    if(response.statusCode === 200){
      props.navigation.navigate("Home")
     }else{
      alert('ไม่พบข้อมูล')
     }
  }
  
  const   [offset] = useState(new Animated.ValueXY({x:0,y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x:130, y: 155}));

  useEffect(()=>{
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    props.navigation.setOptions({headerShown:false})

    Animated.parallel([
      Animated.spring(offset.y,{
        toValue: 0,
        speed: 4,
        bounciness: 20
      }),
      Animated.timing(opacity,{
        toValue:1,
        duration: 200,
      })
    ]).start();
   
  },[]);
 function keyboardDidHide (){
   Animated.parallel([
     Animated.timing(logo.x,{
       toValue:120,
       duration:100,
     }),
     Animated.timing(logo.y,{
       toValue:65,
       duration:100,
     }),
   ]).start();

 }
 function keyboardDidShow (){
  Animated.parallel([
    Animated.timing(logo.x,{
      toValue:130,
      duration:100,
    }),
    Animated.timing(logo.y,{
      toValue:155,
      duration:100,
    }),
  ]).start();
 }
  
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
        style={{
          width:logo.x,
          height:logo.y,
        }}
        source={require('./img/img.jpg')}
        />
      </View>
      <Animated.View
       style={[
         styles.container,
         {
          opacity: opacity,
           transform:[
           {translateY: offset.y}
         ]
        }
        ]}
       
       >
      <TextInput
      style={styles.input}
        placeholder='UserName'
        autoCorrect={false}
        onChangeText={(e)=>{
          setUsername(e)
        }}
      />
       <TextInput
        style={styles.input}
        placeholder='Password'
        autoCorrect={false}
        onChangeText={(e)=>{
          setPassword(e)
        }}
      />
      

      <TouchableOpacity 
       onPress={()=>onLogin()} 
       style={styles.btnSubmit}>
        <Text
       
        style={styles.submitText}>
          Login
        </Text>
      </TouchableOpacity>
      <Text></Text>

      <TouchableOpacity style={styles.btnRegister}>
        <Text onPress={()=>{
        props.navigation.navigate("Register")
      }} style={styles.registerText}>
        Create a new account. 
        </Text>
      </TouchableOpacity>

      
      </Animated.View>
    </KeyboardAvoidingView>
    
  )

}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#191919'
  },
  containerLogo:{
    flex:1,
    justifyContent:'center'
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'90%',
    paddingBottom:50
  },
  input:{
    backgroundColor:'#FFF',
    width:'90%',
    marginBottom:15,
    color:'#222',
    fontSize:17,
    borderRadius:7,
    padding:10
  },
  btnSubmit:{
    backgroundColor:'#35AAFF',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:7
  },
  submitText:{
    color:'#FFF',
    fontSize:18
  },
  btnRegister:{
    marginTop:10
  },
  registerText:{
    color:'#FFF'
  }
})

{/* <Button title='Register' onPress={()=>{
        props.navigation.navigate("Register")
      }} /> */}
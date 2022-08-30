import {
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import *as userService from '../services/user.services'

export default function RegisterScreen(props) {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 130, y: 155}));

  const onSubmit1 = async (values) =>{
    var response = await userService.Register(values);
    console.log(response)
    if(response.statuscode == 200){
    props.navigation.navigate("Login")

    }
    props.navigation.navigate("Register")

   
    
    alert("ลงชื่อเรียบร้อยเเล้ว");
  }



  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    KeyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );
    props.navigation.setOptions({headerShown: false});

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();
  }, []);
  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 120,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
      }),
    ]).start();
  }
  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 100,
      }),
    ]).start();
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        name: '',
        lastname: '',
        phone: '',
      }}
     
      onSubmit={values => {
        console.log(values)
        onSubmit1(values);

      }}>
      {({values, errors, touched, handleChange, handleSubmit}) => (
        <KeyboardAvoidingView style={styles.background}>
          <View style={styles.containerLogo}>
            <Animated.Image
              style={{
                width: logo.x,
                height: logo.y,
              }}
              source={require('./img/img.jpg')}
            />
          </View>
          <Animated.View
            style={[
              styles.container,
              {
                opacity: opacity,
                transform: [{translateY: offset.y}],
              },
            ]}>
            <TextInput
              style={styles.input}
              name="username"
              value={values.username}
              onChangeText={handleChange('username')}
              type="text"
              placeholder="Email"
              autoCorrect={false}
             
            />
            <TextInput
              style={styles.input}
              name="password"
              onChangeText={handleChange('password')}
              value={values.password}
              type="password"
              placeholder="Password"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              name="name"
              onChangeText={handleChange('name')}
              value={values.name}
              type="text"
              placeholder="Name"
              autoCorrect={false}
            />

            <TextInput
              style={styles.input}
              name="lastname"
              onChangeText={handleChange('lastname')}
              value={values.lastname}
              type="text"
              placeholder="Lastname"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              name="phone"
              onChangeText={handleChange('phone')}
              value={values.phone}
              placeholder="Phone"
              keyboardType='phone-pad'
              autoCorrect={false}
            />
            <TouchableOpacity  type="submit"  onPress={handleSubmit} style={styles.btnSubmit}>
              <Text type="submit" style={styles.submitText} onPress={handleSubmit}>Register</Text>
            </TouchableOpacity>
            <Text></Text>

            <TouchableOpacity style={styles.btnRegister}>
              <Text
                onPress={() => {
                  props.navigation.navigate('Login');
                }}
                style={styles.registerText}>
                You already have an account.
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: '#FFF',
  },
});

{
  /* <Button title='Register' onPress={()=>{
        props.navigation.navigate("Register")
      }} />  */
}

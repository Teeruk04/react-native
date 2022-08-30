import React,{useState,useEffect} from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet,TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Constants';
import *as productService from '../../services/product.services';
import {BASE_URL} from '../../helper/axios'
import *as addcart from '../../services/addcart'
import AsyncStorage from '@react-native-async-storage/async-storage'


const DetailsScreen = ({navigation, route}) => {
  navigation.setOptions({headerShown:false})
  const [amount, setAmount] = useState(1)

  const addCartItem =async (productId) =>{
    var json = await AsyncStorage.getItem("user");
    var {userId} =JSON.parse(json);
    var response = await addcart.AddCartItem({
        productId,
        amount,
        userId
    });
    alert('เพิ่มสินค้า')
    if(response.statusCode ===200) navigation("/cart")
    else console.log("message" + response.message)

   
  };
  const {id} = route.params;
  const [data, setData] = useState()
  
  useEffect(() => {
      GetById();
  }, [])

  async function GetById(){
    var response = await productService.GetById(id);
    console.log(response)
    if(response.status ==200) setData(response.data)
    console.log(BASE_URL+'images/'+data.image)
  }
  const plus = (data) => {
    if (data.stock > amount) setAmount(amount + 1);
  };

  const remove = (data) => {
    if (amount > 1) setAmount(amount - 1);
  };
  if(!data)return <Text>{id}</Text>

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        <Icon name="shopping-cart" size={28} />
      </View>
      <View style={style.imageContainer}>
        <Image source={{uri: BASE_URL+'images/'+data.image}} style={{width:300, resizeMode: 'contain', flex: 1}} />
      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View  />
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>{data.productName}</Text>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>ประเภท : {data.categoryName}</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              ${data.price}
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>ข้อมูลสินค้า</Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}>
            ราคา{data.price} บาท จำนวน{data.stock} ชิ้น
            รายละเอียด {data.detail}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <TouchableOpacity onPress={()=>remove(data)}>
              <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>-</Text>
              </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
               {amount}
              </Text>
              <TouchableOpacity onPress={()=>plus(data)}>
              <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>+</Text>
              </View>
              </TouchableOpacity>
            </View>
            

            <View style={style.buyBtn}>
            <TouchableOpacity  onPress={()=>addCartItem(data.productId)}>
              <Text
                style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
                Add To Cart
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default DetailsScreen;
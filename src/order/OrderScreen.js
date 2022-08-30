import React,{useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, Button,TouchableOpacity} from 'react-native';
import COLORS from '../../Constants';

import {GetOrders} from '../../services/order.service';

const OrderScreen = ({navigation}) => {
  const [data, setData] = useState();
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var response = await GetOrders();
    if (response.statusCode === 200) setData(response.data);
    else console.log(response.message);
  };
  return (
    <ScrollView>
      <SafeAreaView>
        <Text style={{fontSize: 38, color: COLORS.green, fontWeight: 'bold'}}>
          Your Order
        </Text>

        {data &&
          data.map((item, i) => {
            return (
              <TouchableOpacity
              onPress={()=>navigation.navigate('Payment',{id:item.id})}>
              <View
                key={i}
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  width: '90%',
                  padding: 10,
                  paddingBottom: 22,
                  borderRadius: 10,
                  shadowOpacity: 80,
                  elevation: 15,
                  marginTop: 20,
                }}>
                <View>
                  <Text style={{padding: 5}}>รหัสใบสั่งซื้อ : {item.id}</Text>
                  <Text style={{padding: 5}}>ราคารวม {item.total} บาท</Text>
                  <Text style={{padding: 5}}>ที่อยู่ {item.address}</Text>
                </View>
              </View>
              </TouchableOpacity>
            );
          })}

        <Text></Text>
        <Text></Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default OrderScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  StatusBar,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {storeData, getData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import 'intl';
import 'intl/locale-data/jsonp/en';
import MyTerbaik2 from '../../components/MyTerbaik2';
import MyTerbaik3 from '../../components/MyTerbaik3';
import MyDashboard from '../../components/MyDashboard';

export default function Home({navigation}) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [tipe, setTipe] = useState('');
  const [company, setCompany] = useState({});

  useEffect(() => {
    axios.get('https://zavalabs.com/dukcapil/api/company.php').then(res => {
      setCompany(res.data);
      console.log('company', res);
    });

    getData('tipe').then(res => {
      setTipe(res);
    });

    getData('user').then(res => {
      console.log(res);
      setUser(res);

      axios
        .post('https://zavalabs.com/tubaba/api/point.php', {
          id_member: res.id,
        })
        .then(respoint => {
          setPoint(respoint.data);
          console.log('get apoint', respoint.data);
        });

      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
      });
    });

    axios
      .post('https://zavalabs.com/tubaba/api/update_token.php', {
        id_member: user.id,
        token: token,
      })
      .then(res => {
        console.log('update token', res);
      });
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };

  const DataKategori = ({icon, nama, nama2, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: colors.primary,
          padding: 5,
          borderRadius: 10,
          width: windowWidth / 3.5,
          height: windowHeight / 8,
          elevation: 5,
          justifyContent: 'center',
        }}>
        <View>
          <Icon
            type="ionicon"
            name={icon}
            color={colors.secondary}
            size={windowWidth / 10}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 40,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 40,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama2}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      // source={require('../../assets/back.jpeg')}
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      {/* <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={'transparent'}
      /> */}

      <ScrollView>
        {/* bagian untuk point dan redeem */}

        <View
          style={{
            marginHorizontal: 10,
            height: windowHeight / 9,
            padding: 10,
            marginBottom: 20,
            // backgroundColor: colors.white,
            flexDirection: 'row',
            // borderBottomLeftRadius: 10,
            // borderBottomRightRadius: 10,
          }}>
          <View style={{flex: 1, paddingTop: 15, flexDirection: 'row'}}>
            <View style={{paddingLeft: 10}}>
              <Text
                style={{
                  fontSize: windowWidth / 30,
                  color: colors.black,
                  fontFamily: fonts.secondary[400],
                }}>
                Selamat datang,
              </Text>
              <Text
                style={{
                  fontSize: windowWidth / 25,
                  color: colors.black,
                  fontFamily: fonts.secondary[600],
                }}>
                {user.nama_lengkap}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{width: 50, resizeMode: 'contain'}}
            />
          </View>
        </View>

        <MyCarouser />

        {/* <MyDashboard tipe={tipe} /> */}

        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            fontFamily: fonts.secondary[800],
            color: colors.black,
            fontSize: windowWidth / 20,
          }}>
          MENU LAYANAN
        </Text>

        <View
          style={{
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}>
            <DataKategori
              onPress={() =>
                navigation.navigate('Laporan2', {
                  id: 'AKTA KELAHIRAN',
                })
              }
              icon="print-outline"
              nama="AKTA"
              nama2="KELAHIRAN"
            />
            <DataKategori
              onPress={() =>
                navigation.navigate('Laporan2', {
                  id: 'AKTA KEMATIAN',
                })
              }
              icon="print-outline"
              nama="AKTA"
              nama2="KEMATIAN"
            />
            <DataKategori
              onPress={() =>
                navigation.navigate('Laporan2', {
                  id: 'KTP Elektronik',
                })
              }
              icon="card-outline"
              nama="KTP"
              nama2="ELEKTRONIK"
            />
          </View>
          {/*  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}>
            <DataKategori
              onPress={() =>
                navigation.navigate('Laporan2', {
                  id: 'Kartu keluarga',
                })
              }
              icon="folder-outline"
              nama="KARTU"
              nama2="KELUARGA"
            />
            <DataKategori
              onPress={() =>
                navigation.navigate('Laporan2', {
                  id: 'KTP',
                })
              }
              icon="log-out-outline"
              nama="PERPINDAHAN"
              nama2="KELUAR"
            />
            <DataKategori
              onPress={() =>
                navigation.navigate('Laporan2', {
                  id: 'Surat Pindah Datang',
                })
              }
              icon="log-in-outline"
              nama="KEDATRANGAN"
              nama2="PENUDUDUK"
            />
          </View>

          {/*  */}
          {/*  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}>
            <DataKategori
              onPress={() =>
                navigation.navigate('Laporan2', {
                  id: 'Kartu Identitas Anak',
                })
              }
              icon="card-outline"
              nama="KARTU"
              nama2="IDENTITAS ANAK"
            />
            <DataKategori
              onPress={() =>
                navigation.navigate('Laporan2', {
                  id: 'Update Data',
                })
              }
              icon="create-outline"
              nama="UPDATE"
              nama2="DATA"
            />
            <DataKategori
              onPress={() =>
                Linking.openURL(
                  `https://api.whatsapp.com/send?phone=${company.tlp}&text=Hallo%20Dukcapil%20Butor`,
                )
              }
              icon="logo-whatsapp"
              nama="PUSAT"
              nama2="INFORMASI"
            />
          </View>

          {/*  */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

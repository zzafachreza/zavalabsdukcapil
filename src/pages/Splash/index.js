import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {color, asin} from 'react-native-reanimated';
import {getData, storeData} from '../../utils/localStorage';
import {PermissionsAndroid} from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

export default function Splash({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const scaleLogo = new Animated.Value(0.1);
  const scaleText = new Animated.Value(100);

  Animated.timing(scaleLogo, {
    toValue: 1,
    duration: 1000,
  }).start();

  Animated.timing(scaleText, {
    toValue: 0,
    duration: 1000,
  }).start();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izinkan Untuk Akses Lokasi',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();

    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('GetStarted');
        }, 1500);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          // navigation.replace('MainApp');
        }, 1500);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View>
        <Animated.Image
          source={require('../../assets/logo.png')}
          style={{
            resizeMode: 'contain',
            // resizeMode: 'center',

            height: 220,

            aspectRatio: scaleLogo,
          }}
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[900],
            color: colors.primary,
            fontSize: windowWidth / 4,
          }}>
          SIAP
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[800],
            color: colors.secondary,
            fontSize: windowWidth / 16,
            bottom: 20,
          }}>
          DUKCAPIL BUTUR
        </Text>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    width: 250,
    height: 250,
  },
});

import {Component} from 'react';
import {Text, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'

export default function HomeScreen( {navigation: { navigate }}) {
    return (
      <>
        <View style={styles.container} >
          <SafeAreaView style={styles.droidSafeArea} >
            <ImageBackground source={require('../assets/bg_image.png')} style={styles.backgroundImage} >
              <View style={styles.titleBar} >
                <Text style={styles.titleText} >App rastreador e EEI</Text>
              </View>
              <TouchableOpacity style={styles.routeCard} onPress={() => navigate('isslocation')}>
                <text style={styles.routeText} >localização da EEI</text>
                <text style={styles.saibaMais} >{'Saiba mais -->'}</text>
                <text style={styles.bgImage} >1</text>
                <Image source={require('../assets/iss_icon.png')} style={styles.iconImage} ></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.routeCard} onPress={() => navigate('mateoro')}>
                <text style={styles.routeText} >Meteoros</text>
                <text style={styles.saibaMais} >{'Saiba mais -->'}</text>
                <text style={styles.bgImage} >2</text>
                <Image source={require('../assets/meteor_icon.png')} style={styles.iconImage} ></Image>
              </TouchableOpacity>
            </ImageBackground>
          </SafeAreaView>
        </View>
      </>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android'? StatusBar.currentHeight: 0,
  },
  titleBar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeCard: {
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  routeText: {
    fontWeight: 'bold',
    fontSize:30,
    marginTop: 75,
    color: 'black',
    paddingLeft: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  iconImage: {
    position: 'absolute',
    width: 200,
    height: 200,
    resizeMode: 'contain',
    right: 20,
    top: -80,

  },
  saibaMais:{
    paddingLeft:30,
    color:'red',
    fontSize: 15
  },
  bgImage:{
    position: 'absolute',
    color:'rgba(183, 183, 183, 0.5)',
    fontSize: 150,
    right: 20,
    bottom:-15,
    zIndex:-1,
  },
})
import {Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert, FlatList, SafeAreaView, ImageBackground, Image } from 'react-native';
import axios, {Axios} from 'axios';

export default function MeteorScreen() {
  const[meteors,setMeteors] = useState({});
    useEffect(() =>{
      axios
          .get('https://api.nasa.gov/neo/rest/v1/feed?api_key=MdePqiiaAbmPQ1eaeeFMcmUictG3TGmQRKMUJ2um')
          .then(response => {
            setMeteors(response.data.near_earth_objects)
          })
          .catch(error => {
            Alert.alert(error.message)
          })
    },[]);
    renderItem = ({ item }) => {
      let meteor = item
      let bg_img, speed, size;
      if (meteor.threat_score <= 30) {
        bg_img = require("../assets/meteor_bg1.png")
        speed = require("../assets/meteor_speed1.gif")
        size = 100
      } else if (meteor.threat_score <=75) {
        bg_img = require("../assets/meteor_bg2.png")
        speed = require("../assets/meteor_speed2.gif")
        size = 150
      } else {
        bg_img = require("../assets/meteor_bg3.png")
        speed = require("../assets/meteor_speed3.gif")
        size = 200
      }
      return (
        <View>
          <ImageBackground source={bg_img} styles={styles.backgroundImage} >
            <View style={styles.gifContainer} >
              <Image source={speed} style={{width: size, height: size, alignSelf: "center"}}  />
              <View>
                <Text style={[styles.cardTitle, {marginTop: 300, marginLeft: 50}]} >{item.name}</Text>
                <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]} >Mais proximo da terra - {item.close_approach_data[0].close_approach_date_full}</Text>
                <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]} >Diâmetro Mínimo (KM)- {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]} >Diâmetro Máximo (KM)- {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]} >Velocidade (KM/H)- {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]} > distancia da Terra(KM)- {item.close_approach_data[0].miss_distance.kilometers} </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      )
    }

    keyExtractor = (item, index) => index.toString();

    if (Object.keys(meteors).length === 0){
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        <Text>carregando...</Text>
      </View>
    }
    else {
      let meteor_arr = Object.keys(meteors).map(mateor_date => {
        return meteors[mateor_date]
      })
      let meteorArray = [].concat.apply([], meteor_arr);
      meteorArray.forEach(function (element) {
        let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max)
        let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
        element.threat_score = threatScore
      });
      meteorArray.sort(function (a,b) {
        return b.threat_score - a.threat_score
      })
  
      meteorArray = meteorArray.slice(0,5)
      return (
        <>
          <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea} />
            <FlatList
              keyExtractor={this.keyExtractor}
              data={meteorArray}
              renderItem={this.renderItem}
              horizontal={true}
            />
          </View>
        </>
      );
    }
    
  }

const styles = StyleSheet.create({
  container: {
    flex: 1
},
droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
},
backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
},
titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center"
},
titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
},
meteorContainer: {
  flex: 0.85,
},
listContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 10
},
cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white"
},
cardText: {
    color: "white"
},
threatDetector: {
    height: 10,
    marginBottom: 10
},
gifContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
},
meteorDataContainer: {
    justifyContent: "center",
    alignItems: "center",

}
});

  // axios
  //.get('https://api.wheretheiss.at/v1/satellites/25544')
  //.then(response => {
    //setLocation(response.data)
  //})
  //.catch(error => {
    //Alert.alert(error.message)
  //}) 
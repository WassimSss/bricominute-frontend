import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



export default function Profil() {
  const [stars, setStars] = useState([])
  useEffect(() => {
    fetch('http://10.20.2.170:3000/notation/4SUWYA5hzAS2E8-OZWR04wxyel_unrUe')
      .then(response => response.json())
      .then(data => {
        const starsArray = [];
        for (let i = 0; i < 5; i++) {
          let style = {};
          if (i < data.average) {
            style = { 'color': '#f1c40f' };
          }
          starsArray.push(<FontAwesome key={i} name='star' size={22} style={style} />);
        }
        setStars(starsArray);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.containerImageAndText}>

            <View>
              <View style={styles.cercle} />

            </View>

            <View>
              <Text style={styles.entete}> ANTOINE TUYEAU </Text>
              <View style={styles.etoiles}>
                {stars}

              </View>
            </View>

            <View>
            </View>
          </View>
          <View style={styles.containerText}>
            <View>
            <Text style={styles.Transaction}>Transaction</Text>
            </View>
            <View style={styles.PIP}>
            <Text style={styles.text}>Parametres </Text>
            <Text style={styles.text}>Informations personnelles </Text>
            </View>
            <View style={styles.ENM}>
            <Text style={styles.text}>Email </Text>
            <Text style={styles.text}>Notifications </Text>
            <Text style={styles.text}>Moyens de paiement </Text>
            </View>
            <View style={styles.AIC}>
              <Text style={styles.text}>Aide </Text>
              <Text style={styles.text}>Informations légales </Text>
              <Text style={styles.text}>Centre d'aide</Text>
            </View>
            <View style={styles.disconnect}>
              <TouchableOpacity activeOpacity={0.1}>
                <Text style={styles.textDisc}>Me deconnecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );

}

const { height, width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%',
    marginTop: '9%',
    flexDirection: 'row-reverse',
    margin: 8,
  },

  containerText: {
    flex: 1,
    justifyContent:'center'
  },

  Transaction:{
    borderTopWidth: 1,
    fontSize: 25,
    marginLeft: 20,
    borderRadius: 80,

    
  },

  text: {
    fontSize: 25,
    borderRadius: 50,
    marginTop: 20,
    marginLeft:20
  },


  PIP:{
    borderTopWidth: 1,
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  parametres: {
    fontSize: 25,
    marginBottom: 20,
    marginTop: 20,
  marginLeft:20

  },

  Infos: {
    fontSize: 25,
    borderRadius: 50,
  },

  ENM:{
    justifyContent: 'space-between',
    borderTopWidth: 1
  },

  Mail: {
    fontSize: 25,
  },

  Not: {
    fontSize: 25,
  },

  aide: {
    fontSize: 25,
  },

  légal: {
    fontSize: 25,
  },
  centre: {
    fontSize: 25,
  },

  disconnect: {
    color: '#D42C2C',
    marginTop: 90,
    alignItems: 'center',
    marginLeft: 250

    
  },

  textDisc: {
    color: '#D42C2C',
  },

  AIC:{
    
    justifyContent: 'space-between',
    borderTopWidth: 1

  },

  containerImageAndText: {
    width: width - 30,
    height: 80,
    backgroundColor: '#786396',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
  },

  entete: {
    color: '#fff',
    fontStyle: 'italic',
    marginRight: 30,
  },

  cercle: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
    marginRight: 10,
  },

  etoiles: {
    flexDirection: 'row',
  },
  etoile1: {
    color: 'yellow',
  },
  etoile2: {
    color: 'yellow',
  },

  etoile3: {
    color: 'yellow',
  },

  etoile4: {
    color: 'yellow',
  }
},
)
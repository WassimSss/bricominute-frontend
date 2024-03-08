import { StatusBar } from 'expo-status-bar';
import { Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Profil() {
  return (
      <KeyboardAvoidingView behavior= {Platform.OS === 'ios'  ? 'padding' : 'height'}>
        
        <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.containerImageAndText}>

          <View>
            <View style={styles.cercle} />

          </View>

          <View>
            <Text style={styles.entete}> ANTOINE TUYEAU </Text>
            <View style={styles.etoiles}>
              <FontAwesome style={styles.etoile1} name='star' size={20} />
              <FontAwesome style={styles.etoile2} name='star' size={20} />
              <FontAwesome style={styles.etoile3} name='star' size={20} />
              <FontAwesome style={styles.etoile4} name='star' size={20}/>
              <FontAwesome style={styles.etoile5} name='star' size={20} />
            </View>
          </View>
          
          <View>
          </View>
        </View>

        <Text style={styles.transaction}>Transaction</Text>
        <Text style={styles.parametres}>Parametres </Text>
        <Text style={styles.Infos}>Informations personnelles </Text>
        <Text style={styles.Mail}>Email </Text>
        <Text style={styles.Not}>Notifications </Text>
        <Text style={styles.Infos}>Moyens de paiement </Text>
        <Text style={styles.aide}>Aide </Text>
        <Text style={styles.légal}>Informations légales </Text>
        <Text style={styles.centre}>Centre d'aide</Text>

        <View style={styles.disconnect}>
        <TouchableOpacity activeOpacity={0.1}>
        <Text style={styles.textDisc}>Me deconnecter</Text>
        </TouchableOpacity>
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
    marginTop: '5%',
    flexDirection: 'row-reverse',
   margin: 8,
  },

    transaction:{
      fontSize: 25,
      borderBottomWidth: 1,
    },

    parametres:{
      fontSize: 25,
    },

    Infos:{
      fontSize: 25,
      borderBottomWidth: 1,
    },

    Mail:{
      fontSize: 25,
    },

    Not:{
      fontSize: 25,
    },

    aide:{
      fontSize: 25,
    },
    
    légal:{
      fontSize: 25,
    },
    centre:{
        fontSize: 25,
    },

    disconnect:{
      color: '#D42C2C',
      justifyContent: 'flex-end',
      alignItems: 'flex-end', 
      height:'43%'
    },

    textDisc:{
      color: '#D42C2C',
    },


  
  containerImageAndText: {
    width: width - 30,
    height: 100,
    backgroundColor: '#786396',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    
  },

  entete: {
    backgroundColor: '#fff',
    fontStyle: 'italic',
  },

  cercle: {
    width: 50,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 100,
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
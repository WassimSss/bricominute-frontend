import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TextInput } from 'react-native-paper';

export default function MessageScreen({ navigation }) {
  return (

   <KeyboardAvoidingView style = {styles.container}>
    <View style = {styles.blocMessage}>
      <View style = {styles.blocProfil}>
      <View>
            <View style={styles.cercle} />
            
          </View>
          <Text style= {styles.nom}>ANTOINE TUYEAU</Text>
          </View>
          <View style= {styles.blocText}>
            <Text style = {styles.message}>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
    sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.
            </Text>

      </View>

    </View>
              <View style= {styles.input}>
                <TextInput
                placeholder='ecrivez votre message'
                >
                </TextInput>
              </View>
   </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'space-between',
  //  height: '100%'
   
  },
  blocMessage:{
   // borderWidth: 1,
    //borderColor: 'red',
    height: '30%',
    margin: '10%',
    backgroundColor: '#786396'
  },

  blocProfil:{
   // borderWidth: 1,
    borderColor: 'green',
    height: '30%',
    margin: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },

  blocText:{
    //borderWidth: 1,
    borderColor: 'blue',
    height: '40%',
    margin: '5%',
    color: 'white'
    
  },

  cercle: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  nom:{
    color: 'white'
  },

  message:{
    color: '#fff',
  },

  input:{
    // height: '20%',
  }


 

});

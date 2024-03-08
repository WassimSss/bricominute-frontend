import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function DocumentScreen() {
  const BACKEND_ADDRESS = 'http://10.20.2.120:3000';


  const [selectedFiles, setSelectedFiles] = useState([]);

  const importDoc = async (index) => {

    const formData = new FormData();

    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });


      console.log('selected files : ', selectedFiles);

      if (result.assets != null && !result.canceled) {
        const fileUri = result.assets[0].uri;

        try {
          const fileInfo = await FileSystem.getInfoAsync(fileUri);
           
            formData.append('selectionPDF', {
              uri: fileUri,
              name: result.assets[0].name,
              type: 'application/pdf',
            });


          setSelectedFiles([...selectedFiles, {fileUri: fileUri, name: result.assets[0].name, type: 'application/pdf',
        }]);
        } catch (fileInfoError) {
          console.error('Erreur lors de la récupération des informations du fichier:', fileInfoError);
        }
      }
    } catch (pickerError) {
      console.error('Erreur lors de la sélection du fichier:', pickerError);
    }
  };

  const sendDoc = () => {
    console.log(selectedFiles[0]);
    const formData = new FormData();

    console.log('cliquer sur validé');

    selectedFiles.map( (file, i) => {

      formData.append(`selectionPDF${i + 1}`, {
        uri: file.fileUri,
        name: file.name,
        type: file.type,
      });    
    }
      )
  

    fetch(`${BACKEND_ADDRESS}/user/upload`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json())
    .then(data => {
      console.log(data);
    })
  }

  return (

    <View style={styles.container}>
      <View style={styles.blockHaut}>

        <Text style={styles.title}>Importe tes Documents</Text>

      </View>

      <View style={styles.millieu}>
        <TouchableOpacity onPress={() => importDoc(1)}>
          <Text style={styles.input2}>{selectedFiles[0] !== undefined && selectedFiles[0].name || 'Importer'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => importDoc(2)}>
          <Text style={styles.input2}>{selectedFiles[1] !== undefined && selectedFiles[1].name || 'Importer'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => importDoc(3)}>
          <Text style={styles.input2}>{selectedFiles[2] !== undefined && selectedFiles[2].name || 'Importer'}</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => sendDoc()}>
          <Text>Valider</Text> 
</TouchableOpacity>

      </View>

      <View style={styles.blockBas}>

      </View>



      <View style={styles.etape}>

        <Text style={styles.textButton1}>Etape 2/3</Text>
      </View>
      <View style={styles.blockFin}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton2}>Précedent</Text>
          <FontAwesome name='arrow-left' size={50} color='#b14a73' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton3}>Suivant</Text>
          <FontAwesome name='arrow-right' size={50} color='#b14a73' />
        </TouchableOpacity>
      </View>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {


    alignItems:'center',
    justifyContent:'center',
    flex:1,
    },
    
    
    blockHaut: {
        height:'30%',
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop: '10%',

      },

      title:{
        fontSize:39,
        fontWeight:'bold',
        fontFamily: "Futura",
        marginBottom: 20,
        textAlign: 'center'
      },

      input1:{
        borderWidth:1,
        width:'80%',
        height:'20%',

          },


  blockHaut: {
    height: '30%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '10%',

  },

  title: {
    fontSize: 39,
    fontWeight: 'bold',
    fontFamily: "Futura",
    marginBottom: 20,
    textAlign: 'center'
  },

  input1: {
    borderWidth: 1,
    width: '80%',
    height: '20%',

  },


  millieu: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '30%',
    flexDirection: 'column',
    fontSize: '20px',

  },

  input2: {
    borderWidth: 1,
    width: '60%',
    height: '25%',
  },



  blockBas: {
    alignItems: 'center',
    marginBottom: '20%',
    width: '100%',
    justifyContent: 'center',
  },


  button1: {
    alignItems: "center",
    justifyContent: 'center',
    width: "60%",
    height: '20%',
    marginTop: 30,
    backgroundColor: "#B14A73",
    borderRadius: 15,
    fontSize: '20px',
  },



  button: {
    fontFamily: "Futura",
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',

  },




  blockFin: {

    width: '100%',
    height: '15%',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  textButton1: {
    fontSize: 30,
    color: '#008e9b',
    borderBottomWidth: 1,
    borderBottomColor: '#008e9b',

  },

  etape: {
    alignItems: 'center',

  },
  textButton2: {
    fontSize: 17,
    color: '#008e9b',
    borderBottomWidth: 1,
    borderBottomColor: '#008e9b',
    fontWeight: 'bold',
  },

  textButton3: {
    fontSize: 17,
    color: '#008e9b',
    borderBottomWidth: 1,
    borderBottomColor: '#008e9b',
    fontWeight: 'bold',

  },


});



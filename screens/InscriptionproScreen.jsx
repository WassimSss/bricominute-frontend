import { 
    Button,
    StyleSheet,
    Text, 
    View ,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Title,
    SafeAreaView,
    } from 'react-native';
    import FontAwesome from 'react-native-vector-icons/FontAwesome'
 import {useState} from 'react'
 import Checkbox from 'expo-checkbox';
    
export default function InscriptionproScreen({ navigation }) {
    const [isElec, setIsElec] = useState(false);
    const [isDeme, setIsDeme] = useState(false);
    const [isMenage, setIsMenage] = useState(false);
    const [isPlomb, setIsPlomb ]= useState(false);
    const [isMeuble, setIsMeuble] = useState(false);
    const [isPeint, setIsPeint] = useState(false);
    const [isMenuiserie, setIsMenuiserie] = useState(false);
    const [isEncombrant, setIsEncombrant] = useState(false);
 return ( 
    
    <SafeAreaView style={styles.container}>
  
  


<View style={styles.blockTitle}>
<Text style={styles.title}>Votre</Text>
<Text style={styles.title}>Entreprise</Text>
</View>

<View style={styles.blockMillieu}>
<TextInput placeholder="Nom de l'entreprise" style={styles.input1}  />
        <TextInput placeholder="Description" style={styles.input1}  />
    </View> 
  

    <View style={styles.blockBas}>
    <View>  
            <View style={styles.checkboxAlign}> 
    <Checkbox style={styles.CheckBox} value={isElec} onValueChange={setIsElec}/> 
    <Text style={styles.paragraph}>Electricité</Text>

    </View>
    <View style={styles.checkboxAlign}> 
    <Checkbox style={styles.CheckBox} value={isDeme} onValueChange={setIsDeme}/> 
    <Text style={styles.paragraph}>Démenagement</Text>

    </View>
     <View style={styles.checkboxAlign}> 
    <Checkbox style={styles.CheckBox} value={isMenage} onValueChange={setIsMenage}/> 
    <Text style={styles.paragraph}>Ménage</Text>
    </View>
    <View style={styles.checkboxAlign}> 
    <Checkbox style={styles.CheckBox} value={isPlomb} onValueChange={setIsPlomb}/> 
    <Text style={styles.paragraph}>Plomberie</Text>
    </View>
        </View>
        <View>
        <View style={styles.checkboxAlign}> 
    <Checkbox style={styles.CheckBox} value={isEncombrant} onValueChange={setIsEncombrant}/> 
    <Text style={styles.paragraph}>Encombrants</Text>
    </View>
    <View style={styles.checkboxAlign}> 
    <Checkbox style={styles.CheckBox} value={isMeuble} onValueChange={setIsMeuble}/> 
    <Text style={styles.paragraph}>Montage meuble</Text>
    </View>
    <View style={styles.checkboxAlign}> 
    <Checkbox style={styles.CheckBox} value={isMenuiserie} onValueChange={setIsMenuiserie}/> 
    <Text style={styles.paragraph}>Menuiserie</Text>
    </View>
    <View style={styles.checkboxAlign}> 
    <Checkbox style={styles.CheckBox} value={isPeint} onValueChange={setIsPeint}/> 
    <Text style={styles.paragraph}>Peinture</Text>
    </View>
        </View>
        </View> 


<Text style={styles.textButton1}>Etape 2/3</Text> 

    <View style={styles.containerPoints}>
        <View style={styles.point} />
        <View style={styles.point} />
        <View style={styles.point} />

    </View>
<View style={styles.blockFin}>
<TouchableOpacity style={styles.button}>    
       <Text style={styles.textButton2}>Précedent</Text>
       <FontAwesome name='arrow-left' size={50} color='#b14a73'/>      
</TouchableOpacity>
    <TouchableOpacity style={styles.button}>   
       <Text style={styles.textButton3}>Suivant</Text>
       <FontAwesome name='arrow-right' size={50} color='#b14a73'/>      
    </TouchableOpacity>

</View> 
       
      

 </SafeAreaView>

);
    
    

}


const styles = StyleSheet.create({





container:{
    flex:1,

    },

    blockTitle:{
width:'100%',

height: '20%',

    },

title:{
    fontSize:45,
    fontWeight:'bold',
    fontFamily: "Futura",
    marginBottom: 20,
    textAlign: 'center',
    
  },

  blockMillieu:{

   
 
    justifyContent:'center',
   
    height: '20%',
    width: '100%',
    alignItems: 'center',

  },

  textButton1:{
    fontSize:30,
    color:'#008e9b',
    borderBottomWidth:1,
    borderBottomColor:'#008e9b',
    textAlign: 'center',
   
    },

    containerPoints : {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    point : {
        width:15,
        height:15,
        borderRadius:100,
        backgroundColor: 'red',
        margin: 3
    },
    textButton2:{
        fontSize:17,
        color:'#008e9b',
        borderBottomWidth:1,
        borderBottomColor:'#008e9b',
        fontWeight:'bold',

    },

    textButton3:{
        fontSize:17,
        color:'#008e9b',
        borderBottomWidth:1,
        borderBottomColor:'#008e9b',
        fontWeight:'bold',
        
    },
    input1: {
        borderWidth: 1,
        width: '80%',
        height: '35%',
      },
    blockFin:{
        alignItems:'center',
        flexDirection: 'row',
        width:'100%',
       justifyContent:'space-between',
     margin:'12',
   
     
    },

    blockBas:{
        
       width:'100%',
       height: '50%',
       
       textAlign:'right',
       flexDirection:'row',
       justifyContent:'center',
    },
    checkboxAlign:{
    
       textAlign: 'center',
       height: '20%',
       width:'80%',
  
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center'
    }


    });






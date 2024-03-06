import { StyleSheet, Text, View,TouchableOpacity,TextInput,Button,} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function PaiementScreen() {
    return (

        <View style={styles.container}>
        <View style= {styles.blockHaut}>
        
           <Text style={styles.title}>Importe tes Documents</Text>
        
           </View>

           <View style={styles.millieu}>
     <TextInput placeholder="Importer"style={styles.input2}/>
     <TextInput placeholder="Importer"style={styles.input2}/>
     <TextInput placeholder="Importer"style={styles.input2}/>
     </View>

     <View style={styles.blockBas}>
    

 
     </View> 


    
     <View style={styles.etape}>

     <Text style={styles.textButton1}>Etape 2/3</Text> 
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
      </View>
   
 );
}
const styles = StyleSheet.create({
    container:{


    alignItems:'center',
    justifyContent:'center',
    flex:'1',
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


      millieu : {
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        height:'30%',
       flexDirection:'column',
        fontSize:'20px',
     
      },
     
      input2:{
        borderWidth:1,
        width:'60%',
        height:'25%',
          },


        
    blockBas:{
        alignItems:'center',
        marginBottom: '20%',
        width:'100%',
       justifyContent:'center',
    },
       
    
      button1 : {
        alignItems: "center",
        justifyContent:'center',
           width: "60%",
           height:'20%',
           marginTop: 30,
           backgroundColor: "#B14A73",
           borderRadius: 15,
       
           fontSize:'20px',
      },

   
    
     button: {
            fontFamily: "Futura",
            fontWeight:'bold',
            fontSize:20,
            color: 'white',
          
             },


   

    blockFin:{
    
        width:'100%',
       height:'15%',
       justifyContent:'space-between',
       flexDirection:'row',
    
    },
    textButton1:{
        fontSize:30,
        color:'#008e9b',
        borderBottomWidth:1,
        borderBottomColor:'#008e9b',
       
        },
    
        etape:{
            alignItems:'center',
           
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


        });
    
    

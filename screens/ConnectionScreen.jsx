import { Button, StyleSheet, Text, View } from 'react-native';

export default function ConnectionScreen({ navigation }) {
 return (
   <View>
     <Text>Connection Screen</Text>
     <Button
       title="Go to Home"
       onPress={() => navigation.navigate('Home')}
     />
   </View>
 );
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
    }, 
});
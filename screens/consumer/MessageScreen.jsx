import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function MessageScreen({ navigation }) {
  return (
    <View>
      <Text>Message</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

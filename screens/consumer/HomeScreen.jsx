import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.newsContainer}>
        <View style={styles.newsCard}>
          <Text style={styles.title}>M.A.J.1.6.2</Text>
          <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
        </View>

        <View style={styles.newsCard}>
          <Text style={styles.title}>M.A.J.1.6.1</Text>
          <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
        </View>

        <View style={styles.newsCard}>
          <Text style={styles.title}>M.A.J.1.5</Text>
          <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  newsContainer: {
    marginTop: 30
  },
  newsCard: {
    display: 'flex',
    margin: 20,
    padding: 20,
    elevation: 10,
    backgroundColor: '#ffffff', // Ajoutez une couleur de fond si nécessaire
    borderRadius: 10, // Ajoutez une bordure arrondie si nécessaire
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 5 }, // Décalage de l'ombre
    shadowOpacity: 0.35, // Opacité de l'ombre
    shadowRadius: 15, // Rayon de l'ombre
    elevation: 10, // Pour Android, simule l'effet d'ombre
  },
  title: {
    color: '#008E9B'
  },
  desc: {

  }
});

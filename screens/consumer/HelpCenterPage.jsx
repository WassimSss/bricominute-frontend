import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HelpCenterPage = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Centre d'Aide</Text>

            <View style={styles.section}>
                <Text style={styles.title}>Comment assembler un meuble en 10 étapes simples</Text>
                <Text>Faut-il vraiment lire les instructions ? Qui sait, mais nous avons concocté ce guide hilarant pour vous aider à éviter les erreurs de bricolage les plus courantes. Consultez notre guide pour découvrir pourquoi votre nouvelle armoire ressemble plus à un puzzle qu'à un meuble.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Pourquoi ma perceuse fait-elle ce bruit étrange ?</Text>
                <Text>Vous avez entendu ce bruit avant, n'est-ce pas ? Le "bzzzz" qui vous fait douter de votre choix de carrière de bricoleur amateur. Ne vous inquiétez pas, nous avons décrypté les mystères de la perceuse électrique pour que vous puissiez percer avec confiance.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Mon chat adore-t-il vraiment les câbles électriques ?</Text>
                <Text>Les chats et les câbles électriques : une relation plus vieille que le temps. Mais pourquoi ? Et comment faire pour que votre adorable félin laisse vos appareils électriques tranquilles ? Découvrez les secrets dans notre enquête exclusive.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Comment éviter de crier des gros mots en bricolant</Text>
                <Text>Lorsque le marteau ne veut pas coopérer et que la vis refuse de tourner, il est facile de perdre son calme. Mais ne vous inquiétez pas, nous avons compilé une liste de techniques éprouvées pour vous aider à garder votre langage propre pendant que vous transformez votre maison en chef-d'œuvre de bricolage.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Que faire si vous vous êtes collé les doigts avec de la super colle</Text>
                <Text>Ça arrive aux meilleurs d'entre nous. Si vous vous retrouvez dans cette situation collante, ne paniquez pas ! Suivez nos conseils pour vous débarrasser de la super colle et récupérer vos doigts en un rien de temps. Spoiler alert : c'est plus facile que de retirer une gomme à mâcher de vos cheveux.</Text>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TabNavigator')}>
                <Text style={styles.buttonText}>Retour</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#786396', // Couleur du titre de la section
    },
    backButton: {
        backgroundColor: '#786396', // Couleur du bouton de retour
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default HelpCenterPage;
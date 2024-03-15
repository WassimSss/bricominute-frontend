import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const LegalInformationPage = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Informations Légales</Text>

            <View style={styles.section}>
                <Text style={styles.title}>Mentions Légales</Text>
                <Text>Raison sociale : BricoMinute</Text>
                <Text>Adresse : 123 Rue du Bricolage, 75001 Paris</Text>
                <Text>Numéro de téléphone : 01 23 45 67 89</Text>
                <Text>Directeur de la publication : Bob le Bricoleur</Text>
                <Text>Hébergeur : Nuage Inc. - 456 Cloud Street, Cloud City</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Propriété Intellectuelle</Text>
                <Text>Tous les bricolages présents sur ce site, incluant, mais non limité aux tutoriels, astuces, et designs, sont la propriété de BricoMinute. Si vous essayez de reproduire nos créations, assurez-vous de porter un casque de sécurité !</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Données Personnelles</Text>
                <Text>BricoMinute s'engage à protéger vos données personnelles. Nous ne partagerons jamais vos secrets de bricolage avec des tiers. Si vous nous envoyez des photos de vos projets, nous les garderons en lieu sûr.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Cookies</Text>
                <Text>Ce site utilise des cookies pour améliorer votre expérience de bricolage. En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Responsabilité</Text>
                <Text>BricoMinute décline toute responsabilité en cas de bricolage raté. Si vous vous retrouvez avec un meuble bancal, une peinture dégoulinante ou des câbles électriques mal connectés, c'est à vos risques et périls !</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Modifications</Text>
                <Text>BricoMinute se réserve le droit de modifier, à tout moment et sans préavis, les présentes mentions légales. Nous nous réservons également le droit de changer d'avis sur la couleur de notre logo. Vous pouvez toujours nous contacter si vous avez des questions.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Contact</Text>
                <Text>Si vous avez des questions, des suggestions de bricolage ou si vous voulez simplement nous dire bonjour, envoyez-nous un message à contact@bricominute.com.</Text>
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
        color: '#786396',
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: '#786396',
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

export default LegalInformationPage;
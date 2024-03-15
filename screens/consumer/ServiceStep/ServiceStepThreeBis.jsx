import { useEffect, useState } from 'react';
import { AddLoginToStore } from '../../../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { checkTokenAndRedirect } from '../../../utils/checkTokenAndRedirect';
import { nextStep, previousStep, setAddress, setCity, setStreetNumber, setZipCode } from '../../../reducers/consumerServices';

export default function WhereScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        checkTokenAndRedirect(navigation, user);
    }, []);

    const handlePreviousStep = (can) => {
        if (can) {
            dispatch(previousStep());
        }
    };

    const handleNextStep = (can) => {
        if (can) {
            dispatch(nextStep());
        }
    };


    const consumerService = useSelector((state) => state.consumerServices.value);

    console.log('connection');
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.blockHaut}>
                <Text style={styles.title}>OU ?</Text>
                <Text>Etape {consumerService.step}/5</Text>
            </View>

            <View style={styles.blockMillieu}>
                <TextInput
                    placeholder="Numero de rue"
                    style={styles.input1}
                    onChangeText={(value) => dispatch(setStreetNumber(value))}
                    value={consumerService.streetNumber}
                />
                <TextInput
                    placeholder="Rue"
                    style={styles.input1}
                    onChangeText={(value) => dispatch(setAddress(value))}
                    value={consumerService.address}
                />
                <TextInput
                    placeholder="Code postal"
                    style={styles.input1}
                    onChangeText={(value) => dispatch(setZipCode(value))}
                    value={consumerService.zipCode}
                />
                <TextInput
                    placeholder="Ville"
                    style={styles.input1}
                    onChangeText={(value) => dispatch(setCity(value))}
                    value={consumerService.city}
                />
            </View>

            <View style={styles.allBtn}>
                <TouchableOpacity style={styles.arrowBtnContainer} onPress={() => handlePreviousStep(true)}>
                    <Text style={[styles.activeColor, consumerService.step === 1 && styles.cantGoStyle]}>
                        Précédent
                    </Text>
                    <FontAwesome
                        name="arrow-left"
                        size={20}
                        color="#B14A73"
                        style={consumerService.step === 1 && styles.cantGoStyle}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.arrowBtnContainer, styles.cantGoStyle]}
                    onPress={() => handleNextStep(consumerService.streetNumber !== '' && consumerService.address !== '' && consumerService.zipCode !== '' && consumerService.city !== '')}
                >
                    <Text style={[styles.cantGoStyle, (consumerService.streetNumber !== '' && consumerService.address !== '' && consumerService.zipCode !== '' && consumerService.city !== '') && styles.activeColor]}>
                        Suivant
                    </Text>
                    <FontAwesome
                        name="arrow-right"
                        size={20}
                        color="#979797"
                        style={(consumerService.streetNumber !== '' && consumerService.address !== '' && consumerService.zipCode !== '' && consumerService.city !== '') && styles.activeColor}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    },

    blockHaut: {
        width: '100%',
        alignItems: 'center',
        fontWeight: 'bold',
        height: '30%',
        justifyContent: 'center'
    },

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: height
    },

    title: {
        fontSize: 39,
        fontWeight: 'bold',
        // fontFamily: 'Futura',
        marginBottom: 50
    },
    button1: {
        fontSize: 17,
        color: '#008e9b',
        // borderBottomWidth: 1,
        borderBottomColor: '#008e9b',
        fontWeight: 'bold',
        marginLeft: 30,
    },

    button3: {
        fontSize: 17,
        color: '#008e9b',
        // borderBottomWidth: 1,
        borderBottomColor: '#008e9b',
        fontWeight: 'bold',
        marginRight: 5
    },
    input1: {
        borderWidth: 1,
        width: '80%',
        height: '15%'
    },
    blockMillieu: {
        justifyContent: 'space-around',
        marginLeft: '10%',
        height: '30%',
        width: '80%',
        alignItems: 'center'
    },

    textButton2: {
        fontSize: 17,
        color: '#008e9b',
        borderBottomWidth: 1,
        borderBottomColor: '#008e9b',
        fontWeight: 'bold',
        marginTop: 170,
    },

    textButton3: {
        fontSize: 17,
        color: '#008e9b',
        borderBottomWidth: 1,
        borderBottomColor: '#008e9b',
        fontWeight: 'bold',
        marginTop: 170,
        marginRight: 5,
    },


    blockBas: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        margin: '12',
    },
    input2: {
        //borderWidth: 1
    },

    //  button: {
    //         fontFamily: "Futura",
    //         fontWeight:'bold',
    //         fontSize:30,
    //         color: 'white',

    //      },
    textButton: {
        fontSize: 15,
        color: '#008e9b',
        borderBottomWidth: 1,
        borderBottomColor: '#008e9b'
    },
    allBtn: {
        display: 'flex',
        flexDirection: 'row',
        width: width - 60,
        justifyContent: 'space-between',
        marginTop: 30
    },
    cantGoStyle: {
        color: '#979797'
    },
    activeColor: {
        color: '#B14A73'
    },
    radioBtns: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width,
        marginBottom: 100,
        marginTop: 100
    },
    li: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    liText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    line: {
        width: width - 50,
        backgroundColor: '#000',
        height: 2
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        shadowColor: '#000', // Couleur de l'ombre
        shadowOffset: { width: 0, height: 5 }, // Décalage de l'ombre
        shadowOpacity: 0.35, // Opacité de l'ombre
        shadowRadius: 15, // Rayon de l'ombre
        elevation: 10 // Pour Android, simule l'effet d'ombre
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerButton: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
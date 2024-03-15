import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { setCompany_name, setDescription, setSpecialities } from '../reducers/inscription';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from 'expo-checkbox';




export default function InscriptionproScreen({ navigation }) {

    // const [isElec, setIsElec] = useState(false);
    // const [isDeme, setIsDeme] = useState(false);
    // const [isMenage, setIsMenage] = useState(false);
    // const [isPlomb, setIsPlomb ]= useState(false);
    // const [isMeuble, setIsMeuble] = useState(false);
    // const [isPeint, setIsPeint] = useState(false);
    // const [isMenuiserie, setIsMenuiserie] = useState(false);
    // const [isEncombrant, setIsEncombrant] = useState(false);

    const dispatch = useDispatch();
    const inscriptionInfo = useSelector(state => state.inscription.value);
    const [error, setError] = useState('');
    const [allJob, setAllJob] = useState([])

    console.log(inscriptionInfo);
    useEffect(() => {
        fetch(`http://10.20.2.115:3000/job`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const updatedJobs = data.data.map(e => e.name);

                console.log(updatedJobs);
                setAllJob(updatedJobs)
            })
    }, [])

    const handleRegisterPro = () => {

        if (inscriptionInfo.company_name !== '' && inscriptionInfo.description !== '', inscriptionInfo.specialities.length > 0) {
            setError('')
            console.log(setSpecialities);




            navigation.navigate('Document')
        } else {
            setError('Tout les champs ne sont pas remplis')
        }
    };

    // console.log(allJob);
    const allJobBox = allJob.map(job => {
        return <View style={styles.checkboxAlign}>
            <Checkbox style={styles.CheckBox} color='#786396' value={inscriptionInfo.specialities.includes(job)}
                onValueChange={() => dispatch(setSpecialities(job))} />
            <Text style={styles.paragraph}>{job}</Text>
        </View>

    })


    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.blockTitle}>
                <Text style={styles.title}>Votre</Text>
                <Text style={styles.title}>Entreprise</Text>
            </View>

            <View style={styles.blockMillieu}>
                <TextInput placeholder="Nom de la société" style={styles.input1}
                    onChangeText={(value) => dispatch(setCompany_name(value))}
                    value={inscriptionInfo.company_name} />
                <TextInput placeholder="Description" style={styles.input1}
                    onChangeText={(value) => dispatch(setDescription(value))}
                    value={inscriptionInfo.description} />
            </View>


            <View style={styles.blockBas}>
                <View style={styles.allBox}>
                    {allJobBox}
                </View>
                {/* <View>
                    <View style={styles.checkboxAlign}>
                        <Checkbox style={styles.CheckBox} value={inscriptionInfo.specialities.includes('Electricité')}
                            onValueChange={() => dispatch(setSpecialities('Electricité'))} />
                        <Text style={styles.paragraph}>Electricité</Text>
                    </View>
                    <View style={styles.checkboxAlign}>
                        <Checkbox style={styles.CheckBox} value={inscriptionInfo.specialities.includes('Electricité')}
                            onValueChange={() => dispatch(setSpecialities('Electricité'))} />
                        <Text style={styles.paragraph}>Démenagement</Text>
                    </View>
                    <View style={styles.checkboxAlign}>
                        <Checkbox style={styles.CheckBox} value={inscriptionInfo.specialities.includes('Electricité')}
                            onValueChange={() => dispatch(setSpecialities('Electricité'))} />
                        <Text style={styles.paragraph}>Ménage</Text>
                    </View>
                    <View style={styles.checkboxAlign}>
                        <Checkbox style={styles.CheckBox} value={inscriptionInfo.specialities.includes('Electricité')}
                            onValueChange={() => dispatch(setSpecialities('Electricité'))} />
                        <Text style={styles.paragraph}>Plomberie</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.checkboxAlign}>
                        <Checkbox style={styles.CheckBox} value={inscriptionInfo.specialities.includes('Electricité')}
                            onValueChange={() => dispatch(setSpecialities('Electricité'))} />
                        <Text style={styles.paragraph}>Encombrants</Text>
                    </View>
                    <View style={styles.checkboxAlign}>
                        <Checkbox style={styles.CheckBox} value={inscriptionInfo.specialities.includes('Electricité')}
                            onValueChange={() => dispatch(setSpecialities('Electricité'))} />
                        <Text style={styles.paragraph}>Montage meuble</Text>
                    </View>
                    <View style={styles.checkboxAlign}>
                        <Checkbox style={styles.CheckBox} value={inscriptionInfo.specialities.includes('Electricité')}
                            onValueChange={() => dispatch(setSpecialities('Electricité'))} />
                        <Text style={styles.paragraph}>Menuiserie</Text>
                    </View>
                    <View style={styles.checkboxAlign}>
                        <Checkbox style={styles.CheckBox} value={inscriptionInfo.specialities.includes('Electricité')}
                            onValueChange={() => dispatch(setSpecialities('Electricité'))} />
                        <Text style={styles.paragraph}>Peinture</Text>
                    </View>
                </View> */}
            </View>
            <Text style={styles.error}>{error}</Text>

            <Text style={styles.textButton1}>Etape 2/3</Text>

            <View style={styles.containerPoints}>
                <View style={styles.point} />
                <View style={styles.point} />
                <View style={styles.point} />
            </View>
            <View style={styles.blockFin}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton2}>Précedent</Text>
                    <FontAwesome name='arrow-left' size={50} color='#786396' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton3} onPress={() => handleRegisterPro()}>Suivant</Text>
                    <FontAwesome name='arrow-right' size={50} color='#786396' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    blockTitle: {
        width: '100%',
        height: '20%',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        fontFamily: "Futura",
        marginBottom: 20,
        textAlign: 'center',
    },
    blockMillieu: {
        justifyContent: 'center',
        height: '20%',
        width: '100%',
        alignItems: 'center',
    },
    textButton1: {
        fontSize: 30,
        // color: '#008e9b',
        borderBottomWidth: 1,
        borderBottomColor: '#786396',
        textAlign: 'center',
    },
    containerPoints: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    point: {
        width: 15,
        height: 15,
        borderRadius: 100,
        backgroundColor: 'red',
        margin: 3,
    },
    textButton2: {
        fontSize: 17,
        // color: '#008e9b',
        borderBottomWidth: 1,
        borderBottomColor: '#786396',
        fontWeight: 'bold',
    },
    textButton3: {
        fontSize: 17,
        // color: '#008e9b',
        borderBottomWidth: 1,
        borderBottomColor: '#786396',
        fontWeight: 'bold',
    },
    input1: {
        borderWidth: 1,
        width: '80%',
        height: '35%',
    },
    blockFin: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        margin: '12',
    },
    blockBas: {
        width: '100%',
        // height: '50%',
        textAlign: 'right',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    checkboxAlign: {
        textAlign: 'center',
        // height: '20%',
        width: '50%',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        color: 'red',
    },
    allBox: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    CheckBox: {

    }
});






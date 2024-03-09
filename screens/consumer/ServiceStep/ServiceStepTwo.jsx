import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { addJobToSore, deleteJobToStore, addJobTaskToSore, deleteJobTaskToStore, nextStep, previousStep } from '../../../reducers/consumerServices';
import { useEffect, useState } from 'react';


export default function ServiceStepTwo({ navigation }) {
  const consumerService = useSelector(state => state.consumerServices.value);
  const dispatch = useDispatch()
  const [allJobTasksState, setAllJobTasksState] = useState([])

  const handlePreviousStep = (can) => {
    if (can) {
      dispatch(previousStep())
    }
  }

  const handleNextStep = (can) => {
    if (can) {
      dispatch(nextStep())
    }
  }

  const handleAddJobTask = (task) => {
    console.log(task);
    if (consumerService.jobTasks.find(e => e.name === task.name)) {
      // console.log('delete');
      dispatch(deleteJobTaskToStore(task))
    } else {
      // console.log('add');
      dispatch(addJobTaskToSore(task))
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const promises = consumerService.jobs.map(async (job) => {
        const response = await fetch(`http://192.168.1.156:3000/job/getJobTasks/${job.idJob}`);
        const data = await response.json();
        return data.data;
      });

      const allJobTasks = await Promise.all(promises);
      const flattenedTasks = allJobTasks.flat();
      setAllJobTasksState(flattenedTasks);
    };

    fetchTasks();
  }, []);

  const allJobTasksStateRender = allJobTasksState.map(e => {
    //console.log({ name: e.name, job: e.price });
    // console.log(e);
    return <TouchableOpacity key={e.name} style={[styles.cardJob, consumerService.jobTasks.find(task => task.name === e.name) && styles.selectedCardJob]} onPress={() => handleAddJobTask({ name: e.name, price: e.price })}>
      <Text style={styles.textWhite}>{e.name}</Text>
      <Text style={styles.textWhite}>{e.price}€</Text>
    </TouchableOpacity>
  })

  //console.log(allJobTasksState);
  return (
    <View style={styles.container}>
      {/* FAIRE UN FETCH POUR RECUPERER TOUT LES JOBTASK DU/DES METIERS RENTRER DANS L ETAPE PRECEDENTES PAR LEURS NOMS JOB*/}

      <Text style={styles.title}>
        Type de travaux
      </Text>
      <Text>Etape {consumerService.step}/4</Text>

      <ScrollView>
        <View style={styles.allJob}>
          {allJobTasksStateRender}
        </View>
      </ScrollView>


      <View style={styles.allBtn}>
        <TouchableOpacity style={styles.arrowBtnContainer} onPress={() => handlePreviousStep(true)}>
          <Text style={[styles.activeColor, consumerService.step === 1 && styles.cantGoStyle]}>Précédent</Text>
          <FontAwesome name='arrow-left' size={20} color='#B14A73' style={consumerService.step === 1 && styles.cantGoStyle} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.arrowBtnContainer, styles.cantGoStyle]} onPress={() => handleNextStep(consumerService.jobTasks.length > 0)}>
          <Text style={[styles.cantGoStyle, consumerService.jobTasks.length > 0 && styles.activeColor]}>Suivant</Text>
          <FontAwesome name='arrow-right' size={20} color='#979797' style={consumerService.jobTasks.length > 0 && styles.activeColor} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

const { height, width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',

  },
  allJob: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  duo: {
    display: 'flex',
    flexDirection: 'row'
  },
  cardJob: {
    width: 100,
    height: 100,
    margin: 20,
    padding: 5,
    backgroundColor: '#B14A73',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 5 }, // Décalage de l'ombre
    shadowOpacity: 0.35, // Opacité de l'ombre
    shadowRadius: 15, // Rayon de l'ombre
    elevation: 10, // Pour Android, simule l'effet d'ombre
  },
  selectedCardJob: {
    backgroundColor: '#5E97F6',
  },
  textWhite: {
    color: 'white',
    textAlign: 'center',
  },
  arrowBtnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 2,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 5 }, // Décalage de l'ombre
    shadowOpacity: 0.35, // Opacité de l'ombre
    shadowRadius: 15, // Rayon de l'ombre
    elevation: 10, // Pour Android, simule l'effet d'ombre
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
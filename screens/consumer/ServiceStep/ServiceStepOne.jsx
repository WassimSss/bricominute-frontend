import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addJobToSore, deleteJobToStore, nextStep, previousStep } from '../../../reducers/consumerServices';
import { useEffect, useState } from 'react';


export default function ServiceStepOne({ navigation }) {

  const consumerService = useSelector(state => state.consumerServices.value);
  const dispatch = useDispatch();
  const [allJob, setAllJob] = useState([])

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
  // ETAPE 1
  const handleAddJob = (job) => {
    if (consumerService.jobs.find(e => e.name === job.name)) {
      dispatch(deleteJobToStore(job))
    } else {
      dispatch(addJobToSore(job))
    }
  }

  useEffect(() => {
    fetch('http://10.20.2.115:3000/job')
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        const updatedJobs = data.data.map(e => ({
          idJob: e['_id'],
          name: e.name
        }));

        setAllJob(updatedJobs)
      })
  }, [])

  const allJobRender = allJob.map(e => {
    return <TouchableOpacity
      key={e.idJob}
      style={[
        styles.cardJob,
        consumerService.jobs.find(job => job.idJob === e.idJob) && styles.selectedCardJob
      ]}
      onPress={() => handleAddJob({ idJob: e.idJob, name: e.name })}
    >
      <Text style={styles.textWhite}>{e.name}</Text>
    </TouchableOpacity>
  })

  console.log(consumerService.jobs);
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Type de service
      </Text>
      <Text>Etape {consumerService.step}/4</Text>
      {/* <View style={styles.duo}>

        <TouchableOpacity style={[styles.cardJob, consumerService.jobs.includes('Electricite') && styles.selectedCardJob]} onPress={() => handleAddJob('Electricite')}>
          <Text style={styles.textWhite}>Electricité</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cardJob, consumerService.jobs.includes('Plomberie') && styles.selectedCardJob]} onPress={() => handleAddJob('Plomberie')}>
          <Text style={styles.textWhite}>Plomberie</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.duo}>
        <TouchableOpacity style={[styles.cardJob, consumerService.jobs.includes('Menage') && styles.selectedCardJob]} onPress={() => handleAddJob('Menage')}>
          <Text style={styles.textWhite}>Ménage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cardJob, consumerService.jobs.includes('Peinture') && styles.selectedCardJob]} onPress={() => handleAddJob('Peinture')}>
          <Text style={styles.textWhite}>Peinture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.duo}>
        <TouchableOpacity style={[styles.cardJob, consumerService.jobs.includes('Menuiserie') && styles.selectedCardJob]} onPress={() => handleAddJob('Menuiserie')}>
          <Text style={styles.textWhite}>Menuiserie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cardJob, consumerService.jobs.includes('Demenagement') && styles.selectedCardJob]} onPress={() => handleAddJob('Demenagement')}>
          <Text style={styles.textWhite}>Démenagement</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.duo}>
        <TouchableOpacity style={[styles.cardJob, consumerService.jobs.includes('Montage de meuble') && styles.selectedCardJob]} onPress={() => handleAddJob('Montage de meuble')}>
          <Text style={styles.textWhite}>Montage de meuble</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cardJob, consumerService.jobs.includes('Encombrants') && styles.selectedCardJob]} onPress={() => handleAddJob('Encombrants')}>
          <Text style={styles.textWhite}>Encombrants</Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView>
        <View style={styles.allJob}>
          {allJobRender}
        </View>
      </ScrollView>


      <View style={styles.allBtn}>
        <TouchableOpacity style={styles.arrowBtnContainer} onPress={() => handlePreviousStep(false)} >
          <Text style={[styles.activeColor, consumerService.step === 1 && styles.cantGoStyle]}>Précédent</Text>
          <FontAwesome name='arrow-left' size={20} color='#B14A73' style={consumerService.step === 1 && styles.cantGoStyle} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.arrowBtnContainer, styles.cantGoStyle]} onPress={() => handleNextStep(consumerService.jobs.length > 0)}>
          <Text style={[styles.cantGoStyle, consumerService.jobs.length > 0 && styles.activeColor]}>Suivant</Text>
          <FontAwesome name='arrow-right' size={20} color='#979797' style={consumerService.jobs.length > 0 && styles.activeColor} />
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
});

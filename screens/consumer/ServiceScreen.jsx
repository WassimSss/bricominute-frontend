import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import RadioButton from '../../components/RadioButton';

export default function ServiceScreen({ navigation }) {

  const [jobs, setJobs] = useState([]);
  const [jobTask, setJobTask] = useState([])
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState('');
  const options = ['Option 1', 'Option 2', 'Option 3'];
  LocaleConfig.locales['fr'] = {
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ],
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
  };
  LocaleConfig.defaultLocale = 'fr';

  const handleAddJob = (jobName) => {
    if (jobs.includes(jobName)) {
      setJobs(jobs.filter(e => e !== jobName))
    } else {
      setJobs(prev => [...prev, jobName]);
    }
  }

  const handleAddJobTask = (jobTaskName) => {
    console.log(jobTask);
    if (jobTask.includes(jobTaskName)) {
      setJobTask(jobTask.filter(e => e !== jobTaskName))
    } else {
      setJobTask(prev => [...prev, jobTaskName]);
    }
  }

  const handlePreviousStep = (can) => {
    if (can) {
      setStep(step - 1)
    }
  }

  const handleNextStep = (can) => {
    console.log('nextStep');
    if (can) {
      setStep(step + 1)
    }
  }

  if (step === 1) {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          Type de service
        </Text>
        <Text>Etape {step}/4</Text>
        <View style={styles.duo}>

          <TouchableOpacity style={[styles.cardJob, jobs.includes('Electricite') && styles.selectedCardJob]} onPress={() => handleAddJob('Electricite')}>
            <Text style={styles.textWhite}>Electricité</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cardJob, jobs.includes('Plomberie') && styles.selectedCardJob]} onPress={() => handleAddJob('Plomberie')}>
            <Text style={styles.textWhite}>Plomberie</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.duo}>
          <TouchableOpacity style={[styles.cardJob, jobs.includes('Menage') && styles.selectedCardJob]} onPress={() => handleAddJob('Menage')}>
            <Text style={styles.textWhite}>Ménage</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cardJob, jobs.includes('Peinture') && styles.selectedCardJob]} onPress={() => handleAddJob('Peinture')}>
            <Text style={styles.textWhite}>Peinture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.duo}>
          <TouchableOpacity style={[styles.cardJob, jobs.includes('Menuiserie') && styles.selectedCardJob]} onPress={() => handleAddJob('Menuiserie')}>
            <Text style={styles.textWhite}>Menuiserie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cardJob, jobs.includes('Demenagement') && styles.selectedCardJob]} onPress={() => handleAddJob('Demenagement')}>
            <Text style={styles.textWhite}>Démenagement</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.duo}>
          <TouchableOpacity style={[styles.cardJob, jobs.includes('Montage de meuble') && styles.selectedCardJob]} onPress={() => handleAddJob('Montage de meuble')}>
            <Text style={styles.textWhite}>Montage de meuble</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cardJob, jobs.includes('Encombrants') && styles.selectedCardJob]} onPress={() => handleAddJob('Encombrants')}>
            <Text style={styles.textWhite}>Encombrants</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.allBtn}>
          <TouchableOpacity style={styles.arrowBtnContainer} onPress={() => handlePreviousStep(false)} >
            <Text style={[styles.activeColor, step === 1 && styles.cantGoStyle]}>Précédent</Text>
            <FontAwesome name='arrow-left' size={20} color='#B14A73' style={step === 1 && styles.cantGoStyle} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.arrowBtnContainer, styles.cantGoStyle]} onPress={() => handleNextStep(jobs.length > 0)}>
            <Text style={[styles.cantGoStyle, jobs.length > 0 && styles.activeColor]}>Suivant</Text>
            <FontAwesome name='arrow-right' size={20} color='#979797' style={jobs.length > 0 && styles.activeColor} />
          </TouchableOpacity>
        </View>

      </View>
    )
  } else if (step === 2) {
    return (

      <View style={styles.container}>
        {/* FAIRE UN FETCH POUR RECUPERER TOUT LES JOBTASK DU/DES METIERS RENTRER DANS L ETAPE PRECEDENTES PAR LEURS NOMS JOB*/}

        <Text style={styles.title}>
          Type de travaux
        </Text>
        <Text>Etape {step}/4</Text>
        <View style={styles.duo}>

          <TouchableOpacity style={[styles.cardJob, jobTask.includes('Remplacement ampoule') && styles.selectedCardJob]} onPress={() => handleAddJobTask('Remplacement ampoule')}>
            <Text style={styles.textWhite}>Remplacement ampoule</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cardJob, jobTask.includes('Remplacement fusible') && styles.selectedCardJob]} onPress={() => handleAddJobTask('Remplacement fusible')}>
            <Text style={styles.textWhite}>Remplacement fusible</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.duo}>
          <TouchableOpacity style={[styles.cardJob, jobTask.includes('Interrupteur') && styles.selectedCardJob]} onPress={() => handleAddJobTask('Interrupteur')}>
            <Text style={styles.textWhite}>Interrupteur</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cardJob, jobTask.includes('Plafonnier') && styles.selectedCardJob]} onPress={() => handleAddJobTask('Plafonnier')}>
            <Text style={styles.textWhite}>Plafonnier</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.duo}>
          <TouchableOpacity style={[styles.cardJob, jobTask.includes('Prise électriques') && styles.selectedCardJob]} onPress={() => handleAddJobTask('Prise électriques')}>
            <Text style={styles.textWhite}>Prise électriques</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cardJob, jobTask.includes('Applique murale') && styles.selectedCardJob]} onPress={() => handleAddJobTask('Applique murale')}>
            <Text style={styles.textWhite}>Applique murale</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.duo}>
          <TouchableOpacity style={[styles.cardJob, jobTask.includes('Coupure de courant') && styles.selectedCardJob]} onPress={() => handleAddJobTask('Montage de meuble')}>
            <Text style={styles.textWhite}>Coupure de courant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cardJob, jobTask.includes('Branchement electrique') && styles.selectedCardJob]} onPress={() => handleAddJobTask('Branchement electrique')}>
            <Text style={styles.textWhite}>Branchement electrique</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.allBtn}>
          <TouchableOpacity style={styles.arrowBtnContainer} onPress={() => handlePreviousStep(true)}>
            <Text style={[styles.activeColor, step === 1 && styles.cantGoStyle]}>Précédent</Text>
            <FontAwesome name='arrow-left' size={20} color='#B14A73' style={step === 1 && styles.cantGoStyle} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.arrowBtnContainer, styles.cantGoStyle]} onPress={() => handleNextStep(jobTask.length > 0)}>
            <Text style={[styles.cantGoStyle, jobTask.length > 0 && styles.activeColor]}>Suivant</Text>
            <FontAwesome name='arrow-right' size={20} color='#979797' style={jobTask.length > 0 && styles.activeColor} />
          </TouchableOpacity>
        </View>

      </View>
    )
  } else if (step === 3) {
    return (

      <View style={styles.container}>


        <Text style={styles.title}>
          Quand ?
        </Text>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <RadioButton options={options} />
        </View>

        <Text>Etape {step}/4</Text>

        <Calendar
          style={{
            borderWidth: 1,
            borderColor: '#B14A73',
            height: 350,
          }}
          onDayPress={day => {
            setSelected(day.dateString);
            console.log(selected);
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#B14A73',
            selectedDayBackgroundColor: '#B14A73',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#B14A73',
            dayTextColor: '#2d4150',
            arrowColor: '#B14A73'
            //textDisabledColor: '#d9e'
          }}
          // markedDates={{
          //   [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: '#B14A73', color: '#B14A73' }
          // }}
          markedDates={{
            [selected]: { selected: true, marked: true, selectedColor: '#B14A73' }
          }}
        />

        <View style={styles.allBtn}>
          <TouchableOpacity style={styles.arrowBtnContainer} onPress={() => handlePreviousStep(true)}>
            <Text style={[styles.activeColor, step === 1 && styles.cantGoStyle]}>Précédent</Text>
            <FontAwesome name='arrow-left' size={20} color='#B14A73' style={step === 1 && styles.cantGoStyle} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.arrowBtnContainer, styles.cantGoStyle]} onPress={() => handleNextStep(selected !== '')}>
            <Text style={[styles.cantGoStyle, jobTask.length > 0 && styles.activeColor]}>Suivant</Text>
            <FontAwesome name='arrow-right' size={20} color='#979797' style={jobTask.length > 0 && styles.activeColor} />
          </TouchableOpacity>
        </View>

      </View>
    )
  }
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
    fontWeight: 'bold'
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
  }
});

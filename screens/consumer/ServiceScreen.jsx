import ServiceStepOne from './ServiceStep/ServiceStepOne';
import { useSelector } from 'react-redux';
import ServiceStepTwo from './ServiceStep/ServiceStepTwo';
import ServiceStepThree from './ServiceStep/ServiceStepThree';
import ServiceStepFour from './ServiceStep/ServiceStepFour';
import { Text, View } from 'react-native';


export default function ServiceScreen({ navigation }) {

  const consumerService = useSelector(state => state.consumerServices.value);

  // Pour l'instant en dur, mais voir si l'user a deja commandée un service a partir de la base de données
  const userIsOnService = false
  if (userIsOnService) {
    return (
      <View>
        <Text>COMMANDE EFFECTUER</Text>
        <Text>L'ARTISANT EST EN ROUTE</Text>
      </View>
    )
  } else {
    if (consumerService.step === 1) {
      return (
        <ServiceStepOne />
      )
    } else if (consumerService.step === 2) {
      return (
        <ServiceStepTwo />
      )
    } else if (consumerService.step === 3) {
      return (

        <ServiceStepThree />
      )
    } else if (consumerService.step === 4) {
      return (
        <ServiceStepFour />
      )
    }
  }

}
// background: rgb(64,124,184);
// background: linear-gradient(145deg, rgba(64,124,184,1) 0%, rgba(177,74,115,1) 100%);
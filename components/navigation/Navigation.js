// Import Modules
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {StatusBar} from 'react-native';

// Import Screens
import NavApp from './NavApp';
import Demarrage from '../screens/Demarrage';
import Connexion from '../screens/Connexion';
import Inscription from '../screens/Inscription';
import Termes from '../screens/Termes';
import Accueil from '../screens/Accueil';
import Classements from '../screens/Classements';
import Objectifs from '../screens/Objectifs';
import Parametres from '../screens/Parametres';
import Parametres2 from '../screens/Parametres2';
import Jumelage from '../screens/Jumelage';
import Compteur from '../screens/Compteur';
import ListeDefis from '../screens/ListeDefis';
import Statistiques from '../screens/Statistiques';
import ForgottenPassword from '../screens/ForgottenPassword';

const Stack = createStackNavigator();

// prettier-ignore
function AccueilNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Accueil} options={{ headerShown: false }} />
            <Stack.Screen name="NavApp" component={NavApp} options={{ headerShown: false }} />
            <Stack.Screen name="Classements" component={Classements} options={{ headerShown: false }} />
            <Stack.Screen name="Objectifs" component={Objectifs} options={{ headerShown: false }} />
            <Stack.Screen name="Compteur" component={Compteur} options={{ headerShown: false }} />
            <Stack.Screen name="Parametres" component={Parametres} options={{ headerShown: false }} />
            <Stack.Screen name="Jumelage" component={Jumelage} options={{ headerShown: false }} />
            <Stack.Screen name="Statistiques" component={Statistiques} options={{ headerShown: false }} />
            <Stack.Screen name="ListeDefis" component={ListeDefis} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

// prettier-ignore
function HomeModalNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home" mode="modal">
            <Stack.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NavApp" component={NavApp} options={{ headerShown: false }} />
            <Stack.Screen name="Classements" component={Classements} options={{ headerShown: false }} />
            <Stack.Screen name="Parametres" component={Parametres} options={{ headerShown:false }} />
            <Stack.Screen name="Compteur" component={Compteur} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

// prettier-ignore
function InscriptionNavigator() {
    return (
        <Stack.Navigator initialRouteName="Inscription" mode="modal">
            <Stack.Screen name="Inscription" component={Inscription} options={{ headerShown: false }} />
            <Stack.Screen name="Objectifs" component={Objectifs} options={{ headerShown: false }} />
            <Stack.Screen name="Termes" component={Termes} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

// prettier-ignore
function ConnexionNavigator() {
    return (
        <Stack.Navigator initialRouteName="Connexion">
            <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
            <Stack.Screen name="Inscription" component={InscriptionNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

// prettier-ignore
function ClassementsNavigator() {
    return (
        <Stack.Navigator initialRouteName="Classements" >
            <Stack.Screen name="Classsements" component={Classements} options={{ headerShown: false }} />
            <Stack.Screen name="Statistiques" component={Statistiques} options={{headerShown: false}} />
            <Stack.Screen name="Accueil" component={Accueil}  option={{ title: 'Accueil'}}/>
            <Stack.Screen name="NavApp" component={NavApp} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

// prettier-ignore
function NavAppNavigator() {
    return (
        <Stack.Navigator initialRouteName="NavApp" >
            <Stack.Screen name="NavApp" component={NavApp} options={{ headerShown: false }} />
            <Stack.Screen name="Accueil" component={Accueil}  option={{ title: 'Accueil'}}/>
            <Stack.Screen name="Classsements" component={Classements} options={{ title: 'Classements' }} />
        </Stack.Navigator>
    )
}

// prettier-ignore
function AppNavigator() {
    return (
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor="transparent"
          networkActivityIndicatorVisible={true}
        />
        <Stack.Navigator initialRouteName="Demarrage">
          <Stack.Screen
            name="Demarrage"
            component={Demarrage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Connexion"
            component={ConnexionNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={AccueilNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Parametres"
            component={Parametres}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Parametres2"
            component={Parametres2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NavApp"
            component={NavAppNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Classements"
            component={ClassementsNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Termes"
            component={Termes}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Jumelage"
            component={Jumelage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Statistiques"
            component={Statistiques}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Compteur"
            component={Compteur}
            options={{headerShown: false}}
          />
          <Stack.Screen
              name="ListeDefis"
              component={ListeDefis}
              options={{headerShown: false}}
          />
            <Stack.Screen name="Objectifs" component={Objectifs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default AppNavigator;

// Import Modules
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StatusBar } from 'react-native'

// Import Screens
import NavApp from '../screens/NavApp'
import Demarrage from '../screens/Demarrage'
import Connexion from '../screens/Connexion'
import Inscription from '../screens/Inscription'
import Termes from '../screens/Termes'
import Accueil from '../screens/Accueil'
import Classements from '../screens/Classements'
import Defis from '../screens/Defis'
import Statistiques from '../screens/Statistiques'
import Parametres from '../screens/Parametres'
import Parametres2 from '../screens/Parametres2'
import Parametres3 from '../screens/Parametres3'
import Jumelage from '../screens/Jumelage'
import Compteur from '../screens/Compteur'

const Stack = createStackNavigator()

function HomeNavigator() {
    return (
        <Stack.Navigator initialRouteName="Accueil">
            <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
            <Stack.Screen name="NavApp" component={NavApp} options={{ headerShown: false }} />
            <Stack.Screen name="Classements" component={Classements} options={{ headerShown: false }} />
            <Stack.Screen name="Defis" component={Defis} options={{ headerShown: false }} />
            <Stack.Screen name="Compteur" component={Compteur} options={{ headerShown: false }} />
            <Stack.Screen name="Statistiques" component={Statistiques} options={{ headerShown: false }} />
            <Stack.Screen name="Parametres" component={Parametres} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function HomeModalNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home" mode="modal">
            <Stack.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NavApp" component={NavApp} options={{ headerShown: false }} />
            <Stack.Screen name="Classements" component={Classements} options={{ headerShown: false }} />
            <Stack.Screen name="Statistiques" component={Statistiques} options={{ title: 'Statistiques' }} />
            <Stack.Screen name="Parametres" component={Parametres} options={{ title: 'Parametres' }} />
            <Stack.Screen name="Compteur" component={Compteur} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function InscriptionNavigator() {
    return (
        <Stack.Navigator initialRouteName="Inscription" mode="modal">
            <Stack.Screen name="Inscription" component={Inscription} options={{ headerShown: false }} />
            <Stack.Screen name="Termes" component={Termes} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function ConnexionNavigator() {
    return (
        <Stack.Navigator initialRouteName="Connexion">
            <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
            <Stack.Screen name="Inscription" component={InscriptionNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
function ClassementsNavigator() {
    return (
        <Stack.Navigator initialRouteName="Classements" >
            <Stack.Screen name="Classsements" component={Classements} options={{ headerShown: false }} />
            <Stack.Screen name="Accueil" component={Accueil}  option={{ title: 'Accueil'}}/>
            <Stack.Screen name="NavApp" component={NavApp} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function NavAppNavigator() {
    return (
        <Stack.Navigator initialRouteName="NavApp" >
            <Stack.Screen name="NavApp" component={NavApp} options={{ headerShown: false }} />
            <Stack.Screen name="Accueil" component={Accueil}  option={{ title: 'Accueil'}}/>
            <Stack.Screen name="Classsements" component={Classements} options={{ title: 'Classements' }} />
        </Stack.Navigator>
    )
}

function JumelageNavigator() {
    return (
        <Stack.Navigator initialRouteName="Jumelage">
            <Stack.Screen name="Jumelage" component={Jumelage} options={{ headerShown: false }} />
            <Stack.Screen name="NavApp" component={NavApp} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
function ParametresNavigator() {
    return (
        <Stack.Navigator initialRouteName="Parametres">
            <Stack.Screen name="Parametres" component={Parametres} options={{ headerShown: false }} />
            <Stack.Screen name="Parametres2" component={Parametres2} options={{ headerShown: false }} />
            <Stack.Screen name="Parametres3" component={Parametres3} options={{ headerShown: false }} />
            <Stack.Screen name="NavApp" component={NavApp} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
function AppNavigator() {
    return (
        <NavigationContainer>
        <StatusBar hidden/>
            <Stack.Navigator initialRouteName="Demarrage">
                <Stack.Screen name="Demarrage" component={Demarrage} options={{ headerShown: false }} />
                <Stack.Screen name="Connexion" component={ConnexionNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeModalNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Statistiques" component={Statistiques} options={{ title: 'Statistiques' }} />
                <Stack.Screen name="Parametres" component={Parametres} options={{ title: 'Parametres' }} />
                <Stack.Screen name="Parametres2" component={Parametres2} options={{ headerShown: false }} />
                <Stack.Screen name="Parametres3" component={Parametres3} options={{ headerShown: false }} />
                <Stack.Screen name="NavApp" component={NavAppNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Classements" component={Classements} options={{ headerShown: false }} />
                <Stack.Screen name="Termes" component={Termes} options={{ headerShown: false }} />
                <Stack.Screen name="Jumelage" component={Jumelage} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default AppNavigator
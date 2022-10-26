import React, {useContext} from 'react'
import { View, Image, Text} from 'react-native'

//imports colors
import color0 from '../../assets/img-avatar/color0.png'
import color1 from '../../assets/img-avatar/color1.png'
import color2 from '../../assets/img-avatar/color2.png'

//imports casque
import casque0 from '../../assets/img-avatar/casque0.png'
import casque1 from '../../assets/img-avatar/casque1.png'
import casque2 from '../../assets/img-avatar/casque2.png'
import casque3 from '../../assets/img-avatar/casque3.png'
import casque4 from '../../assets/img-avatar/casque2.png'
import casque5 from '../../assets/img-avatar/casque5.png'
import casque6 from '../../assets/img-avatar/casque6.png'
import casque7 from '../../assets/img-avatar/casque7.png'

//imports tenue
import tenue0 from '../../assets/img-avatar/tenue0.png'
import tenue1 from '../../assets/img-avatar/tenue1.png'
import tenue2 from '../../assets/img-avatar/tenue2.png'
import tenue3 from '../../assets/img-avatar/tenue3.png'
import tenue4 from '../../assets/img-avatar/tenue4.png'
import tenue5 from '../../assets/img-avatar/tenue5.png'
import tenue6 from '../../assets/img-avatar/tenue6.png'
import tenue7 from '../../assets/img-avatar/tenue7.png'

//imports visage
import visage0 from '../../assets/img-avatar/visage0.png'
import visage1 from '../../assets/img-avatar/visage1.png'
import visage2 from '../../assets/img-avatar/visage2.png'
import visage3 from '../../assets/img-avatar/visage3.png'

//imports coupe
import coupe0 from '../../assets/img-avatar/coupe0.png'
import coupe1 from '../../assets/img-avatar/coupe1.png'
import coupe2 from '../../assets/img-avatar/coupe2.png'
import coupe3 from '../../assets/img-avatar/coupe3.png'
import coupe4 from '../../assets/img-avatar/coupe4.png'
import coupe5 from '../../assets/img-avatar/coupe5.png'
import coupe6 from '../../assets/img-avatar/coupe6.png'
import coupe7 from '../../assets/img-avatar/coupe7.png'
import coupe8 from '../../assets/img-avatar/coupe8.png'
import {Context} from '../utils/Store';
/***
 * composant d'affichage de l'avatar utilisateur
 */
const Avatar = (props) => {
    const [state,setState] = useContext(Context);
    const couleurs = [color0, color1, color2]
    const tenues = [tenue0, tenue1, tenue2, tenue3, tenue4, tenue5, tenue6, tenue7]
    const casques = [casque0, casque1, casque2, casque3, casque4, casque5, casque6, casque7]
    const visages = [visage0, visage1, visage2, visage3]
    const coupes = [coupe0, coupe1, coupe2, coupe3, coupe4, coupe5, coupe6, coupe7, coupe8]

    return (
        <View>
            <Image source={couleurs[parseInt(props.avatar.charAt(0))]} style={{width: 80, height: 80}}/>
            <Image source={tenues[parseInt(props.avatar.charAt(1))]}
                   style={{width: 80, height: 32, position: "absolute", top: 47, left: 0}}/>
            <Image source={visages[parseInt(props.avatar.charAt(4))]}
                   style={{width: 35, height: 25, position: "absolute", top: 10, left: 22}}/>
            <Image source={coupes[parseInt(props.avatar.charAt(3))]}
                   style={{width: 60, height: 60, position: "absolute", top: -22, left: 10}}/>
            <Image source={casques[parseInt(props.avatar.charAt(2))]}
                   style={{width: 60, height: 60, position: "absolute", top: -20, left: 10}}/>
        </View>
    )
}
export default Avatar

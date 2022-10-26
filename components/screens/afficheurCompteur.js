import React from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    Image,
    Animated,
    TouchableOpacity,
    Alert,
    Button,
    Dimensions
} from 'react-native'
import Svg, {  Path, G } from 'react-native-svg'
//assets
import Fleche from "../../assets/fleche";
import {Image as RNimage} from 'react-native'
import fond from '../../assets/Compteur/compteur.png';
const fondUri = RNimage.resolveAssetSource(fond).uri;
import aiguille from '../../assets/Compteur/aiguille.png';
const aiguilleUri = RNimage.resolveAssetSource(aiguille).uri;
import fondBulle from '../../assets/Accueil/fondBulle.png';
import SegmentedRoundDisplay from "react-native-segmented-round-display";
const fondBulleUri = RNimage.resolveAssetSource(fondBulle);
import { AnimatedSVGPath } from "react-native-svg-animations";

/**
 * composant d'affichage du segment proportionnel à la vitesse théorique
 * @param {*} props 
 * @returns 
 */
export default function  AfficheurCompteur (props){
        const canvas = React.createRef();
    const [anim,setAnim] = React.useState("")
    const [tab,setTab]= React.useState([
                "M115 277 C 110 273 110 275 100 267",
                "M93 262 C 90 258 90 260 83 253",
                "M76 245 C 80 250 80 251 69 235",
                "M66 229 C 59 215 59 214 60 216",
                "M57 208 C 54 195 54 195 54 192",
                "M54 185 C 54 175 54 175 54 170",
                "M55 165 C 57 155 57 155 59 145",
                "M60 140 C 65 125 69 120 69 120",
                "M73 115 C 77 110 77 110 86 100",
                "M90 97 C 95 90 95 90 105 82",
                "M107 82 C 130 70 130 85 130 70",
                "M135 63 C 150 53 158 55 160 55",
                "M165 57 C 170 55 180 55 190 57",
                "M195 57 C 210 60 210 60 230 67",
                "M235 70 C 250 75 255 80 270 93",
                "M275 97 C 280 102 280 102 295 125",
                "M300 130 C 305 150 305 165 304 175",
                "M305 180 C 300 220 297 220 290 230"
            ])
    const animation =  () => {
        let svg = ""
        for (let x = 0; x<props.i; x++){
            svg+=tab[x]
        }
        setAnim(svg)
    }
    React.useEffect(()=>{
        animation()
    },[props.i])


        //M120,280 a125,125 0 1,1 110,10 cercle complet
        //`M120,280 a122,122 0 1,1 180,-100 ` cercle - 3/4
        //M120 280 C 92 279 66 244 72 221
        //segment 1 : M120 280 C 110 273 110 275 100 265
        /*
        * <Svg >
                    <Path
                        d={x}
                        stroke="#5FCDFA"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </Svg>
                *
                *  <AnimatedSVGPath
                    strokeColor={"#5FCDFA"}
                    duration={2500}
                    strokeWidth={5}
                    height={400}
                    width={400}
                    scale={1}
                    delay={500}
                    loop={false}
                    d={x}
                />
        * */

        const y = 'M93 262 C 90 258 90 260 83 253'
        const x =`M115 277 C 110 273 110 275 100 267 `
        const r = <Svg>
            <Path
            d={x}
            stroke="#5FCDFA"
            strokeWidth="3"
            strokeLinecap="square"
            /><Path
            d="M93 262 C 90 258 90 260 83 253"
            stroke="#5FCD00"
            strokeWidth="3"
            strokeLinecap="square"
        />
        </Svg>

        const  example =
            {
                displayValue: false,
                formatValue: (value) => `R$ ${value.toFixed(2)}`,
                radius:112,
                segments: [
                    {
                        total: 200,
                        filled: props.i,
                    },
                ],
                emptyArcColor:'transparent',
                incompleteArcColor:'#5FCDFA',
                animated:false,
                //animationDuration:6200,
            };
        return(
            <View style={props.style}>
                <SegmentedRoundDisplay {...example} />
                {/*  <Svg >
                    <AnimatedSVGPath
                        strokeColor={"#5FCDFA"}
                        duration={2500}
                        strokeWidth={5}
                        height={400}
                        width={400}
                        scale={1}
                        delay={2500}
                        duration={1000}
                        loop={true}
                        d={anim}
                        />
            </Svg>*/}
            </View>
            )



}
const styles = StyleSheet.create({
    compteur:{
        borderWidth:3,
        flex: 3,
        width:400,
        height:200,
        resizeMode: "cover",
        justifyContent: "center",
        zIndex:0,
        position:'absolute',
        top:0,
    }
})

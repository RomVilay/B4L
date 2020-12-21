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
//import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';
import Svg, {  Path, G } from 'react-native-svg'
//assets
import Fleche from "../../assets/fleche";
import {Image as RNimage} from 'react-native'
import fond from '../../assets/Compteur/compteur.png';
const fondUri = RNimage.resolveAssetSource(fond).uri;
import aiguille from '../../assets/Compteur/aiguille.png';
const aiguilleUri = RNimage.resolveAssetSource(aiguille).uri;
import fondBulle from '../../assets/Accueil/fondBulle.png';
import SegmentedRoundDisplay from "react-native-segmented-round-display/src";
const fondBulleUri = RNimage.resolveAssetSource(fondBulle);
import { AnimatedSVGPath } from "react-native-svg-animations";

export default class AfficheurCompteur extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
      //  this.handleCompteur = this.handleCompteur.bind(this)
        this.state= {
            tab :[
                "M115 277 C 110 273 110 275 100 267",
                "M93 262 C 90 258 90 260 83 253",
                "M76 245 C 80 250 80 251 69 235",
                "M66 229 C 59 215 59 214 60 216",
                "M57 208 C 54 195 54 195 54 192",
                "M53 185 C 52 175 52 175 52 170"

            ],
            anim:""
        }
    }

/*
    async handleCompteur() {
        const context = this.refs.canvas.getContext('2d');
        canvas.width = Dimensions.get('window').width;
        canvas.height = 350;
        const {angle} = this.props
        const fond = new CanvasImage(canvas);
        fond.src = fondUri
        const fondb = new CanvasImage(canvas);
        fondb.src = fondBulleUri
        const aiguille = new CanvasImage(canvas)
        aiguille.src = aiguilleUri
        fond.addEventListener('load', e => {
            context.drawImage(fond, canvas.width/64, canvas.height/64, 400, 400)
            /*context.drawImage(fondb, 0,0, 20,20) message out of range
            context.beginPath()
            context.strokeStyle = '#5FCDFA';
            context.arc(220, 200, 100, 2 * Math.PI / 3, 3 * Math.PI / 4, false);
            context.lineWidth = 10;
            context.stroke();
            context.save();
            context.translate(canvas.width/2, canvas.width*0.55)
            context.rotate((Math.PI / 180) * angle)
            //context.translate(-canvas.width/2, -canvas.width/2)
            context.drawImage(aiguille, -canvas.width/4, -canvas.width/4, 240, 240)
            context.restore();
            requestAnimationFrame(() => this.handleCompteur(this.canvas))
        })
    }
    */
    animation(){
        let svg = ""
        for (let x = 0; x<this.props.i; x++){
            svg+=this.state.tab[x]
        }
        this.setState({anim: svg})
        console.log(svg)
    }

    componentDidMount() {
        this.animation()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps.i !== this.props.i){
            this.animation()
        }
    }

    render(){
        //<Canvas ref="canvas"/>
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
                radius:120,
                segments: [
                    {
                        total: 200,
                        filled: 70,
                    },
                ],
                emptyArcColor:'transparent',
                incompleteArcColor:'#5FCDFA',
                animationDuration:6200,
            };
        return(
            <View style={this.props.style}>

                <Svg >

                    <AnimatedSVGPath
                        strokeColor={"#5FCDFA"}
                        duration={2500}
                        strokeWidth={5}
                        height={400}
                        width={400}
                        scale={1}
                        delay={2000}
                        duration={1000}
                        loop={true}
                        d={this.state.anim}
                        />
                    {/*
                <Path
                        d="M76 245 C 80 250 80 251 69 235"
                        stroke="#5FCDFA"
                        strokeWidth="3"
                        strokeLinecap="square"
                />
                <Path
                        d="M66 229 C 59 215 59 214 60 216"
                        stroke="#5FCD00"
                        strokeWidth="3"
                        strokeLinecap="square"
                />
                <Path
                        d="M57 208 C 54 195 54 195 54 192"
                        stroke="#5FCDFA"
                        strokeWidth="3"
                        strokeLinecap="square"
                />
                <Path
                        d="M53 185 C 52 175 52 175 52 170"
                        stroke="#5FCD00"
                        strokeWidth="3"
                        strokeLinecap="square"
                /> */}
            </Svg>
            </View>
            )

    }

}
const styles = StyleSheet.create({
    compteur:{
        flex: 3,
        width:'110%',
        height:'110%',
        right: '10%',
        resizeMode: "cover",
        justifyContent: "center",
        zIndex:0,
    }
})
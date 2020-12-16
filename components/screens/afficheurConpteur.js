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
import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';
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


export default class AfficheurCompteur extends React.Component {

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.handleCompteur = this.handleCompteur.bind(this)
    }


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
            /*context.drawImage(fondb, 0,0, 20,20) message out of range*/
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

    render(){
        //<Canvas ref="canvas"/>
        //M 120 270 A 1 1 0 0 1 250 270
        const x =`M120,280 a125,125 0 1,1 110,10 `
        return(
            <View style={this.props.style}>
                <Svg >
                    <Path
                        d={x}
                        stroke="#5FCDFA"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
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
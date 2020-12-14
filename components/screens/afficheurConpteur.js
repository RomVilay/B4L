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

//assets
import Fleche from "../../assets/fleche";
import {Image as RNimage} from 'react-native'
import fond from '../../assets/Compteur/compteur.png';
const fondUri = RNimage.resolveAssetSource(fond).uri;
import aiguille from '../../assets/Compteur/aiguille.png';
const aiguilleUri = RNimage.resolveAssetSource(aiguille).uri;
import fondBulle from '../../assets/Accueil/fondBulle.png';
const fondBulleUri = RNimage.resolveAssetSource(fondBulle);

export default class AfficheurCompteur extends React.Component {


    handleCompteur(canvas) {
        const context = canvas.getContext('2d');
        canvas.width = Dimensions.get('window').width;
        canvas.height = 350;

        const fond = new CanvasImage(canvas);
        fond.src = fondUri
        const aiguille = new CanvasImage(canvas)
        aiguille.src = aiguilleUri
        fond.addEventListener('load', e =>{
            context.drawImage(fond,20,0,400,400)
            context.beginPath()
            context.strokeStyle = '#5FCDFA';
            context.arc(220, 200, 100, 2*Math.PI/3, 3*Math.PI/4, false);
            context.lineWidth = 10;
            context.stroke();
            context.translate(100,160)
            context.rotate((Math.PI / 180) * -135)
            context.translate(-330,-145)
            context.drawImage(aiguille, 100,80,240,240)
        })



    }
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }
    render(){
        return(
            <View>
                    <Canvas ref={this.handleCompteur}/>
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
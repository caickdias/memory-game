import React, { useEffect, useRef } from 'react';
import { Animated, View, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';
import colors from '../../global/theme/colors';

export const Card = ({ title, face, permaFaceUp, onPress }) => {
        
    const animatedValue = useRef(new Animated.Value(1)).current;    
    
    //used this array for readibility instead of 0 and 1
    const faces = ['up', 'down'];    

    //everytime this component's face changes it should check for animation
    useEffect(()=> {
        animationHandler();
    }, [face]);

    //Animated variable for starting it
    const flipAnimation = Animated.timing(animatedValue, {
            toValue: faces.indexOf(face),
            duration: 500,
            useNativeDriver: false,
        }
    );    
    
    
    const animationHandler = () => {    
        //if card is revealed thus permaFaceUp = true, then just return
        if(permaFaceUp) {
            //i dont think this is a very good logic but needed this to make sure it will flip up after revealed
            if(face === 'up') flipAnimation.start();
            //no need to start animation over and over if it's revealed so just return
            return;
        }
        flipAnimation.start();
    }    
    
    //logic for animation styling
    const animatedStyles = {
        transform: [
            { 
                rotateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-180deg']
                })
            },
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 0.5,  1],
                    outputRange: [1, 1.2, 1]
                })
            },
        ],                
        bgColor: {
                        backgroundColor: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [colors.card.faceUp, colors.card.faceDown],
                        })
                    },
                    text: {
                        color: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [colors.card.faceUpText, colors.card.faceDown],
                        })
                    }       
    }

    return(
        <TouchableWithoutFeedback onPress={onPress}>            
                <Animated.View style={[styles.card, animatedStyles.bgColor, { transform: animatedStyles.transform }]}>
                    <Animated.Text style={[styles.text, animatedStyles.text]}>
                        {title}
                    </Animated.Text>
                </Animated.View>            
        </TouchableWithoutFeedback>        
    );
}

export const FalseCard = () => {
    return (
        <TouchableWithoutFeedback>
            <View style={{...styles.card, ...{borderColor: colors.main.background}}}></View>
        </TouchableWithoutFeedback>
    );
}

export default Card;
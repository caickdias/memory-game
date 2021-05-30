import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../../components/memory-game/colors';

export const Triangle = ({ direction, onPress, color }) => {

    //an array for doing simple math using index to rotate the triangle 
    const directions = ['up', 'left', 'down', 'right'];

    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.triangle, {borderBottomColor: color}, { transform: [{ rotate: `${360 - (90*directions.indexOf(direction))}deg`}] }] } />
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.main.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardsContainer: {
        flexDirection: 'row',    
        
    },
    newGameArea: {        
        flexDirection: 'row',
        height: 50,
        width: '40%',
        justifyContent: 'center',        
        alignItems: 'center',                        
        marginTop: 20,        
    },
    selectorArea: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',           
    },
    triangle: {        
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderBottomWidth: 24,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: colors.main.selectorTriangle,
        marginHorizontal: 15,
    },
    modal: {                  
        alignSelf: 'center',        
        marginTop: '50%',
        height: 300,
        width: 300,        
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.endgame.background,
        borderRadius: 10,
        borderWidth: 5,
        padding: 15,              
    },
    modalTitle: {
        fontSize: 40,        
    }
});

export default styles;
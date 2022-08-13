import { StyleSheet } from 'react-native';
import colors from '../../global/theme/colors';

export default StyleSheet.create({    
    card: {
        flex: 1,                
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'center',        
        margin: 10,
        borderWidth: 5,
        borderRadius: 20,        
        borderColor: colors.card.border,
    },
    text: {        
        fontSize: 40,
    },    
    faceDown: {
        backgroundColor: colors.card.faceDown,
    },
    faceUp: {
        backgroundColor: colors.card.faceUp,
    }
});
import React, { useState, useEffect } from 'react';
import { View, Modal, Text, FlatList, Button } from 'react-native';

import styles, { Triangle } from './styles';
import colors from '../../components/memory-game/colors';

//importing cards and data with numbers info i used for cards
import { Card, FalseCard } from '../../components/memory-game/Card/index'; 
import data from '../../components/memory-game/cards';

//constants: fillArray for filling with transparent cards logic, default_nums for different numbers the game is starting with, min and max for selector logic
const fillArray = [0, 0];
const DEFAULT_NUMS = 4;
const NUMS_MIN = 3, NUMS_MAX = 8;

//method for duplicating cards as memory game has two of a kind
const doubleAndSort = (card, nums) => {
    return [...[...card.slice(0, nums), ...card.slice(0, nums)] //duplicating with spreadoperator and slice for quantity of numbers
        .sort(() => Math.random() - 0.5) //sorting cards indexes randomly
        .map(card => { //mapping and assigning an id for each of them
            const newCard = {...card};
            newCard['id'] = Math.random(); //should id be a string or whatever? i'm not sure            
            return newCard;
        }),
        ...(nums % 2 === 1 ? fillArray : '')]; //logic for filling cards so flex will not expand them. i should point that this works specifically for num of columns = 4
}

//calling and method an assigning in this variable. i wanted to use hooks, but it'd recall this in every render so i had to put it outside functions.. maybe i should've done a custom hook?
let fullDeck = doubleAndSort(data, DEFAULT_NUMS);

const App = () => {    
        
    const numColumns = 4; // num of columns for flatlist   
    const [nums, setNums] = useState(DEFAULT_NUMS); //i will store here how many different numbers game will have
    
    const [currentCard, setCurrentCard] = useState({}); //hook for card that is currently selected            
    const [revealedCards, setRevealedCards] = useState([]); //here i'll put all revealed names in an array

    const [modalVisible, setModalVisible] = useState(false); //logic for modal endgame screen
    
    useEffect(() => endGameHandler(), [revealedCards]); //everytime a card is added to revealed cards it'll check if game is over

    const endGameHandler = () => {        
        if(revealedCards.length === nums){ //just check if revealedcards length it equals to number of different cards it's supposed to have and set modal true for endgame screen           
            setModalVisible(true);            
        }
            
    }

    //for resetting game: assigning a new deck for fulldeck, setting current and revealed cards to nothing and hiding modal
    const reset = () => {
        fullDeck = doubleAndSort(data, nums);        
        setCurrentCard({});
        setRevealedCards([]);
        setModalVisible(false);
    }

    //everytime a card is flipped on click it'll go here for logic of what to do 
    const flipCardHandler = card => {                
        
        //if card is the same (i.e same id) or a card already revealed then just do nothing
        if(currentCard.id === card.id || revealedCards.includes(card.name)) return;         
        
        //if current card is empty then assign card parameter to it so we'll see what to do next
        if(!currentCard.hasOwnProperty('id')){                        
            setCurrentCard(prev => card);                     
            return;
        }        
        
        //now that current card is not empty, if it's the same name then it's a match! assign its name to revealed cards
        if(currentCard.value === card.value){
            setRevealedCards(prev => [...revealedCards, card.name]);             
        }

        setCurrentCard(card); //i needed this so second card wouldn't insta face down before user get to know what is it
        setTimeout(() => {                
            setCurrentCard({}); //after second try current card should always be empty for new try, set a delay so user can see what it is
        }, 500);
        
        
    } 
    
    //well, i could've created a new folder inside components dir for this, but i didnt want to cause this is a simple app
    const NewGame = ({ //button for starting a new game
        title, //title of the button
        ngButton=colors.main.newGameButton, //newgame button color
        ngButtonText=colors.main.newGameButtonText, //new game button text color
        selectorText=colors.main.selectorText, //number displayed for how many numbers of new game
        triangle=colors.main.selectorTriangle //color of the triangles that act as selectors
    }) => {
        return (
            //i made a component inside of styles called triangle to clean the code a little bit. put some logic in direction prop to make it easy
            //on press prop set how many different nums next game will have accordingly
            <View style={styles.newGameArea}>
                <View style={{backgroundColor: ngButton, borderRadius: 10, borderWidth: 5, marginRight: 20}}>
                        <Button title={title} color={ngButtonText} borderColor='red' onPress={reset}/>
                </View>

                <View style={styles.selectorArea}>                    
                    <Triangle direction={'left'} color={triangle} onPress={() => setNums(nums<=NUMS_MIN ? NUMS_MIN : nums-1)} />
                    <View>
                        <Text style={{fontSize: 30, color: selectorText}}>{nums}</Text>
                    </View>                
                    <Triangle direction={'right'} color={triangle} onPress={() => setNums(nums>=NUMS_MAX ? NUMS_MAX : nums+1)} />
                </View>
            </View>                
        );
    }

    return(
                
        <View style={styles.container}>            
            
            <View style={styles.cardsContainer}>
                <FlatList //this flatlist take the fulldeck with all the cards already arranged and display them
                    data={fullDeck}
                    keyExtractor={item => item.id} //that's why i used map function
                    renderItem={({item}) => {                                                                        
                        if(!item) return <FalseCard /> //if card is empty then display transparent card to top it off
                        
                        return (                            
                            <Card 
                                title={item.value}          
                                face={currentCard.id === item.id ? 'up' : 'down'} //if current card hook has the same id then face this cards up                      
                                permaFaceUp={revealedCards.includes(item.name)} //if it's already matched then it should be faced up permanently
                                onPress={() => flipCardHandler(item)} //call handler for method above
                            />
                        )
                    }}
                    numColumns={numColumns} //num of columns, i stick with 4 cause it looks good
                    //i had an 'extradata' prop here but i think it didnt make difference
                    scrollEnabled={false} //i want it stand and still
                />
            </View>
           
            <NewGame title="New Game" /> 

            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Well done!</Text>                        
                        <NewGame 
                            title="Again" 
                            ngButton={colors.endgame.newGameButton} 
                            ngButtonText={colors.endgame.newGameButtonText} 
                            selectorText="black" 
                            triangle={colors.endgame.selectorTriangle} 
                        />                     
                    </View>
                </Modal>
            </View>
        
        </View>
                
    );

}

export default App;
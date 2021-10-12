const game = new Game()
console.log(game.deck)

const container = document.querySelector('section')
const cards = document.querySelectorAll('.card')
const icons = [
    ['a', 'img/bacon.png'],
    ['b', 'img/bagel.png'],
    ['c', 'img/croissant.png'],
    ['d', 'img/eggs.png'],
    ['e', 'img/pancakes.png'],
    ['f', 'img/waffles.png'],
]
let clicks = 0
let cardOne = undefined
let cardTwo = undefined

function flipCard(e){//e stands for "event" so it's the thing that caused your function to run
    //gets the specific card that the player clicked on 
    const index = [...cards].indexOf(e.target); 
    //if the place they clicked is NOT a div (might be the container section) OR it's not a valid move then return (stop the whole function)
    if (e.target.className !== 'card' || !game.isValidMove(index)) return 
    clicks+= 1 
    //on the first click it'll be saved as cardOne (index1) and second click is cardTwo (index2), every two clicks it restarts to make sure they don't click on more than two cards at once
    if (clicks === 1){
        cardOne = index
        for (i=0; i < icons.length; i++) {
            if (game.deck[index] == icons[i][0]) {
                cards[cardOne].src = icons[i][1] 
            }
        }
        cards[cardOne].innerHTML = game.deck[index]
    } else if (clicks === 2){
        cardTwo = index
        for (i=0; i < icons.length; i++) {
            if (game.deck[index] == icons[i][0]) {
                cards[cardTwo].src = icons[i][1] 
            }
        }        
        setTimeout(hideCard, 750)
        //when setTimeout is in action all the functions below it still run "simultaniously", the duration of setTimeout is just longer (so I moved all the displays I wanted afterwards into the hideCard function or else the score would finish displaying faster than it actually updated the score)
    } 
}

function hideCard(){ 
    if (game.matchPairs(cardOne, cardTwo)) { //if matchPairs is true (both cards match) then display updated score
        document.querySelector('#score').innerText = `Score: ${game.score}`
        document.querySelector('#level').innerText = `Level: ${game.level}`
        clicks = 0
        if (game.isWon === true) {
            document.querySelector('#win').className = ''
            document.querySelector('#next').style.fontWeight = 'bolder'
        }
    }else{ //else (doesn't match) display updated score and flip cards back around
        document.querySelector('#score').innerText = `Score: ${game.score}`
        document.querySelector('#level').innerText = `Level: ${game.level}`
        cards[cardOne].src = 'img/empty.png'
        cards[cardTwo].src = 'img/empty.png'
        clicks = 0
    }
}

function resetGame() {
    document.querySelector('#win').className = 'hidden'
    document.querySelector('#next').style.color = 'black'
    game.resetGame()
    for (let card of cards){ //same thing as i=0; i< blah.length; i++ but easier to visualize and write 
        card.src = 'img/empty.png' 
    }
    document.querySelector('#score').innerText = `Score: ${game.score}`
    document.querySelector('#level').innerText = `Level: ${game.level}`
}

function nextGame() {
    if (game.isWon === true){
        document.querySelector('#win').className = 'hidden'
        document.querySelector('#next').style.fontWeight = 'normal'
        game.nextGame()
        for (let card of cards){ 
            card.src = 'img/empty.png' 
        }
        document.querySelector('#score').innerText = `Score: ${game.score}`
        document.querySelector('#level').innerText = `Level: ${game.level}`
    }    
}

//we can't do a click event on just the cards (div) or else we won't know what card they specifically clicked on 
container.addEventListener('click', flipCard) 
document.querySelector('#reset').addEventListener('click', resetGame)
document.querySelector('#next').addEventListener('click', nextGame)
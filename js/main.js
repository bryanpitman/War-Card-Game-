




// zero cards are remaining 
function zeroRemain() {
  
  document.querySelector('#draw').setAttribute("disabled", "")
 
  if (Number(localStorage.getItem('playerOneScore')) > Number(localStorage.getItem('playerTwoScore'))) {
    document.querySelector('h3').innerText = "PLAYER ONE WINS THE WAR!!"
    console.log("Player One Wins!!")
  } else if (Number(localStorage.getItem('playerOneScore')) === Number(localStorage.getItem('playerTwoScore'))) {
    document.querySelector('h3').innerText = "DRAW!! hit reset and play again"
    console.log("tie!!")
  } else {
    document.querySelector('h3').innerText = "PLAYER TWO WINS THE WAR!!"
    console.log("Player Two Wins!!")
  } 
  
}


// action to happen during war 
document.querySelector('#war').addEventListener('click', war)

function war() {
  console.log("press war button")
  //document.querySelector('#war').style.visibility = "hidden"
  document.querySelector('#war').setAttribute("disabled", "")
  document.querySelector('#draw').removeAttribute("disabled")
  //document.querySelector('#draw').style.visibility = "visible"
  

  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`

  console.log("before fetching")
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      //console.log(data)
      let length = data.cards.length
      let p1 = data.cards[length - 2]
      let p2 = data.cards[length - 1]
      let val1 = Number(cardValue(p1.value))
      let val2 = Number(cardValue(p2.value))
      document.querySelector('#playerOne').src = p1.image
      document.querySelector('#playerTwo').src = p2.image
      console.log("val1: ", val1)
      console.log("val2: ", val2)
      if (val1 > val2) {
        document.querySelector('h3').innerText = "Player 1 WON THE WAR!"
        addPlayerOne(8)
        
      } else if (val1 < val2) {
        document.querySelector('h3').innerText = "Player 2 WON THE WAR!"
        addPlayerTwo(8)
        
      } else {
        document.querySelector('h3').innerText = "war"
        console.log("double war edge case")
        //document.querySelector('#war').style.visibility = "visible"
        document.querySelector('#draw').setAttribute("disabled", "")
        document.querySelector('#war').removeAttribute("disabled")
      }
    })



}

//button to restart the entire game with a new deck of cards
document.querySelector('#reset').addEventListener('click', resetGame)
function resetGame() {
  localStorage.clear()
  localStorage.setItem('playerOneScore', 0)
  localStorage.setItem('playerTwoScore', 0)
  document.querySelector('#one').innerText = 0
  document.querySelector('#two').innerText = 0
  document.querySelector('h3').innerText = ""
  document.querySelector('#playerOne').style.display = "none"
  document.querySelector('#playerTwo').style.display = "none"
  //document.querySelector('#war').style.visibility = "hidden"
  document.querySelector('#war').setAttribute("disabled", "")
  document.querySelector('#draw').removeAttribute("disabled")
  //how to fetch new deck. refresh page? 
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      deckId = data.deck_id

    })
    .catch(err => {
      console.log(`error ${err}`)
    });

}

//added ability: add score to each player.  
function addPlayerOne(num) {
  let playerOneScore = Number(localStorage.getItem('playerOneScore'))
  playerOneScore = playerOneScore + num
  localStorage.setItem('playerOneScore', playerOneScore)
  document.querySelector('#one').innerText = playerOneScore
}

function addPlayerTwo(num) {
  let playerTwoScore = Number(localStorage.getItem('playerTwoScore'))
  playerTwoScore = playerTwoScore + num
  localStorage.setItem('playerTwoScore', playerTwoScore)
  document.querySelector('#two').innerText = playerTwoScore
}

//main game

let deckId = 
  document.querySelector('#war').setAttribute("disabled", "")
  document.querySelector('#draw').setAttribute("disabled", "")
  document.querySelector('#draw').addEventListener('click', getFetch)

function getFetch() {
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      let cardsRemaining = data.remaining 

      let val1 = Number(cardValue(data.cards[0].value))
      let val2 = Number(cardValue(data.cards[1].value))
      document.querySelector('#playerOne').style.display = "block"
      document.querySelector('#playerTwo').style.display = "block"

      document.querySelector('#playerOne').src = data.cards[0].image
      document.querySelector('#playerTwo').src = data.cards[1].image
      
      


      if (val1 > val2) {
        document.querySelector('h3').innerText = "Player 1 WON!"
        addPlayerOne(1)
      } else if (val1 < val2) {
        document.querySelector('h3').innerText = "Player 2 WON!"
        addPlayerTwo(1)
      } else if (cardsRemaining >= 8) {
        document.querySelector('h3').innerText = "war"
        //document.querySelector('#war').style.visibility = "visible"
        document.querySelector('#draw').setAttribute("disabled", "")
        document.querySelector('#war').removeAttribute("disabled")
        } else {
          document.querySelector('h3').innerText = "Not enough cards for war =[ <br> hit draw!!"
          document.querySelector('#draw').removeAttribute("disabled")
          document.querySelector('#war').setAttribute("disabled", "")
        } 
    })
    .catch(err => {
      zeroRemain()
      console.log(`error ${err}`)
    });

}
// letter card values
function cardValue(val) {
  if (val === "ACE") {
    return 14
  } else if (val === "KING") {
    return 13
  } else if (val === "QUEEN") {
    return 12
  } else if (val === "JACK") {
    return 11
  } else
    return val
}


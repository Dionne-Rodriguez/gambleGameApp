//randomnize - we need to randomize the possibility of getting 1 out of 5 items in one reel

// document.getElementById('send').addEventListener('submit', () =>{
//   // let userMoney = document.getElementById('betMoney').value
//   console.log(userMoney)
//   // fetch('betmoney', {
//   //         method: 'put',
//   //         headers: {'Content-Type': 'application/json'},
//   //         body: JSON.stringify({
//   //         'Money': userMoney
//   //         })
//   //       })

//need to change this... add userMoney
document.getElementById('fifty').onclick = bet50
document.getElementById('five').onclick = bet5
let reset = document.getElementById('reset')

reset.addEventListener('click', function() {
  console.log("client side called")
  fetch('bet', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'bet':parseInt(document.getElementById('userB').textContent)
        })
      }).then(function (response) {
        console.log(response)
        if(response.ok){
          return response.json()
        }else{
          console.log("could not delete")
        }
      }).then(function (data) {
        window.location.reload()
        // document.getElementById("error").innerHTML = data.message
      })
})


    //
    // Array.from(reset).forEach(function(element) {
    //   console.log("called")
    //       element.addEventListener('click', function(){
    //         let bet = parseInt(document.getElementById('userB').textContent)
    //         console.log(newUserWeight)
    //         fetch('bet', {
    //           method: 'delete',
    //           headers: {
    //             'Content-Type': 'application/json'
    //           },
    //           body: JSON.stringify({
    //             'bet': bet
    //           })
    //         }).then(function (response) {
    //           console.log(response)
    //           if(response.ok){
    //             return response.json()
    //           }else{
    //             console.log("could not delete")
    //           }
    //         }).then(function (data) {
    //           window.location.reload()
    //           // document.getElementById("error").innerHTML = data.message
    //         })
    //       });
    // });





function bet50(){
  console.log("50")
  bet(50)
}

function bet5(){
  console.log("5")
  bet(5)
}

function bet(amount){
  let reelOne = getReelValue()
  document.getElementById("reelOne").innerHTML=reelOne
  let reelTwo = getReelValue()
  document.getElementById("reelTwo").innerHTML=reelTwo
  let reelThree = getReelValue()
  document.getElementById("reelThree").innerHTML=reelThree
  let win = checkWin(reelOne, reelTwo, reelThree)
  addMoneySubMoney(win, amount)
}

function getReelValue(){
    let result = Math.ceil(Math.random()*5)
    if (result === 1) {
      return 'dog'

    }
    else if (result === 2){
      return 'frog'
    }
    else if (result === 3){
      return 'cow'
    }
    else if (result === 4){
      return 'zebra'
    }
    else if (result === 5){
      return 'hog'
    }
}


function checkWin (reelOne, reelTwo, reelThree) {
  if ((reelOne === reelTwo) && (reelOne == reelThree) ) {
    return true
  }
  else{
    return false
  }
}


function addMoneySubMoney(win, amount){

  console.log(win);
  if (win) {
    fetch('winBet', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'bet':parseInt(document.getElementById('userB').textContent),
        'amount': amount
      })
    }).then(response => {
      if (response.ok) return response.json()
    }).then(data => {
      console.log(data)
      window.location.reload(true)
    })
  }else{
    fetch('lossBet', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'amount': amount,
        'bet': parseInt(document.getElementById('userB').textContent)
      })
    }).then(response => {
      if (response.ok) return response.json()
    }).then(data => {
      console.log(data)
      window.location.reload(true)
    })
  }
}
// })



//- Create a function that choses a random throw of rock, paper, scissors, lizard, spock and alerts the random choice

// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }
//
// function chooseRandom() {
//   var randomInt = getRandomInt(4);
//
//   if (randomInt === 0) {
//     alert('rock');
//   }
//   else if (randomInt === 1) {
//     alert('scissors')
//   }
//   else if (randomInt === 2) {
//     alert('lizard')
//   }
//   else if (randomInt === 3) {
//     alert('spock')
//   }
//   else {
//     alert('paper')
//   }
// }
//
// chooseRandom();



// //count the score
// function score(){
//
// }
//
//
// //betting function
// function moneybet(minBet, maxBet){
// let minBet=document.getElementById('bet').value
// let maxBet=document.getElementById('bet').value
// }
// moneyBet(5,50)
// //
// //determineWinner
// function determineWinner(){
//  if (3 ducks = win){  //syntax will be improved
//
//  }
//  else if ( 2< ducks = lose)
// }

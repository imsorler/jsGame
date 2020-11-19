const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')

let score = 0
let isGameStarted = false
let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)

function startGame() {
  score = 0
  setGameTime()
  
  $timeHeader.classList.remove('hide')
  $resultHeader.classList.add('hide')
  isGameStarted = true
  $game.style.backgroundColor = '#fff'
  $start.classList.add('hide')

  const interval = setInterval(function() {
    let time = parseFloat($time.textContent)

    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = ( time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  let time = 5
  $time.textContent = time.toFixed(1)
}

function endGame() {
  isGameStarted = false
  setGameScore()

  $start.classList.remove('hide')
  $game.innerHTML = ''
  $game.style.backgroundColor = '#DDA0DD'
  $timeHeader.classList.add('hide')
  $resultHeader.classList.remove('hide')
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return
  }
  
  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function renderBox() {
  $game.innerHTML = ''
  const box =  document.createElement('div')

  let boxSize = getRandom(30, 100)
  let gameSize = $game.getBoundingClientRect()

  let maxTop = gameSize.height - boxSize
  let maxLeft = gameSize.width - boxSize
  
  box.style.height = box.style.width = `${boxSize}px`
  box.style.position = 'absolute'
  box.style.backgroundColor = '#000'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
  let num = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(num)
}
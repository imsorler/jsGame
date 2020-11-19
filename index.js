const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')

let score = 0
let isGameStarted = false
let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function startGame() {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')
  
  isGameStarted = true
  $game.style.backgroundColor = '#fff'
  hide($start)

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
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

function endGame() {
  isGameStarted = false
  setGameScore()
  $gameTime.removeAttribute('disabled')

  show($start)
  $game.innerHTML = ''
  $game.style.backgroundColor = '#DDA0DD'
  hide($timeHeader)
  show($resultHeader)
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
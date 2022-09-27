import { useEffect, useState, useRef } from "react"
import RestartGame from './RestartGame'



function Game() {

  const xTurn = useRef(true)

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const xClass = 'x'
  const oClass = 'o'
  
  function StartGame() {
    const cells = document.querySelectorAll('.cell')
    const Game = document.querySelector('.Game')
    Game.classList.remove('end')
    cells.forEach((cell) => {
      cell.classList.remove(xClass)
      cell.classList.remove(oClass)
      cell.addEventListener('click', handleClick, {once: true})
    })
    console.log('start' + xTurn)
  }

  function handleClick(e) {
    const cells = document.querySelectorAll('.cell')
    const cell = e.target
    let turnClass = xTurn.current ? xClass : oClass
    setBoardHover()
    
    console.log(xTurn)
    placeMark(cell, turnClass)
    if(checkWin(turnClass, cells)) {
      endGame(false)
    } else if (checkDraw(cells)) {
      endGame(true)
    }
    swapTurn()
  }

  function setBoardHover() {
    const board = document.querySelector('.board')
    xTurn.current ? board.classList.replace(xClass, oClass) : board.classList.replace(oClass, xClass)
  }

  function swapTurn() {
    xTurn.current = !xTurn.current
  }

  function placeMark(cell, turnClass) {
    cell.classList.add(turnClass)
  }

  function checkWin(turnClass, cells) {
    
    return lines.some(line => {
      return line.every(index => {
        return cells[index].classList.contains(turnClass)
      })
    })
  }

  function checkDraw(cells) {
    return [...cells].every(cell => {
      console.log(cell)
      return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
  }

  function endGame(draw) {
    const gameEndMessage = document.querySelector('.end-message')
    const Game = document.querySelector('.Game')
    const restartGame = document.querySelector('.restart-game')
    if (draw) {
      gameEndMessage.innerText = "Empate"
    } else {
      gameEndMessage.innerText = `${xTurn.current ? 'X' : 'O'} venceu!`
    }
    Game.classList.add('end')
    restartGame.classList.add('show')
  }

  return (
    <>
    <div className="Game end">
      <header>
        <h1>Jogo da velha</h1>
        <p>by Naves</p>
      </header>
      <div className="board x" id="board">
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>  
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
      </div>
    </div>
    <RestartGame StartGame={StartGame}/>
    </>
  )
}


export default Game


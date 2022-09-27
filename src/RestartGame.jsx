
const RestartGame = (props) => {
  return (
    <div className="restart-game show">
      <h1 className="end-message">End game</h1>
      <button id="restartButton" onClick={() => {
        props.StartGame()
        const restartGame = document.querySelector('.restart-game')
        restartGame.classList.remove('show')
      }}>Restart</button>
    </div>
  )
}

export default RestartGame
import React from 'react';
import '/Users/krishanu/Downloads/Dev/Reactjs/tic-tac-toe/src/ScoreBoard.css';

const ScoreBoard = ({score, xPlaying}) => {
    const {xScore, oScore} = score;
    //console.log(`${xScore} ${oScore}`)
  return (
    <div className='scoreboard'>
      <span className={`score x-score ${!xPlaying && "inactive"}`}>X - {xScore}</span>
      <span className={`score o-score ${xPlaying && "inactive"}`}>O - {oScore}</span>
    </div>
  )
}

export default ScoreBoard

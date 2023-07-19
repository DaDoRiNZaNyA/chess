import React, { useState, useEffect } from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Color';

interface PopupProps {
  winPlayer: Player | null;
  restart: () => void;
  setWinPlayer: (winPlayer: Player | null) => void;
  setStart: (start: number) => void;
  gameTime: number;
  setGameTime: (gameTime: number) => void;
}

export const Popup: React.FC<PopupProps> = ({
  winPlayer,
  restart,
  setWinPlayer,
  setStart,
  gameTime,
  setGameTime,
}) => {
  const [inputTime, setInputTime] = useState('10');

  useEffect(() => {
    setInputTime(gameTime.toString());
  }, [gameTime]);

  const clickRestart = () => {
    const inputValue = parseInt(inputTime, 10);
    if (!isNaN(inputValue) && inputValue > 9) {
      setGameTime(inputValue);
      setInputTime(inputValue.toString());
      restart();
      setWinPlayer(null);
      setStart(1);
    } else {
      alert('Введите корректное число больше 10');
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTime(event.target.value);
  };

  return (
    <div className='popup'>
      {winPlayer ? <h2 className='win-text'>Победа {winPlayer?.color === Colors.BLACK ? "чёрных" : "белых"}</h2> : null}
      <input className='time-input' type="text" name="name" placeholder='Время игры' value={inputTime} onChange={onInputChange}/>
      <button className='popup-restart-button' onClick={clickRestart}>Start</button>
    </div>
  );
}

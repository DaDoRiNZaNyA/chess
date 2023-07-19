import React, {useState, useRef, useEffect} from 'react'
import { Colors } from '../models/Color';
import { Player } from '../models/Player';

interface TimerProps{
    currentPlayer: Player | null;
    restart: () => void;
    setCurrentPlayer: (currentPlayer: Player | null) => void;
    setWinPlayer: (winPlayer: Player) => void;
    winPlayer: Player | null;
    gameTime: number;
    start: number;
}

export const Timer: React.FC<TimerProps> = ({currentPlayer, restart, setCurrentPlayer, setWinPlayer, winPlayer, gameTime, start}) => {
    const [blackTime, setBlackTime] = useState(gameTime);
    const [whiteTime, setWhiteTime] = useState(gameTime);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    
    useEffect(() => {
        if (winPlayer === null && start === 1){
            startTimer();
        }
    }, [currentPlayer, winPlayer, start])

    function startTimer(){
        setBlackTime(gameTime);
        setWhiteTime(gameTime);
        if (timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTime : decrementBlackTime;
        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTime(){
        setBlackTime(prev => prev -1);
    }

    function decrementWhiteTime(){
        setWhiteTime(prev => prev -1);
    }
    useEffect(() => {
        if (whiteTime === 0){
            setWinPlayer(new Player(Colors.BLACK))
            if (timer.current){
                clearInterval(timer.current)
                setBlackTime(gameTime);
                setWhiteTime(gameTime);
                setCurrentPlayer(new Player(Colors.WHITE));
            }
        } else if (blackTime === 0){
            setWinPlayer(new Player(Colors.WHITE))
            if (timer.current){
                clearInterval(timer.current);
                setBlackTime(gameTime);
                setWhiteTime(gameTime);
                setCurrentPlayer(new Player(Colors.WHITE));
            }
        }
    }, [whiteTime, blackTime])

    const handleRestart = () => {
        setBlackTime(gameTime);
        setWhiteTime(gameTime);
        setCurrentPlayer(new Player(Colors.WHITE));
        restart();
    }

    return (
    <div className='timer'>
        <h2 className={`time ${currentPlayer?.color===Colors.BLACK ? "active-time" : ""}`}>{blackTime}</h2>
        <button className='restart-button' onClick={handleRestart}>Restart</button>
        <h2 className={`time ${currentPlayer?.color===Colors.WHITE ? "active-time" : ""}`}>{whiteTime}</h2>
    </div>
    )
}

import React, {useState, useRef, useEffect} from 'react'
import { Colors } from '../models/Color';
import { Player } from '../models/Player';

interface TimerProps{
    currentPlayer: Player | null;
    restart: () => void;
    setCurrentPlayer: (currentPlayer: Player | null) => void;
}

export const Timer: React.FC<TimerProps> = ({currentPlayer, restart, setCurrentPlayer}) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    
    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    function startTimer(){
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

    const handleRestart = () => {
        setBlackTime(300);
        setWhiteTime(300);
        setCurrentPlayer(new Player(Colors.WHITE));
        restart();
    }

    return (
    <div>
        <button onClick={handleRestart}>Restart</button>
        <h2>{blackTime}</h2>
        <h2>{whiteTime}</h2>
    </div>
    )
}

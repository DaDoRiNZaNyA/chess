import React from 'react';
import { Figure } from '../models/figures/Figure';

interface LostFigureProps{
    figures: Figure[];
}

export const LostFigures: React.FC<LostFigureProps> = ({figures}) => {
  return (
    <div className='lost'>
        {
            figures.map(figure => 
                <div key={figure.id}>
                    {figure.logo && <img width={30} height={30} src={figure.logo} alt={figure.name}/>}
                </div>    
            )
        }
    </div>
  )
}

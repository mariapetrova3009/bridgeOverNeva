import React, { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";

import type1 from './img/1.svg';
import type2 from './img/2.svg';
import type3 from './img/3.svg';

const objectTypes = [
    { type: 1, weight: 2, },
    { type: 2, weight: 1.5 },
    { type: 3, weight: 3 }
];

export default function BridgeSimulation() {
    const [objects, setObjects] = useState([]);
    const [totalWeight, setTotalWeight] = useState(0);
    const [clickCount, setClickCount] = useState(0);

    const getImageByType = (type) => {
        switch (type) {
            case 1: return type1;
            case 2: return type2;
            case 3: return type3;
            default: return '';
        }
    };

    const addObject = () => {
        if (clickCount >= 30) return;

        const index = Math.floor(clickCount / 10);
        const newObject = {
            ...objectTypes[index],
            x: Math.random() * 90, // в процентах от ширины, 0%–90%
            id: Date.now() + Math.random()
        };

        setObjects([...objects, newObject]);
        setTotalWeight(totalWeight + newObject.weight);
        setClickCount(clickCount + 1);
    };

    return (
        <div className="container">
            <div className="info-card">
                <h2>Мост Кулибина</h2>
                <p>Дата создания: 1776</p>
                <p>Размеры: 100 м</p>
                <p>Аналоги: зарубежные не выдерживали такую нагрузку</p>
            </div>
            <div className="simulation-area">
                <div className='bridge'>
                    <svg className="bridge-svg" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0 150 Q 250 50 500 150" stroke="#546e7a" strokeWidth="8" fill="none"/>
                        <line x1="0" y1="150" x2="500" y2="150" stroke="#37474f" strokeWidth="10"/>
                        <circle cx="0" cy="150" r="8" fill="#263238"/>
                        <circle cx="500" cy="150" r="8" fill="#263238"/>
                    </svg>
                </div>
                {objects.map((obj, index) => (
                    <motion.div
                        key={obj.id}
                        className="falling-object"
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        style={{
                            position: 'absolute',
                            left: `${obj.x}%`,
                            bottom: '0px',
                        }}
                    >
                        <img
                            src={getImageByType(obj.type)}
                            alt={`type ${obj.type}`}
                            width={150}
                            height={150}
                        />
                    </motion.div>
                ))}
            </div>
            <button onClick={addObject} className="add-button">Добавить груз</button>
            {clickCount >= 30 && (
                <div className="result-message">
                    <p>Общий вес груза: {totalWeight.toFixed(1)} тонн</p>
                    <p>Мост выдержал эксперимент!</p>
                </div>
            )}
            <button className="exit-button" onClick={() => window.location.reload()}>Выход</button>
        </div>
    );
}

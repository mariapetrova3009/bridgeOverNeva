import React, { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";

const objectTypes = [
    { type: "Железный брусок", weight: 2 },
    { type: "Кирпич", weight: 1.5 },
    { type: "Академик", weight: 3 }
];

export default function BridgeSimulation() {
    const [objects, setObjects] = useState([]);
    const [totalWeight, setTotalWeight] = useState(0);
    const [clickCount, setClickCount] = useState(0);

    const addObject = () => {
        if (clickCount >= 30) return;
        const index = Math.floor(clickCount / 10);
        const newObject = objectTypes[index];
        console.log(newObject);
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
                        key={index}
                        className="falling-object"
                        initial={{y: -50}}
                        animate={{y: 0}}
                    >
                        <p>{obj.type}</p>
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

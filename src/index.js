import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Provider from './ecs/Provider';
import GameShell from './game/GameShell';
import Main from './ui/Main';

const gs = new GameShell();
gs.start();


ReactDOM.render(
    <Provider ctx={gs}>
        <Main/>
    </Provider>, 
    document.getElementById('root'));
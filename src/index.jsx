import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Ball from './Ball';
import { ballHelper } from './helpers';

const balls = [new Ball(ballHelper.getColor(), ballHelper.getRadius(), ballHelper.getAngle(), 3)];

// draw balls
setInterval(() => {
  ReactDOM.render(<App balls={balls} />, document.getElementById('root'));
});

// add ball
let counter = 0;
let addBallInterval = setInterval(() => {
  balls.push(new Ball(ballHelper.getColor(), ballHelper.getRadius(), ballHelper.getAngle(), 3));
  counter++;
  if (counter === 20) {
    clearInterval(addBallInterval);
  }
}, 5000);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

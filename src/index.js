import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { BASE_NAME } from 'src/config';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from 'src/app-context';
import './index.css';


ReactDOM.render(
    <AppProvider>
        <BrowserRouter basename={BASE_NAME}>
            <App />
        </BrowserRouter>
    </AppProvider>
    ,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

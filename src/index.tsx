import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from "./redux/store";

import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
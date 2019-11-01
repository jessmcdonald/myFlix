import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

//import statement to indicate that `index.scss` needs to be bundled
import './index.scss';

const store = createStore(moviesApp);

//find root of app
const container = document.getElementById('app-container');

//render app in root DOM element
ReactDOM.render(
    <Provider store={store}>
        <MainView />
    </Provider>, container);


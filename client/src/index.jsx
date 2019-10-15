import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

//import statement to indicate that `index.scss` needs to be bundled
import './index.scss';

//main component (will eventually use all others)
class MyFlixApplication extends React.Component {
    render() {
        return <MainView />;
    }
}

//find root of app
const container = document.getElementsByClassName('app-container')[0];

//render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);


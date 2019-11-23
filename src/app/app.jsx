require('../css/main.less');

const React        = require('react');
const ReactDOM     = require('react-dom');
const Notebook  = require('./notebook/notebook.jsx');


class App extends React.Component {
    render() {
        return (
            <>
                <Notebook />
            </>
        );
    }
}

const mainContainer = document.getElementsByTagName('body')[0];
ReactDOM.render(
    <App />,
    mainContainer
);

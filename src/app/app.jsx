// @flow 

require('../css/main.less');


const React        = require('react');
const ReactDOM     = require('react-dom');
const redux        = require('redux');
const Provider     = require('react-redux').Provider;
const allReducers  = require('./reducers/reducers.jsx');
const TodoList     = require('./components/TodoList/TodoList.jsx');
const AssignWindow = require('./components/AssignWindow/AssignWindow.jsx');
const DialogWindow = require('./components/AssignWindow/DialogWindow.jsx');


const store = redux.createStore(allReducers);

store.subscribe(() => {
	console.log(store.getState());
})

class App extends React.Component<{}> {
    render() {
        return (
            <>
                <TodoList />
                <AssignWindow />
                <DialogWindow />
            </>
        );
    }
}


const mainContainer = document.getElementById("main-container");

if (mainContainer !== null) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        mainContainer
    );
}
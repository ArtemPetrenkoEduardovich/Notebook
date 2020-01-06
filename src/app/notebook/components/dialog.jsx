const React    = require('react');
const ReactDOM = require('react-dom');

const NotebookContext = require('../context.jsx');


class Dialog extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
    const notebook = document.getElementById("notebook");
    if (notebook) {
    return ReactDOM.createPortal (
    <>
    <div className="canvas"/>
    
    <div id="dialog-window">
        <p>Are you sure?</p>
        <button onClick={() => this.context.saveChanges(this.props.text)}>Yes</button>
        <button onClick={() => this.props.cancel()}>No</button>
    </div>
    </>,
    notebook
    );
    } else { return null; }
    }
} Dialog.contextType = NotebookContext; 

module.exports = Dialog;
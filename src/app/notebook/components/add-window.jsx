const React    = require('react');
const ReactDOM = require('react-dom');
const autosize = require('autosize');

const NotebookContext = require('../context.jsx');

class AddWindow extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            text: ""
        }
    }

    componentDidMount() {
        this.refs.txter.focus();
        autosize(this.refs.txter);
    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    addNote(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/addNote?text=${this.state.text.split('\n').join('<br>')}`)
        .then(this.context.getAllNotes())
        .then(this.close())
        .catch(err => console.error(err));
    }

    close() {
        this.context.closeAddWindow();
    }

    render() {
    const notebook = document.getElementById("notebook");
    if (notebook) {
    return ReactDOM.createPortal (
    <>
    <div className="canvas"/>
    
    <div id="add-window">
        <button onClick={this.close.bind(this)}>X</button>
        <form onSubmit={this.addNote.bind(this)} method="GET">
            <textarea name="text"
                      id="edit_text"
                      onChange={this.handleChange.bind(this)} 
                      ref="txter">
            </textarea>
            <input type="submit" value="Add" />
        </form>
    </div>
    </>,
    notebook
    );
    } else { return null; }
    }
} AddWindow.contextType = NotebookContext; 

module.exports = AddWindow;
const React    = require('react');
const ReactDOM = require('react-dom');

const NotebookContext = require('../context.jsx');

class AddWindow extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            text: "",
            height: '60px'
        }
    }

    componentDidMount() {
        this.setState({
            height: (this.refs.txter.scrollHeight) + 'px'
        });
    }

    handleChange(event) {
        this.setState({
            text: event.target.value,
            height: (this.refs.txter.scrollHeight) + 'px'
        });
        console.log(this.state.text);
    }

    addNote(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/addNote?text=${this.state.text}`)
        .then(this.props.getAllNotes())
        .then(this.close())
        .catch(err => console.error(err));
    }

    close() {
        this.props.closeAddWindow();
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
            <textarea style={{height: this.state.height}}
                    name="text"
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
} module.exports = AddWindow;
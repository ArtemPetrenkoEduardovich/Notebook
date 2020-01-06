const React    = require('react');
const ReactDOM = require('react-dom');
const autosize = require('autosize');

const Dialog = require('./dialog.jsx');

const NotebookContext = require('../context.jsx');

class FullNote extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dialogIsOpen: false
        };
    }

    componentDidMount() {
        this.setState({
            text: this.context.fullNote.text
        });
        this.refs.txter.focus();
        autosize(this.refs.txter);
    }

    parseDate(date) { return date.substring(0, date.indexOf('T')); }

    showDialog() {
        this.setState({
            dialogIsOpen: true
        });
    }

    render() {
    const notebook = document.getElementById("notebook");
    if (notebook) {
        return ReactDOM.createPortal (
            <>
            <div className="canvas"/>
            
            <div id="full_note">
                <p>{this.parseDate(this.context.fullNote.date)}</p>
                <button onClick={() => this.context.closeFullNote()}>X</button>
                {/* <form onSubmit={this.saveChanges.bind(this)} method="GET"> */}
                    <textarea
                            name="text"
                            id="edit_text" 
                            onChange={(event) => this.setState({ text: event.target.value })} 
                            ref="txter">
                        {this.context.fullNote.text.replace(/<br>/g, "\n")}
                    </textarea>
                    <input type="submit" value="save" onClick={this.showDialog.bind(this)}/>
                {/* </form> */}
            </div>

            { this.state.dialogIsOpen ? 
            <Dialog cancel={() => this.setState({ dialogIsOpen: false })} text={this.state.text}/> 
            : null }
            </>,
            notebook
        );
        } else { return null; }
    }
} FullNote.contextType = NotebookContext;
module.exports = FullNote;





    // saveChanges(e) {
    //     e.preventDefault();
    //     fetch(`http://localhost:3000/upDateNoteById?text=${this.state.text.split('\n').join('<br>')}&id=${this.context.fullNote.id}`)
    //     // fetch(`http://localhost:3000/upDateNoteById?text=${this.state.text}&id=${this.context.fullNote.id}`)
    //     .then(this.context.getAllNotes())
    //     .then(this.closeFullNote())
    //     .catch(err => console.error(err));
    // }
const React = require('react');

const NoteList  = require('./components/note-list.jsx');
const FullNote = require('./components/full-note.jsx');

const Context1 = require('./context.jsx');
const Context2 = require('./context.jsx');

class Notebook extends React.Component {

    constructor(props){
        super(props);
        this.openFullNote = this.openFullNote.bind(this);
        this.closeFullNote = this.closeFullNote.bind(this);
        this.state = {
            notes: [],
            fullNoteIsOpen: false,
            openFullNote: this.openFullNote,
            fullNote: null
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/getallnotes')
        .then(response => response.json())
        .then(response => this.setState({notes: response.notes}))
        .catch(err => console.error(err));
    }

    openFullNote(fullNote) {
        this.setState({
            fullNoteIsOpen : true,
            fullNote: fullNote
        });
    }

    closeFullNote() {
        this.setState({
            fullNoteIsOpen : false,
            fullNote: null
        });
    }

    render() {
    return (
    <div id="notebook">
        <div id="notebook_head"><h1>Notebook</h1></div>

        <div id="new_note_btn_block">
            <button>New note</button>
        </div>
        
        <Context1.Provider value={this.state}>
            <NoteList/>
        </Context1.Provider>
        
        { this.state.fullNoteIsOpen ? <FullNote fullNote={this.state.fullNote} closeFullNote={this.closeFullNote}/> : null }
    </div>
    );
    }
}

module.exports = Notebook;
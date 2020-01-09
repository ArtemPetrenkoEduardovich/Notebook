const React = require('react');

const NoteList  = require('./components/note-list.jsx');
const FullNote = require('./components/full-note.jsx');
const AddWindow = require('./components/add-window.jsx');

const OpenSocket = require('socket.io-client');
const socket = OpenSocket('http://localhost:3000');

const NotebookContext = require('./context.jsx');

class Notebook extends React.Component {

    constructor(props){
        super(props);
        this.openFullNote   = this.openFullNote.bind(this);
        this.closeFullNote  = this.closeFullNote.bind(this);
        this.getAllNotes    = this.getAllNotes.bind(this);
        this.closeAddWindow = this.closeAddWindow.bind(this);
        this.openAddWindow  = this.openAddWindow.bind(this);
        this.saveChanges    = this.saveChanges.bind(this);

        this.state = {
            // vars: 
            notes:           [],
            fullNote:        null,
            fullNoteIsOpen:  false,
            addWindowIsOpen: false,
            socket:          socket,

            // functions:
            openFullNote:   this.openFullNote,
            closeFullNote:  this.closeFullNote,
            getAllNotes:    this.getAllNotes,
            closeAddWindow: this.closeAddWindow,
            saveChanges:    this.saveChanges,
            openAddWindow:  this.openAddWindow
        };
    }

    componentDidMount() {
        this.getAllNotes();
        socket.on('updateList', () => 
            this.state.getAllNotes()
        );
    }

    getAllNotes(){
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

    closeAddWindow() {
        this.setState({
            addWindowIsOpen : false
        });
    }

    openAddWindow() {
        this.setState({
            addWindowIsOpen : true
        });
    }

    saveChanges(text) {
        // e.preventDefault();
        fetch(`http://localhost:3000/upDateNoteById?text=${text.split('\n').join('<br>')}&id=${this.state.fullNote.id}`)
        // fetch(`http://localhost:3000/upDateNoteById?text=${this.state.text}&id=${this.context.fullNote.id}`)
        .then(this.getAllNotes())
        .then(this.closeFullNote())
        .then(socket.emit('updateList'))
        .catch(err => console.error(err));
    }

    render() {
    return (
    <NotebookContext.Provider value={this.state}>
    <div id="notebook">
        <div id="notebook_head"><h1>Notebook</h1></div>

        <div id="new_note_btn_block">
            <button onClick={this.openAddWindow.bind(this)}>New note</button>
        </div>
        
        <NoteList/>
        
        { this.state.fullNoteIsOpen ? <FullNote /> : null }

        { this.state.addWindowIsOpen ? <AddWindow /> : null }

    </div>
    </NotebookContext.Provider>
    );
    }
}

module.exports = Notebook;
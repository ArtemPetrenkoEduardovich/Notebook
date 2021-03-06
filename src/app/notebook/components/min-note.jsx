const React = require('react');

const NotebookContext = require('../context.jsx');


class MinNote extends React.Component {

    constructor(props){
        super(props);
    }

    parseDate(date) {
        return date.substring(0, date.indexOf('T'));
    }

    cutText(text) {
        var length = 25;
        text.length > length 
        ? text = text.substring(0, length) + "..."
        : text = text.substring(0, length);
        return text;
    }

    deleteNote() {
        fetch(`http://localhost:3000/deleteNoteById?id=${this.props.note.id}`)
        .then(this.context.getAllNotes())
        .then(this.context.socket.emit('updateList'))
        .catch(err => console.error(err));
    }

    render() {
    const note = { ...this.props.note }
    return (
        <div className="note_item" key={note.id}>
            <p className="text_of_note_item" onClick={() => this.context.openFullNote(this.props.note)}>
                {this.cutText(note.text.replace(/<br>/g, ""))}
            </p>
            <button onClick={() => this.deleteNote()}>X</button>
            <p className="date_of_note_item">
                {this.parseDate(note.date)}
            </p>
        </div>
    );
    }
} MinNote.contextType = NotebookContext;

module.exports = MinNote;
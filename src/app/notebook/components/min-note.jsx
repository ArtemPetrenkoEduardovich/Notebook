const React = require('react');

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

    openFullNote() {
        this.props.openFullNote(this.props.note);
    }

    deleteNote() {
        fetch(`http://localhost:3000/deleteNoteById?id=${this.props.note.id}`)
        .then(this.props.getAllNotes())
        .catch(err => console.error(err));
    }

    render() {
    const note = { ...this.props.note }
    return (
        <div className="note_item" key={note.id}>
            <p className="text_of_note_item" onClick={this.openFullNote.bind(this)}>
                {this.cutText(note.text)}
            </p>
            <button onClick={this.deleteNote.bind(this)}>X</button>
            <p className="date_of_note_item">
                {this.parseDate(note.date)}
            </p>
        </div>
    );
    }
}

module.exports = MinNote;
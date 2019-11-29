const React = require('react');

const Context1 = require('../context.jsx');

const MinNote = require('./min-note.jsx');

class NoteList extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
    return (
        <div id="note_list">
        <Context1.Consumer>
        { state => 
        (state.notes.map( note => 
            <MinNote note={note} openFullNote={state.openFullNote}/>
        ))}
        </Context1.Consumer>
        </div>
    );
    }
}

module.exports = NoteList;
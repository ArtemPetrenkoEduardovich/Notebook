const React = require('react');

const NotebookContext = require('../context.jsx');

const MinNote = require('./min-note.jsx');

class NoteList extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="note_list">
            <NotebookContext.Consumer>
            { state => 
            (state.notes.map( note => 
                <MinNote note={note} />
            ))}
            </NotebookContext.Consumer>
            </div>
        );
    }
}NoteList.contextType = NotebookContext;

module.exports = NoteList;
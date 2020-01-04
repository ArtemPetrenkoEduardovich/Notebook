const React = require('react');

const NotebookContext = require('../context.jsx');

const MinNote = require('./min-note.jsx');

class NoteList extends React.Component {

    constructor(props){
        super(props);
    }

    // sout() {
    //     let value = this.context;
    //     console.log(value);
    //     console.log(this.context);
    // }

    render() {
        // this.sout();
        return (
            <div id="note_list">
            <NotebookContext.Consumer>
            { state => 
            (state.notes.map( note => 
                <MinNote note={note} openFullNote={state.openFullNote} getAllNotes={state.getAllNotes}/>
            ))}
            </NotebookContext.Consumer>
            </div>
        );
    }
}NoteList.contextType = NotebookContext;

module.exports = NoteList;
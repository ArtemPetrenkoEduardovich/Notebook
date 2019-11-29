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

    render() {
    const note = { ...this.props.note }
    return (
        <div className="note_item" key={note.id}>
            <p className="text_of_note_item" onClick={this.openFullNote.bind(this)}>
                {this.cutText(note.text)}
            </p>
            <button>X</button>
            <p className="date_of_note_item">
                {this.parseDate(note.date)}
            </p>
        </div>
    );
    }

    // render() {
    // return (
    //     <Context1.Consumer>
    //     { note => 
    //         <div className="note_item" key={note.id}>
    //             <p className="text_of_note_item" onClick = {this.openFullNote.bind(this)}>
    //                 {this.cutText(note.text)}
    //             </p>
    //             <button>X</button>
    //             <p className="date_of_note_item">
    //                 {this.parseDate(note.date)}
    //             </p>
    //         </div>
    //     }
    //     </Context1.Consumer>
    // );
    // }
}

module.exports = MinNote;
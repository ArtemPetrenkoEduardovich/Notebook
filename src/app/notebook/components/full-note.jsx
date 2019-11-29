// npm install react-contenteditable --save
const ContentEditable = require("react-contenteditable");

const React    = require('react');
const ReactDOM = require('react-dom');

const Context2 = require('../context.jsx');

class FullNote extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            text: this.props.fullNote.text
        }
    }

    parseDate(date) {
        return date.substring(0, date.indexOf('T'));
    }

    closeFullNote() {
        this.props.closeFullNote();
    }

    saveChanges() {
        // fetch(`http://localhost:3000/upDateNoteById?text=${this.state.text}&id=${this.props.fullNote.id}`)
        // .then(response => response.json())
        // .then(response => fetch('http://localhost:3000'))
        // .catch(err => console.error(err));
    }

    handleChange(event) {
        console.log(this.state.text);
        this.setState({
            text: event.target.value
        });
    }

    render() {
    const notebook = document.getElementById("notebook");
    if (notebook) {
        return ReactDOM.createPortal (
            <>
            <div className="canvas"/>
            
            <div id="full_note">
                <p>{this.parseDate(this.props.fullNote.date)}</p>
                <button onClick={this.closeFullNote.bind(this)}>X</button>
                <textarea id="edit_text" onChange={this.handleChange.bind(this)}>
                {this.props.fullNote.text}
                </textarea>
                <button onClick={this.saveChanges.bind(this)}>save</button>
            </div>
            </>,
            notebook
        );
        } else { return null; }
    }
}

module.exports = FullNote;




// // npm install react-contenteditable --save
// const ContentEditable = require("react-contenteditable");

// const React    = require('react');
// const ReactDOM = require('react-dom');

// const Context2 = require('../context.jsx');

// class FullNote extends React.Component {

//     constructor(props){
//         super(props);
//         this.state = {
//             text: this.props.fullNote.text
//         }
//     }

//     parseDate(date) {
//         return date.substring(0, date.indexOf('T'));
//     }

//     closeFullNote() {
//         this.props.closeFullNote();
//     }

//     saveChanges() {
//         // fetch(`http://localhost:3000/upDateNoteById?text=${this.state.text}&id=${this.props.fullNote.id}`)
//         // .then(response => response.json())
//         // .then(response => fetch('http://localhost:3000'))
//         // .catch(err => console.error(err));
//     }

//     handleChange(event) {
//         console.log(event);
//         this.setState({
//             text: event.target.value
//         });
//     }

//     render() {
//     const notebook = document.getElementById("notebook");
//     if (notebook) {
//         return ReactDOM.createPortal (
//             <>
//             <div className="canvas"/>
            
//             <div id="full_note">
//                 <p>{this.parseDate(this.props.fullNote.date)}</p>
//                 <button onClick={this.closeFullNote.bind(this)}>X</button>
//                 <div contenteditable="true" id="edit_text" onInput={this.handleChange.bind(this)}>
//                 {this.props.fullNote.text}
//                 </div>
//                 <button onClick={this.saveChanges.bind(this)}>save</button>
//             </div>
//             </>,
//             notebook
//         );
//         } else { return null; }
//     }
// }

// module.exports = FullNote;
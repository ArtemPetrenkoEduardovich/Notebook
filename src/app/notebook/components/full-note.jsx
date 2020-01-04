const React    = require('react');
const ReactDOM = require('react-dom');

const NotebookContext = require('../context.jsx');

class FullNote extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            text: this.props.fullNote.text,
            height: '100px'
        }
    }

    componentDidMount() {
        this.setState({
            height: (this.refs.txter.scrollHeight) + 'px'
        });
    }

    parseDate(date) {
        return date.substring(0, date.indexOf('T'));
    }

    closeFullNote() {
        this.props.closeFullNote();
    }

    saveChanges(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/upDateNoteById?text=${this.state.text}&id=${this.props.fullNote.id}`)
        .then(this.props.getAllNotes())
        .then(this.closeFullNote())
        .catch(err => console.error(err));
    }

    handleChange(event) {
        this.setState({
            text: event.target.value,
            height: (this.refs.txter.scrollHeight) + 'px'
        });
        console.log(this.state.text);
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
                <form onSubmit={this.saveChanges.bind(this)} method="GET">
                    <textarea style={{height: this.state.height}}
                            name="text"
                            id="edit_text" 
                            onChange={this.handleChange.bind(this)} 
                            ref="txter">
                        {this.props.fullNote.text}
                    </textarea>
                    <input type="submit" value="save" />
                </form>
            </div>
            </>,
            notebook
        );
        } else { return null; }
    }
} module.exports = FullNote;

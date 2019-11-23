const React = require('react');

class Notebook extends React.Component {

    constructor(props){
        super(props);
        this.state = {notes: []}
    }

    componentDidMount() {
        fetch('http://localhost:3000/getallnotes')
        .then(response => response.json())
        .then(response => this.setState({notes: response.notes}))
        .catch(err => console.error(err));
    }

    render() {
        return (
            <div id="notebook">
            {this.state.notes.map(note => 
                <h1 key={note.id}>{note.text}</h1>
            )}
            <div/>
        );
        
    }
}

module.exports = Notebook;
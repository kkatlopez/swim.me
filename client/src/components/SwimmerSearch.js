import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from 'semantic-ui-react';

class SwimmerSearch extends Component {
  constructor(props) {
    super(props);
      this.state = {
          swimmernames: []
      };
  }
  
  getSwimmerTimes() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var i;
          var swimmerlist = [];
          var name = "";
          for (i = 0; i < result.length; i++) {
            name = result[i].firstName + " " + result[i].lastName;
            swimmerlist.push({key: name, value: name, text: name});
          }
          console.log(swimmerlist);
          this.setState({
            swimmernames: swimmerlist
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  getTerm () {
    var node = document.getElementsByClassName('divider text')[0];
    var a = ReactDOM.findDOMNode(node);
    console.log(a.textContent);
  }

  componentDidMount(){
    this.getSwimmerTimes();
  }

  render() {
    return(
      <Dropdown
        clearable
        fluid
        search
        selection
        options={this.state.swimmernames}
        placeholder='Search for a swimmer'
        onClick={() => this.getTerm("")}
      />
    );
  }
}

export default(SwimmerSearch);


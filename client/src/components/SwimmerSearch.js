import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import '../css/swimmersearch.css';

class SwimmerSearch extends Component {
  constructor(props) {
    super(props);
      this.state = {
          swimmernames: []
      };
  }
  
  // retrive swimmer times info
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

  // initialize component before rendering
  componentDidMount(){
    this.getSwimmerTimes();
  }

  render() {
    return(
      <Dropdown
        className="swimmer-search"
        clearable
        fluid
        search
        selection
        options={this.state.swimmernames}
        placeholder='Search for a swimmer'
      />
    );
  }
}

export default withRouter(SwimmerSearch);


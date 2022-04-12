import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import '../css/swimmersearch.css';

class SwimmerSearch extends Component {
  constructor(props) {
    super(props);
      this.state = {
          swimmernames: []
      };
      // if(this.props.location.state == undefined){
      //   this.props.history.push("/", { logged: false });
      // }
      // else if (!('logged' in this.props.location.state)){
      //   this.props.history.push("/", { logged: false });
      // }
      // else if(this.props.location.state.logged == false){
      //   this.props.history.push("/", { logged: false });
      // }
  }
  
  getSwimmers() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var i;
          var swimmerlist = [];
          var name = "";
          for (i = 0; i < result.length; i++) {
            if (result[i].seasonsSwam.includes("2021-2022") == true) {
                name = result[i].firstName + " " + result[i].lastName;
                swimmerlist.push({key: name, value: name, text: name});
            }
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

  componentDidMount(){
    this.getSwimmers();
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


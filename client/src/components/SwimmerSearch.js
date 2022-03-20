import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

class SwimmerSearch extends Component {
  constructor(props) {
    super(props);
      this.state = {
          swimmernames: []
      };
  }
  // const countryOptions = [
  //   { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
  //   { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
  //   { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
  //   { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
  //   { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
  //   { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
  //   { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
  //   { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
  //   { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
  //   { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
  //   { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
  //   { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
  //   { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
  //   { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
  //   { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
  //   { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
  //   { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
  //   { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
  //   { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
  //   { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
  //   { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
  //   { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
  //   { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
  // ]
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
      />
    );
  }
}

export default(SwimmerSearch);


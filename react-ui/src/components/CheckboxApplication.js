
import React from 'react'
import ReactDOM from 'react-dom'

class Check extends React.Component { // this class is used to create a checkbox component where the service worker can click a clickbox for inputting a schedule into multiple days

    constructor(props) {
        super(props);
    
        this.state = {
             Selected: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]:value});
    }
    
 

    render() {
        
        return (
            <form>
                <label>
                    Monday
                    <input
                        name = "Selected"
                        type = "checkbox"
                        checked= {this.state.Selected}
                        onChange = {this.handleInputChange} />
                </label>
                <br/>

                 <label>
                    Tuesday
                    <input
                        name = "Selected"
                        type = "checkbox"
                        checked= {this.state.Selected}
                        onChange = {this.handleInputChange} />
                </label>
                <br/>

                <label>
                    Wednesday
                    <input
                        name = "Selected"
                        type = "checkbox"
                        checked= {this.state.Selected}
                        onChange = {this.handleInputChange} />
                </label>
                <br/>

                <label>
                    Thursday
                    <input
                        name = "Selected"
                        type = "checkbox"
                        checked= {this.state.Selected}
                        onChange = {this.handleInputChange} />
                </label>
                <br/>

                <label>
                    Friday
                    <input
                        name = "Selected"
                        type = "checkbox"
                        checked= {this.state.Selected}
                        onChange = {this.handleInputChange} />
                </label>
                <br/>

                <label>
                    Saturday
                    <input
                        name = "Selected"
                        type = "checkbox"
                        checked= {this.state.Selected}
                        onChange = {this.handleInputChange} />
                </label>
                <br/>
                <label>
                    Sunday
                    <input
                        name = "Selected"
                        type = "checkbox"
                        checked= {this.state.Selected}
                        onChange = {this.handleInputChange} />
                </label>
              

            </form>
        )
    }
}

ReactDOM.render(
    <Check />,
    document.getElementById('root')
  );

export default Check







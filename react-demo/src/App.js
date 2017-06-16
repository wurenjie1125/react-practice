import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';


const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)

const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topics}/>
        </div>
    </Router>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React实践</h2>
        </div>
        {/*<Welcome name="sara" />*/}
          {/*<Welcome name="sara" />*/}
          {/*<Welcome name="sara" /*/}
          <h2>换算工具：</h2>
          <h4>1、华氏温度摄氏温度换算</h4>
          <Calculator />
          <BasicExample/>


      </div>
    );
  }
}
class Calculator extends Component{
    constructor(props){
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature:'', scale:'c'}

    }
    handleCelsiusChange(temperature){
        this.setState({scale:'c',temperature})
    }
    handleFahrenheitChange(temperature){
        this.setState({scale:'f',temperature})

    }
    render(){
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale == 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale == 'c' ? tryConvert(temperature,toFahrenheit) : temperature;
        console.log(celsius,fahrenheit)
        return (
            <div>
                <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
            </div>
        )
    }
}
class exchangeInput extends Component {

}
class TemperatureInput extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.props.onTemperatureChange(e.target.value)
    }
    render(){
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        const name = scale == 'c'?'摄氏温度':'华氏温度';
        return (
            <div className="item">
                <label>
                    {name}:
                    <input value={temperature} onChange={this.handleChange} />
                </label>
            </div>
        )
    }
}
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
function tryConvert(temperture,convert){
    const input = parseFloat(temperture);
    if(Number.isNaN(input)){
        return ''
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();

}
class Welcome extends Component {
    render(){
        return <h1>hello,{this.props.name}</h1>
    }
}

export {
    App,
    BasicExample,
    Welcome
};

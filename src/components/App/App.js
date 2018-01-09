import React, { Component } from 'react';
import { connect } from 'react-redux';

import Plot from '../Plot/Plot';
import { 
  changeLocation,
  setSelectedTemp,
  setSelectedDate,
  fetchData
} from '../../actions';


function mapStateToProp(state){
  return {
    redux: state
  }
}

export class App extends Component {
  
  fetchData = (event) => {

    event.preventDefault();
  
    var location = encodeURIComponent(this.props.redux.get('location'));

    var urlPrefix = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var urlSuffix = "&APPID=c1f62f052159942bc0c53780caf947bd&units=metric";
    var url = urlPrefix + location + urlSuffix;
    
    this.props.dispatch(fetchData(url));
  }

  changeLocation = (event) => {
    this.props.dispatch(changeLocation(event.target.value))
  }

  onPlotClick = (data) => {
  	if (data.points){
      this.props.dispatch(setSelectedDate(data.points[0].x));
      this.props.dispatch(setSelectedTemp(data.points[0].y));
  	}
  }

  render() {
    var currentTemp = 'not loaded yet';
    
    if (this.props.redux.getIn(['data', 'list'])){
      currentTemp = this.props.redux.getIn(['data', 'list', '0', 'main', 'temp']);
    }
	
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the today weather for
            <input 
              type="text" 
              placeholder={"City, Country"}
              value={this.props.redux.get('location')}
              onChange={this.changeLocation}
            />
          </label>
        </form>

        {(this.props.redux.getIn(['data', 'list'])) ? (
          <div className="wrapper">
            {/* Render the current temperature if no specific date is selected */}
            <p className="temp-wrapper">
              <span className="temp">
                { this.props.redux.getIn(['selected', 'temp']) ? this.props.redux.getIn(['selected', 'temp']) : currentTemp }
              </span>
              <span className="temp-symbol">°C</span>
              <span className="temp-date">
                { this.props.redux.getIn(['selected', 'temp']) ? this.props.redux.getIn(['selected', 'date']) : ''}
              </span>
            </p>
            <h2>Forecast</h2>
            <Plot
              xData={this.props.redux.get('dates')}
              yData={this.props.redux.get('temps')}
              onPlotClick={this.onPlotClick}
              type="scatter"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProp, null)(App);
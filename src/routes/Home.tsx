import React, { Component } from 'react';

class Home extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTemp: props.currentTemp || 0,
      cloudCoverage: props.cloudCoverage || 0,
      city: props.city || 'Unknown'
    };
  }

  render() {
    const { currentTemp, cloudCoverage, city } = this.state;

    return (
      <div className="home">
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{city}</p>
            </div>
            <div className="temp">
              <h1>{currentTemp}°F</h1>
            </div>
            <div className="description">
              <p>Cloud Coverage: {cloudCoverage}%</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
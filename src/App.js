import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './components/Map'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRestaurants: [],
      markers: [],
      center: [],
      zoom: 13
      }
    }

  componentDidMount() {    
    this.getRestaurants()
  }

  /* Use axios to get restaurant data from FourSquare*/
  getRestaurants = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?"
    const params = {
      client_id: "GGXCA2DKZ0EK0ID4S4SYLYTMPWFCNHOFBSBHFMOZTSJTAWX5",
      client_secret: "CKLZUO02MB5DKBQ4UCHV4Q0MT4UOV5EXPL0SPHDSE14IID4R",
      v: "20181109",
      query: "thai",
      near: "Simi Valley"
    }

    axios.get(endPoint + new URLSearchParams(params))
    .then(results => {
      // let allRestaurants = results.data.response.groups[0].items;
      console.log(results);
      let allRestaurants = results.data.response;
      console.log(allRestaurants);
      let center = results.data.response.geocode.feature.geometry;
      let markers = results.data.response.venues.map(restaurant => {
        return {
          lat: restaurant.location.lat,
          lng: restaurant.location.lng,
          isOpen: false,
          isVisble: true
        }
      });
      console.log(markers);
      this.setState({allRestaurants, center, markers});
    })
    .catch(error => {
      console.log(error)
    })
  }


  render() {
    return (
      <div className="App">
        <Map {...this.state}/>
      </div>
    );
  }
}

export default App;

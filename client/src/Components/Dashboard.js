import React, { Component } from "react";
import "../Stylings/Dashboard.css";
import { Link } from "react-router-dom";
// import { Geocoder, Providers } from "node-geocoder";
import {
  // FeatureGroup,
  Map,
  Marker,
  Popup,
  // LayersControl,
  TileLayer
} from "react-leaflet";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   Date: moment(),
      startDate: moment(),
      data: [],
      id: 0,
      NewLat: 0,
      NewLong: 0,
      zoom: 13,
      latitude: 27.964157, // default to Tampa, FL
      longitude: -82.452606, // with these coordinates
      name: "",
      address: "",
      // isFinished: false,
      authed: {
        isLoggedIn: false
      }
      // options: {
      //   Providers: "openstreetmaps",
      //   httpAdapter: "https",
      //   formatter: null
      // }
    };
    this.handleChange = this.handleChange.bind(this);
    this.getLocation(null); // initiate GPS position call
  }

  componentDidMount() {
    console.log({ props: this.props });
  }

  getLatest = () => {
    const PROFILE_URL = "https://localhost:5001/api/events";

    fetch(PROFILE_URL, {
      headers: {
        // mode: "no-cors"
      }
    })
      .then(resp => resp.json())
      .then(eventsData => {
        this.setState({
          data: eventsData
        });
        console.log(this.state.data);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // mode: "no-cors"
      },
      body: JSON.stringify({
        EventName: this.state.name,
        EventAddress: this.state.address,
        Latitude: this.state.latitude,
        Longitude: this.state.longitude
      })
    })
      .then(resp => resp.json())
      .then(_ => {
        console.log(this.state.name);
        this.getLatest();
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Handles date change for the calendar
  handleDateChange(date) {
    this.setState({
      startDate: moment().format("YYYY-MM-DD")
    });
  }

  getLocation = e => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  };

  render() {
    const positionOnMap = [this.state.latitude, this.state.longitude];
    //[this.props.coords.latitude, this.props.coords.longitude];
    // let geocoder = NodeGeocoder(this.state.options);
    // geocoder.geocode()
    return (
      <div className="dashboard-body">
        <section>
          <form onSubmit={this.handleSubmit}>
            <section className="row">
              <header className="field-header">Name of Event:</header>
              <input
                type="text"
                name="name"
                placeholder="name of event"
                // value={this.state.name}
                onChange={this.handleChange}
              />
            </section>
            <section className="row">
              <header className="field-header">Location:</header>
              <input
                type="text"
                name="address"
                placeholder="location of event"
                // value={this.state.address}
                onChange={this.handleChange}
              />
            </section>
            <section className="row">
              <header className="field-header">Time Start:</header>
              <input type="text" placeholder="0:00" />
            </section>
            <section className="row">
              <header className="field-header">Time End:</header>
              <input type="text" placeholder="0:00" />
            </section>
            <button>Submit</button>
          </form>
        </section>
        <section className="map-container">
          <Map
            center={positionOnMap}
            zoom={this.state.zoom}
            className="map-styling"
            onClick={this.getLocation}
          >
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={positionOnMap}>
              <Popup>
                Coordinates: [{this.state.latitude},{this.state.longitude}]
              </Popup>
            </Marker>
          </Map>
          <section className="side-bar">
            <DatePicker
              className="date-picker"
              inline
              selected={this.state.startDate}
              onChange={this.handleDateChange}
            />
            <Link to={`/new_event/${this.state.authed.isLoggedIn}`}>
              <button className="add-event-button">Add Event</button>
            </Link>
            <section>
              <header className="event-list">Events of the Day</header>
              <section>
                {this.state.data.map((event, i) => {
                  return (
                    <section className="single-event" key={i}>
                      <button className="event-button">
                        {event.EventName}
                      </button>
                    </section>
                  );
                })}
              </section>
            </section>
          </section>
        </section>
        <section />
      </div>
    );
  }
}

export default Dashboard;
// geolocated({
//   positionOptions: {
//     enableHighAccuracy: false
//   },
//   userDecisionTimeout: 5000
// })(Dashboard);

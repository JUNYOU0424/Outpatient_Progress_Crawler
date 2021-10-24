import React from 'react';
import './page3.scss';
import GoogleMapReact from 'google-map-react';
import Marker from './component/Marker'

class MapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: { lat: 0.00, lng: 0.00 },
    }
  }
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  componentDidMount() {
    let pos = { lat: 0.0, lng: 0.0 };
    navigator.geolocation.getCurrentPosition((position) => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({ center: pos })
        console.log(this.state.center)
      }
    );
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          center={this.state.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
          lat={this.state.center.lat}
          lng={this.state.center.lng}
          hos='12354546546646'/>
          <Marker
          lat={24.2177358}
          lng={120.673648}
          hos='50554'/>
          <Marker
          lat={24.2177358}
          lng={120.573648}
          hos='50554'/>
          <Marker
          lat={24.3177358}
          lng={120.673648}
          hos='50554'/>
        </GoogleMapReact>
      </div>
    );
  }
}
export default MapContainer

import React from 'react';
import '../style/marker.scss'

class Marker extends React.Component{
    constructor(props){
        super(props);
        this.state={
            markerIsClick:false,
        }
    }
    ClickMarker=()=>{
        this.setState({
            markerIsClick:!this.state.markerIsClick
        })
        console.log(this.state.markerIsClick)
    }
    render(){
        return(
            <div className={this.state.markerIsClick?'marker_extend':'marker_closed'} onClick={this.ClickMarker}>
                <text>{this.props.hos}</text>
            </div>
        )
    };
};
export default Marker;
// this entire component is used from John's class demo

import {When} from 'react-if';

// Read in from .env.local file and live, it comes from "Environment Variables"
const API_KEY = process.env.REACT_APP_API_KEY;

function Map(props) {

  // Lat and Lon from props ...
  // Key from the .env
  // Build a URL

  // https://maps.locationiq.com/v3/staticmap?key=<YOUR_ACCESS_TOKEN>&center=<latitude>,<longitude>&zoom=<zoom>&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>


   // { this ? that : somethingElse }
  return (
    <When condition={props.latitude && props.longitude}>
      <figure>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${props.latitude},${props.longitude}&size=600x600&format=png`} alt="" />
      </figure>
    </When>
  )
}

export default Map;

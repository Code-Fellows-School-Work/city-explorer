// Map.jsx
import { If, Then, Else } from 'react-if';



function Map(props) {
  return (
    <If condition={props.latitude && props.longitude}>
      <Then>
        <figure>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.db27eb25bbc5a42a9280ae46297a8c81&center=${props.latitude},${props.longitude}&zoom=16&size=300x300&format=jpg&maptype=streets`} width="500" alt="" />
        </figure>
      </Then>
      <Else>
        <figure>
          <img src="https://placehold.it/500x400" width="500" alt=""/>
        </figure>
      </Else>
    </If>
  );
}

export default Map;

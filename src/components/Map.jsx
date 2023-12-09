// this entire component is used from John's class demo
import { When } from 'react-if';

function Map(props) {
  return (
    <When condition={props.latitude && props.longitude}>
      <figure>
        <img src={`http://localhost:5513/api/map?lat=${props.latitude}&lon=${props.longitude}`} alt="" />
      </figure>
    </When>
  );
}

export default Map;

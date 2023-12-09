// this entire component is used from John's class demo

import {useState} from 'react';

function CityForm(props) {

  const [typedInCity, setTypedInCity] = useState('');
  const [showHeading, setShowHeading] = useState(false);

  function handleChange(e) {
    setShowHeading(false);
    setTypedInCity( e.target.value );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowHeading(true);
    props.handleChangeCity(typedInCity);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="city-input"
        onChange={handleChange}
        placeholder="City"
        value={typedInCity}
      />
      <button type="submit">Search</button>
      {showHeading && props.city && <h2>Information about {props.city} Below</h2>}
    </form>
  );
}

export default CityForm;

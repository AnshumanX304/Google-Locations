import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import Navbar from './components/Navbar';
import Add from './images/Add--alt.svg';
import '@fortawesome/fontawesome-free/css/all.css';

const containerStyle = {
  width: '100%',
  height: '511px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const App = () => {
  const [locations, setLocations] = useState({
    source: '',
    destination: '',
    stops: ['']
  });

  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    calculateDistance();
  }, [locations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocations({ ...locations, [name]: value });
  };

  const handleStopChange = (index, value) => {
    const newStops = [...locations.stops];
    newStops[index] = value;
    setLocations({ ...locations, stops: newStops });
  };

  const handleAddStop = () => {
    setLocations({ ...locations, stops: [...locations.stops, ''] });
  };

  const handleCalculateRoute = () => {
    if (locations.source && locations.destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: locations.source,
          destination: locations.destination,
          waypoints: locations.stops.map(stop => ({ location: stop, stopover: true })),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  const calculateDistance = () => {
    if (locations.source && locations.destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: locations.source,
          destination: locations.destination,
          waypoints: locations.stops.map(stop => ({ location: stop, stopover: true })),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const route = result.routes[0];
            let totalDistance = 0;
            for (let i = 0; i < route.legs.length; i++) {
              totalDistance += route.legs[i].distance.value;
            }
            setDistance(totalDistance / 1000);
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  return (
    <div className='bg-[#E9EEF2] w-full h-fit pb-20'>
      <Navbar />
      <div className="hidden md:block text-center my-8 text-[20px] text-[#1B31A8]">Let's calculate distance from Google maps</div>
      <div className="flex flex-col-reverse md:flex-row justify-evenly">
        <div className='w-full md:w-[35%] h-fit px-5'>
          <div className='md:flex'>
            <div className='py-5'>
              <label className='text-sm'>Origin</label><br />
              <div className="relative">
                <i className="fa-sharp fa-solid fa-circle-dot absolute left-3 top-[18px] text-green-500"></i>
                <input
                  className='w-full md:w-[250px] pl-10 p-3 mt-1 h-[45px] mb-7 rounded-[6px] border-[1px] border-[#DCDDEC]'
                  name="source"
                  value={locations.source}
                  onChange={handleChange}
                  type="text"
                  placeholder="Source"
                />
              </div>
              <label className='text-sm'>Stop</label><br />
              {locations.stops.map((stop, index) => (
                <div className="relative" key={index}>
                  <i className="fa-sharp fa-solid fa-circle-dot absolute left-3 top-[18px] text-black"></i>
                  {/* <i class="fa-sharp fa-solid fa-circle-dot"></i> */}
                  <input
                    className='w-full pl-10 h-[45px] mt-1 rounded-[6px] p-3 border-[1px] border-[#DCDDEC]'
                    type="text"
                    value={stop}
                    onChange={(e) => handleStopChange(index, e.target.value)}
                    placeholder={`Stop ${index + 1}`}
                  /><br />
                </div>
              ))}
              <div className='flex justify-end w-full'>
                <button className='mb-7 mt-2 text-[15px] flex' onClick={handleAddStop}>
                  <div>
                    <img className='mt-[2px] mx-1' src={Add} alt="" />
                  </div>
                  <div>
                    Add Another Stop
                  </div>
                </button><br />
              </div>
              <label className='text-sm text-[15px]'>Destination</label><br />
              <div className="relative">
                <i className="fas fa-map-marker-alt absolute left-3 top-[19px] text-black"></i>
                <input
                  className='w-full pl-10 p-3 mt-1 h-[45px] mb-5 rounded-[6px] border-[1px] border-[#DCDDEC]'
                  name="destination"
                  value={locations.destination}
                  onChange={handleChange}
                  type="text"
                  placeholder="Destination"
                />
              </div>
            </div>
            <div className='flex md:justify-end justify-center items-center w-full'>
              <button className='w-[141px] h-[62px] text-[18px] rounded-[30px] bg-[#1B31A8] text-white ' onClick={handleCalculateRoute}>
                Calculate
              </button>
            </div>
          </div>
          <div className='border-[1px] border-[#DCDDEC] rounded-[6px] mt-10'>
            <div className='bg-white flex justify-between px-5 w-full py-5 rounded-md'>
              <div className='text-[18px] md:text-[20px] font-bold pt-2'>Distance</div>
              <div className='text-[22px] md:text-[30px] text-[#0079FF] font-bold'>{distance} kms</div>
            </div>
            <div className='m-5 text-left text-[12px]'>
              The distance between {locations.source} and {locations.destination} via the selected route is {distance} kms.
            </div>
          </div>
        </div>
        <div className='w-full md:w-[35%] p-5'>
          <LoadScript googleMapsApiKey="YOUR_API_KEY">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

export default App;

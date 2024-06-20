import React from 'react';
import Navbar from './components/Navbar';
import Add from './images/Add--alt.svg';

const containerStyle = {
  width: '100%',
  height: '511px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const App = () => {
  return (
    <div className='bg-[#E9EEF2] w-full h-fit pb-20'>
      <Navbar />
      <div className="hidden md:block text-center my-8 text-[20px] text-[#1B31A8]">Let's calculate distance from Google maps</div>
      <div className="flex flex-col-reverse md:flex-row justify-evenly">
        <div className='w-full md:w-[35%] h-fit px-5'>
          <div className='md:flex'>
            <div className='py-5'>
              <label className='text-sm'>Origin</label><br />
              <input
                className='w-full md:w-[250px] p-3 mt-1 h-[45px] mb-7 rounded-[6px] border-[1px] border-[#DCDDEC]'
                type="text"
                placeholder="Source"
              /><br />
              <label className='text-sm'>Stop</label><br />
              <div>
                <input
                  className='w-full h-[45px] mt-1 rounded-[6px] p-3 border-[1px] border-[#DCDDEC]'
                  type="text"
                  placeholder="Stop 1"
                /><br />
              </div>
              <div className='flex justify-end w-full'>
                <button className='mb-7 mt-2 text-[15px] flex'>
                  <div>
                    <img className='mt-[2px] mx-1' src={Add} alt="Add another stop" />
                  </div>
                  <div>
                    Add Another Stop
                  </div>
                </button><br />
              </div>
              <label className='text-sm text-[15px]'>Destination</label><br />
              <input
                className='w-full p-3 mt-1 h-[45px] mb-5 rounded-[6px] border-[1px] border-[#DCDDEC]'
                type="text"
                placeholder="Destination"
              /><br />
            </div>
            <div className='flex md:justify-end justify-center items-center w-full'>
              <button className='w-[141px] h-[62px] text-[18px] rounded-[30px] bg-[#1B31A8] text-white'>
                Calculate
              </button>
            </div>
          </div>
          <div className='border-[1px] border-[#DCDDEC] rounded-[6px] mt-10'>
            <div className='bg-white flex justify-between px-5 w-full py-5 rounded-md'>
              <div className='text-[18px] md:text-[20px] font-bold pt-2'>Distance</div>
              <div className='text-[22px] md:text-[30px] text-[#0079FF] font-bold'>0 kms</div>
            </div>
            <div className='m-5 text-left text-[12px]'>
              The distance between the source and destination via the selected route is 0 kms.
            </div>
          </div>
        </div>
        <div className='w-full md:w-[35%] p-5'>
          <div style={containerStyle}>

            <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
              Google Map
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

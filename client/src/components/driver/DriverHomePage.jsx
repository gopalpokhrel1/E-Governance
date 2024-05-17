import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ViewMap from '../map/ViewMap';


const DriverHomePage = () => {
  const email = localStorage.getItem("data");
  const [map, setMap] = useState(false);

  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
      const response= await axios.get("http://localhost:3000/bin");
      setData(response.data.data);
    }

   fetchData();
  }, [])

 const filter_bin = data.filter(item => item.driverEmail == email);

 useEffect(() => {
  if (filter_bin.length > 0) {
    const initialMarkers = data.map(item => ({
      geocode: item.location[0].geocode,
      popup: item.binNumber 
    }));
    setMarkers(initialMarkers);
  }
}, [filter_bin]);

  return (
    <div className='bg-green-200'>
         <h1>View Work</h1>
        {
          filter_bin.map((item)=>{
            return(
              <div key={item.index}>
              <div className="grid grid-cols-2 gap-4">
                      <div>
                          <p><span className="font-bold">Bin Number:</span> {item.binNumber}</p>
                          <p><span className="font-bold">Cycle Period:</span> {item.cyclePeriod}</p>
                          <p><span className="font-bold">Driver Email:</span> {item.driverEmail}</p>
                          <p><span className="font-bold">Driver Name:</span> {item.driverName}</p>
                      </div>
                      <div>
                          <p><span className="font-bold">ID:</span> {item.id}</p>
                          <p><span className="font-bold">Landmark:</span> {item.landMark}</p>
                          <p><span className="font-bold">Load Type:</span> {item.loadType}</p>
                          <p><span className="font-bold">Locality:</span> {item.locality}</p>
                          <p><span className="font-bold">Village:</span> {item.village}</p>
                          {item.status && <p><span className="font-bold">Status:</span> {item.status}</p>}

                      </div>
                   
                  </div>
              </div>
            )
          })
        }



<p onClick={()=>setMap(true)}>
        
    view work space
      </p>

      {map && <ViewMap marker={markers}/>}
    </div>
  )
}

export default DriverHomePage

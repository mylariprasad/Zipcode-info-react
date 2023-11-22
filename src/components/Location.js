import React, {useState , useEffect} from 'react'
import './Location.css'
import Spinner from '../Images/loading.gif'
function Location(props) {
    const [locationData, setLocationData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const zipCode = props.zipCode;
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (zipCode) { 
              setLoading(true);
              const response = await fetch(`https://api.zippopotam.us/in/${zipCode}`);
              if (response.ok) {
                const data = await response.json();
                setLocationData(data);
                setError(null); 
              } else {
                setLocationData(null);
                setError('Invalid Zipcode Entered');
            }
            
          } 
        }
          catch (error) {
            setError('Error fetching data');
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [zipCode]);
  return (
    <div>
       <h2>Location Information</h2>
      {loading && <img src={Spinner} alt="Wait..." />}
      {error && <p style={{ color: 'red', fontSize: '3rem'}}>{error}</p>}
      {locationData && locationData.places && locationData.places.length > 0 && (
      <div className="card-container">
        <div className="card">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1280px-World_Map_%28political%29.svg.png" alt="Country" />
          <h1>Country:</h1>
          <span className="attribute"> {locationData.country}</span>
        </div>
        <div className="card">
          <img src="https://a2zaboutindia.files.wordpress.com/2015/09/wpid-union-territories-of-india.jpg" alt="State" />
          <h1>State:</h1>
          <span className="attribute"> {locationData.places[0].state}</span>
        </div>
        <div className="card">
          <img src="https://www.dnpindia.in/wp-content/uploads/2021/01/63-Best-Tourist-Places-To-Visit-In-India-For-A-Perfect-Holiday-In-2020.jpg" alt="Place" />
          <h1>Place Name:</h1>
          <span className="attribute"> {locationData.places[0]['place name']}</span>
        </div>
      </div>
      )}
    </div>
  )
}

export default Location

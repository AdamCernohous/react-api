import axios from 'axios';
import { useEffect, useState } from 'react';
import './main.css';

function App() {
  const [carBrands, setCarBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5265/api/CarBrands`)
      .then(res => res.json())
      .then(data => setCarBrands(data));
    
    setIsLoading(false);
  });

  if(isLoading){
    return <h1>Loading...</h1>
  }

  return (
    <div className="max-w-[50vw] ml-auto mr-auto">
      <h1>GET</h1>
      <div>
        {carBrands.map(brand => {
          return (
            <div key={brand.id}>
              <h2>{brand.name}</h2>
              <p>{brand.id}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;

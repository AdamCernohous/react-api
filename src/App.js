import axios from 'axios';
import { useEffect, useState } from 'react';
import CarBrand from './CarBrand';
import './main.css';

function App() {
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newCarBrandName, setNewCarBrandName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5265/api/CarBrands`)
      .then(response => setCarBrands(response.data));
    
    setIsLoading(false);

    axios.get(`http://localhost:5265/api/CarModels`)
      .then(response => setCarModels(response.data));
  }, []);

  const addCarBrand = async () => {
    axios.post(`http://localhost:5265/api/CarBrands`, {
      name: newCarBrandName
    });
    axios.get(`http://localhost:5265/api/CarBrands`)
      .then(response => setCarBrands(response.data));
  }

  if(isLoading){
    return <h1>Loading...</h1>
  }

  return (
    <div className='flex flex-row w-screen h-screen bg-gray-900'>
      <h1>Car brands and models API</h1>
      <section>
        <h2>GET</h2>
        <div>
          {carBrands.map(brand => {
            return (
              <CarBrand
                key={brand.carBrandId}
                id={brand.carBrandId}
                name={brand.name}
              />
            )
          })}
        </div>
      </section>
      <section>
        <h2>POST</h2>
        <div>
          <input
            type='text'
            required={true}
            onChange={e => setNewCarBrandName(e.target.value)}
          />
          <button onClick={addCarBrand}>Add</button>
        </div>
      </section>
      <section>
        <h2>GET</h2>
        <div>
          {carModels.map(model => {
            return (
              <CarBrand
                key={model.carModelId}
                id={model.carModelId}
                name={model.name}
              />
            )
          })}
        </div>
      </section>
    </div>
  );
}

export default App;

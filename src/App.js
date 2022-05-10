import axios from 'axios';
import { useEffect, useState } from 'react';
import CarBrand from './CarBrand';
import './main.css';

function App() {
  const [carBrands, setCarBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newCarBrandName, setNewCarBrandName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5265/api/CarBrands`)
      .then(response => setCarBrands(response.data));
    
    setIsLoading(false);
  }, []);

  const addCarBrand = async () => {
    axios.post(`http://localhost:5265/api/CarBrands`, {
      name: newCarBrandName
    });
  }

  // const putCarBrand = async (id) => {
  //   axios.put(`http://localhost:5265/api/CarBrands/${id}`, {
  //     carBrandId: id,
  //     name: updatedCarBrandName
  //   });
  // }

  // const deleteCarBrand = async (id) => {
  //   axios.delete(`http://localhost:5265/api/CarBrands/${id}`);
  // }

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

      </section>
    </div>
  );
}

export default App;

import axios from 'axios';
import { useEffect, useState } from 'react';
import CarBrand from './CarBrand';
import CarModel from './CarModel';
import './main.css';

function App() {
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newCarBrandName, setNewCarBrandName] = useState('');

  const [newModelName, setNewModelName] = useState('');
  const [newModelSerie, setNewModelSerie] = useState('');
  const [newModelBasePrice, setNewModelBasePrice] = useState(0);
  const [newModelBrandId, setNewModelBrandId] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5265/api/CarBrands`)
      .then(response => setCarBrands(response.data));

    axios.get(`http://localhost:5265/api/CarModels`)
      .then(response => setCarModels(response.data));
    
    setIsLoading(false);
  }, []);

  const addCarBrand = async () => {
    axios.post(`http://localhost:5265/api/CarBrands`, {
      name: newCarBrandName
    });
  }

  const addCarModel = async () => {
    axios.post(`http://localhost:5265/api/CarModels`, {
      modelName: newModelName,
      series: newModelSerie,
      basePrice: newModelBasePrice,
      carBrandId: newModelBrandId
    });
    console.log(newModelBrandId);
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
              <CarModel
                key={model.carModelId}
                id={model.carModelId}
                name={model.modelName}
                series={model.series}
                basePrice={model.basePrice}
                carBrandId={model.carBrandId}
              />
            )
          })}
        </div>
      </section>
      <section>
        <h2>POST</h2>
        <div>
          <label>Model Name</label>
          <input
            type='text'
            required={true}
            onChange={e => setNewModelName(e.target.value)}
          />
          <label>Model Serie</label>
          <input
            type='text'
            required={true}
            onChange={e => setNewModelSerie(e.target.value)}
          />
          <label>Model BasePrice</label>
          <input
            type='number'
            required={true}
            onChange={e => setNewModelBasePrice(e.target.value)}
          />
          <label>Brand</label>
          <select onChange={e => setNewModelBrandId(e.target.value)}>
            {
              carBrands.map(brand => {
                return (
                <option key={brand.carBrandId} value={brand.carBrandId}>{brand.name}</option>
                )
              })
            }
          </select>
          <button onClick={addCarModel}>Add</button>
        </div>
      </section>
    </div>
  );
}

export default App;

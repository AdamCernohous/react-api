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
  const [newModelYear, setNewModelYear] = useState(0);
  const [newModelBasePrice, setNewModelBasePrice] = useState(0);
  const [newModelBrandId, setNewModelBrandId] = useState(0);

  const [filtered, setFiltered] = useState('');

  useEffect(() => {
    GetCarBrands();
    GetCarModels();
    
    setIsLoading(false);
  }, [filtered]);

  const GetCarBrands = () => {
    axios.get(`http://localhost:5265/api/CarBrands?param=${filtered}`)
      .then(response => setCarBrands(response.data));
  }

  const GetCarModels = () => {
    axios.get(`http://localhost:5265/api/CarModels`)
      .then(response => setCarModels(response.data));
  }

  const postCarBrand = async () => {
    axios.post(`http://localhost:5265/api/CarBrands`, {
      name: newCarBrandName
    });
    GetCarBrands();
  }

  const postCarModel = async () => {
    axios.post(`http://localhost:5265/api/CarModels`, {
      modelName: newModelName,
      year: newModelYear,
      basePrice: newModelBasePrice,
      carBrandId: newModelBrandId
    });
    GetCarModels();
  }

  if(isLoading){
    return <h1>Loading...</h1>
  }

  return (
    <div className='w-[85vw] ml-auto mr-auto overflow-hidden'>
      <h1 className='text-center font-black text-6xl p-8 pl-52 pr-52 mb-10'>Car brands and models API</h1>
      <div className='flex flex-row justify-around'>
        <div className='relative '>
          <div className='relative'>
            <label className='absolute p-1 pb-0 pt-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Search</label>
            <input
              className='border-2 border-gray-500 rounded-xl p-1 pl-6 w-[100%]'
              type='text'
              onChange={e => setFiltered(e.target.value)}
            />
          </div>
          {carBrands.map(brand => {
            return (
              <div>
                <CarBrand
                  id={brand.carBrandId}
                  name={brand.name}
                  GetBrands={GetCarBrands}
                />
                {carModels.map(model => {
                  if(model.carBrandId === brand.carBrandId){
                    return (
                      <CarModel
                        id={model.carModelId}
                        name={model.modelName}
                        year={model.year}
                        basePrice={model.basePrice}
                        carBrandId={model.carBrandId}
                        GetModels={GetCarModels}
                      />
                    )
                  }
                })}
              </div>
            )
          })}
        </div>
        <div className='flex flex-col w-96'>
          <div className='flex flex-col'>
            <h2 className='text-4xl font-bold mb-4'>Add car brand.</h2>
            <div className='relative mt-4 mb-4'>
              <label className='absolute p-1 pb-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Name</label>
              <input
                className='border-2 border-gray-500 rounded-xl p-1 pl-6 w-[100%]'
                type='text'
                onChange={e => setNewCarBrandName(e.target.value)}
              />
              <div className='relative ml-auto mr-auto'>
                <button className='mt-4 mb-8 p-2 border-2 w-[100%] border-solid border-[#45D645] text-[#45D645] rounded-3xl transition-all hover:bg-[#45D645] hover:text-white' onClick={() => postCarBrand()}>Add</button>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-4xl font-bold mb-8'>Add car model.</h2>
            <div className='grid grid-cols-2 grid-rows-2 gap-2'>
              <div className='relative'>
                <label className='absolute p-1 pb-0 pt-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Name</label>
                <input
                  className='border-2 border-gray-500 rounded-xl p-1 pl-6 w-[100%]'
                  type='text'
                  onChange={e => setNewModelName(e.target.value)}
                />
              </div>
              <div className='relative'>
                <label className='absolute p-1 pb-0 pt-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Year</label>
                <input
                  className='border-2 border-gray-500 rounded-xl p-1 pl-6 w-[100%]'
                  type='number'
                  onChange={e => setNewModelYear(e.target.value)}
                />
              </div>
              <div className='relative mt-2'>
                <label className='absolute p-1 pb-0 pt-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Base price</label>
                <input
                  className='border-2 border-gray-500 rounded-xl p-1 pl-6 w-[100%]'
                  type='number'
                  onChange={e => setNewModelBasePrice(e.target.value)}
                />
              </div>
              <div className='relative mt-2'>
                <label className='absolute p-1 pb-0 pt-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Brand ID</label>
                <select className='w-[100%] h-[100%] border-2 border-gray-500 rounded-xl pl-2' onChange={e => setNewModelBrandId(e.target.value)}>
                  <option value="">Select brand</option>
                  {carBrands.map(brand => {
                    return <option value={brand.carBrandId}>{brand.name}</option>
                  })}
                </select>
              </div>
            </div>
            <div className='relative ml-auto mr-auto'>
              <button className='mt-4 mb-4 p-2 border-2 w-[100%] border-solid border-[#45D645] text-[#45D645] rounded-3xl transition-all hover:bg-[#45D645] hover:text-white' onClick={() => postCarModel()}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
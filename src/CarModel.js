import { useState } from 'react';
import axios from 'axios';
import './main.css';

const CarModel = ({ id, name, year, basePrice, carBrandId }) => {
	const [updatedCarModelName, setUpdatedCarModelName] = useState('');
	const [updatedCarModelYear, setUpdatedCarModelYear] = useState(0);
	const [updatedCarModelBasePrice, setUpdatedCarModelBasePrice] = useState(0);
	const [updatedCarModelBrandId, setUpdatedCarModelBrandId] = useState(0);

	const putCarModel = async (id) => {
		axios.put(`http://localhost:5265/api/CarModels/${id}`, {
			carModelId: id,
			modelName: updatedCarModelName,
			year: updatedCarModelYear,
			basePrice: updatedCarModelBasePrice,
			carBrandId: updatedCarModelBrandId
		});
	}

	const deleteCarModel = async (id) => {
		axios.delete(`http://localhost:5265/api/CarModels/${id}`);
	}

	return (
		<div key={id} className='border-2 border-solid border-gray-500 rounded-2xl mt-2 w-[25vw] group'>
			<div className='flex flex-row justify-between items-center p-2 pl-4 pr-4 w-[100%]'>
				<div className='text-[1.5rem] font-bold'>{name}</div>
				<div className='flex flex-col items-start'>
					<p className='text-gray-500 text-sm'>ID:</p>
					<p>Year:</p>
				</div>
				<div className='flex flex-col items-end'>
					<p className='text-gray-500 text-sm'>{id}</p>
					<p>{year}</p>
				</div>
				<div className='flex flex-col items-start'>
					<p className='text-gray-500 text-sm'>Brand ID:</p>
					<p>Base price:</p>
				</div>
				<div className='flex flex-col items-end'>
					<p className='text-gray-500 text-sm'>{carBrandId}</p>
					<p>{basePrice}€</p>
				</div>
			</div>
			<div className='grid grid-cols-2 grid-rows-3 gap-4 pl-4 pr-8 h-0 overflow-hidden group-hover:h-[12rem] transition-all duration-500' /*group-hover:h-min*/>
				<div className='relative ml-auto mr-auto mt-4'>
					<label className='absolute p-1 pb-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Name</label>
					<input
						className='border-2 border-gray-500 rounded-xl p-1 pl-6'
						type='text'
						onChange={e => setUpdatedCarModelName(e.target.value)}
					/>
				</div>
				<div className='relative ml-auto mr-auto mt-4'>
					<label className='absolute p-1 pb-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Year</label>
					<input
						className='border-2 border-gray-500 rounded-xl p-1 pl-6'
						type='number'
						onChange={e => setUpdatedCarModelYear(e.target.value)}
					/>
				</div>
				<div className='relative ml-auto mr-auto'>
					<label className='absolute p-1 pb-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Base price</label>
					<input
						className='border-2 border-gray-500 rounded-xl p-1 pl-6'
						type='number'
						onChange={e => setUpdatedCarModelBasePrice(e.target.value)}
					/>
				</div>
				<div className='relative ml-auto mr-auto'>
					<label className='absolute p-1 pb-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Brand ID</label>
					<input
						className='border-2 border-gray-500 rounded-xl p-1 pl-6'
						type='number'
						onChange={e => setUpdatedCarModelBrandId(e.target.value)}
					/>
				</div>
				<div className='relative ml-auto mr-auto'>
					<button className='p-2 pl-12 pr-12 border-2 border-solid border-[#FFBF1A] text-[#FFBF1A] rounded-3xl transition-all hover:bg-[#FFBF1A] hover:text-white mb-4' onClick={() => putCarModel(id)}>Update</button>
				</div>
				<div className='relative ml-auto mr-auto'>
					<button className='p-2 pl-12 pr-12 border-2 border-solid border-[#FF2A24] text-[#FF2A24] rounded-3xl transition-all hover:bg-[#FF2A24] hover:text-white mb-4' onClick={() => deleteCarModel(id)}>Delete</button>
				</div>
			</div>
		</div>
	);
}

export default CarModel;
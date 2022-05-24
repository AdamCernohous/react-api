import { useState } from "react";
import axios from 'axios';
import './main.css';

const CarBrand = ({ id, name }) => {
	const [updatedCarBrandName, setUpdatedCarBrandName] = useState('');

	const putCarBrand = async (id) => {
		axios.put(`http://localhost:5265/api/CarBrands/${id}`, {
			carBrandId: id,
			name: updatedCarBrandName
		});
	}

	const deleteCarBrand = async (id) => {
		axios.delete(`http://localhost:5265/api/CarBrands/${id}`);
	}

	return (
		<div key={id} className='flex flex-row mt-8 mb-4 group w-max'>
			<div className='relative'>
				<p className='absolute right-4 top-[-8px] text-xs text-gray-500'>{id}</p>
				{/* <p className='absolute rotate-90 right-[-10px] bottom-[14px] text-xs text-gray-500'>{id}</p> */}
				<h2 className='text-4xl font-bold mr-4'>{name}</h2>
			</div>
			<div className='flex felx-row items-center justify-center w-0 overflow-hidden group-hover:w-96 transition-all duration-300'>
				<div className='relative'>
					<label className='absolute p-1 pb-0 text-xs text-gray-500 left-3 top-[-10px] bg-white'>Name</label>
					<input
						className='border-2 border-gray-500 rounded-xl p-1 pl-6'
						type='text'
						required={true}
						onChange={e => setUpdatedCarBrandName(e.target.value)}
					/>
				</div>
				<button className='ml-4 text-sm p-1 pl-2 pr-2 border-2 border-solid border-[#FFBF1A] text-[#FFBF1A] rounded-3xl transition-all hover:bg-[#FFBF1A] hover:text-white' onClick={() => putCarBrand(id)}>Update</button>
				<button className='ml-4 text-sm p-1 pl-2 pr-2 border-2 border-solid border-[#FF2A24] text-[#FF2A24] rounded-3xl transition-all hover:bg-[#FF2A24] hover:text-white' onClick={() => deleteCarBrand(id)}>Delete</button>
			</div>
		</div>
	);
}

export default CarBrand;
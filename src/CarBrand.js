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
        <div key={id}>
            <div>
                  <h2>{name}</h2>
                  <p>{id}</p>
            </div>
            <div>
                <input
                    type='text'
                    required={true}
                    onChange={e => setUpdatedCarBrandName(e.target.value)}
                />
                <button onClick={() => putCarBrand(id)}>Save</button>
                <button onClick={() => deleteCarBrand(id)}>Delete</button>
            </div>
        </div>
    );
}
 
export default CarBrand;
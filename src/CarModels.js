import { useState } from "react";
import axios from 'axios';
import './main.css';

const CarModel= ({ id, name }) => {
    const [updatedCarModelName, setUpdatedCarModelName] = useState('');

    const putCarModel = async (id) => {
        axios.put(`http://localhost:5265/api/CarModels/${id}`, {
            carModelId: id,
            name: updatedCarModelName
        });
    }
    
    const deleteCarModel = async (id) => {
        axios.delete(`http://localhost:5265/api/CarModels/${id}`);
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
                    onChange={e => setUpdatedCarModelName(e.target.value)}
                />
                <button onClick={() => putCarModel(id)}>Save</button>
                <button onClick={() => deleteCarModel(id)}>Delete</button>
            </div>
        </div>
    );
}
 
export default CarBrand;
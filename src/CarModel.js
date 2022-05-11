import axios from 'axios';
import './main.css';

const CarModel = ({ id, name }) => {
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
                <button onClick={() => deleteCarModel(id)}>Delete</button>
            </div>
        </div>
    );
}
 
export default CarModel;
import { useState, useEffect } from 'react';
import * as sneakerService from '../../services/sneakerService';
import { useParams } from 'react-router-dom'
import styles from './SneakerForm.module.css'


const SneakerForm = (props) => {
    const [formData, setFormData] = useState({ // creates a form to input sneakre details like name, desc, brand, etc. 
      name: '',
      description: '',
      brand: 'Nike',
    });

    const { sneakerId } = useParams();

    useEffect(()=> {
      const fetchSneaker = async () => {
        const sneakerData = await sneakerService.show(sneakerId); // calling a function named show from sneakerService, fetches SNkR data based on sneakeriD
        setFormData(sneakerData); // updtaes the formdata with the acquired sneakerData
      }
      if (sneakerId) fetchSneaker();
    }, [sneakerId]);

  
    const handleSubmit = (event) => {
      event.preventDefault(); // prevents the page to reload
      if (sneakerId) {
        props.handleUpdateSneaker(sneakerId, formData); // used to update existing SNKR is sneakerId exists
      } else {
        props.handleAddSneaker(formData); // if no sneakerId exists then handleAddSneaker will be called 
      }
    };

    const handleChange = (event) => { 
      setFormData({ ...formData, [event.target.name]: event.target.value }); // uses spread operator to create new object based on formData
    };
    
    return (
<main className={styles.container}>
        <form onSubmit={handleSubmit}> 
        <h1>{sneakerId ? 'Edit Sneaker' : 'New Sneaker'}</h1> 
          <label htmlFor="name-input">Name</label> 
          <input
            required 
            type="text" // the type of inup will be plain text
            name="name" // assigns a name 
            id="name-input" 
            value={formData.name} 
            onChange={handleChange}
          />
          <label htmlFor="description-input">Description</label>
          <textarea
            required
            type="description"
            name="description"
            id="description-input"
            value={formData.description}
            onChange={handleChange}
          />
          <label htmlFor="brand-input">Brand</label>
          <select
            required
            name="brand"
            id="brand-input"
            value={formData.brand}
            onChange={handleChange}
          >
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Jordan">Jordan</option>
            <option value="NewBalance">NewBalance</option>
          </select>
          <button type="submit">SUBMIT</button>
        </form>
      </main>
    );
  };
  
  export default SneakerForm;
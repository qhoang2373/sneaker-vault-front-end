import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'; 
import styles from './SigninForm.module.css';


const SigninForm = (props) => {
  const navigate = useNavigate(); 
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (event) => {
    updateMessage('');
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await authService.signin(formData); 

      props.setUser(user);
      navigate('/');
    } catch (error) {
      updateMessage(error.message);
    }
  };

  return (
    <main className={styles.container}>
      <section>
      <form autoComplete="off" onSubmit={handleSubmit}>
      <h1>Log In</h1>
      <p>{message}</p>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Log In</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
      </section>
    </main>
  );
};

export default SigninForm;
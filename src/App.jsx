import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from './services/authService';
import * as sneakerService from './services/sneakerService';

import SneakerList from './components/SneakerList/SneakerList';
import SneakerDetails from './components/SneakerDetails/SneakerDetails';
import SneakerForm from './components/SneakerForm/SneakerForm';


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [sneakers, setSneakers] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchAllSneakers = async () => {
      const sneakersData = await sneakerService.index();
      setSneakers(sneakersData);
    };
    if (user) fetchAllSneakers();
  }, [user]);


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddSneaker = async (sneakerFormData) => {
    const newSneaker = await sneakerService.create(sneakerFormData);
    setSneakers([newSneaker, ...sneakers]);
    navigate('/sneakers');
  };

  const handleDeleteSneaker = async (sneakerId) => {
    const deletedSneaker = await sneakerService.deleteSneaker(sneakerId);
    setSneakers(sneakers.filter((sneaker) => sneaker._id !== deletedSneaker._id));
    navigate('/sneakers');
  };

const handleUpdateSneaker = async (sneakerId, sneakerFormData) => { // waiting for other operations to complete 
  const updatedSneaker = await sneakerService.update(sneakerId, sneakerFormData); // sneakerId, this is the SNKR being updated 
  setSneakers(sneakers.map((sneaker) => (sneakerId === sneaker._id ? updatedSneaker : sneaker))); // iterates over sneakers array and checks if Id is currently matching 
  navigate(`/sneakers/${sneakerId}`);
};


  return (
    <>
    <AuthedUserContext.Provider value={user}>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        { user ? (
          <>
          <Route path="/" element={<Dashboard  user={user}/>} />
          <Route path="/sneakers" element={<SneakerList sneakers={sneakers}/>} />
          <Route path="/sneakers/:sneakerId" element={<SneakerDetails handleDeleteSneaker={handleDeleteSneaker} />} />
          <Route path="/sneakers/new" element={<SneakerForm handleAddSneaker={handleAddSneaker} />} />
          <Route path="/sneakers/:sneakerId/edit" element={<SneakerForm handleUpdateSneaker={handleUpdateSneaker}/>} />
          </>
        ) : (
          <Route path='/' element={<Landing />}/>
        )}
        <Route path='/signup' element={<SignupForm setUser={setUser}/>} />
        <Route path='/signin' element={<SigninForm setUser={setUser}/>} />
      </Routes>
    </AuthedUserContext.Provider>
  </>
  )
}

export default App
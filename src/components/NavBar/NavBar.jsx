import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ user, handleSignout }) => {
  return (
    <>
      { user ? (
        <nav className={styles.container}>
        {/* <Link to='/'><img src={Logo} alt="A cute owl" /></Link> */} 
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to='/sneakers'>Sneakers</Link></li>
            <li><Link to="/sneakers/new">New Sneaker</Link></li>
            <li><Link to='' onClick={handleSignout}>Sign Out</Link></li>
          </ul>
        </nav>
      ) : (
        <nav className={styles.container}>
        {/* <Link to='/'><img src={Logo} alt="A cute owl" /></Link> */}
          <ul>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            
          </ul>
        </nav>
      )}
    </>
  )
}
  
export default NavBar;
import { Link } from 'react-router-dom';
import styles from './SneakerList.module.css'; 


const SneakerList = (props) => {
    return (
      <main className={styles.container}>
         {props.sneakers.map((sneaker) => {
            return (
            <Link key={sneaker._id} to={`/sneakers/${sneaker._id}`}> 
              <article>
                <header>
                  <h2>{sneaker.name}</h2>
                  <p>
                    {sneaker.username} 
                    posted on:  {new Date(sneaker.createdAt).toLocaleDateString()} 
                  </p>
                </header>
                <p>{sneaker.description}</p>
              </article>
            </Link>
            )
        })}
    </main>
  )
};
  
export default SneakerList;


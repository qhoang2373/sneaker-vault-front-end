import styles from './Landing.module.css';

const Landing = () => {
    return (
      <main className={styles.container}>
        <img src="https://i.postimg.cc/fLPWRcVd/logo-1.png" alt="logo"/>
        <h3>
            This is the Sneaker Vault, an app where you can view and manage your entire sneaker collection.
        </h3>
      </main>
    );
  };
  
  export default Landing;

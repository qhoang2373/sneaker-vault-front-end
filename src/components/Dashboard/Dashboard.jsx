import styles from './DashBoard.module.css'; 


const Dashboard = ({ user }) => {
    return (
      <main className={styles.container}>
        <h1>Welcome, {user.username}</h1>
        <p>
          Made for Sneaker Enthusiasts!
        </p>
      </main>
    );
  };
  
  export default Dashboard;
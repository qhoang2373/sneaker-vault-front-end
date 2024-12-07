const Dashboard = ({ user }) => {
    return (
      <main>
        <h1>Welcome, {user.username}</h1>
        <p>
          Made for Sneaker Enthusiasts!
        </p>
      </main>
    );
  };
  
  export default Dashboard;
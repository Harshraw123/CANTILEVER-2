import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import AuthPage from '../../pages/AuthPage'
import Hero from './Hero';
import Navbar from './Navbar';

const Home = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If user is not authenticated, show the login/signup form
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // If user is authenticated, show the welcome message
  return (
    <div className="min-h-screen ">
<Navbar/>
  <Hero/>
    </div>
  );
}

export default Home

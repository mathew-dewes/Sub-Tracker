import React, { useEffect, useState } from 'react';
import MyContext from './MyContext';
import { useNavigate } from 'react-router';
import axios from 'axios';


const MyProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const serverUrl = 'https://sub-tracker-backend.onrender.com';
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);



const signIn = async (data) => {
  try {
    const response = await axios.post(serverUrl + '/api/v1/auth/sign-in', data);

    const token = response.data.data.token;
    localStorage.setItem('token', token);
    setToken(token);
    setIsLoggedIn(true);
    await fetchSubscriptions(token);

    navigate('/subscriptions/add');

  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message); // <- shows "User not found" or "Invalid password"
    } else {
      alert("Something went wrong. Please try again.");
    }
  }
};
  const signUp = async (data) => {
    try {
      const response = await axios.post(serverUrl + '/api/v1/auth/sign-up', data);

      if (response.data.success) {
        console.log(response.data);
        const token = response.data.data.token;
        localStorage.setItem('token', token);
        setToken(token);
        await fetchSubscriptions(token);


        navigate('/subscriptions/add');


      }
    } catch (error) {
      alert(error.response.data.message);

    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');

  }


  const addSubscription = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(serverUrl + '/api/v1/subscriptions', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const newSub = response.data.data;
        console.log('New subscription has been added.', newSub);
        setSubscriptions(prev => [...prev, newSub]);

      }
    } catch (error) {
      console.log(error);

    }
  }

  const deleteSubscription = async (subscriptionId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(serverUrl + '/api/v1/subscriptions/' + subscriptionId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSubscriptions(prev => prev.filter(sub => sub._id !== subscriptionId));
    } catch (error) {
      console.log(error);

    }
  }

  const fetchSubscriptions = async (passedToken) => {
    const tokenToUse = passedToken || localStorage.getItem('token');
    if (!tokenToUse) {
      setLoading(false);
      console.log('Token is not stored, Please login');
      return [];
    }

    try {
      const decoded = JSON.parse(atob(tokenToUse.split('.')[1]));
      const userId = decoded.userId;

      const res = await axios.get(`${serverUrl}/api/v1/subscriptions/user/${userId}`, {
        headers: { Authorization: `Bearer ${tokenToUse}` }
      });

      if (res.data.success) {
        setSubscriptions(res.data.data);
        return res.data.data; // return directly!
      }
    } catch (err) {
      console.error("Token decode failed:", err);
    } finally {
      setLoading(false);
    }

    return [];
  };


  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchSubscriptions();
    }

  }, [token])

  return (
    <MyContext.Provider value={{ signIn, signUp, logout, isLoggedIn, addSubscription, fetchSubscriptions, subscriptions, loading, deleteSubscription }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
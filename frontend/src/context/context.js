import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Jwt from "../authentication/jwt";

const StateContext = createContext();
const api_uri = 'https://mindscribe-70op.onrender.com';
// const api_uri = 'http://127.0.0.1:8000';

const ContextProvider = ({ children }) => {
  const [journals, setJournals] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));
  
  const addEntry = async(title, user) => {
    const body = JSON.stringify({ title, user });
      try {
        const response = await axios.post(`${api_uri}/journalstore/journals/`, {title: title, user: user});
        console.log('adding entry ', response)
        return response.data; 
      } catch (err) {
        console.log(err)
        throw err;
      }
  };

  
  const fetchJournals = async () => {
    
    if (user && user.access) {
      console.log('hello ', user.access)
      const headers = {
        Authorization: `JWT ${user?.access}`,
       
      };
  
      try {
        
        const response = await axios.get(`${api_uri}/journalstore/user-entries/`, {
          headers,
        });
        console.log('journals ', response.data)
        setJournals(response?.data); 
        return response.data; 
      } catch (err) {
        throw err;
      }
    }
  };

  useEffect(()=>{
    fetchJournals()
   
  }, [])


  /* AUTHENTICATION */

   // Add a function to check if the user is authenticated
   const checkAuthenticated = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.access) {
      setUser(userData);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const verify = async(uid, token) =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
       const response = await axios.post(`${api_uri}/auth/users/activation/`, body, config);
       return response;
    } catch (err) {
       throw err
    }
};

  const login = async (email, password) => {
    try {
      // Make an API request to login using Djoser
      const response = await axios.post(`${api_uri}/auth/jwt/create/`, {
        email,
        password,
      });

     return response;
      // Handle the response as needed
      // You might want to store the JWT token in local storage or state.
    } catch (error) {
      throw error
    }
  };

  const logout = () => {
    // Remove the user from local storage
    localStorage.removeItem('userData');
    setUser(null);
  };

  const register = async (email,  password, re_password, first_name, last_name) => {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };
  const body = JSON.stringify({ first_name, last_name, email, password, re_password});
    try {
      // Make an API request to register a new user using Djoser
      const response = await axios.post(`${api_uri}/auth/users/`, body, config);
      return response;
      // Handle the response as needed
    } catch (error) {
      throw error
    }
  };

  
  const reset_password = async (email) => {
    console.log('email', email);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });
    try {
      // Make an API request to reset the password using Djoser
      const response = await axios.post(`${api_uri}/auth/users/reset_password/`, body, config); 
      return response;
      // Handle the response as needed
      // You might want to set some state or display a message to the user.
    } catch (error) {
      console.log('error context ', error);
      throw error;
    }
};


  const reset_password_confirm = async(uid, token, new_password, re_new_password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
  
    try {
      // Make the password reset request
     const response =  await axios.post(`${api_uri}/auth/users/reset_password_confirm/`, body, config);
     console.log('context ', response)
     return response;

      // Optionally, you can redirect the user to a login page or display a success message.
    } catch (error) {
      // Handle errors, e.g., dispatch an error action or show an error message
      throw error
    }
  };
  

  return (
    <StateContext.Provider
      value={{
        journals,
        setJournals,
        addEntry,
        verify,
        login,
        register,
        reset_password,
        reset_password_confirm,
        user,
        setUser,
        logout,
        fetchJournals,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};

export default ContextProvider;

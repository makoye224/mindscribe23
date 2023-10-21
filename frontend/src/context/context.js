import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StateContext = createContext();
const api_uri = 'https://mindscribe-70op.onrender.com';

const ContextProvider = ({ children }) => {
  const [journals, setJournals] = useState([]);
  const [ authenticated, setAuthenticated] = useState(false)

  const addEntry = (payload) => {
    setJournals((prevJournals) => [...prevJournals, payload]);
  };

  const verify = async (uid, token) => {
    try {
      // Make an API request to verify the account using Djoser
      const response = await axios.post(`${api_uri}/auth/users/activate/`, {
        uid,
        token,
      });
      // Handle the response as needed
      // You might want to set some state or display a message to the user.
    } catch (error) {
      // Handle errors
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

  const register = async (email,  password, re_password, first_name, last_name) => {
    try {
      // Make an API request to register a new user using Djoser
      const response = await axios.post(`${api_uri}/auth/users/`, {
        email: email,
        password: password,
        re_password: re_password,
        first_name: first_name,
        last_name: last_name,
      });
      return response;
      // Handle the response as needed
    } catch (error) {
      throw error
    }
  };

  const activate = async (uid, token) => {
    try {
      // Make an API request to activate an account using Djoser
      const response = await axios.post(`${api_uri}/auth/users/activate/`, {
        uid,
        token,
      });
      // Handle the response as needed
      // You might want to set some state or display a message to the user.
    } catch (error) {
      // Handle errors
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
     console.log( response)
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
        activate,
        reset_password,
        authenticated,
        setAuthenticated,
        reset_password_confirm,
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

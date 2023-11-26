import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StateContext = createContext();
const api_uri = 'https://mindscribe23.vercel.app';
// const api_uri = "http://127.0.0.1:8000";

const ContextProvider = ({ children }) => {
  const [journals, setJournals] = useState([]);
  const [labels, setLabels] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [currentUser, setCurrentUser] = useState(null);

  const addEntry = async (title, thisUser) => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
      };
      try {
        const response = await axios.post(
          `${api_uri}/journalstore/journals/`,
          { title: title, user: thisUser },
          { headers }
        );
       
        return response.data;
      } catch (err) {
        
        throw err;
      }
    }
  };

  const deleteEntry = async (id) => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
      };
      try {
        const response = await axios.delete(
          `${api_uri}/journalstore/journals/${id}/`,
          { headers }
        );
        
        return response.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };

  const updateEntry = async (id, entry, payload) => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
      };
      const body = {
        title: payload?.title || entry.title,
        contents: payload?.contents || entry.contents,
        is_bookmarked: payload?.is_bookmarked || entry.is_bookmarked,
        updated_date: payload?.updated_date || entry.updated_date,
        is_favorite: payload?.is_favorite || entry.is_favorite,
        journal_style: payload?.journal_style || entry.journal_style,
      };

      try {
        const response = await axios.patch(
          `${api_uri}/journalstore/journals/${id}/`,
          body,
          { headers }
        );
        return response.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };

  const fetchJournals = async () => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
      };

      try {
        const response = await axios.get(
          `${api_uri}/journalstore/user-entries/`,
          {
            headers,
          }
        );
        setJournals(response?.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    }
  };

  const fetchSearchedJournals = async (searchValue) => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
      };
      try {
        const response = await axios.get(
          `${api_uri}/journalstore/search-entries/?q=${searchValue}`,
          {
            headers,
          }
        );

        setJournals(response?.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    }
  };

  const fetchFavorites = ()=>{
    const favorites = journals.filter((journal)=>journal.is_favorite)
    setJournals(favorites)
  }
  const fetchBookmarked = ()=>{
    const bookmarked = journals.filter((journal)=>journal.is_bookmarked)
    console.log(bookmarked)
    setJournals(bookmarked)
  }
  const fetchLabelEntries = (label)=>{
    const journalsInLabel = label.journals
   const labelJournals = journals.filter((journal)=>journalsInLabel.includes(journal.id))
   setJournals(labelJournals)
  }

  /* LABELS */
  const createLabel = async (title) => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
      };
      const id = getUser().id;
      const body = {
        user: id,
        name: title,
      };
      try {
        const response = await axios.post(
          `${api_uri}/journalstore/labels/`,
          body,
          { headers }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    }
  };

  const deleteLabel = async (id) => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
      };
      try {
        const response = await axios.delete(
          `${api_uri}/journalstore/labels/${id}/`,
          { headers }
        );
      
        return response;
      } catch (err) {
     
        throw err;
      }
    }
  };

  const editLabel = async (id, name) => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
      };
      const body = {
        name: name,
      }
      try {
        const response = await axios.patch(
          `${api_uri}/journalstore/labels/${id}/`, body,
          { headers }
        );
       
        return response;
      } catch (err) {
       
        throw err;
      }
    }
  };

  const fetchLabels = async () => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
      };

      try {
        const response = await axios.get(
          `${api_uri}/journalstore/user-labels/`,
          {
            headers,
          }
        );
        setLabels(response.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    }
  };

  const addEntryToLabel = async (labelId, prevJournals, journalId) => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
        "Content-Type": "application/json",
      };

      try {
        const currentJournals = prevJournals || [];

        // Check if the journalId already exists in the currentJournals array
        if (!currentJournals.includes(journalId)) {
          // Create the updated payload by combining the existing and new journals
          const labelUpdatePayload = {
            journals: [...currentJournals, journalId],
          };

          // Update the label with the new payload
          const response = await axios.patch(
            `${api_uri}/journalstore/labels/${labelId}/`,
            labelUpdatePayload,
            { headers }
          );

         
        } else {
          console.error("Journal entry already exists in the label.");
        }
      } catch (err) {
        throw err;
      }
    }
  };

  /* AUTHENTICATION */

  const verify = async (uid, token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token });

    try {
      const response = await axios.post(
        `${api_uri}/auth/users/activation/`,
        body,
        config
      );
      return response;
    } catch (err) {
      throw err;
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
      throw error;
    }
  };

  const logout = () => {
    // Remove the user from local storage
    localStorage.removeItem("userData");
    setUser(null);
  };

  const register = async (
    email,
    password,
    re_password,
    first_name,
    last_name
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    });
    try {
      // Make an API request to register a new user using Djoser
      const response = await axios.post(`${api_uri}/auth/users/`, body, config);
      return response;
      // Handle the response as needed
    } catch (error) {
      throw error;
    }
  };

  const reset_password = async (email) => {
    console.log("email", email);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email });
    try {
      // Make an API request to reset the password using Djoser
      const response = await axios.post(
        `${api_uri}/auth/users/reset_password/`,
        body,
        config
      );
      return response;
      // Handle the response as needed
      // You might want to set some state or display a message to the user.
    } catch (error) {
    
      throw error;
    }
  };

  const reset_password_confirm = async (
    uid,
    token,
    new_password,
    re_new_password
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      // Make the password reset request
      const response = await axios.post(
        `${api_uri}/auth/users/reset_password_confirm/`,
        body,
        config
      );

      return response;

      // Optionally, you can redirect the user to a login page or display a success message.
    } catch (error) {
      throw error;
    }
  };

  const getUser = async () => {
    if (user && user.access) {
      const headers = {
        Authorization: `JWT ${user?.access}`,
      };
      try {
        const userData = await axios.get(`${api_uri}/auth/users/me/`, {
          headers,
        });
        setCurrentUser(userData.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchJournals();
        await fetchLabels();
        await getUser();
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  

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
        deleteEntry,
        updateEntry,
        createLabel,
        fetchLabels,
        labels,
        getUser,
        currentUser,
        addEntryToLabel,
        fetchSearchedJournals,
        deleteLabel,
        editLabel,
        fetchFavorites,
        fetchBookmarked,
        fetchLabelEntries,
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

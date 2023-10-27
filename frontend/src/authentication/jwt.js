import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

function Jwt() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // Check if user data is available and has an 'access' token
    if (userData && userData.access) {
      // Access user data as needed
      const accessToken = userData.access;

      try {
        // Decode the JWT token
        const decodedToken = jwtDecode(accessToken);

        // Check if the token has not expired
        if (decodedToken.exp * 1000 > Date.now()) {
          // Access user information
          const decodedUserId = decodedToken.user_id;
       
          setUserId(decodedUserId); // Set the userId using useState
        } else {
          // Access token has expired, log the user out
          console.error('Access token has expired. Logging out.');
          // Remove the user data from localStorage
          localStorage.removeItem('user');
          // You can also perform additional logout actions if needed.
          // For example, reset user-related state in your application.
        }
      } catch (error) {
        console.error('Error decoding the access token:', error);
      }
    } else {
      // Handle the case where 'access' property is missing or user data is not defined
      console.error("Access token is missing in the user object or user data is not defined.");
    }
  }, []);

  return userId;
}

export default Jwt;

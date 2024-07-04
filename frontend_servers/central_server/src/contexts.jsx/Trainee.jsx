import React, { useEffect, useContext, createContext, useState } from 'react';

export const curr_context = createContext();

const Trainee = (props) => {
   const backend_url = "https://gramhunar.onrender.com";
   const [traineeID, set_traineeID] = useState(localStorage.getItem('traineeID') || "");
   const [trainee, set_trainee] = useState(null);

   // Effect to store traineeID in local storage when it changes
   useEffect(() => {
      localStorage.setItem('traineeID', traineeID);
   }, [traineeID]);

   // Effect to fetch trainee data when traineeID changes
   useEffect(() => {
      const get_data = async () => {
         if (traineeID) {
            const url = `${backend_url}/trainee/get_trainee_info/${traineeID}`;
            try {
               const response = await fetch(url, {
                  method: 'GET',
                  headers: {
                     'Cache-Control': 'no-cache, no-store, must-revalidate',
                     'Pragma': 'no-cache',
                     'Expires': '0'
                  }
               });
               if (!response.ok) {
                  throw new Error('Network response was not ok');
               }
               const data = await response.json();
               set_trainee(data);
            } catch (error) {
               console.error('Error fetching trainee data:', error);
            }
         }
      };
      get_data();
   }, [traineeID]);

   useEffect(() => {
      console.log(trainee);
   }, [trainee]);

   return (
      <curr_context.Provider value={{ traineeID, set_traineeID, trainee, set_trainee, backend_url }}>
         {props.children}
      </curr_context.Provider>
   );
};

export default Trainee;

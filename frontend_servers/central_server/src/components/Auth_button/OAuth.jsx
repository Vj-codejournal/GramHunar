import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
import { app } from "../../firebase";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import {curr_context} from '../../contexts.jsx/Trainee'
import { Button } from "@mui/material";
import { alpha, useTheme } from '@mui/material/styles';
import Iconify from 'src/components/iconify';
export default function OAuth() {
   const theme = useTheme();
    const navigate = useNavigate();
    const now_context = useContext(curr_context) ;
    const handleGoogleClick = async() => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);//take auth that is in firebase.js//result will have user details which we can add to database
            console.log(result) ; 
            //for backend
            const res = await fetch(`${now_context.backend_url}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    emailId: result.user.email,
                    
                })
            })
            //also add this data to redux 
            const data = await res.json();
            console.log(data._id);
            
            now_context.set_traineeID(data._id) ;  
            navigate('/');
        }
        catch (error) {
            console.log('could not login with google', error);
          }
    };
  return (
    <Button
      type='button' //default submit now not
      onClick={handleGoogleClick}
      fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
    >
      <Iconify icon="eva:google-fill" color="#DF3E30" />
    </Button>
  );
  
}
import { useState  , useContext , useEffect} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import {curr_context} from "../../contexts.jsx/Trainee"
// ----------------------------------------------------------------------

export default function UserTableRow({
  id ,
  selected,
  name,
  avatarUrl,
  company,
  role,
  isVerified,
  status,
  handleClick,
  age ,
  grade,
  rollNumber ,
  attendence
}) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCheckButtonClick = () => {
    navigate('/Info', {
      state: {
        id , 
        name,
        avatarUrl,
        company,
        role,
        isVerified,
        status,
        grade,
        age ,
        rollNumber ,
        attendence
      }
    });
  };
  const [students , set_students] = useState({}) ;

  const now_context = useContext(curr_context)
  useEffect(()=>{
    if(now_context.traineeID){
     fetch(`${now_context.backend_url}/student/trainee/${now_context.traineeID}`)
     .then(response => response.json())
     .then(data => {set_students(data) ; console.log(data)})
     .catch(error => console.error('Error:', error)); 
    }

 } , [now_context.traineeID]) 

//  useEffect(()=>{console.log(students[0].name) ; } , [students])


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{role}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell align = "center">{company}</TableCell>


       

        <TableCell align= "center">
        <Label 
            sx = {{backgroundColor : `${(grade === 'A' && 'green') ||(grade === 'B' && 'blue') ||(grade === 'C' && 'red')}` , color : 'white' , height : "4vh"}}
          >
            {`grade ${grade.toLowerCase()}`}
          </Label>
        </TableCell>

        <TableCell align = "center">
          <Button variant="contained" onClick={handleCheckButtonClick} sx = {{height : "4vh"}}>Check</Button>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  grade : PropTypes.string , 
  attendence: PropTypes.any,
};

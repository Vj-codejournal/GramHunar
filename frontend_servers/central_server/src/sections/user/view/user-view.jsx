import { useState ,useEffect , useContext} from 'react';

import Card from '@mui/material/Card';

import Table from '@mui/material/Table';

import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';


import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { Button, Typography, Modal, Box, TextField, MenuItem, Stack } from '@mui/material';
import { emptyRows, applyFilter, getComparator } from '../utils';
import {curr_context} from "../../../contexts.jsx/Trainee"

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [users , set_users] = useState([{
    id:"ok",
    avatarUrl: `/assets/images/avatars/avatar_${1}.jpg`,
    name: "sashrik",
    company: "class 5th",
    isVerified: 'k' ,
    grade : "C", 
    role2 : '',
    status: 'active',
    attendence : "woo",
    role: ' ',
  }]) ; 
  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);


  const now_context = useContext(curr_context) ; 



  const [students , set_students] = useState([{
    id:"ok",
    avatarUrl: `/assets/images/avatars/avatar_${1}.jpg`,
    name: "sashrik",
    company: "class 5th",
    isVerified: 'k' ,
    grade : "C", 
    role2 : '',
    age : 7 , 
    rollNumber : 500 , 
    status: 'active',
    attendence : "woo",
    role: ' ',
  }]) ; 

  useEffect(()=>{
     if(now_context.traineeID){
      fetch(`${now_context.backend_url}/student/trainee/${now_context.traineeID}`)
      .then(response => response.json())
      .then(data => {
        const ok = data.map((el , i)=>{
          const ret = {
            id:el._id,
            avatarUrl: `/assets/images/avatars/avatar_${i+1}.jpg`,
            name: el.name,
            company: `class ${el.class}` ,
            isVerified: 'k' ,
            grade : `${el.grade}`, 
            role2 : '',
            age : el.age , 
            rollNumber : el.rollNumber , 
            status: 'active',
            attendence : "woo",
            role: ' ',
          }
          return ret ;
        })

        set_students(ok) ;
        console.log(ok) ;
      })

      .catch(error => console.error('Error:', error)); 
     }

  } , [now_context.traineeID]) 

  useEffect(()=>{console.log(students) ; } , [students])




  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: students,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;





  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [age, setAge] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = ['1st', '2nd', '3rd', '4th', '5th', '6th'];


  const handleSubmit = () => {
    call_fetch_add_student(name, rollNumber, age, selectedClass);
    handleClose();
  };


  async function call_fetch_add_student(name, rollNumber, age, selectedClass)  {
    // Your implementation
   await  fetch(`${now_context.backend_url}/student/add/${now_context.traineeID}` ,{
      method: "POST",
      body: JSON.stringify({
        name: name,
        age : age ,
        rollNumber : rollNumber ,
        class : selectedClass , 
        grade : "C"
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    } )
    console.log('Adding student:', name, selectedClass);
    set_students([...students , 
      {
        id:'temp',
        avatarUrl: `/assets/images/avatars/avatar_${students.length+1}.jpg`,
        name: name,
        company: `class ${selectedClass}` ,
        isVerified: 'k' ,
        grade : `C`, 
        role2 : '',
        age : age, 
        rollNumber : rollNumber, 
        status: 'active',
        attendence : "woo",
        role: ' ',
      }
    ])
  }







  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
          New Student
        </Button>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add New Student
          </Typography>
          <TextField
            margin="normal"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Roll Number"
            fullWidth
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Age"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            select
            margin="normal"
            label="Class"
            fullWidth
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Student
          </Button>
        </Box>
      </Modal>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id : 'role' , label :'' , width : 400} ,
                  { id : 'role2' , label :''} ,
                  { id: 'company' , label : "class" , align : 'center'},
                  { id: 'status', label: 'Status' , align : 'center' },
                  { id: 'edit' , label:'edit' , align : 'center'},
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      id = {row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      age = {row.age}
                      rollNumber={row.rollNumber}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      grade = {row.grade}
                      attendence={row.attendence}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

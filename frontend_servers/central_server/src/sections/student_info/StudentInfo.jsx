import React, { useState , useEffect , useContext  } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {curr_context} from '../../contexts.jsx/Trainee'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { ConstructionOutlined } from '@mui/icons-material';
import Label from 'src/components/label/label';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem
} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs  } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const styles = {
  scrollContainer: {
    overflowX: 'auto',
    overflowY: 'auto',
    maxHeight: '16rem', // equivalent to max-h-64
    marginTop: '1rem', // equivalent to mt-4
    scrollbarWidth: 'none', // For Firefox
    msOverflowStyle: 'none', // For Internet Explorer and Edge
  },
  scrollContainerWebkit: {
    '&::-webkit-scrollbar': {
      display: 'none', // For Chrome, Safari, and Opera
    },
  },
};


export default function StudentInfo() {
  const { state } = useLocation();
  
  const [openModal, setOpenModal] = React.useState(false);
  const now_context = useContext(curr_context) ;
  //..............................................................

  const [listeningSkills, setListeningSkills] = useState(0);
  const [attentionSpan, setAttentionSpan] = useState(0);
  const [curiosity, setCuriosity] = useState(0);
  const [reflectingAbility, setReflectingAbility] = useState(0);
  const [bar_data , set_bar_data] = useState([0,0,0,0,0])
  const [g_data , s_g_data] = useState({}) ;
  const [length , set_length] = useState(0) ; 
  const [data1 , set_data1] = useState([]) ; 
  const [data2 , set_data2] = useState([]) ; 
  const [data3 , set_data3] = useState([]) ; 
  const [data4 , set_data4] = useState([]) ;  
  const [total , set_total] = useState(100) ; 
  const [atended , set_attended] = useState(80) ; 
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [marks, setMarks] = useState({
    maths: '',
    science: '',
    socialScience: '',
    english: '',
    hindi: ''
  });
  const handleChange = (e) => {
    setMarks({
      ...marks,
      [e.target.name]: e.target.value
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const dot =  new Date(date).toISOString().split('T')[0]
    const data = {
    dot,
      ...marks
    };
    console.log(data);

    await fetch(`${now_context.backend_url}/attendence/subject/${state.id}` , {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    set_bar_data([data.maths , data.science , data.socialScience   , data.english , data.hindi])
    // idhar rukna 
    handleClose();
  };

  //..............................................................

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
   useEffect(()=>{

    const run = async()=>{
      console.log(state.id)
      await fetch(`${now_context.backend_url}/attendence/7/${state.id}` , {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate', 
            'Pragma': 'no-cache',
            'Expires': '0'
        }
      })
      .then(data=>data.json())
      .then(data=>{
        let d1 = []
        let d2 = []
        let d3 = []
        let d4 = []
        s_g_data(data) ;
        set_length(data.length) ; 
        data.forEach(element => {
          d1.push(element.ListeningSkills)
          d2.push(element.AttentionSpan)
          d3.push(element.Curiosity)
          d4.push(element.ReflectingAbility)
        });
        set_data1(d1) ;
        set_data2(d2) ;
        set_data3(d3) ;
        set_data4(d4) ;        
      
      }) ; 
      await fetch(`${now_context.backend_url}/attendence/sum/${state.id}` , {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate', 
            'Pragma': 'no-cache',
            'Expires': '0'
        }
      })
      .then(data=>data.json())
      .then(data=>{ set_total(data.totalDays)  ; set_attended(data.totalAttendance)})
      
      await fetch(`${now_context.backend_url}/attendence/recent/${state.id}` , {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate', 
            'Pragma': 'no-cache',
            'Expires': '0'
        }
      })
      .then(data=>data.json())
      .then(data=>{
        set_bar_data([data.data.maths , data.data.science , data.data.social , data.data.english , data.data.hindi])
      })

    }
    run()

   } , [])

   useEffect(()=>{
    console.log(g_data)
    console.log(length)
   } , [g_data])



















  async function HS(){
    console.log(state.id) ;
    await fetch(`${now_context.backend_url}/attendence` , {
      method: "POST",
      body: JSON.stringify({
        Student_id: state.id,
        Ratings :{
          ListeningSkills:listeningSkills , 
          AttentionSpan : attentionSpan , 
          Curiosity : curiosity ,
          ReflectingAbility :reflectingAbility , 
        },
        Attendance : 'Yes',
        traineeID : now_context.traineeID 
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    setOpenModal(false);
  }


  let label = []
  for(let i =0 ; i<length ; i++) label.push(`day${i+1}`)
  
  const chartData = {
    labels: label,
    datasets: [
      {
        label: 'Listening Skills',
        data: data1,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: true,
        tension: 0.4, // Making the line curvy
      },
      {
        label: 'Attention Span',
        data: data2,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        fill: true,
        tension: 0.4, // Making the line curvy
      },
      {
        label: 'Curiosity',
        data: data3,
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        fill: true,
        tension: 0.4, // Making the line curvy
      },
      {
        label: 'Reflecting Ability',
        data: data4,
        backgroundColor: 'rgba(255,206,86,0.2)',
        borderColor: 'rgba(255,206,86,1)',
        borderWidth: 1,
        fill: true,
        tension: 0.4, // Making the line curvy
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  const barChartData = {
    labels: ['Maths', 'Science', 'Social', 'english' , 'hindi'],
    datasets: [
      {
        label: 'Score',
        data: bar_data,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(25, 225, 0, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(25, 225, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 100, // Assuming the maximum value for the skills is 100
      },
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: 50,
            xMax: 50,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: 'Target',
              enabled: true,
              position: 'start',
            },
          },
        },
      },
    },
  };

  const doughnutData = {
    labels: ['', `Attended : ${(atended/total*100)}`],
    datasets: [
      {
        data: [ 100-(atended/total*100) , (atended/total*100) ], // Assuming attendance is in percentage
        backgroundColor: ['rgba(255, 99, 132, 0)' ,'rgba(75, 192, 192, 0.2)', ],
        borderColor: ['rgba(255, 99, 132, 0)' , 'rgba(75, 192, 192, 1)', ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Attendance Distribution',
      },
    },
  };

  return (
    <div className='flex-col w-[80vw] h-[90vh] m-[auto] justify-around overflow-auto'>
      <div className='flex justify-around w-[80vw] overflow-auto'>
        <Card className='w-[30vw] h-[40vh] mt-5 overflow-auto'>
          <CardContent className='overflow-auto'>
            <Stack direction="row" spacing={2} alignItems="center" className='overflow-auto'>
              <Avatar alt={state.name} src={state.avatarUrl} sx={{ width: 56, height: 56 }} />
              <div className='flex flex-wrap justify-between w-[25vw]'>
              <Typography variant="h5" component="div">
                {state.name}
              </Typography>
              <Label 
                  sx = {{backgroundColor : `${(state.grade === 'A' && 'green') ||(state.grade === 'B' && 'blue') ||(state.grade === 'C' && 'red')}` , color : 'white' , height : "4vh"}}
                >
                  {`grade ${state.grade.toLowerCase()}`}
                </Label>
                <Button
        variant='contained'
        sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
        onClick={handleClickOpen}
      >
                + academic
              </Button>
              <Button variant='contained' onClick={handleOpenModal}> +  daily Report</Button>
              <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Academic Marks</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              inputFormat="dd-MM-yyyy"
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            name="maths"
            label="Maths Marks"
            type="number"
            fullWidth
            value={marks.maths}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="science"
            label="Science Marks"
            type="number"
            fullWidth
            value={marks.science}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="socialScience"
            label="Social Science Marks"
            type="number"
            fullWidth
            value={marks.socialScience}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="english"
            label="English Marks"
            type="number"
            fullWidth
            value={marks.english}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="hindi"
            label="Hindi Marks"
            type="number"
            fullWidth
            value={marks.hindi}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
             
             
             
             
              <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }} className="w-[80vw] h-[80vh] rounded-xl">
          <h2 id="modal-title" className='text-[4vh] bold-lg w-[80vw] flex justify-center mb-4'>Daily Report</h2>
          <p id="modal-description" className='mb-4'>
          Socio-emotional education integrates emotional well-being with academics, fostering emotional intelligence and interpersonal skills. It enhances resilience, adaptability, and positive relationships, creating a supportive school climate that promotes holistic development.
          </p>
          <div>
            <div className="mb-4">
              <Typography variant="h6">Listening Skills</Typography>
              <Typography variant="body2" color="textSecondary">
                Details about Listening Skills...
              </Typography>
              <Slider
                value={listeningSkills}
                onChange={(e, newValue) => setListeningSkills(newValue)}
                aria-labelledby="listening-skills-slider"
                valueLabelDisplay="auto"
                step={0.01}
                marks
                min={0}
                max={5}
              />
            </div>
            <div className="mb-4">
              <Typography variant="h6">Attention Span</Typography>
              <Typography variant="body2" color="textSecondary">
                Details about Attention Span...
              </Typography>
              <Slider
                value={attentionSpan}
                onChange={(e, newValue) => setAttentionSpan(newValue)}
                aria-labelledby="attention-span-slider"
                valueLabelDisplay="auto"
                step={0.01}
                marks
                min={0}
                max={5}
              />
            </div>
            <div className="mb-4">
              <Typography variant="h6">Curiosity</Typography>
              <Typography variant="body2" color="textSecondary">
                Details about Curiosity...
              </Typography>
              <Slider
                value={curiosity}
                onChange={(e, newValue) => setCuriosity(newValue)}
                aria-labelledby="curiosity-slider"
                valueLabelDisplay="auto"
                step={0.01}
                marks
                min={0}
                max={5}
              />
            </div>
            <div className="mb-10">
              <Typography variant="h6">Reflecting Ability</Typography>
              <Typography variant="body2" color="textSecondary">
                Details about Reflecting Ability...
              </Typography>
              <Slider
                value={reflectingAbility}
                onChange={(e, newValue) => setReflectingAbility(newValue)}
                aria-labelledby="reflecting-ability-slider"
                valueLabelDisplay="auto"
                step={0.01}
                marks
                min={0}
                max={5}
              />
            </div>
          </div>
          <Button variant="contained"  onClick={HS}> submit </Button>
        </Box>
      </Modal>

















              </div>

            </Stack>
            <div style={styles.scrollContainer} className="overflow-x-auto overflow-y-auto max-h-64 mt-4">
              <table className="min-w-full bg-white">
                <tbody>
                <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">Class</td>
                    <td className="py-2 px-4 border-b border-gray-200">{state.company}</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">Roll NO.</td>
                    <td className="py-2 px-4 border-b border-gray-200">{state.rollNumber}</td>
                  </tr>

                  
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">Age</td>
                    <td className="py-2 px-4 border-b border-gray-200">{state.age}</td>
                  </tr>


                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">Status</td>
                    <td className="py-2 px-4 border-b border-gray-200">{state.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card className='w-[48vw] h-[40vh] mt-5'>
          <CardContent>
            <div style={{ height: '38vh', width: '46vw' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='flex justify-around w-[80vw] overflow-auto'>
      <Card className='w-[48vw] h-[40vh] mt-5'>
          <CardContent>
            <div style={{ height: '38vh', width: '46vw' }}>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </CardContent>
        </Card>
        <Card className='w-[30vw] h-[40vh] mt-5'>
          <CardContent>
            <div style={{ height: '36vh', width: '28vw' }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

StudentInfo.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    isVerified: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    attendence: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
};

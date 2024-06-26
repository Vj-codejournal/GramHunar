import React, { useState } from 'react';
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
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';

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

const generateRandomData = () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 5) + 1);

export default function StudentInfo() {
  const { state } = useLocation();
  const [openModal, setOpenModal] = React.useState(false);

  //..............................................................

  const [listeningSkills, setListeningSkills] = useState(0);
  const [attentionSpan, setAttentionSpan] = useState(0);
  const [curiosity, setCuriosity] = useState(0);
  const [reflectingAbility, setReflectingAbility] = useState(0);

  //..............................................................

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'],
    datasets: [
      {
        label: 'Listening Skills',
        data: generateRandomData(),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: true,
        tension: 0.4, // Making the line curvy
      },
      {
        label: 'Attention Span',
        data: generateRandomData(),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        fill: true,
        tension: 0.4, // Making the line curvy
      },
      {
        label: 'Curiosity',
        data: generateRandomData(),
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        fill: true,
        tension: 0.4, // Making the line curvy
      },
      {
        label: 'Reflecting Ability',
        data: generateRandomData(),
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
    labels: ['Foundational Literacy', 'Foundational Numeracy', 'Social Emotional Literacy', 'Combined'],
    datasets: [
      {
        label: 'Skills',
        data: [60, 70, 80, 53],
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
    labels: ['', 'Attended'],
    datasets: [
      {
        data: [20, 80], // Assuming attendance is in percentage
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
              <div className='flex justify-between w-[25vw]'>
              <Typography variant="h5" component="div">
                {state.name}
              </Typography>
              <Button
                variant='contained'
                sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
              >
                + academic
              </Button>
              <Button variant='contained' onClick={handleOpenModal}> +  weekly report</Button>
             
             
             
             
             
              <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }} className="w-[80vw] h-[80vh] rounded-xl">
          <h2 id="modal-title" className='text-[4vh] bold-lg w-[80vw] flex justify-center mb-4'>WEEKLY REPORT</h2>
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
          <Button variant="contained"  onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>


















              </div>

            </Stack>
            <div style={styles.scrollContainer} className="overflow-x-auto overflow-y-auto max-h-64 mt-4">
              <table className="min-w-full bg-white">
                <tbody>
                <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">Grade</td>
                    <td className="py-2 px-4 border-b border-gray-200">{state.grade}</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">Role</td>
                    <td className="py-2 px-4 border-b border-gray-200">{state.role}</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">Company</td>
                    <td className="py-2 px-4 border-b border-gray-200">{state.company}</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">Verified</td>
                    <td className="py-2 px-4 border-b border-gray-200">{state.isVerified ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">Status</td>
                    <td className="py-2 px-4 border-b border-gray-200">{state.status}</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">Attendance</td>
                    <td className="py-2 px-4 border-b border-gray-200">{state.attendence}%</td>
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

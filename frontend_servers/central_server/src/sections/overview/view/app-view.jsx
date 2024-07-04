import { faker } from '@faker-js/faker';
import React , {useState , useEffect , useContext} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import {curr_context} from '../../../contexts.jsx/Trainee'
import { now } from 'lodash';
import { Card } from '@mui/material';

// ----------------------------------------------------------------------

const textStyle = {
  background: 'linear-gradient(45deg , aqua ,aqua , aqua,aqua ,aqua , aqua , aqua )',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
};

export default function AppView() {
 
  const now_context = useContext(curr_context) ; 
  const [name , set_name] = useState(null) ; 
  useEffect(() => {
    if (now_context?.trainee) {
      set_name(now_context.trainee.name);
    }
  }, [now_context]);

  const [data1 , set_data1] = useState([0,0,0,0,0,0,0,0,0,0])
  const [data2 , set_data2] = useState([0,0,0,0,0,0,0,0,0,0])
  const [data3 , set_data3] = useState([0,0,0,0,0,0,0,0,0,0])
  const [t_ratio , set_t_ratio] = useState([0,0,0])

  useEffect(()=>{

    const run = async ()=>{
      const url = `${now_context.backend_url}/attendence/day/${now_context.traineeID}`;
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
         const d1 = data.data.map(el=>{return el.a})
         const d2 = data.data.map(el=>{return el.b})
         const d3 = data.data.map(el=>{return el.c})
         set_t_ratio([d1[0], d2[0], d3[0]]) ; 
         d1.reverse() ; 
         d2.reverse() ;
         d3.reverse() ;
         set_data1(d1) ;
         set_data2(d2) ;
         set_data3(d3) ;
 
         console.log(d1) ;
         console.log(data.data[0].a) ; 
      } catch (error) {
         console.error('Error fetching trainee data:', error);
      }
    } 

    run()

  } , [])
  const selectedDate = new Date() ;

  useEffect(()=>{} , [data1])
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome {name} 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="your events"
            total={now_context.trainee.events.length}
            color="success"
            icon={<img alt="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKEAAACUCAMAAADMOLmaAAAAbFBMVEX///8BAQEAAABNTU3x8fEeHh7KysqJiYmvr6/f39/k5OQ2NjY6Ojr8/Pzs7OwyMjJAQEBFRUVaWlolJSVlZWXBwcGfn5+RkZGpqanY2NhgYGBsbGwtLS3Q0NB1dXVSUlKBgYEVFRW4uLgMDAy7JFoNAAADlUlEQVR4nO2b25KjIBBAtRMTo0FzM2qMYy7//48LOBpwNHGWhtqt6vMyFezCI4rQjHgeQRAEQRAEQRDEXBibGbe06zFFvQMIzh8l2eoKkIYujAZkPgjyT4qFDIOzEymVZQo+ByB7H5dAGxfUbrxerOSJ+alv7+OKLs55I4bdmU/vb/O6i1vP7FZoFGT4O5h4p9WP8Jui1g3ZORyliHTDqOgP1QmT1aKxDC+gkOuGCUyQ6YYP9dgiTND0mFcKP79H9Evd0B8DYKUbZq9KhOMuQ2vGQvNDMWwlsZ7Nx0AQyVAErFEEy2BQMZohj3hgGB7gacvQh11kLlgO7zGqIRTmhtXP0+MZ+hAbCy53dg3BeHZbXv/a0J9h6IPxrKwOxg3DOYbZDMPQ9K29GjPkr7EafHFAjoDl1F0u+iuB9qpGDQ0ZNbzy53MhFeHO71I+1YYXHnds59jxxvO+RqqyZAilvP0C3kzLZspQdIPsKeP4qznaOzSs+LOT3K7BifcFMWyPG7YpQlQdg4pfEm9qZ4b6gLqaFPS1FO/H8G7TkFd863pgeJwU5HHPvKvo/Gz7liNDXvM9L6No89hOt2Abdz2LOH4dY4IWDeUUNJCd5Z3gxziLht8n/+DXx00fs2mIARmSIRmSoWI4tehhDpIhQNwsbLATkjiGxdIKJZ6hpZX8DRkaQ4bmkKE5ZGiOG8Op/zF35YPD2k9rhtFGIWK/Kd5oF2TN8BBve+JLvxDdqMWHrphVSvF2r/2Xx5rhVp0/vZbKr2px3Bse1OLAjaG6bgz73jBVi7eKoVJ8JEMyJEMyJEMyVIl/Neo1zkc95p32yrpB1Z/zoi4n9BMK9qVGH5y04dSE8MPvEWiObQ4ZmkOG5jgyZIO/+s9hsuok12OD/LI/32g2Oox2ko02adyT9mmnt1CLm1c2qhTHO1czB4X9+Li8Hc9GaW5DhmRIhmRIhv+Z4b+/Blsp+eX+9K2iJ6l9sZ6N7g/ad7m28uWZ2ehEsZPZFxpkaA4ZmlOKD26M6y7Fa87SbsAVtHsHzBA7F6Cxs3lWbNsA8/1cJ5CbQy3stovETT6aVyw+t4Z7gq3IvOUJkB4gMVGAnfHjMiS6iEtPN8YVtXs2+Jh/KzFbsczlhSP1QfndP+DD6/xCEZRbDtA/k5SOJ7R3hPi2HtdRNOD98yb8+ST5Avsep+sSz0861mG+xqOoEbYSEgRBEARBEARBEATx7/IHPoNVUfFk8qwAAAAASUVORK5CYII=" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="students under"
            total={now_context.trainee.students.length}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="total students in grade a "
            total={data1[9]}
            color="warning"
            icon={<img alt="icon" src="data:image/jpeg;base64,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" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
         <Card className='w-full h-full p-4'>
         <div className='font-bold text-[55px]' style={textStyle}>{days[selectedDate.getDay()]}</div>
         <div className='text-[20px] pl-2 text-[gray]'>
                {
 
                    `
                    ${selectedDate.getDate()} ${months[selectedDate.getMonth()]}  ${selectedDate.getFullYear()}
                    `
 
                }
              </div>
         </Card>
          
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="grades from previous 10 days"
            
            
            chart={{
              labels: [
                "1",
                "2",
                "3",  
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
              ],
              
              series: [
                {
                  name: 'grade C',
                  type: 'area',
                  fill: 'gradient',
                  data: data3,
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: data2,
                },
                {
                  name: 'Team A',
                  type: 'area',
                  fill: 'gradient',
                  data: data1,
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current ratio"
            chart={{
              series: [
                { label: 'grade B', value: t_ratio[1] },
                { label: 'grade C', value: t_ratio[2] },
                { label: 'grade A', value: t_ratio[0] },
              ],
            }}
          />
        </Grid>

      </Grid>
    </Container>
  );
}

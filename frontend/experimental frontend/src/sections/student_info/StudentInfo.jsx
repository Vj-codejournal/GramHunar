import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';


export default function StudentInfo() {
  const { state } = useLocation();

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar alt={state.name} src={state.avatarUrl} sx={{ width: 56, height: 56 }} />
          <Typography variant="h5" component="div">
            {state.name}
          </Typography>
        </Stack>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {state.role} at {state.company}
        </Typography>
        <Typography variant="body2">
          Verified: {state.isVerified ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body2">
          Status: {state.status}
        </Typography>
        <Typography variant="body2">
          Attendance: {state.attendence}
        </Typography>
      </CardContent>
    </Card>
  );
}

StudentInfo.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    company: PropTypes.string,
    role: PropTypes.string,
    isVerified: PropTypes.bool,
    status: PropTypes.string,
    attendence: PropTypes.any,
  }),
};

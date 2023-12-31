import { APPLICATION_COLORS } from '../utils/constants';
import { Backdrop } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';

function Loading() {
  return (
    <Backdrop
      sx={{ color: APPLICATION_COLORS.WHITE, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <img
        alt={'Loading'}
        src={
          'https://i.pinimg.com/originals/0a/ae/4b/0aae4bb34d62a85f76dcce62fd42ffd3.gif'
        }
        width="100"
        height="100"
      />
      <Typography variant="h4">Loading....</Typography>
    </Backdrop>
  );
}

export default Loading;

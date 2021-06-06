import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {store} from '../modules/reduxMiddleware';
import {
  FORMAT,
  DISPRAY_FORMAT
} from '../modules/timeHelper';
import {
  createTimeline,
  // clearTimeline,
  editDoingNow
} from '../modules/timeline';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button
}from '@material-ui/core';

export default function DoingNow(){

  const doingNow = useSelector(state => state.timeline.doingNow);
  const [currentTime, setCurrentTime] = useState(moment().format(FORMAT));

  useEffect(()=>{
    setInterval(() => {
      setCurrentTime(_ => moment().format(FORMAT))
    }, 1000);
  },[]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    store.dispatch(
      editDoingNow(
        { 
          ...doingNow,
          [name]: value
        }
      )
    );
  }

  const handleSubmit = (_) => {
    store.dispatch(createTimeline({ ...doingNow, end_at: currentTime }));
  }

  // const handleClear = (_) => {
  //   store.dispatch(clearTimeline());
  // }

  return (
    <Container maxWidth="sm" >
      <Box m={1}>
        <Paper>
          <Box m={1} height="300px">
            <Typography variant="h6">
              What are doing now?
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              <Box width="100%" textAlign="center" m={1}>
                {/* Timer */}
                <Typography variant="h3">
                  {moment(currentTime).format(DISPRAY_FORMAT)}
                </Typography>
              </Box>
              <Box width="60%" textAlign="center" m={1}>
                <TextField name="memo" value={doingNow.memo} label="memo" onChange={handleInputChange} fullWidth/>
              </Box>
              <Box width="60%" textAlign="center" m={1}>
                <TextField name="type" value={doingNow.type} label="type" onChange={handleInputChange} fullWidth/>
              </Box>
              <Box width="60%" textAlign="center" m={1}>
                <Button width="60%" onClick={handleSubmit}>
                  Submit
                </Button>
                {/* <Button width="60%" onClick={handleClear}>
                  Clear
                </Button> */}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
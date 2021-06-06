import React from 'react'
import { useSelector } from 'react-redux'
import { store } from '../modules/reduxMiddleware';
import {
  editTimeline,
  deleteTimeline
} from '../modules/timeline';
import {
  Button,
  Paper,
  InputBase,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
}from '@material-ui/core'

export default function Timeline() {
  const logs = useSelector(state => state.timeline.logs)

  const handleInputChange = (targetLogId) => {
    return (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const targetLog = logs.find((log) => log.id === targetLogId)

    store.dispatch(
      editTimeline(
        {
          ...targetLog,
          [name]: value
        }
      )
    );
    }
  }

  const handleDelete = (targetLogId) => {
    return (_) => {
      store.dispatch(
        deleteTimeline(targetLogId)
      );
    }
  }

  return (
    <>
      { logs.length !== 0 &&
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>end_at</TableCell>
                <TableCell align="left">memo</TableCell>
                <TableCell align="left">type</TableCell>
                <TableCell align="center">type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell component="th" scope="row">
                    {log.end_at}
                  </TableCell>
                  <TableCell align="right">
                    <InputBase name="memo" value={log.memo} label="memo" onChange={handleInputChange(log.id)} fullWidth/>
                  </TableCell>
                  <TableCell align="right">
                    <InputBase name="type" value={log.type} label="type" onChange={handleInputChange(log.id)} fullWidth/>
                  </TableCell>
                  <TableCell align="center">
                    <Button width="60%" onClick={handleDelete(log.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  )
}
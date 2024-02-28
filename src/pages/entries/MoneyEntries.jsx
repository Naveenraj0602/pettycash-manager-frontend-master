import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Tooltip, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
// import backendInstance from '../../instances/serverConnection';

const MoneyEntries = ({ entries }) => {
  const dispatch = useDispatch();

  const deleteEntry = async (id) => {
    dispatch({ type: 'SET_BD_STATE_ACTIVE', data: 'DELETE_ENTRY' });
    // const response = await backendInstance.delete(`/api/transaction/delete/${id}`);
    // alert(response.data.message);
  };

  const editEntry = (id) => {
    dispatch({ type: 'SET_BD_STATE_ACTIVE', data: `EDIT_ENTRY_${id}` });
  };

  

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, mb: 2, borderRadius: '8px', border: '2px solid #e0e0e0' }}>
        <Grid container spacing={2}>
          <Grid item xs><Typography variant="subtitle1">Type</Typography></Grid>
          <Grid item xs><Typography variant="subtitle1">Category</Typography></Grid>
          <Grid item xs><Typography variant="subtitle1">Paid To</Typography></Grid>
          <Grid item xs><Typography variant="subtitle1">Amount</Typography></Grid>
          <Grid item xs><Typography variant="subtitle1">Description</Typography></Grid>
          <Grid item xs><Typography variant="subtitle1">Created At</Typography></Grid>
          <Grid item xs><Typography variant="subtitle1">Updated At</Typography></Grid>
          <Grid item xs><Typography variant="subtitle1">Actions</Typography></Grid>
        </Grid>
      </Paper>
      {entries.map((entry) => (
        <Card key={entry._id} variant="outlined" sx={{ mb: 2, borderRadius: '8px', border: '2px solid #e0e0e0' }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>{entry.type}</Grid>
              <Grid item xs>{entry.category}</Grid>
              <Grid item xs>{entry.paidTo}</Grid>
              <Grid item xs>{entry.amount}</Grid>
              <Grid item xs>{entry.description}</Grid>
              <Grid item xs>{new Date(entry.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'UTC',
              })}</Grid>
              <Grid item xs>{new Date(entry.updatedAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'UTC',
              })}</Grid>
              <Grid item xs>
                
                <Tooltip title="Edit">
                  <IconButton onClick={() => editEntry(entry._id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => deleteEntry(entry._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default MoneyEntries;

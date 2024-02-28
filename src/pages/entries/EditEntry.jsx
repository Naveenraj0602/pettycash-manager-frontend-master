import {
  Button,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backendInstance from "../../instances/serverConnection";
import { useDispatch, useSelector } from "react-redux";


const EditEntry = () => {
  const { backdropDetails:  path } = useSelector(
    (state) => state.backdropReducer
  );
 
  const entryId = path.slice(11);
  const [entry, setEntry] = useState(null);

  async function getEntryData() {
    const response = await backendInstance.get(`/api/transaction/get/${entryId}`);
    setEntry(response.data.transactionDetail);
  }
  useEffect(() => {
    getEntryData();
  }, []);

  return entry ? <EditEntryForm entry={entry} /> : "Loading...";
};

export default EditEntry;

const EditEntryForm = ({ entry }) => {
  const [entryForm, setEntryForm] = useState({ ...entry });
  const dispatch = useDispatch();

  const editEntry = async (entryObj) => {
    try {
      delete entryObj.createdAt;
      delete entryObj.updatedAt;
      delete entryObj.history;

      const response = await backendInstance.put(`/api/transaction/edit/${entryObj._id}`, entryObj);
      // Assuming you reset the form or do something similar here
      // setEntryForm(ENTRY_FORM_INITIAL_VALUE);
      toast.success(response.data.message); // Using toast here
      dispatch({ type: "SET_BD_STATE_INACTIVE" });
    } catch (error) {
      toast.error("Failed to update the entry."); // Showing error toast
    }
  };

  function handleFormSubmission(e) {
    e.preventDefault();
    if (entryForm.amount > 0) {
      editEntry(entryForm);
    } else {
      toast.warn("Amount should be greater than 0."); // Validation message as a toast
    }
  }

  return (
    <>
    <form className="entry-form" onSubmit={handleFormSubmission}>
      <FormControl fullWidth>
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          id="type"
          required
          disabled
          value={entryForm.type}
          label="type"
          onChange={(event) => {
            setEntryForm((form) => ({
              ...form,
              type: event.target.value,
            }));
          }}
        >
          <MenuItem value="FUND_IN">Fund In</MenuItem>
          <MenuItem value="FUND_OUT">Fund Out</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <FormControl fullWidth>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          required
          value={entryForm.category}
          label="category"
          onChange={(event) => {
            setEntryForm((form) => ({
              ...form,
              category: event.target.value,
            }));
          }}
        >
          <ListSubheader>Fund In</ListSubheader>
          <MenuItem value="Account">Account</MenuItem>
          <MenuItem value="Cash">Cash</MenuItem>
          <ListSubheader>Fund Out</ListSubheader>
          <MenuItem value="Office Supplies">Office Supplies</MenuItem>
          <MenuItem value="Lodging">Lodging</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transporation">Transporation</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Utilities">Utilities</MenuItem>
          <MenuItem value="Bills">Bills</MenuItem>
          <MenuItem value="SkillUp">SkillUp</MenuItem>
          <MenuItem value="Client">Client</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <FormControl fullWidth>
        <TextField
          id="amount"
          type="number"
          label="amount"
          variant="standard"
          required
          aria-describedby="amount"
          className="input-field"
          value={entryForm.amount}
          onChange={(event) => {
            setEntryForm((form) => ({
              ...form,
              amount: event.target.value,
            }));
          }}
          helperText="Amount should be > 0"
        />
        <br />
        <TextField
          id="paidTo"
          label="paidTo"
          variant="standard"
          aria-describedby="paidTo"
          className="input-field"
          required={true}
          value={entryForm.paidTo}
          onChange={(event) => {
            setEntryForm((form) => ({
              ...form,
              paidTo: event.target.value,
            }));
          }}
        />
        <br />
        <TextField
          id="description"
          label="description"
          variant="standard"
          aria-describedby="description"
          multiline={true}
          rows={2}
          className="input-field"
          required={true}
          value={entryForm.description}
          onChange={(event) => {
            setEntryForm((form) => ({
              ...form,
              description: event.target.value,
            }));
          }}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: "40%", m: "auto" }}
        >
          Update
        </Button>
      </FormControl>
    </form>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

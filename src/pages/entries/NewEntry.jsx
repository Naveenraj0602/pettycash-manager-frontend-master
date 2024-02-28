import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ListSubheader,
} from "@mui/material";
import React, { useState } from "react";
import backendInstance from "../../instances/serverConnection";
import { useDispatch } from "react-redux";

//Get the current date to set in the initial value of the new entry form
var date = new Date();
var newdate =
  date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

const NewEntry = () => {
  const user = JSON.parse(localStorage.getItem("applicationState")) || {};
  const dispatch = useDispatch();
  const ENTRY_FORM_INITIAL_VALUE = {
    userId: user.userID,
    type: "",
    category: "",
    createdAt: newdate,
    updatedAt: newdate,
    description: "",
    paidTo: "",
    amount: 0,
    history: [],
  };
  const [entryForm, setEntryForm] = useState(ENTRY_FORM_INITIAL_VALUE);

  function handleFormSubmission(e) {
    e.preventDefault();
    if (entryForm.amount > 0) {
      addNewEntry(entryForm);
    }
  }
  const addNewEntry = (entryObj) => {
    backendInstance
      .post("/api/transaction/new", entryObj)
      .then((res) => {
        setEntryForm(ENTRY_FORM_INITIAL_VALUE);
        alert(res.data.message);
        dispatch({ type: "SET_BD_STATE_INACTIVE" });
      })
      .catch((error) => {
        alert(
          JSON.stringify({
            code: error.code,
            message: error.response.data.message,
          })
        );
      });
  };

  return (
    <form className="entry-form" onSubmit={handleFormSubmission}>
      <FormControl fullWidth>
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          id="type"
          required
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
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default NewEntry;

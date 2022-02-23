import React from "react";
import { TextField, Button } from "@mui/material";

export const Form = ({ data, onChange, close, handleFormSubmit }) => {
  const { name, email, phone, dob } = data;

  

  return (
    <form>
      <TextField
        style={{ width: "100%", margin: "5px" }}
        type="text"
        id="name"
        label="name"
        variant="outlined"
        value={name}
        onChange={onChange}
      />
      <br />
      <TextField
        style={{ width: "100%", margin: "5px" }}
        type="email"
        label="email"
        variant="outlined"
        id="email"
        value={email}
        onChange={onChange}
      />
      <br />
      <TextField
        style={{ width: "100%", margin: "5px" }}
        type="number"
        id="phone"
        label="phone"
        variant="outlined"
        value={phone}
        onChange={onChange}
      />
      <br />
      <TextField
        style={{ width: "100%", margin: "5px" }}
        type="text"
        id="dob"
        label="Attribute"
        variant="outlined"
        value={dob}
        onChange={onChange}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleFormSubmit}>
        submit
      </Button>
      <Button variant="outlined" color="secondary" onClick={close}>Cancel</Button>
    </form>
  );
};

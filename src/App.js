import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Modal from "./components/users/Modal";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
  dob: "",
};

function App() {
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValues);

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    { headerName: "Dob", field: "dob" },
    {
      headerName: "actions",
      field: "id",
      cellRenderer: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.data)}
          >
            edit
          </Button>{" "}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(params.value)}
          >
            delete
          </Button>
        </div>
      ),
    },
  ];

  const getUsers = () => {
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((response) => setTableData(response));
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = () => {
    if (formData.id) {
      // const confirm = window.confirm(
      //   "Are you sure, you want to update this row ?"
      // );
      // confirm &&
        fetch(`http://localhost:4000/users/${formData.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: { "content-type": "application/json" },
        })
          .then((resp) => resp.json())
          .then((resp) => {
            handleClose();
            getUsers();
          });
    } else {
      fetch("http://localhost:4000/users", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "content-type": "application/json" },
      })
        .then((response) => response.json())
        .then((response) => {
          handleClose();
          getUsers();
          setFormData(initialValues);
        });
    }
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this row",
      id
    );
    if (confirm) {
      fetch(`http://localhost:4000/users/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getUsers());
    }
  };

  const handleEdit = (dataFromRow) => {
    setFormData(dataFromRow);
    handleOpen();
  };

  console.log(formData);
  return (
    <div>
      <h1 align="center">React-App</h1>
      <h3>Crud operations with json server in ag grid</h3>
      <Button variant="contained" onClick={handleOpen}>
        Add user
      </Button>
      <div className="ag-theme-alpine" style={{ height: "600px" }}>
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
      <Modal
        open={open}
        close={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;

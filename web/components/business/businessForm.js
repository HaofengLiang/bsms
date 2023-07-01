// A form component with MUI for creating a new business.
import styles from "@/styles/BusinessForm.module.css";

import { useState } from "react";
import http from "@/utils/http";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BusinessForm({ open, handleClose }) {
  const [business, setBusiness] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    website: "",
    email: "",
    description: "",
  });
  const [error, setError] = useState(undefined);

  const handleChange = (e) => {
    setError(undefined);
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(undefined);
      const response = await http.post(
        "http://localhost:8080/business",
        business
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const form = (
    <form onSubmit={handleSubmit} className={style.form}>
      <TextField
        variant="standard"
        label="Business Name"
        type="text"
        className={styles.formControl}
        id="name"
        name="name"
        value={business.name}
        onChange={handleChange}
      />
      <TextField
        variant="standard"
        label="Address"
        type="text"
        className={styles.formControl}
        id="address"
        name="address"
        value={business.address}
        onChange={handleChange}
      />
      <TextField
        variant="standard"
        label="City"
        type="text"
        className={styles.formControl}
        id="city"
        name="city"
        value={business.city}
        onChange={handleChange}
      />
      <TextField
        variant="standard"
        label="State"
        type="text"
        className={styles.formControl}
        id="state"
        name="state"
        value={business.state}
        onChange={handleChange}
      />
      <TextField
        variant="standard"
        label="Zip"
        type="text"
        className={styles.formControl}
        id="zip"
        name="zip"
        value={business.zip}
        onChange={handleChange}
      />
      <TextField
        variant="standard"
        label="Phone"
        type="text"
        className={styles.formControl}
        id="phone"
        name="phone"
        value={business.phone}
        onChange={handleChange}
      />
      <TextField
        variant="standard"
        label="Website"
        type="text"
        className={styles.formControl}
        id="website"
        name="website"
        value={business.website}
        onChange={handleChange}
      />
      <TextField
        variant="standard"
        label="Email"
        type="text"
        className={styles.formControl}
        id="email"
        name="email"
        value={business.email}
        onChange={handleChange}
      />
      <TextField
        variant="standard"
        label="Description"
        type="text"
        className={styles.formControl}
        id="description"
        name="description"
        value={business.description}
        onChange={handleChange}
      />
      <div className={styles.buttons}>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </div>
    </form>
  );

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="spring-modal-title" variant="h6" component="h2">
            Create a new business
          </Typography>
          {error && <p className="text-danger">{error}</p>}
          {form}
        </Box>
      </Fade>
    </Modal>
  );
}

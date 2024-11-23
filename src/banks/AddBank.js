import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddBank.css";
import config from './config';

function AddBank() {
  const [notification, setNotification] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  let navigate = useNavigate();

  const [bank, setBank] = useState({
    bankName: "",
    bankAddress: "",
    email: "",
    contactNumber: "",
  });

  const { bankName, bankAddress, email, contactNumber } = bank;

  const onInputChange = (e) => {
    setBank({ ...bank, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    setNotification("");
    setSuccessMessage("");

    if (!bankName.trim()) {
      setNotification("Bank Name is required.");
      return false;
    }

    if (!bankAddress.trim()) {
      setNotification("Bank Address is required.");
      return false;
    }

    if (!email.trim()) {
      setNotification("Email is required.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setNotification(
        'Email format is invalid. It should contain "@" and end with ".com".'
      );
      return false;
    }

    if (!contactNumber.trim()) {
      setNotification("Contact Number is required.");
      return false;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      setNotification("Contact Number should be 10 digits.");
      return false;
    }

    setSuccessMessage("Successfully added the bank!!");
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post(`${config.apiBaseUrl}/bank/addBank`, bank);

        setSuccessMessage("Successfully added the bank!");
        setNotification("");
        navigate("/dashboard/allbanks");
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <div className="addbank">
      <div className="addbank-container">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Bank</h2>
          <p>"Feel free to include multiple banks right at this location!"</p>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <form onSubmit={(e) => onSubmit(e)}>
            {notification && (
              <div className="alert alert-danger">{notification}</div>
            )}
            <div className="mb-3">
              <label htmlFor="bankName" className="form-label">
                Bank Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Bank name"
                name="bankName"
                value={bankName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bankAddress" className="form-label">
                Bank Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Bank address"
                name="bankAddress"
                value={bankAddress}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter bank email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Contact Number"
                name="contactNumber"
                value={contactNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link className="btn btn-danger mx-2" to="/dashboard/userhome">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBank;

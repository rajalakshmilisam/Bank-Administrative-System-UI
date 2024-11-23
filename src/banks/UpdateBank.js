import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './UpdateBank.css'
import config from '../config';

export default function UpdateBank() {
  const [notification, setNotification] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  let navigate = useNavigate();

  const { id } = useParams();

  const [bank, setBank] = useState({
    bankName: "",
    bankAddress: "",
    email: "",
    contactNumber: "",
  });

  const { bankName, bankAddress, email, contactNumber } = bank;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setBank({ ...bank, [name]: value });
  };

  const validateForm = () => {
    setNotification("");
    setSuccessMessage("");

    if (!bankName) {
      setNotification("Bank Name is required.");
      return false;
    }

    if (!bankAddress) {
      setNotification("Bank Address is required.");
      return false;
    }

    if (!email) {
      setNotification("Email is required.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setNotification(
        'Email format is invalid. It should contain "@" and end with ".com".'
      );
      return false;
    }

    if (!contactNumber) {
      setNotification("Contact Number is required.");
      return false;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      setNotification("Contact Number should be 10 digits.");
      return false;
    }

    setSuccessMessage("Bank Updated successfully!!")
    return true;
  };

  useEffect(() => {
    loadBank(id);
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.put(`${config.apiBaseUrl}/bank/updateBank/${id}`, bank);
        setSuccessMessage("Successfully updated the bank!");
        setNotification("");
        navigate("/dashboard/allbanks");
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  const loadBank = async (id) => {
    try {
      const result = await axios.get(
        `${config.apiBaseUrl}/bank/fetchById/${id}`
      );
      if (result.data.listOfBanksDTO.length > 0) {
        setBank(result.data.listOfBanksDTO[0]);
      } else {
        console.log("Bank not found!");
      }
    } catch (err) {
      alert("Error loading bank details: " + err.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Update Bank Details!!</h2>
          <p>
            "Customize your preferences and make alterations at your
            convenience."
          </p>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          
          <form onSubmit={(e) => onSubmit(e)}>
            {notification && (
              <div className="alert alert-danger">{notification}</div>
            )}
            <div className="mb-3">
              <label htmlFor="Name" className="form-label lable-style">
                Bank Name
              </label>
              <input
                type={"text"}
                className="form-control input-style"
                placeholder="Enter Bank name"
                name="bankName"
                value={bankName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label lable-style">
                Bank Address
              </label>
              <input
                type={"text"}
                className="form-control input-style"
                placeholder="Enter Bank address"
                name="bankAddress"
                value={bankAddress}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label lable-style">
                Email
              </label>
              <input
                type={"text"}
                className="form-control input-style"
                placeholder="Enter bank email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label lable-style">
                Contact Number
              </label>
              <input
                type={"text"}
                className="form-control input-style"
                placeholder="Enter Contact Number"
                name="contactNumber"
                value={contactNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/dashboard/allbanks">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

// src/Pages/Form.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Form = ({ setUserName }) => {
  const [validEntries, setValidEntries] = useState([]);
  const [submissionError, setSubmissionError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const nameExists = validEntries.some(entry => entry.name === data.name);
    const emailExists = validEntries.some(entry => entry.email === data.email);

    if (nameExists || emailExists) {
      if (nameExists && emailExists) {
        setSubmissionError('Both name and email are already taken');
      } else if (nameExists) {
        setSubmissionError('Name is already taken');
      } else if (emailExists) {
        setSubmissionError('Email is already taken');
      }
    } else {
      setSubmissionError('');
      setUserName(data.name); // Set the user's name in the parent component
      setValidEntries([...validEntries, { name: data.name, email: data.email }]); // Append the valid entry to the list
    }
  };

  const email = watch('email');

  const validateName = (value) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(value) || 'Name must contain only English letters and spaces';
  };

  return (
    <div className="container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              },
              validate: validateName
            })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmEmail">Confirm Email:</label>
          <input
            type="email"
            id="confirmEmail"
            className="form-control"
            {...register('confirmEmail', {
              required: 'Confirm Email is required',
              validate: (value) => value === email || 'Emails do not match'
            })}
          />
          {errors.confirmEmail && <p className="text-danger">{errors.confirmEmail.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {submissionError && <p className="text-danger mt-2">{submissionError}</p>}

      {validEntries.length > 0 && (
        <div className="mt-3">
          <h2>Valid Entries</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {validEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td><FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Form;

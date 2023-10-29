import React from 'react';
import { useFormik } from 'formik';
import { STATUS_OPTIONS, getStatusOptions, ADULT_OPTIONS, getAdultOptions } from './helpers';
import { TextField, Button } from '@mui/material';
import Select from 'react-select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextareaAutosize from '@mui/material/TextareaAutosize';



const MovieCreateForm = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      release_date: null,
      poster_path: '',
      status: STATUS_OPTIONS[0],
      popularity: 0,
      overview: '',
      budget: 0,
      adult: false,
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleDateChange = date => {
    formik.setFieldValue('release_date', date);
  };

  
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #ced4da',
      width: "400px",
      height: "50px",
      boxShadow: state.isFocused ? '0 0 0 0.1rem rgba(0, 0, 0, 0.7)' : 'none',
      '@media (max-width: 768px)': {
        width: '300px',
      },
      '@media (max-width: 480px)': {
        width: '250px',
      },
      '@media (max-width: 320px)': {
        width: '200px',
      },
      '&:hover': {
        border: '1px solid #000',
      },
      '&:focus': {
        border: '1px solid #000',
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'white',
      zIndex: 9999,
    }),
    singleValue: (base) => ({
      ...base,
      backgroundColor: 'white',
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? 'gray' : 'white',
      color: isSelected ? 'black' : 'gray',
      ':active': {
        backgroundColor: 'gray',
        color: 'black',
      },
      ':hover': {
        backgroundColor: isSelected ? 'gray' : 'lightgray',
        color: isSelected ? 'black' : 'gray',
      },
    }),
  };
  


  return (
      <form onSubmit={formik.handleSubmit} style={{ margin: '0 auto', minHeight: 'calc(100vh - 140px)', display: 'grid', justifyItems: 'center', boxShadow: '10px 0 10px -10px black, -10px 0 10px -10px black', }}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          sx={{ 
            width: '400px', 
            marginBottom: '20px', 
            marginTop: "20px",
            '@media (max-width: 768px)': {
              width: '300px',
            },
            '@media (max-width: 480px)': {
              width: '250px',
            },
            '@media (max-width: 320px)': {
              width: '200px',
            },
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={formik.values.release_date}
            onChange={handleDateChange}
            inputFormat="yyyy-MM-dd"
            renderInput={params => <TextField {...params} variant="outlined" />}
            sx={{ 
            width: '400px', 
            marginBottom: "20px", 
            '@media (max-width: 768px)': {
              width: '300px',
            },
            '@media (max-width: 480px)': {
              width: '250px',
            },
            '@media (max-width: 320px)': {
                width: '200px',
              },
            }}
          />
        </LocalizationProvider>

        <TextField
          id="poster_path"
          label="Poster Path"
          variant="outlined"
          name="poster_path"
          onChange={formik.handleChange}
          value={formik.values.poster_path}
          sx={{ 
          width: '400px', 
          marginBottom: '20px', 
          marginTop: "20px",
          '@media (max-width: 768px)': {
            width: '300px',
          },
          '@media (max-width: 480px)': {
            width: '250px',
          },
          '@media (max-width: 320px)': {
              width: '200px',
            },
          }}
          InputProps={{
            style: {
              color: 'black',
              borderColor: 'black', 
            },
            inputProps: {
              max: 10,
              min: 0,
            },
          }}
        />

        <TextField
          id="popularity"
          label="Popularity"
          variant="outlined"
          type="number"
          name="popularity"
          onChange={formik.handleChange}
          value={formik.values.popularity}
          InputProps={{
            inputProps: {
              max: 10,
              min: 0,
            },
          }}
          sx={{ 
          width: '400px', 
          marginBottom: '20px', 
          marginTop: "20px", 
          '@media (max-width: 768px)': {
            width: '300px',
          },
          '@media (max-width: 480px)': {
            width: '250px',
          },
          '@media (max-width: 320px)': {
              width: '200px',
            },
          }}
        />

        <Select
          options={getStatusOptions(STATUS_OPTIONS)}
          onChange={newValue => formik.setFieldValue('status', newValue.value)}
          isSearchable={false}
          placeholder="Select Status"
          styles={{ ...selectStyles }}
        />

        <TextField
          id="overview"
          label="Overview"
          variant="outlined"
          name="overview"
          onChange={formik.handleChange}
          value={formik.values.overview}
          multiline
          maxRows={6}
          InputProps={{
            inputComponent: TextareaAutosize,
          }}
          sx={{ 
            width: '400px', 
            marginBottom: '20px', 
            marginTop: "20px", 
            '@media (max-width: 768px)': {
              width: '300px',
            },
            '@media (max-width: 480px)': {
              width: '250px',
            },
            '@media (max-width: 320px)': {
                width: '200px',
              },
            }}
        />

        <TextField
          id="budget"
          label="Budget"
          variant="outlined"
          type="number"
          name="budget"
          onChange={formik.handleChange}
          value={formik.values.budget}
          InputProps={{
            inputProps: {
              max: 9999999999999,
              min: 0,
            },
          }}
          sx={{ 
            width: '400px', 
            marginBottom: '20px',             
            '@media (max-width: 768px)': {
              width: '300px',
            },
            '@media (max-width: 480px)': {
              width: '250px',
            },
            '@media (max-width: 320px)': {
                width: '200px',
            },
          }}
        />

        <Select
          placeholder="Adult"
          options={getAdultOptions(ADULT_OPTIONS)}
          onChange={newValue => formik.setFieldValue('adult', newValue.value === 'yes' ? true : false)}
          styles={selectStyles}
          isSearchable={false}
        />

        <Button
          type="submit"
          sx={{
            width: '400px',
            background: 'black',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '4px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background 0.3s',
            opacity: "75%",
            "&:hover": {
              backgroundColor: 'gray',
            },
            '@media (max-width: 768px)': {
              width: '300px',
            },
            '@media (max-width: 480px)': {
              width: '250px',
            },
            '@media (max-width: 320px)': {
                width: '200px',
            },
          }}
        >
          Submit
        </Button>

      </form>
  );
};

export default MovieCreateForm;

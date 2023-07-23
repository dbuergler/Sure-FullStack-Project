import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'



const FormCreate = () => {
    const url = 'http://localhost:8000/entries/'
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.withCredentials = true;
    //adding state to the functional component through useState React Hook and create form data
    const values = {
        id: 0,
        name: '',
        email: '',
        select: '',
        raceOption: '',
        comments: '',

    }
    
    //setting various states for entries, entry data, errors, and if the form is submitting which is set to false
    const [entries, setEntries] = useState([]);
    const [entryData, setEntryData] = useState([values]);
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);


    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setEntryData({
            ...entryData, [name]: value,
        });
    };

    const validateEntry = () => {
        let entryErrors = {};

        //validating the form fields
        if(!entryData.name) {
            entryErrors.name ="Name is required";
        }

        if (!entryData.email) {
            entryErrors.email = 'Email is required';
          } else if (!/\S+@\S+\.\S+/.test(entryData.email)) {
            entryErrors.email = 'Invalid email address';
          }
        
        if(!entryData.select) {
            entryErrors.select = 'Please select an option';
        }

        if(!entryData.raceOption) {
            entryErrors.raceOption ="Please select a race option";
        }

        if (!entryData.comments) {
            entryErrors.comments = 'Comments are required';
          }

        return entryErrors;
    };


    //creating the onSubmit function to submit the form to the backend
    const handleSubmit =  (e) => {
            //using axios to call to the backend to create or post a new entry
            e.preventDefault();
            const entryErrors = validateEntry();
            setErrors(entryErrors);

            if(Object.keys(entryErrors).length === 0) {
                setIsSubmitting(true);

                

                if(entryData.id) {
                    //if form has an "id" property, then we are updating the form
                   axios.put(`${url}${entryData.id}`, entryData, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': Cookies.get('csrfToken'), // Include the CSRF token from cookies in the headers 
                        }
                    })
                    .then((response) => {
                        console.log('Entry updated successfully', response.data);
                        setIsSubmitting(false);
                        setEntryData(values);// Reset the form fields after successful update
                        refreshEntries(); // Update the list of form entries
                    })
                    .catch((error) => {
                        console.error('Error updating entry', error);
                        setIsSubmitting(false);
                    })
                } else {
                    // No "id" property, it means we're creating a new entry
                    axios.post(url, entryData, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': Cookies.get('csrfToken'), // Include the CSRF token from cookies in the headers
                        }
                    })
                    .then((response) => {
                        console.log('Entry updated successfully', response.data);
                        setIsSubmitting(false);
                        setEntryData(values);
                        refreshEntries();
                    })
                    .catch((error) => {
                        console.error('Error posting entry', error);
                        setIsSubmitting(false);
                    });
                }    
            };
    };

    const handleEdit = (entry) => {
        setEntryData(entry);
    }

    const handleDelete =  (id) => {
        //deleting a entry with a certain id
         axios.delete(`${url}${id}/`, {
            withCredentials: true,
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'), // Include the CSRF token from cookies in the headers
            }
        })
        .then((response) => {
            console.log('Entry deleted successfully:', response.data);
            refreshEntries(); // Update the list of form entries after successful deletion
        })
        .catch((error) => {
            console.error('Error deleting  entry:', error);
          });
    };

    const refreshEntries =  () => {
        //getting all entries from the form
       axios.get(url)
        .then((response) => {
            setEntries(response.data);
        })
        .catch((error) => {
            console.error('Error fetching entries:', error);
          })
    }

    useEffect(() => {
        refreshEntries();
      }, []); // Fetch form entries when the component mounts


    return(
        // UI interface showing the form with validations and submit button as well as a list of entries after submit is clicked
        <div>
        <form className='form' onSubmit={handleSubmit}>
            <div className='formField'>
                <label className='label'>Name: </label>
                <input className='input' name='name' type='text' value={entryData.name} onChange={handleChange} ></input>
                {errors.name && <div className='errors'>{errors.name}</div>}
            </div>
            <div className='formField'>
                <label className='label'>Email: </label>
                <input className='input'type='text' name='email' value={entryData.email} onChange={handleChange}></input>
                {errors.email && <div className='errors'>{errors.email}</div>}
            </div>
            <div className='formField'>
                <label className='label'>Select: </label>
                <select value={entryData.select} name="select" onChange={handleChange}>
                    <option value=''>Do you want your name on your bib?</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                </select>
                {errors.select && <div className='errors'>{errors.selec}</div>}
            </div>
            <div className='formField'>
            <label className='label'>Choose a Race: </label>
                <label >
                    <input
                        type="radio"
                        onChange={handleChange}
                        name="raceOption"
                        value="5k"
                        checked={entryData.raceOption === "5k"}
                        
                    />
                    5k
                </label>
                <label >
                    <input
                        type="radio"
                        onChange={handleChange}
                        name="raceOption"
                        value="Half-Marathon"
                        checked={entryData.raceOption === "Half-Marathon"}

                    />
                    Half-Marathon
                </label>
                <label >
                    <input
                        type="radio"
                        onChange={handleChange}
                        name="raceOption"
                        value="Marathon"
                        checked={entryData.raceOption === "Marathon"}
                    />
                    Marathon
                </label>
                {errors.raceOption && <div className='errors'>{errors.raceOption}</div>}
            </div>
            <div className='formField'>
                <label className='label'>Comments: </label>
                <textarea className='text-area' name="comments" type='text' value={entryData.comments} onChange={handleChange}></textarea>
                {errors.comments && <div className='errors'>{errors.comments}</div>}
            </div>
            {isSubmitting && <div>Submitting...</div>}
            <button className='submitButton' type='submit' disabled={isSubmitting}>{entryData.id ? 'Update' : 'Submit'}</button>
        </form>
            <h2>List of Enrtries</h2>
                <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>
                        <div>
                            <strong>Name: </strong> {entry.name}
                        </div>
                        <div>
                            <strong>Email: </strong> {entry.email}
                        </div>
                        <div>
                            <strong>Select: </strong> {entry.select}
                        </div>
                        <div>
                            <strong>Choose a Race: </strong> {entry.select}
                        </div>
                        <div>
                            <strong>Comments: </strong> {entry.select}
                        </div>
                        <button onClick={() => handleEdit(entry)}>Edit</button>
                        <button onClick={() => handleDelete(entry.id)}>Delete</button>
                    </li>
                ))}
                </ul>
        </div>
    )

}

export default FormCreate;
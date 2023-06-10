// File that will render a single note and edit/delete functionality
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_SINGLE_ENTRY} from '../../utils/queries';
import { EDIT_ENTRY } from "../../utils/mutations";


const SingleEntry = () => {
    const { entryId } = useParams();
    const [formState, setFormState] = useState({ entryTitle: '', entryContent: ''});

    const { loading, data } = useQuery( QUERY_SINGLE_ENTRY, {
        variables: { entryId: entryId },
    });

    console.log(data);
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
      };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log(formState);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-1">
            <form
                style={{
                    border: "2px solid blue",
                    borderRadius: "10px",
                    padding: "30px",
                }}
                onSubmit={handleFormSubmit}
                >
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">
                    Entry Title
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="titleHelp"
                    onChange={handleInputChange}
                    name='entryTitle'
                    value={formState.entryTitle}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Note" className="form-label">
                    Entry
                    </label>
                    <textarea
                    type="text"
                    className="form-control"
                    id="Note"
                    onChange={handleInputChange}
                    name='entryContent'
                    value={formState.entryContent}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                </form>
                </div>
    );
};

export default SingleEntry;


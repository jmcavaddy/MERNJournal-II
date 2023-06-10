import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from "../../utils/queries";
import { ADD_ENTRY } from "../../utils/mutations";

const CreateNote = () => {
  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE);

  const techList = data?.profile || [];

  const [formData, setFormData] = useState({
    entryTitle: '',
    entryContent: '',
    entryAuthor: ''
  });

  let navigate = useNavigate();

  const [createNote, { error }] = useMutation(ADD_ENTRY);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createNote({
        variables: { ...formData },
      });

      navigate(`/homepage/${data.createNote._id}`);
    } catch (err) {
      console.error(err);
    }

    setFormData({
        entryTitle: '',
        entryContent: '',
        entryAuthor: ''
    });
  };

  return (
    <form
    style={{
      border: "2px solid blue",
      borderRadius: "10px",
      padding: "30px",
    }}
  >
    <div className="mb-3">
      <label htmlFor="Title" className="form-label">
        Note's title
      </label>
      <input
        type="text"
        className="form-control"
        id="title"
        aria-describedby="titleHelp"
        placeholder="Note Title"
      />
    </div>
    <div className="mb-3">
      <label for="Note" className="form-label">
        Note
      </label>
      <textarea
        type="text"
        className="form-control"
        id="Note"
        placeholder="Enter your Note"
      ></textarea>
    </div>

    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form>
  );
};

export default CreateNote;

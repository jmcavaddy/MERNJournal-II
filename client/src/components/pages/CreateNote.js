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
    <div className="card bg-white card-rounded w-25">
      <div className="card-header bg-dark text-center">
        <h1>Let's create a matchup!</h1>
      </div>
      <div className="card-body m-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <label>Tech 1: </label>
            <select name="tech1" onChange={handleInputChange}>
              {techList.map((tech) => {
                return (
                  <option key={tech._id} value={tech.name}>
                    {tech.name}
                  </option>
                );
              })}
            </select>
            <label>Tech 2: </label>
            <select name="tech2" onChange={handleInputChange}>
              {techList.map((tech) => {
                return (
                  <option key={tech._id} value={tech.name}>
                    {tech.name}
                  </option>
                );
              })}
            </select>
            <button className="btn btn-danger" type="submit">
              Create Matchup!
            </button>
          </form>
        )}
      </div>
      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default CreateNote;

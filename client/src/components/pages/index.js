import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import "../../App";
import { QUERY_ME } from '../../utils/queries';
import { REMOVE_ENTRY } from "../../utils/mutations";
import CreateNote from "./CreateNote";
import Auth from '../../utils/auth';

const Notes = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);

  console.log (userData.entries);
  console.log("userData", userData);

  const [removeEntry] = useMutation(REMOVE_ENTRY);

  const handleDelete = async (entryId) => {
    try {
      const { data } = await removeEntry({
        variables: { removeEntryEntryId: entryId }
      });
      // Handle success (e.g., show a message)
      console.log(data);
    } catch (err) {
      // Handle error (e.g., show an error message)
      console.error(err);
    }
  };

  if (!userData || !userData.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content">
        <div className="col-md-10">
          <div>
            <button style={{ float: "right" }} onClick={Auth.logout}>Logout</button>
          </div>
          <div>
            <h1 className="my-4 text-center">My Entries</h1>
            <CreateNote />
            <div>
              <div className="my-4 mynotes row">
                {userData.entries.map((entry) => {
                  return (
                    <Card key={entry._id} className="card mx-2" style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>{entry.entryTitle}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {entry.createdAt}
                        </Card.Subtitle>
                        <Card.Text>
                          {entry.entryContent}
                        </Card.Text>
                        <Card.Link href="#">Edit</Card.Link>
                        <Card.Link href="#" onClick={() => handleDelete(entry._id)}>Delete</Card.Link>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;

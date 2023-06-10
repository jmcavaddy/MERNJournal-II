import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PROFILE } from "../../utils/queries";
import "../../App";
import Navbar from "../Navbar";
import { ADD_ENTRY } from "../../utils/mutations";
import { QUERY_ME } from '../../utils/queries';
import CreateNote from "./CreateNote";


const Notes = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
      if (data) {
        setUserData(data.me);
      }
  }, [data]);

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  if (!userData?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content">
        <div className="col-md-10">
          <div>
            <h1 className="my-4 text-center">My Notes</h1>
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
                      <Card.Link href="#">Delete</Card.Link>
                    </Card.Body>
                  </Card>
                  );
                })};
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;

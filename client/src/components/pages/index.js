import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PROFILE } from "../../utils/queries";
import "../../App";
import Navbar from "../Navbar";
import { ADD_ENTRY } from "../../utils/mutations";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileUsername: 'hellohellotesting' },
  });

  useEffect(() => {
    if (!loading && data) {
      setNotes(data.profile.entries);
    }
  }, [loading, data]);

  console.log("notes", notes);

;

  
  return (
    <div className="container">
      <div className="row justify-content">
        <div className="col-md-10">
          <div>
            <h1 className="my-4 text-center">My Notes</h1>
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

            <div>
              <div className="my-4 mynotes row">
                <Card className="card mx-2" style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Card subtitle
                    </Card.Subtitle>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Edit</Card.Link>
                    <Card.Link href="#">Delete</Card.Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;

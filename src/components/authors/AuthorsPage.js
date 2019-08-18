import React, { useEffect, useState } from "react";
import AuthorList from "./AuthorList";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authorStore from "../../authorStore/AuthorStore";
import * as authorActions from "../../actions/authorActions";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authorStore.getAuthors().length === 0) authorActions.loadAuthors();

    return () => authorStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  const handleDelete = id => {
    authorActions.deleteAuthor(id).then(() => {
      toast.success("Author deleted successfully");
    });
  };

  return (
    <>
      <h2>Authors</h2>
      <Link className="btn btn-primary" to="/author">
        Add Author
      </Link>
      <AuthorList authors={authors} deleteAuthor={handleDelete} />
    </>
  );
};

export default AuthorsPage;

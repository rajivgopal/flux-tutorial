import React, { useState, useEffect } from "react";
import AuthorForm from "./AuthorForm";
import { toast } from "react-toastify";
import authorStore from "../../authorStore/AuthorStore";
import * as authorActions from "../../actions/authorActions";

const Author = props => {
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [errors, setErrors] = useState({});
  const [author, setAuthor] = useState({
    id: null,
    name: ""
  });

  useEffect(() => {
    const id = props.match.params.id;
    authorStore.addChangeListener(onChange);

    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (id) {
      let _author = authorStore.getAuthorsById(id);
      if (_author == null) props.history.push("/dummy");
      setAuthor(_author);
    }
    return () => authorStore.removeChangeListener(onChange);
  }, [props.match.params.id, authors.length, props.history]);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  const saveAuthor = event => {
    event.preventDefault();
    if (!isFormInvalid()) return;

    authorActions.saveAuthor(author).then(() => {
      props.history.push("/authors");
      toast.success("Author saved");
    });
  };

  function isFormInvalid() {
    const _errors = {};
    if (!author.name) _errors.name = "Invalid author name";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const updatedAuthor = { ...Author, [name]: value };
    setAuthor(updatedAuthor);
  };

  return (
    <>
      <h2> Manage Author</h2>
      <AuthorForm
        errors={errors}
        onSubmit={saveAuthor}
        onChange={handleChange}
        author={author}
      />
    </>
  );
};

export default Author;

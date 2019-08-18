import React from "react";
import PropTypes from "prop-types";
import * as CustomTypes from "../customTypes/CustomTypes";

const AuthorList = ({ authors, deleteAuthor }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Author Id</th>
          <th>Author Name</th>
        </tr>
      </thead>
      <tbody>
        {authors.map(author => {
          return (
            <tr key={author.id}>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteAuthor(author.id)}
                >
                  Delete
                </button>
              </td>
              <td>{author.id}</td>
              <td>{author.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  courses: PropTypes.arrayOf(CustomTypes.AuthorResult.isRequired),
  deleteAuthor: PropTypes.func.isRequired
};

AuthorList.defaultProps = {
  authors: []
};

export default AuthorList;

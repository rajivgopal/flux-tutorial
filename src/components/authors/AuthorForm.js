import React from "react";
import PropTypes from "prop-types";
import * as CustomTypes from "../customTypes/CustomTypes";
import TextInput from "../common/Textinput";

function AuthorForm({ onSubmit, onChange, errors, author }) {
  return (
    <form onSubmit={onSubmit}>
      <TextInput
        label="Author Name"
        id="name"
        name="name"
        value={author.name}
        onChange={onChange}
        error={errors.name}
      />
      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

AuthorForm.propTypes = {
  author: CustomTypes.AuthorResult,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default AuthorForm;

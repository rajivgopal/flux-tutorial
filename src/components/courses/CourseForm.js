import React from "react";
import PropTypes from "prop-types";
import * as CustomTypes from "../customTypes/CustomTypes";
import TextInput from "../common/Textinput";
import SelectInput from "../common/SelectInput";

function CourseForm({ onSubmit, course, onChange, errors, authors }) {
  const options = authors.map(_author => (
    <option key={_author.id} value={_author.id}>
      {_author.name}
    </option>
  ));

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        label="Title"
        id="title"
        name="title"
        value={course.title}
        onChange={onChange}
        error={errors.title}
      />

      <SelectInput
        label="Author"
        id="author"
        name="authorId"
        value={course.authorId || 0}
        onChange={onChange}
        error={errors.authorId}
        options={options}
      />

      <TextInput
        label="Category"
        id="category"
        name="category"
        value={course.category}
        onChange={onChange}
        error={errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: CustomTypes.CourseResult,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
export default CourseForm;

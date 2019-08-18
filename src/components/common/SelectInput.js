import React from "react";
import PropTypes from "prop-types";

const SelectInput = ({ id, label, name, value, onChange, error, options }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="field">
        <select
          id={id}
          name={name}
          value={value}
          className="form-control"
          onChange={onChange}
        >
          <option key="-1" value="">
            Select value
          </option>
          {options}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  options: PropTypes.array.isRequired
};

SelectInput.defaultProps = {
  error: ""
};

export default SelectInput;

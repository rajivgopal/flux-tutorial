import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as CustomTypes from "../customTypes/CustomTypes";

const CourseList = ({ courses, deleteCourse, authors }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author Id</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => {
          const authorName = getAuthorName(authors, course);

          return (
            <tr key={course.id}>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                {<Link to={"/course/" + course.slug}>{course.title}</Link>}
              </td>
              <td>{authorName}</td>
              <td>{course.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.arrayOf(CustomTypes.CourseResult.isRequired),
  deleteCourse: PropTypes.func.isRequired
};

CourseList.defaultProps = {
  courses: []
};

export default CourseList;

function getAuthorName(authors, course) {
  const author = authors.find(_author => _author.id === course.authorId);
  return author ? author.name : "";
}

import React, { useEffect, useState } from "react";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import store from "../../courseStore/CourseStore";
import * as courseActions from "../../actions/courseActions";
import { toast } from "react-toastify";
import authorStore from "../../authorStore/AuthorStore";
import * as authorActions from "../../actions/authorActions";

const CoursesPage = () => {
  const [courses, setCourses] = useState(store.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    store.addChangeListener(onChange);
    if (store.getCourses().length === 0) {
      courseActions.loadCourses();
      authorActions.loadAuthors();
    }
    return () => store.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setCourses(store.getCourses());
    setAuthors(authorStore.getAuthors());
  }

  const handleDelete = id => {
    courseActions.deleteCourse(id).then(() => {
      toast.success("Course deleted successfully");
    });
  };
  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses}
        deleteCourse={handleDelete}
        authors={authors}
      />
    </>
  );
};

export default CoursesPage;

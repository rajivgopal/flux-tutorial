import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { toast } from "react-toastify";
import store from "../../courseStore/CourseStore";
import * as courseActions from "../../actions/courseActions";
import authorStore from "../../authorStore/AuthorStore";
import * as authorActions from "../../actions/authorActions";

const Course = props => {
  const [courses, setCourses] = useState(store.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    store.addChangeListener(onChange);

    if (courses.length === 0) {
      courseActions.loadCourses();
      authorActions.loadAuthors();
    } else if (slug) {
      let _course = store.getCourseBySlug(slug);
      if (_course == null) props.history.push("/dummy");
      setCourse(_course);
    }
    return () => store.removeChangeListener(onChange);
  }, [props.match.params.slug, courses.length, props.history]);

  function onChange() {
    setCourses(store.getCourses());
    setAuthors(authorStore.getAuthors());
  }

  const saveCourse = event => {
    event.preventDefault();
    if (!isFormInvalid()) return;

    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved");
    });
  };

  function isFormInvalid() {
    const _errors = {};
    if (!course.title) _errors.title = "Invalid title";
    if (!course.authorId) _errors.authorId = "Invalid author id";
    if (!course.category) _errors.category = "Invalid catgory";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const updatedCourse = { ...course, [name]: value };
    setCourse(updatedCourse);
  };

  return (
    <>
      <h2> Manage Course</h2>
      <CourseForm
        errors={errors}
        onSubmit={saveCourse}
        onChange={handleChange}
        course={course}
        authors={authors}
      />
    </>
  );
};

export default Course;

import dispatcher from "../apiDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "../actions/courseActionTypes";

export function loadCourses() {
  return courseApi.getCourses().then(courses => {
    dispatcher.dispatch({
      type: actionTypes.LOAD_COURSES,
      courses: courses
    });
  });
}

export function loadCourseBySlug(slug) {
  return courseApi.getCourseBySlug(slug).then(course => {
    dispatcher.dispatch({
      type: actionTypes.LOAD_COURSE_BY_SLUG,
      course: course
    });
  });
}

export function saveCourse(course) {
  return courseApi.saveCourse(course).then(savedCourse => {
    dispatcher.dispatch({
      type: course.id ? actionTypes.UPDATE_COURSE : actionTypes.ADD_COURSE,
      course: savedCourse
    });
  });
}

export function deleteCourse(id) {
  return courseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      type: actionTypes.DELETE_COURSE,
      id: id
    });
  });
}

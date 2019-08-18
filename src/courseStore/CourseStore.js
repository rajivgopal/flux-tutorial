import { EventEmitter } from "events";
import Dispatcher from "../apiDispatcher";
import CustomTypes from "../actions/courseActionTypes";

const CHANGE_EVENT = "change";
let _courses = [];

class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find(_course => _course.slug === slug);
  }
}

const courseStore = new CourseStore();
Dispatcher.register(action => {
  switch (action.type) {
    case CustomTypes.ADD_COURSE:
      _courses.push(action.course);
      courseStore.emitChange();
      break;
    case CustomTypes.UPDATE_COURSE:
      _courses = _courses.map(course => {
        return course.id === action.course.id ? action.course : course;
      });
      courseStore.emitChange();
      break;
    case CustomTypes.DELETE_COURSE:
      _courses = _courses.filter(
        course => course.id !== parseInt(action.id, 10)
      );
      courseStore.emitChange();
      break;
    case CustomTypes.LOAD_COURSES:
      _courses = action.courses;
      courseStore.emitChange();
      break;
    default:
  }
});

export default courseStore;

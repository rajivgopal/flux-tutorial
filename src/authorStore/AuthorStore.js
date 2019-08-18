import { EventEmitter } from "events";
import Dispatcher from "../apiDispatcher";
import CustomTypes from "../actions/authorActionTypes";

const CHANGE_EVENT = "change";
let _authors = [];

class AuthorStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAuthors() {
    return _authors;
  }

  getAuthorsById(id) {
    return _authors.find(author => author.id === id);
  }
}

const authorStore = new AuthorStore();

Dispatcher.register(action => {
  switch (action.type) {
    case CustomTypes.LOAD_AUTHORS:
      _authors = action.authors;
      authorStore.emitChange();
      break;
    case CustomTypes.SAVE_AUTHOR:
      _authors.push(action.author);
      authorStore.emitChange();
      break;
    case CustomTypes.UPDATE_AUTHOR:
      _authors = _authors.map(author =>
        _authors.id === author.id ? action.author : author
      );
      authorStore.emitChange();
      break;
    case CustomTypes.DELETE_AUTHOR:
      _authors = _authors.filter(
        author => author.id !== parseInt(action.id, 10)
      );
      authorStore.emitChange();
      break;
    default:
  }
});

export default authorStore;

import dispatcher from "../apiDispatcher";
import * as authorApi from "../api/authorApi";
import actionTypes from "../actions/authorActionTypes";

export function loadAuthors() {
  return authorApi.getAuthors().then(_authors => {
    dispatcher.dispatch({
      type: actionTypes.LOAD_AUTHORS,
      authors: _authors
    });
  });
}

export function saveAuthor(_author) {
  return authorApi.saveAuthor(_author).then(_savedAuthor => {
    dispatcher.dispatch({
      type: _author.id ? actionTypes.UPDATE_AUTHOR : actionTypes.SAVE_AUTHOR,
      author: _savedAuthor
    });
  });
}

export function deleteAuthor(id) {
  return authorApi.deleteAuthor(id).then(() => {
    dispatcher.dispatch({
      type: actionTypes.DELETE_AUTHOR,
      id
    });
  });
}

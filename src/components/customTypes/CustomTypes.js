import PropTypes from "prop-types";

export const CourseResult = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  authorId: PropTypes.number,
  category: PropTypes.string.isRequired
});


export const AuthorResult = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
});

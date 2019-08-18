import React from "react";
import Header from "./common/Header";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursesPage from "./courses/CoursesPage";
import AboutPage from "./pages/AboutPage";
import PageNotFound from "./pages/404";
import Course from "../components/courses/Course";
import { ToastContainer } from "react-toastify";
import AuthorsPage from "../components/authors/AuthorsPage";
import Author from "../components/authors/Author";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="container-fluid">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/courses" component={CoursesPage} />
        <Route exact path="/course/:slug" component={Course} />
        <Route exact path="/course" component={Course} />
        <Route exact path="/authors" component={AuthorsPage} />
        <Route exact path="/author" component={Author} />
        <Route exact path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;

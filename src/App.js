import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Comments from "./components/Comments";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import Trends from "./components/Trends";
import Taxonomy from "./components/Taxonomy";
import Profile from "./components/Profile";
import "./scss/style.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Posts />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/taxonomy" element={<Taxonomy />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

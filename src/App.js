import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Explore from "./components/ExplorePage/Explore";
import ListingDetailPage from "./components/ListingDetailPage/ListingDetailPage";


function App() {
  
  return(
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>

        {/* Explore page */}
        <Route path="/listings" element={<Explore/>}/>

        {/* Listing Details Page */}
        <Route path="/detail/:property_id" element={<ListingDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App;

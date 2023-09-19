import React from "react";
import Header from "../Header/Header";
import Herosection from "../Herosection/Herosection";
import FeaturedListing from "../FeaturedListing/FeaturedListing";
import "./LandingPage.css";
import Footer from "../Footer/Footer";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <Header onPage="home" />

      {/* Herosection */}
      <Herosection />

      {/* FeaturedListing */}
      <div className="card-container">
        <h1 className="featured-listing-title">
          Here are some of our featured listing :
        </h1>
        <FeaturedListing />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;

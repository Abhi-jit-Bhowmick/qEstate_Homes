import React from "react";
import "./Footer.css"

function Footer() {
  return (
    <div className="footer-container">
      <div className="first-col">
        <h1 className="company-name">QEstate Homes</h1>
        <div className="company-descrition">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      </div>
      <div className="second-col">
        <h2 className="link-header">Contact</h2>
        <ul className="link-item">
                <li>Bangalaru, India</li>
                <li>qestate@gmail.com</li>
                <li>+91-9876543210</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;

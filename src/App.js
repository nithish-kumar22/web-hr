import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";

const App = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [contentState, setContentState] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");
  const [subheadingName, setSubheadingName] = useState("");
  // const [sideBarMobile, setSidebarMobile] = useState(false);
  const [dropdownsState, setDropdownsState] = useState([
    {
      heading: {
        title: "General",
        subheadings: [
          "Declaration",
          "About Gourmet Popcornica LLP",
          "Vision",
          "Mission",
          "Values",
          "Introduction",
          "Equal Opportunity",
          "Terms of Employment",
          "Confidentiality",
        ],
      },
    },
    {
      heading: {
        title: "Recruitment Policy",
        subheadings: [
          "Manpower Requisition",
          "Advertisement",
          "Processing of Applications",
          "Interview Panel",
          "Interview & Selection",
          "Conveyance reimbursements for Candidates",
          "Final Selection",
          "Joining Procedure",
          "Payment of Salary",
          "Deductions from salary",
          "Identity card",
          "Appointment",
          "Internship",
        ],
      },
    },
    // Add more dropdowns as needed
  ]);

  const Dropdown = ({ label, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    return (
      <div className="dropdown">
        <button className="dropdown-button" onClick={handleToggle}>
          {label}
        </button>
        <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`dropdown-item`}
              onClick={() => {
                // setIsSideBarOpen(!isSideBarOpen);
                changeFile(item);
                console.log(subheadingName);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const changeFile = (subheadingName) => {
    console.log(subheadingName);
    fetch(`/${subheadingName}.html`)
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error loading HTML:", error));
  };

  const MenuIcon = ({ setIsSideBarOpen, isSideBarOpen }) => {
    const toggleClass = () => {
      setIsActive(!isActive);
      setIsSideBarOpen(!isSideBarOpen);
    };

    return (
      <div
        className={`container ${isActive ? "change" : ""}`}
        onClick={() => toggleClass()}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="toggle-button">
          <MenuIcon
            setIsSideBarOpen={setIsSideBarOpen}
            isSideBarOpen={isSideBarOpen}
          />
        </div>
        {/* <IoMenuSharp
          className="toggle-button"
          onClick={() => toggleSidebar()}
          color="#000"
          size={35}
        /> */}
        <img src={require("./assets/logo.jpg")} className="logo" />
      </header>
      <div className="Container">
        <div className={`sidebar ${isSideBarOpen ? "open" : "closed"}`}>
          {/* <IoCloseSharp
            className="close-button"
            onClick={() => toggleSidebar()}
            color="#fff"
            size={35}
          /> */}
          {dropdownsState.map((dropdown, index) => (
            <Dropdown
              key={index}
              label={dropdown.heading.title}
              items={dropdown.heading.subheadings}
            />
          ))}
        </div>
        <div
          className={`Content-container ${
            isSideBarOpen ? "content-open" : "content-closed"
          }`}
        >
          <div className="Chat-container">
            <p dangerouslySetInnerHTML={{ __html: htmlContent }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

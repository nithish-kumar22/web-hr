import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchInput, setSearchInput] = useState("");
  const [filteredSubheadings, setFilteredSubheadings] = useState([]);
  const [searchResultOpen, setSearchResultOpen] = useState(false);
  const [formsComponentToRender, setFormsComponentToRender] = useState(false);
  const [contentToRender, setContentToRender] = useState(true);
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        searchResultOpen &&
        !document.querySelector(".search-result").contains(event.target)
      ) {
        setSearchResultOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };

    fetch(`/Declaration.html`)
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error loading HTML:", error));
  }, []);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [contentState, setContentState] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");
  const [subheadingName, setSubheadingName] = useState("");
  const [isSelected, setSelected] = useState(null);

  const [dropdownsState, setDropdownsState] = useState([
    {
      heading: {
        title: "About Smitch",
        subheadings: [
          "General information",
          "Vision",
          "Mission",
          "Values",
          "Address from HR Desk",
        ],
      },
    },
    {
      heading: {
        title: "General employment rules",
        subheadings: [
          "Purpose",
          "Scope",
          "Coverage",
          "Definition",
          "Introduction",
          "Equal Opportunity & Disability Accommodation",
          "Terms of Employment",
          "Types of employment",
          "Roles and responsibilities",
          "Confidentiality",
          "Working hours",
          "Weekly off",
          "Dress Code",
          "Visitors to the workplace",
          "Holidays",
        ],
      },
    },
    {
      heading: {
        title: "Code Of Conduct",
        subheadings: [
          "Workplace Decorum",
          "Conflict of Interest",
          "Company assets & Data safeguarding",
          "Code of conduct committee",
          "POSH - Prevention Of Sexual Harassment",
          "Office Equipment & Usage Policy",
        ],
      },
    },
    {
      heading: {
        title: "HR Policies",
        subheadings: [
          "Personnel Records & Privacy",
          "Employee Induction / Orientation",
          "Attendance management",
          "Probationary period",
          "Rejoining policy",
          "Transfer policy",
          "Seperation policy",
          "Employee Self-Service (ESS-Razorpay) Portal Usage Policy",
        ],
      },
    },
    {
      heading: {
        title: "Compensation and benefit policies",
        subheadings: [
          "Compensation and benefit policies",
          "Pay day & Pay cycle",
          "Tax compliance",
          "Annual Benefits (EPF, ESI, Gratuity)",
          "Leave policy",
          "Employee Expense Reimbursement Policy",
          "Travel policy",
        ],
      },
    },
    {
      heading: {
        title: "Conclusion",
        subheadings: ["Conclusion"],
      },
    },
  ]);

  const Dropdown = ({ label, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="dropdown">
        <button
          onClick={() => {
            handleToggle();
          }}
          className={`dropdown-button ${
            isOpen === true ? "changeFontColor" : ""
          } `}
        >
          {label}
        </button>
        <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{ color: "#0d1430" }}
              className={`dropdown-item`}
              onClick={() => {
                changeFile(item, label);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const downloadFile = (filename) => {
    // Path to the file in the public folder
    const filePath = process.env.PUBLIC_URL + filename;

    // Create a download link
    const downloadLink = document.createElement("a");

    // Set the download link's attributes
    downloadLink.href = filePath;
    downloadLink.download = filename;

    // Append the link to the body (required in some browsers)
    document.body.appendChild(downloadLink);

    // Trigger the click event on the link
    downloadLink.click();

    // Remove the link from the document
    document.body.removeChild(downloadLink);
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    // Filter the subheadings based on the input value
    const filteredSubheadings = dropdownsState
      .flatMap((dropdown) => dropdown.heading.subheadings)
      .filter((subheading) =>
        subheading.toLowerCase().includes(inputValue.toLowerCase())
      );

    setFilteredSubheadings(filteredSubheadings);
  };

  const changeFile = (subheadingName, headingName) => {
    if (headingName === "Forms & Annexures") {
      setFormsComponentToRender(true);
      setContentToRender(false);
    } else {
      setContentToRender(true);
      setFormsComponentToRender(false);
      fetch(`/${subheadingName}.html`)
        .then((response) => response.text())
        .then((data) => setHtmlContent(data))
        .catch((error) => console.error("Error loading HTML:", error));
    }
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

        <div className="detail">
          <img src={require("./assets/smitch-logo.png")} className="logo" />
          <p className="emp">Employee Policies</p>

          {/* <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              maxHeight: "100%",
            }}
          >
            <input
              className="search-bar"
              placeholder="Search policies"
              value={searchInput}
              // onBlur={() => setSearchResultOpen(false)}
              onFocus={() => setSearchResultOpen(true)}
              onChange={handleSearchInputChange}
            />
            {searchResultOpen && (
              <div className="search-result">
                {filteredSubheadings.map((subheading, index) => (
                  <div
                    key={index}
                    className={`dropdown-item search-r`}
                    onClick={() => {
                      console.log("hello");
                      changeFile(subheading);
                      setSearchResultOpen(false);
                    }}
                  >
                    {subheading}
                  </div>
                ))}
              </div>
            )}
          </div> */}
        </div>
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
            {contentToRender && (
              <div
                className="custom-font"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              ></div>
            )}
            {formsComponentToRender && (
              <div className="mainFormsContainer">
                <div className="formsContainer">
                  {dropdownsState[
                    dropdownsState.length - 1
                  ].heading.subheadings.map((item, index) => (
                    <div
                      key={index}
                      className="download-item"
                      onClick={() => {
                        downloadFile(item);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./Home.css";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
const Home = () => {
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
          "Organization Chart",
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
    {
      heading: {
        title: "Code Of Conduct, Ethics & Disciplinary Action",
        subheadings: [
          "Protection & Proper Use Of Assets",
          "Drugs Alcohol Smoking Weapons",
          "Conduct Rules",
          "Rules on Disciplinary Action",
        ],
      },
    },
    {
      heading: {
        title: "Sexual Harassment Policy",
        subheadings: [
          "Scope",
          "Definitions",
          "Complaints Procedure",
          "Redressal Process",
          "Internal Complaints Committee",
        ],
      },
    },
    {
      heading: {
        title: "Leave & Attendance",
        subheadings: [
          "Office Hours",
          "Permission",
          "On Duty",
          "Procedure For Granting Leave",
          "Kinds of Leave",
          "Public Holidays And Restricted Holidays",
          "Leave Administration",
        ],
      },
    },
    {
      heading: {
        title: "Compensation And Benefits",
        subheadings: [
          "Pay Day & Pay Cycle",
          "Cost To The Company",
          "Tax Compliance",
          "Provident Fund",
          "Employee State Insurance",
          "Overtime",
          "Loan Policy",
          "Salary Advance Policy",
          "Medical Insurance Policy",
          "Marriage Gift Policy",
        ],
      },
    },
    {
      heading: {
        title: "Performance Appraisal",
        subheadings: ["Performance Review"],
      },
    },
    {
      heading: {
        title: "Travel And Conveyance",
        subheadings: [
          "Mode And Class Of Travel",
          "Local Travel",
          "Interstate - Food Allowance",
          "Intercity - Food Allowance",
          "Accommodation & Lodging",
        ],
      },
    },
    {
      heading: {
        title: "Training & Development Policy",
        subheadings: [
          "Objectives & Scope",
          "Types Of Training",
          "Mode & Process Of Training",
          "Ideal Training Plan For A Calendar Year",
        ],
      },
    },
    {
      heading: {
        title: "Safety, Health And Environment",
        subheadings: [
          "Legal Compliance",
          "Training & Awareness",
          "Personal Protective Equipment",
        ],
      },
    },
    {
      heading: {
        title: "IT Policy",
        subheadings: [
          "Entitlement",
          "IT Security",
          "Loss Or Damage",
          "Separation Or Transfer",
          "Replacement",
          "Specification Of Laptop",
          "Brands",
          "Cost Factor",
        ],
      },
    },
    {
      heading: {
        title: "Forms & Annexures",
        subheadings: [
          "Manpower Requisition Form",
          "1",
          "2",
          "3",
          "1",
          "2",
          "3",
          "1",
          "2",
          "3",
        ],
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
          <img src={require("./assets/gp_logo.webp")} className="logo" />
          <p className="emp">Employee Policies</p>

          <div
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
          </div>
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

export default Home;

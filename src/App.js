import './App.css';
import React, { useState } from "react";

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="App">
      <div className='navbar'>
      {["Home", "Group", "Employee"].map((tab) => (
          <span
            key={tab}
            className={`nav-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>
      <hr className="underline" />
       {/* Group Subtabs */}
       {activeTab === "Group" && (
        <>
          <div className="subtabs">
            <span className="sub-tab">New Group</span>
            <span className="sub-tab">Search Group</span>
          </div>
          <hr className="sub-underline" />
        </>
      )}
      {/* Employee Subtabs */}
      {activeTab === "Employee" && (
        <>
          <div className="subtabs">
            <span className="sub-tab">New Employee</span>
            <span className="sub-tab">Edit Employee</span>
          </div>
          <hr className="sub-underline" />
        </>
      )}
      <div className='search-form-wrapper'>
      <h3 className='sectionTitle'>Group Search</h3>
      <hr className='hr'/>
          <form>
            <div className='form-row'>
              <div className='input-group'>
                <label className='label'>Group Name</label>
                <input className='input' type="text" name="groupName" />
              </div>
              <div className='input-group'>
                <label className='label'>Group Id</label>
                <input  className='input'type="text" name="groupId" />
              </div>
            </div>
            <div className='search-button-wrapper'>
              <button className='search-button' type="submit">Search</button> 
            </div>
          </form>
        </div>
    </div>
  );
};

function App() {
  return <NavigationTabs />;
}

export default App;

import './App.css';
import React, { useState } from "react";

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [groupId, setGroupId] = useState("");
  const [employees, setEmployees] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!groupId) {
      alert("Please enter a group ID");
      return;
    }
 
    console.log("Calling API for GroupId:", groupId);

  fetch(`http://localhost:5280/api/employees/${groupId}`)
  .then(res => {
    if (!res.ok) {
      throw new Error("Group was not found");
    }
    return res.json();
  })
  .then(data => {
    const employeeList = Array.isArray(data) ? data : [data];
    setEmployees(employeeList);
    console.log("Employees:", employeeList);
  })
  .catch(err => {
    console.error("Error fetching employees:", err);
    setEmployees([]);
  });
};
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
          <form onSubmit={handleSearch}>
            <div className='form-row'>
              <div className='input-group'>
                <label className='label'>Group Name</label>
                <input className='input' type="text" name="groupName" />
              </div>
              <div className='input-group'>
                <label className='label'>Group Id</label>
                <input  className='input'type="text" name="groupId" value={groupId} onChange={(e) => setGroupId(e.target.value)} />
              </div>
            </div>
            <div className='search-button-wrapper'>
              <button className='search-button' type="submit">Search</button> 
            </div>
          </form>
        </div>
        {groupId && (
          employees.length > 0 ? (
            <div className='results'>
              <h4>Employees In Group {groupId}</h4>
              <table border="1" cellPadding="6">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Employment Type</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.employeeId}>
                      <td>{emp.employeeId}</td>
                      <td>{emp.firstName} {emp.lastName}</td>
                      <td>{emp.email}</td>
                      <td>{emp.employmentType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="results no-results">
              <h4>No employees found for Group ID: {groupId}</h4>
            </div>
          )
        )}

    </div>
  );
};

function App() {
  return <NavigationTabs />;
}

export default App;

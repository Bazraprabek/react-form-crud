import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const DynamicTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setData(storedData);
  }, []);

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(data.length / rowsPerPage))
    );
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr key={startIndex + index}>
                <td>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="Profile"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{item.fullname}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.dob}</td>
                <td>{item.city}</td>
                <td>{item.district}</td>
                <td>{item.province}</td>
                <td>{item.country}</td>
                <td>
                  <Link to={"/edit/" + item.id} className="btn btn-primary">
                    Edit
                  </Link>
                  <Button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {data.length > rowsPerPage && (
        <div className="d-flex justify-content-center mt-3">
          <Button
            className="btn btn-primary me-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            className="btn btn-primary"
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default DynamicTable;

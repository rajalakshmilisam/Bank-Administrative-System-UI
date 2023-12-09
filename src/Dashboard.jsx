import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Col, Nav, Row } from "react-bootstrap";
import "./Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BsSearch } from 'react-icons/bs';

function Dashboard() {
  return (
    <div>
      <Row className="dashboard-sidebar">
        <Col md={3} xl={2} className="sidebar px-sm-4 px-6">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <br />
            <Nav
              className="flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu">
               <Nav.Item>
                <Link
                  to="/dashboard/userhome"
                  className="nav-link text-dark px-0 align-middle"
                  activeClassName="active"
                >
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline bold-text">
                    Home
                  </span>
                </Link>
              </Nav.Item>
              <br/>
              <Nav.Item>
                <Link
                  to="/dashboard/allbanks"
                  className="nav-link px-0 align-middle text-dark"
                  activeClassName="active"
                >
                  <i className="fs-4 bi-speedometer2"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline bold-text">
                    All Banks List
                  </span>
                </Link>
              </Nav.Item>
              <br />
              <Nav.Item>
                <Link
                  to="/dashboard/filteredbank"
                  className="nav-link text-dark px-0 align-middle"
                  activeClassName="active"
                >
                  <BsSearch className="fs-4 align-middle" />{" "}
                  <span className="ms-1 d-none d-sm-inline bold-text">
                    Search Bank
                  </span>
                </Link>
              </Nav.Item>
              <br />
              <Nav.Item>
                <Link
                  to="/dashboard/addbank"
                  className="nav-link px-0 align-middle text-dark"
                  activeClassName="active"
                >
                  <i className="fs-4 bi-plus"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline bold-text">
                    Add New Bank
                  </span>
                </Link>
              </Nav.Item>
              <br />
              <Nav.Item>
                <Link
                  to="/dashboard/allbanks"
                  className="nav-link px-0 align-middle text-dark"
                  activeClassName="active"
                >
                  <i className="fs-4 bi-pencil"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline bold-text">
                    Update Bank
                  </span>
                </Link>
              </Nav.Item>
              <br />
              <Nav.Item>
                <Link
                  to="/dashboard/allbanks"
                  className="nav-link px-0 align-middle text-dark"
                  activeClassName="active"
                >
                  <i className="fs-4 bi-bank"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline bold-text">
                    View Bank
                  </span>
                </Link>
              </Nav.Item>
              <br />
              <Nav.Item>
                <Link
                  to="/"
                  className="nav-link px-0 align-middle text-dark"
                  activeClassName="active"
                >
                  <i className="fs-4 fa fa-sign-out-alt"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline bold-text">
                  <i className="fas fa-sign-out-alt"></i>Logout
                  </span>
                </Link>
              </Nav.Item>
            </Nav>
          </div>
        </Col>
        <Col className="p-0 m-0">
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;

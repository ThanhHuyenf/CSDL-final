import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CompanyPage from './pages/CompanyPage';
import EmployeePage from './pages/EmployeePage';
import CompanyDetail from "./pages/CompanyDetail";
import OfficePage from "./pages/OfficePage";
import './App.css';

const App = () => {
    return (
            <Router>
                <div className="app-container">
                    <div className="sidebar">
                        <ul className="sidebar-menu">
                            <li className="sidebar-item">
                                <Link to="/companies">Quản lý Công ty</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/offices">Quản lý van phong</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/employees">Quản lý Nhân viên</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="content">
                        <Routes>
                            <Route path="/companies" element={<CompanyPage/>}/>
                            <Route path="/employees" element={<EmployeePage/>}/>
                            <Route path="/offices" element={<OfficePage/>}/>
                            <Route path="/" element={<CompanyPage/>}/> {/* Trang mặc định */}
                            <Route path="/company/:id" element={<CompanyDetail />} />
                        </Routes>
                    </div>
                </div>
            </Router>
    );
};

export default App;

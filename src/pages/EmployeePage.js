import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            // const res = await axios.get('/api/employees');
            setEmployees([]);
        };

        fetchEmployees();
    }, []);
    return (
        <div>
            <h1>Quản lý Nhân viên</h1>
            <div>
                <h2>Danh sách nhân viên</h2>
                <ul>
                    {employees.map(employee => (
                        <li key={employee._id}>
                            {employee.name} - {employee.position} - {employee.salary}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EmployeePage;

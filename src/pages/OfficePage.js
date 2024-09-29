import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OfficePage = () => {
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const res = await axios.get('http://localhost:8000/api/offices');
            console.log(res.data);
            setOffices([]);
        };

        fetchEmployees();
    }, []);
    return (
        <div>
            <h1>Quản lý Nhân viên</h1>
            <div>
                <h2>Danh sách van phong</h2>
                <ul>
                    {/*{employees.map(employee => (*/}
                    {/*    <li key={employee._id}>*/}
                    {/*        {employee.name} - {employee.position} - {employee.salary}*/}
                    {/*    </li>*/}
                    {/*))}*/}
                </ul>
            </div>
        </div>
    );
};

export default OfficePage;

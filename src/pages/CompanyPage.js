import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Route, Routes} from 'react-router-dom';
import CompanyDetail from "./CompanyDetail";
import EmployeePage from "./EmployeePage";

const CompanyPage = () => {
        const [companies, setCompanies] = useState([]);

        useEffect(() => {
            const fetchCompanies = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/api/offices');
                    console.log(response.data);
                    setCompanies(response.data.data);
                } catch (error) {
                    console.error('Error fetching companies', error);
                }
            };

            fetchCompanies();
        }, []);

    return (
        <div>
            <h1>Danh sách công ty và tổng chi phí hàng tháng</h1>
            <table>
                <thead>
                <tr>
                    <th>Tên công ty</th>
                    <th>Mã số thuế</th>
                    <th>Vốn điều lệ</th>
                    <th>Ngành nghề</th>
                    <th>Số lượng nhân viên</th>
                    <th>Số phòng</th>
                    <th>Người phụ trách</th>
                    <th>Số điện thoại</th>
                    <th>Diện tích thuê (m²)</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {companies.map((item) => (
                    <tr key={item.company._id}>
                        <td>{item.company.name}</td>
                        <td>{item.company.tax_code}</td>
                        <td>{item.company.charter_capital}</td>
                        <td>{item.company.industry}</td>
                        <td>{item.company.employee_count}</td>
                        <td>{item.company.building_info.office_id}</td>
                        <td>{item.company.representative}</td>
                        <td>{item.company.phone_number}</td>
                        <td>{item.square}</td>
                        <td>
                            <Link to={`/company/${item.company.company_id}`}>Chi tiết</Link>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyPage;

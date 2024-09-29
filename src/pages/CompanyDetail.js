import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const CompanyDetail = () => {
    const [companyInfo, setCompanyInfo] = useState([]);
    const params = useParams();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/company/${params.id}`);
                console.log(response.data);
                setCompanyInfo(response.data);
            } catch (error) {
                console.error('Error fetching companies', error);
            }
        };

        fetchCompanies();
    }, []);
    return (
        <div>
            <h1>Chi tiết công ty </h1>

            <div>
                <p>Tên công ty: {companyInfo.name}</p>
                <p>Mã số thuế: {companyInfo.tax_code}</p>
                <p>Vốn điều lệ: {companyInfo.charter_capital}</p>
                <p>Ngành nghề: {companyInfo.industry}</p>
                <p>Số lượng nhân viên: {companyInfo.employee_count}</p>
                <p>Người phụ trách: {companyInfo.representative}</p>
                <p>Số điện thoại: {companyInfo.phone_number}</p>
                <p>Tien thue mat bang: {companyInfo.rent}</p>
            </div>
            <div>
                <table className="employee-table">
                    <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Identity Card</th>
                        <th>Birth Date</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Phone Number</th>
                        <th>Access Card</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>EMP001</td>
                        <td>John Doe</td>
                        <td>123456789</td>
                        <td>1985-01-01</td>
                        <td>2020-03-15</td>
                        <td>-</td>
                        <td>9876543210</td>
                        <td>AC001</td>
                    </tr>
                    <tr>
                        <td>EMP002</td>
                        <td>Jane Smith</td>
                        <td>987654321</td>
                        <td>1990-05-15</td>
                        <td>2019-06-01</td>
                        <td>2023-07-01</td>
                        <td>9876543211</td>
                        <td>AC002</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompanyDetail;


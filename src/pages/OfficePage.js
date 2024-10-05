import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const OfficePage = () => {
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const res = await axios.get('http://localhost:8000/api/offices');
            setOffices(res.data.data);
        };

        fetchEmployees();
    }, []);
    return (
        <div>
            <h1>Quản lý văn phòng</h1>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Số phòng</th>
                        <th>Diện tích</th>
                        <th>Trạng thái</th>
                        <th>Công ty</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                    </tr>
                    </thead>

                    <tbody>
                    {offices.map((item) => (
                        <tr key={item._id}>
                            <td>
                                {item.office_number}
                            </td>
                            <td>
                                {item.square}
                            </td>
                            <td>
                                {item.status ? 'Kín' : 'Trống'}
                            </td>
                            <td>
                                {item.status ? item.company?.name : '-'}
                            </td>
                            <td>
                                {item.status ? item.company?.building_info.start_time : '-'}
                            </td>
                            <td>
                                {item.status ? item.company?.building_info.end_time : '-'}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default OfficePage;

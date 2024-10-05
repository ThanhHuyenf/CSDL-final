import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const OfficePage = () => {
    const [logs, setLogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPage, setTotalPage] = useState(1);

    const [page, setPage] = useState(1);

    const watchPage = (e) => {
        setPage(e.target.value);
    }

    const fetchEmployees = async () => {
        const res = await axios.get(`http://localhost:8000/api/access_logs?page=${page}`);
        setLogs(res.data.data);
        setTotal(res.data.totalLog);
        setTotalPage(res.data.totalPages);

    };
    useEffect(() => {
        fetchEmployees();
    }, [page]);

    return (
        <div>
            <h1>Quản lý ra vào</h1>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Access card</th>
                        <th>Type</th>
                        <th>Time</th>
                        <th>Location</th>
                    </tr>
                    </thead>

                    <tbody>
                    {logs.map((item) => (
                        <tr key={item._id}>
                            <td>
                                {item.access_card}
                            </td>
                            <td>
                                {item.type}
                            </td>
                            <td>
                                {item.time}
                            </td>
                            <td>
                                {item.location}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <p>Total: {total}</p>
                    <p>Total page: {totalPage}</p>
                    <input type="number"
                           style={{width: "50px"}}
                           name="page"
                           defaultValue={page}
                           min="1"
                           max={totalPage}
                           onChange={(e) => watchPage(e)}
                    />
                </div>

            </div>
        </div>
    );
};

export default OfficePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Route, Routes} from 'react-router-dom';

const CompanyPage = () => {
        const [companies, setCompanies] = useState([]);
        const [company, setCompany] = useState([]);
        const [emptyOffices, setEmptyOffices] = useState([]);
        const [isModalOpen, setModalOpen] = useState(false);
        const [action, setAction] = useState("new");

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/companies');
            setCompanies(response.data.data);
        } catch (error) {
            console.error('Error fetching companies', error);
        }
    };
        useEffect(() => {
            fetchCompanies();
        }, [isModalOpen]);

        const getEmptyOffices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/empty_offices');
                setEmptyOffices(response.data.data);
            } catch (error) {
                console.error('Error fetching companies', error);
            }
        }
    // Function để mở modal
        const openModal = (item) => {
            getEmptyOffices()
            setAction("edit");
            setCompany(item);setModalOpen(true);
        };

    // Function để đóng modal
    const closeModal = () => {
        setCompany({})
        setModalOpen(false);
    };

    // Handle form submission (sửa thông tin service)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Cập nhật thông tin service sau khi submit

        const updatedCompany = {
            ...company,
            name: e.target.name.value,
            tax_code: e.target.tax_code.value,
            charter_capital: e.target.charter_capital.value,
            industry: e.target.industry.value,
            office_number: e.target.office_number.value,
            representative: e.target.representative.value,
            phone_number: e.target.phone_number.value,
            price_per_m2: e.target.price_per_m2.value,
            start_date: e.target.start_date.value,
            end_date: e.target.end_date.value,
        };
        setCompany(updatedCompany);

        try{
            if(action == 'new'){
                const result = await axios.post('http://localhost:8000/api/company', updatedCompany);
            }
            if (action == 'edit') {
                const result = await axios.put('http://localhost:8000/api/company/' + company._id, updatedCompany);
            }
        }catch (err){
            alert(err.response.data.message)
            console.log("Error: ", err)
        }

        closeModal(); // Đóng modal sau khi cập nhật
    };

    // Xóa service
    const deleteService = async (item) => {
        try{
            const result = await axios.delete('http://localhost:8000/api/service/' + item.service_id);
            fetchCompanies();
        }catch (err){
            console.log("Error: ", err)
        }
    };

    const addCompany = async () => {
        setAction("new");
        getEmptyOffices()
        setModalOpen(true);
        console.log("emptyOffices", emptyOffices)

    }

    const deleteCompany = async (item) => {
        try{
            const result = await axios.delete('http://localhost:8000/api/company/' + item.company._id);
            fetchCompanies();
        }catch (err){
            alert(err)
            console.log("Error: ", err)
        }
    }

    return (
        <div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h1>Danh sách công ty</h1>
                <button onClick={() => addCompany()}>Thêm mới</button>
            </div>
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
                        <td>{item.office_number}</td>
                        <td>{item.company.representative}</td>
                        <td>{item.company.phone_number}</td>
                        <td>{item.square}</td>
                        <td>
                            <Link to={`/company/${item.company._id}`}>Chi tiết</Link>
                            <span className="cursor-pointer"
                                  style={{marginLeft:"6px"}}
                                    onClick={() => deleteCompany(item)}
                            >Xoá</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content" style={{marginTop: '30px'}}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
                        <h2> {action == 'new' ? 'Add new ' : 'Edit'} company</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div style={{display: "flex", gap: "6px"}}>
                                <label style={{width: "100%"}}>
                                    Tên công ty:
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={company.name}
                                    />
                                </label>
                                <label style={{width: "100%"}}>
                                    Mã số thuế:
                                    <input
                                        type="text"
                                        name="tax_code"
                                        defaultValue={company.tax_code}
                                    />
                                </label>
                            </div>

                            <div style={{display: "flex", gap: "6px"}}>
                                <label style={{width: "100%"}}>
                                    Vốn điều lệ:
                                    <input
                                        type="text"
                                        name="charter_capital"
                                        defaultValue={company.charter_capital}
                                    />
                                </label>
                                <label style={{width: "100%"}}>
                                    Ngành nghề:
                                    <input
                                        type="text"
                                        name="industry"
                                        defaultValue={company.industry}
                                    />
                                </label>
                            </div>

                            <div style={{display: "flex", gap: "6px"}}>
                                <label style={{width: "100%"}}>
                                    Số phòng:
                                    <input
                                        type="text"
                                        name="office_number"
                                        defaultValue={company.office_number}
                                    />
                                </label>
                                <label style={{width: "100%"}}>
                                    Gia tien 1m2:
                                    <input
                                        type="text"
                                        name="price_per_m2"
                                        defaultValue={company.price_per_m2}
                                    />
                                </label>
                            </div>

                            <p>Phong trong: {emptyOffices.map(office => office.office_number).join(', ')}</p>

                            <div style={{display: "flex", gap: "6px"}}>
                                <label style={{width: "100%"}}>
                                    Người phụ trách:
                                    <input
                                        type="text"
                                        name="representative"
                                        defaultValue={company.representative}
                                    />
                                </label>
                                <label style={{width: "100%"}}>
                                    Số điện thoại:
                                    <input
                                        type="text"
                                        name="phone_number"
                                        defaultValue={company.phone_number}
                                    />
                                </label>
                            </div>
                            <div style={{display: "flex", gap: "6px"}}>
                                <label style={{width: "100%"}}>
                                    Ngày bắt đầu:
                                    <input
                                        type="text"
                                        name="start_date"
                                        defaultValue={company.start_date}
                                    />
                                </label>
                                <label style={{width: "100%"}}>
                                    Ngày kết thúc:
                                    <input
                                        type="text"
                                        name="end_date"
                                        defaultValue={company.end_date}
                                    />
                                </label>
                            </div>

                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CompanyPage;

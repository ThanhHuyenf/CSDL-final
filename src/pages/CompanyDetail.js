import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Dropdown from "./components/DropDown";

const CompanyDetail = () => {
    const [companyInfo, setCompanyInfo] = useState([]);
    const [employeesInfo, setEmployeesInfo] = useState([]);
    const [activeEmployeesCount, setActiveEmployeesCount] = useState(0);
    const [totalEmployeesCount, setTotalEmployeesCount] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [employee, setEmployee] = useState({});
    const [action, setAction] = useState("new");
    const [usageService, setUsageService] = useState([]);
    const [modalService, setModalService] = useState(false);
    const [services, setServices] = useState([]);
    const currentTime = new Date();

    const params = useParams();

    const fetchCompanies = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/company/${params.id}`);
            setCompanyInfo(response.data);
        } catch (error) {
            console.error('Error fetching companies', error);
        }
    };

    const fetchUsageService = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/usage_service/${params.id}`);
            setUsageService(response.data.data);
        } catch (error) {
            console.error('Error fetching companies', error);
        }
    }

    const compareDate = (date) => {
        if (date == '-' || !date || date == null || date == "") return false
        const compareTime = new Date(date);

        if (compareTime.getTime() < currentTime.getTime()){
            return true;
        }
        return false;
    }


    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/employees/${params.id}`);
            setEmployeesInfo(response.data.data);
            setTotalEmployeesCount(response.data.total);
            setActiveEmployeesCount(response.data.active_employee);


        } catch (error) {
            console.error('Error fetching companies', error);
        }
    };


    const fetchServices = async () => {
        const res = await axios.get('http://localhost:8000/api/services');
        setServices(res.data.data);
    };

    useEffect(() => {
        fetchCompanies();
        fetchEmployees()
        fetchUsageService()
        fetchServices()

    }, []);




    const addEmployee = async () => {
        setAction("new");
        setModalOpen(true);
    }

    const openModal = (item) => {
        setAction("edit");
        setModalOpen(true);
        setEmployee(item);
    }

    const closeModal = () => {
        setEmployee({})
        setModalOpen(false);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Cập nhật thông tin service sau khi submit
        const updatedEmployee = {
            ...employee,
            name: e.target.name.value,
            identity_card: e.target.identity_card.value,
            birth_date: e.target.birth_date.value,
            start_date: e.target.start_date.value,
            end_date: e.target.end_date.value,
            phone_number: e.target.phone_number.value,
            company_id: params.id
        };
        setEmployee(updatedEmployee);

        try{
            if(action == 'new'){
                const result = await axios.post('http://localhost:8000/api/employees', updatedEmployee);
            }
            if (action == 'edit') {
                const result = await axios.put('http://localhost:8000/api/employee/' + employee.employee_id, updatedEmployee);
            }
            fetchEmployees()
        }catch (err){
            console.log("Error: ", err)
        }

        closeModal(); // Đóng modal sau khi cập nhật
    };

    const deleteEmployee = async (item) => {
        try{
            const result = await axios.delete('http://localhost:8000/api/employees/' + item._id);
            fetchEmployees()
        }catch (err){
            alert(err)
            console.log("Error: ", err)
        }
    }

    const checkCurrentMonth = (date) => {
        const temp = new Date(date)
        if (temp.getMonth() == currentTime.getMonth() && temp.getFullYear() == currentTime.getFullYear()) return true
        return false
    }

    const addService = async () => {
        setModalService(true);
    }

    const closeModalService = () => {
        setModalService(false);
    }

    const handleFormSubmitService = async (e) => {

    }
    return (
        <div>
            <h1>Chi tiết công ty </h1>

            <div>
                <p>Tên công ty: {companyInfo.name}</p>
                <p>Mã số thuế: {companyInfo.tax_code}</p>
                <p>Vốn điều lệ: {companyInfo.charter_capital}</p>
                <p>Ngành nghề: {companyInfo.industry}</p>
                <p>Người phụ trách: {companyInfo.representative}</p>
                <p>Số điện thoại: {companyInfo.phone_number}</p>
            </div>

            <div>
                <p>Lịch sử thanh toán tiền dịch vụ</p>
                <div className="fee-container">
                    {usageService.map((item) => (
                        <div key={item._id} className="fee">
                            {checkCurrentMonth(item.billing_month) && <button onClick={()=>addService()}>Add sevice</button>}
                            <p>Time: {item.billing_month}</p>
                            <p>Status: {item.payment_status}</p>
                            <p>Payment date: {item.payment_date || '-'}</p>
                            <p>Payment method: {item.payment_method}</p>
                            <p>Services usage: Start date- Service - Base price</p>
                            {item.services.map((service) => (
                                <div key={service.service_id}>
                                    <p> - {service.usage_date} - {service.service_name} : {service.base_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <p style={{fontWeight: "bold"}}>Danh sach nhân viên (active/
                        total): {activeEmployeesCount} / {totalEmployeesCount}</p>
                    <button onClick={() => addEmployee()}>Thêm mới</button>
                </div>

                <table className="employee-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Identity Card</th>
                        <th>Birth Date</th>
                        <th>Start Date</th>
                        <th>Status</th>
                        <th>End Date</th>
                        <th>Phone Number</th>
                        <th>Access Card</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employeesInfo.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.identity_card}</td>
                            <td>{item.birth_date}</td>
                            <td>{item.start_date}</td>
                            <td className={ compareDate(item.end_date) ?  'inactive' :'active'}>{ compareDate(item.end_date) ?  'Inactive' :'Active'}</td>
                            <td>{item.end_date ? item.end_date : '-'}</td>
                            <td>{item.phone_number}</td>
                            <td>{item.access_card}</td>
                            <td>
                               <span className="cursor-pointer" onClick={()=> deleteEmployee(item)}>Delete</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content" style={{marginTop: "30px"}}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
                        <h2> { action == 'new' ? 'Add new ' : 'Edit' } employee</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={employee.name}
                                />
                            </label>
                            <label>
                                Identity Card:
                                <input
                                    type="text"
                                    name="identity_card"
                                    defaultValue={employee.identity_card}
                                />
                            </label>
                            <label>
                                Birth date:
                                <input
                                    type="text"
                                    name="birth_date"
                                    defaultValue={employee.birth_date}
                                />
                            </label>
                            <label>
                                Phone Number:
                                <input
                                    type="text"
                                    name="phone_number"
                                    defaultValue={employee.phone_number}
                                />
                            </label>
                            <div style={{display: "flex", gap:"6px"}}>
                                <label style={{width:"100%"}}>
                                    Start date:
                                    <input
                                        type="text"
                                        name="start_date"
                                        defaultValue={employee.start_date}
                                    />
                                </label>
                                <label style={{width:"100%"}}>
                                    End date:
                                    <input
                                        type="text"
                                        name="end_date"
                                        defaultValue={employee.end_date}
                                    />
                                </label>
                            </div>
                            <p>Format: yyyy-mm-dd</p>

                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}

            {modalService &&  (
                <div className="modal">
                <div className="modal-content" style={{marginTop: "30px"}}>
            <span className="close" onClick={closeModalService}>
              &times;
            </span>
                    <h2>Add new service</h2>
                    <form onSubmit={handleFormSubmitService}>
                        {services.map((service) => (
                            <div key={service._id}>
                                <label >
                                    {service.service_name}
                                    <input
                                        type="checkbox"
                                        name={service._id}
                                        value={service._id}
                                    />

                                </label>
                            </div>
                        ))
                        }
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            </div>
                )}
        </div>
    );
};

export default CompanyDetail;


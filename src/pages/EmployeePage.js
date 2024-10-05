import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [action, setAction] = useState("new");

    const fetchEmployees = async () => {
        const res = await axios.get('http://localhost:8000/api/building_employees');
        setEmployees(res.data.data);
    };

    useEffect(() => {
        fetchEmployees();
    }, [isModalOpen]);


    const openModal = (item) => {
        setAction("edit");
        setEmployee(item);
        setModalOpen(true);
    };

    // Function để đóng modal
    const closeModal = () => {
        setEmployee({})
        setModalOpen(false);
    };

    // Handle form submission (sửa thông tin service)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Cập nhật thông tin service sau khi submit
        const updatedEmployee = {
            ...employee,
            name: e.target.name.value,
            identity_number: e.target.identity_number.value,
            birth_date: e.target.birth_date.value,
            address: e.target.address.value,
            phone_number: e.target.phone_number.value,
            base_salary: e.target.base_salary.value,
            revenue: e.target.revenue.value,
        };
        setEmployee(updatedEmployee);

        try{
            if(action == 'new'){
                const result = await axios.post('http://localhost:8000/api/building_employees', updatedEmployee);
            }
            if (action == 'edit') {
                const result = await axios.put('http://localhost:8000/api/building_employees/' + employee.employee_id, updatedEmployee);
            }
        }catch (err){
            console.log("Error: ", err)
        }
        closeModal(); // Đóng modal sau khi cập nhật
    };

    const deleteEmployee = async (item) => {
        try{
            const result = await axios.delete('http://localhost:8000/api/building_employees/' + item.employee_id);
            fetchEmployees();
        }catch (err){
            console.log("Error: ", err)
        }
    };

    const addEmployee = async () => {
        setAction("new");
        setModalOpen(true);
    }

    return (
        <div>
            <h1>Quản lý Nhân viên</h1>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h3>Danh sách nhân viên</h3>
                <button onClick={() => addEmployee()}>Them moi</button>
            </div>
            <div>
                <table className="employee-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Identity Card</th>
                        <th>Birth Date</th>
                        <th>Address</th>
                        <th>Start Date</th>
                        <th>Phone Number</th>
                        <th>Position</th>
                        <th>Base salary</th>
                        <th>Revenue</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.identity_number}</td>
                            <td>{item.birth_date}</td>
                            <td>{item.address}</td>
                            <td>{item.start_date}</td>
                            <td>{item.phone_number}</td>
                            <td>{item.position}</td>
                            <td>{item.base_salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td>{item.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td>{Number(Number(item.revenue) / 10 + Number(item.base_salary)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td>
                                <span onClick={() => openModal(item)} className="cursor-pointer">Edit</span>
                                <span style={{marginLeft: "8px"}}
                                      className="cursor-pointer"
                                      onClick={() => deleteEmployee(item)}
                                >Delete</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content" style={{marginTop: '30px'}}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
                        <h2> {action == 'new' ? 'Add new ' : 'Edit'} employee</h2>
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
                                    name="identity_number"
                                    defaultValue={employee.identity_number}
                                />
                            </label>
                            <label>
                                Birth Date:
                                <input
                                    type="text"
                                    name="birth_date"
                                    defaultValue={employee.birth_date}
                                />
                            </label>
                            <label>
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={employee.address}
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
                            <label>
                                Base Salary:
                                <input
                                    type="text"
                                    name="base_salary"
                                    defaultValue={employee.base_salary}
                                />
                            </label>
                            <label>
                                Revenue:
                                <input
                                    type="text"
                                    name="revenue"
                                    defaultValue={employee.revenue}
                                />
                            </label>
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EmployeePage;

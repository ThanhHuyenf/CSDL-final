import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const ServicePage = () => {
    const [services, setServices] = useState([]);
    const [service, setService] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [action, setAction] = useState("new");

    const fetchServices = async () => {
        const res = await axios.get('http://localhost:8000/api/services');
        setServices(res.data.data);
    };

    useEffect(() => {
        fetchServices();
    }, [isModalOpen]);


    // Function để mở modal
    const openModal = (item) => {
        setAction("edit");
        setService(item);
        setModalOpen(true);
    };

    // Function để đóng modal
    const closeModal = () => {
        setService({})
        setModalOpen(false);
    };

    // Handle form submission (sửa thông tin service)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Cập nhật thông tin service sau khi submit
        const updatedService = {
            ...service,
            service_name: e.target.service_name.value,
            service_type: e.target.service_type.value,
            base_price: e.target.base_price.value,
        };
        setService(updatedService);

        try{
            if(action == 'new'){
                const result = await axios.post('http://localhost:8000/api/service', updatedService);
            }
            if (action == 'edit') {
                const result = await axios.put('http://localhost:8000/api/service/' + service._id, updatedService);
            }
        }catch (err){
            console.log("Error: ", err)
        }

        closeModal(); // Đóng modal sau khi cập nhật
    };

    // Xóa service
    const deleteService = async (item) => {
        try{
            const result = await axios.delete('http://localhost:8000/api/service/' + item._id);
            fetchServices();
        }catch (err){
            console.log("Error: ", err)
        }
    };

    const addService = async () => {
        setAction("new");
        setModalOpen(true);
    }

    return (
        <div>
            <div style={{display: "flex", alignItems: "center", justifyContent:"space-between"}}>
                <h1>Danh sách dich vu</h1>
                <button onClick={()=> addService()}>Them moi</button>
            </div>

            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Service Type</th>
                        <th>Code</th>
                        <th>Base price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {services.map((item) => (
                        <tr key={item._id}>
                            <td>
                                {item.service_name}
                            </td>
                            <td>
                                {item.service_type}
                            </td>
                            <td>
                                {item.service_id}

                            </td>
                            <td>
                                {item.base_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </td>
                            <td>
                                <span onClick={()=> openModal(item)} className="cursor-pointer">Edit</span>
                                <span style={{marginLeft: "8px"}}
                                      className="cursor-pointer"
                                      onClick={()=>deleteService(item)}
                                >Delete</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
                        <h2> { action == 'new' ? 'Add new ' : 'Edit' } Service</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                                Service Name:
                                <input
                                    type="text"
                                    name="service_name"
                                    defaultValue={service.service_name}
                                />
                            </label>
                            <label>
                                Service Type:
                                <input
                                    type="text"
                                    name="service_type"
                                    defaultValue={service.service_type}
                                />
                            </label>
                            <label>
                                Base Price (VND):
                                <input
                                    type="text"
                                    name="base_price"
                                    defaultValue={service.base_price}
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

export default ServicePage;

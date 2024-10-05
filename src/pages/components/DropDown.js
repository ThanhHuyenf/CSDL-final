// src/Dropdown.js
import React, { useState } from 'react';

const Dropdown = ({ services }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('Select a Service');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleServiceSelect = (serviceName) => {
        setSelectedService(serviceName);
        setIsOpen(false);
        alert(`Selected service: ${serviceName}`);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
                {selectedService}
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    {services.map(service => (
                        <a
                            key={service._id}
                            href="#!"
                            onClick={() => handleServiceSelect(service.service_name)}
                        >
                            {service.service_name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../App.css';
import '../../styles/Middleman.css';

const Middleman = () => {
    const [showModal, setShowModal] = useState(false);
    const [numSuppliers, setNumSuppliers] = useState(2);
    const [numCustomers, setNumCustomers] = useState(2);
    const [showCalculatedDetails, setShowCalculatedDetails] = useState(false);

    useEffect(() => {
        setShowModal(true);
    }, []);

    const handleSaveModal = () => {
        setShowModal(false);
    }

    const handleNumSuppliersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumSuppliers(Number(event.target.value));
    }

    const handleNumCustomersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumCustomers(Number(event.target.value));
    }

    const renderSupplierSupplyFields = () => {
        const supplierSupplyFields = [];
        for (let i = 0; i < numSuppliers; i++) {
            supplierSupplyFields.push(
                <input
                    key={`supplier-supply-${i}`}
                    type="text"
                    className="form-control supplier-supply-field"
                    style={{ width: '110px', marginRight: '10px' }}
                    placeholder={`Supplier ${i + 1}`}
                />
            );
        }
        return supplierSupplyFields;
    }

    const renderSupplierPurchasePriceFields = () => {
        const supplierPurchasePriceFields = [];
        for (let i = 0; i < numSuppliers; i++) {
            supplierPurchasePriceFields.push(
                <input
                    key={`supplier-purchase-price-${i}`}
                    type="text"
                    className="form-control supplier-purchase-price-field"
                    style={{ width: '110px', marginRight: '10px' }}
                    placeholder={`Supplier ${i + 1}`}
                />
            );
        }
        return supplierPurchasePriceFields;
    }

    const renderCustomerDemandFields = () => {
        const customerDemandFields = [];
        for (let i = 0; i < numCustomers; i++) {
            customerDemandFields.push(
                <input
                    key={`customer-demand-${i}`}
                    type="text"
                    className="form-control customer-demand-field"
                    style={{ width: '110px', marginRight: '10px' }}
                    placeholder={`Customer ${i + 1}`}
                />
            );
        }
        return customerDemandFields;
    }

    const renderCustomerSellingPriceFields = () => {
        const CustomerSellingPriceFields = [];
        for (let i = 0; i < numCustomers; i++) {
            CustomerSellingPriceFields.push(
                <input
                    key={`customer-selling-price-${i}`}
                    type="text"
                    className="form-control customer-selling-price-field"
                    style={{ width: '110px', marginRight: '10px' }}
                    placeholder={`Customer ${i + 1}`}
                />
            );
        }
        return CustomerSellingPriceFields;
    }

    const renderTransportationCostsMatrix = () => {
        const TransportationCostsMatrix = [];
        for (let j = 0; j < numCustomers; j++) {
            const column = [];
            for (let i = 0; i < numSuppliers; i++) {
                let index = (i * numCustomers + j) + 1;
                column.push(
                    <input
                        key={`cost-${index}`}
                        type="text"
                        className="form-control cost-field"
                        style={{ width: '110px', marginRight: '10px' }}
                        placeholder={`Cost ${index}`}
                    />
                );
            }
            TransportationCostsMatrix.push(
                <div key={`column-${j}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {column}
                </div>
            );
        }
        return TransportationCostsMatrix;
    }

    const handleCalculate = () => {
        setShowCalculatedDetails(true);
    }

    return (
        <div className="Middleman">
            <div>
                <h1>Middleman issue</h1>
                <h3>Enter middleman details below</h3>
                <Modal show={showModal} onHide={handleSaveModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Number of suppliers and customers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-center"><b>Suppliers:</b> {numSuppliers}</p>
                        <input type="range" className="form-range" min="2" max="10" step="1" id="customRange3" value={numSuppliers} onChange={handleNumSuppliersChange}></input>
                        <p className="text-center"><b>Customers:</b> {numCustomers}</p>
                        <input type="range" className="form-range" min="2" max="10" step="1" id="customRange3" value={numCustomers} onChange={handleNumCustomersChange}></input>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <Button variant="danger" onClick={handleSaveModal}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <div className="details-table">
                    <h5>Suppliers: <b>{numSuppliers}</b></h5>
                    <h5>Customers: <b>{numCustomers}</b></h5>
                    <h5 style={{ display: 'flex', alignItems: 'center' }}>Supplier's supply: {renderSupplierSupplyFields()}</h5>
                    <h5 style={{ display: 'flex', alignItems: 'center' }}>Supplier's purchase price: {renderSupplierPurchasePriceFields()}</h5>
                    <h5 style={{ display: 'flex', alignItems: 'center' }}>Customer's demand: {renderCustomerDemandFields()}</h5>
                    <h5 style={{ display: 'flex', alignItems: 'center' }}>Customer's selling price: {renderCustomerSellingPriceFields()}</h5>
                    <h5 style={{ display: 'flex', alignItems: 'center' }}>Transportation costs: {renderTransportationCostsMatrix()}</h5>
                    <Button variant="danger" onClick={handleCalculate}>Calculate</Button>
                </div>
                {showCalculatedDetails && (
                    <div className="calculated-details">
                        <h3>Calculated details</h3>
                        
                    </div>
                )}
            </div>
        </div>
    );
}

export default Middleman;
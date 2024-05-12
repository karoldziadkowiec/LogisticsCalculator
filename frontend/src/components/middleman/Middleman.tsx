import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../App.css';
import '../../styles/Middleman.css';

const Middleman = () => {
        const [showModal, setShowModal] = useState(false);
    const [numSuppliers, setNumSuppliers] = useState(2);
    const [numConsumers, setNumConsumers] = useState(2);
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

    const handleNumConsumersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumConsumers(Number(event.target.value));
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

    const renderSupplierProdcutCostFields = () => {
        const supplierProductCostFields = [];
        for (let i = 0; i < numSuppliers; i++) {
            supplierProductCostFields.push(
                <input
                    key={`supplier-product-cost-${i}`}
                    type="text"
                    className="form-control supplier-product-cost-field"
                    style={{ width: '110px', marginRight: '10px' }}
                    placeholder={`Supplier ${i + 1}`}
                />
            );
        }
        return supplierProductCostFields;
    }

    const renderConsumerDemandFields = () => {
        const consumerDemandFields = [];
        for (let i = 0; i < numConsumers; i++) {
            consumerDemandFields.push(
                <input
                    key={`consumer-demand-${i}`}
                    type="text"
                    className="form-control consumer-demand-field"
                    style={{ width: '110px', marginRight: '10px' }}
                    placeholder={`Consumer ${i + 1}`}
                />
            );
        }
        return consumerDemandFields;
    }

    const renderConsumerPurchaseFields = () => {
        const ConsumerPurchaseFields = [];
        for (let i = 0; i < numConsumers; i++) {
            ConsumerPurchaseFields.push(
                <input
                    key={`consumer-purchase-${i}`}
                    type="text"
                    className="form-control consumer-purchase-field"
                    style={{ width: '110px', marginRight: '10px' }}
                    placeholder={`Consumer ${i + 1}`}
                />
            );
        }
        return ConsumerPurchaseFields;
    }

    const renderTransportationCostsMatrix = () => {
        const TransportationCostsMatrix = [];
        for (let j = 0; j < numConsumers; j++) {
            const column = [];
            for (let i = 0; i < numSuppliers; i++) {
                let index = (i * numConsumers + j) + 1;
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
                        <Modal.Title>Number of suppliers and consumers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-center"><b>Suppliers:</b> {numSuppliers}</p>
                        <input type="range" className="form-range" min="2" max="10" step="1" id="customRange3" value={numSuppliers} onChange={handleNumSuppliersChange}></input>
                        <p className="text-center"><b>Consumers:</b> {numConsumers}</p>
                        <input type="range" className="form-range" min="2" max="10" step="1" id="customRange3" value={numConsumers} onChange={handleNumConsumersChange}></input>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <Button variant="danger" onClick={handleSaveModal}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <div className="details-table">
                    <h5>Suppliers: <b>{numSuppliers}</b></h5>
                    <h5>Consumers: <b>{numConsumers}</b></h5>
                    <h5 style={{ display: 'flex', alignItems: 'center' }}>Supplier's supply: {renderSupplierSupplyFields()}</h5>
                    <h5 style={{ display: 'flex', alignItems: 'center' }}>Supplier's product cost: {renderSupplierProdcutCostFields()}</h5>
                    <h5 style={{ display: 'flex', alignItems: 'center' }}>Consumer's demand: {renderConsumerDemandFields()}</h5>
                    <h5 style={{ display: 'flex', alignItems: 'center' }}>Consumer's purchase: {renderConsumerPurchaseFields()}</h5>
                    <h5 style={{ display: 'flex', alignItems: 'center' }}>Transportation costs: {renderTransportationCostsMatrix()}</h5>
                    <Button variant="danger" onClick={handleCalculate}>Calculate</Button>
                </div>
                {showCalculatedDetails && (
                    <div className="calculated-details">
                        <h3>Calculated Details</h3>
                        
                    </div>
                )}
            </div>
        </div>
    );
}

export default Middleman;
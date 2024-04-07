import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NumberOfActivitiesModal from './NumberOfActivitiesModal';
import '../../App.css';
import '../../styles/CPM.css';

const CPM = () => {
    const [numberOfActivities, setNumberOfActivities] = useState(1);
    const [showModal, setShowModal] = useState(true);
    const [dependencyValues, setDependencyValues] = useState<string[]>(Array(numberOfActivities).fill(''));
    const [durations, setDurations] = useState<string[]>(Array(numberOfActivities).fill(''));
    const [showCalculatedActivities, setShowCalculatedActivities] = useState(false);

    const handleSaveModal = () => {
        setShowModal(false);
    };

    const handleNumberOfActivitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setNumberOfActivities(value);
            setDurations(Array(value).fill(''));
            setDependencyValues(Array(value).fill(''));
        } else {
            setNumberOfActivities(1);
            setDurations(['']);
            setDependencyValues(['']);
        }
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newDurations = [...durations];
        newDurations[index] = e.target.value;
        setDurations(newDurations);
    };

    const handleDependencyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newDependencies = [...dependencyValues];
        newDependencies[index] = e.target.value;
        setDependencyValues(newDependencies);
    };

    const handleCalculate = () => {
        setShowCalculatedActivities(true);
    }

    const generateTable = () => {
        const rows = [];
        for (let i = 0; i < numberOfActivities; i++) {
            rows.push(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{String.fromCharCode(65 + i)}</td>
                    <td style={{ textAlign: 'center' }}>
                        <Form.Control
                            type="text"
                            size="sm"
                            style={{ width: '150px', margin: 'auto' }}
                            value={dependencyValues[i]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDependencyChange(e, i)}
                            className="form-control"
                        />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <Form.Control
                            type="text"
                            size="sm"
                            style={{ width: '100px', margin: 'auto' }}
                            value={durations[i]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDurationChange(e, i)}
                            className="form-control"
                        />
                    </td>
                </tr>
            );
        }
        return rows;
    };

    return (
        <div className="CPM">
            <h1>CPM issue</h1>
            <h3>Enter activity information below</h3>
            <NumberOfActivitiesModal
                showModal={showModal}
                handleSaveModal={handleSaveModal}
                handleNumberOfActivitiesChange={handleNumberOfActivitiesChange}
                numberOfActivities={numberOfActivities}
            />
            <div className="activity-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Activity Name</th>
                            <th>Dependency Name (format: -, A, B, C...)</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTable()}
                    </tbody>
                </table>
                <Button variant="danger" onClick={handleCalculate}>Calculate</Button>
            </div>
            {showCalculatedActivities && (
                <div className="calculated-activities">
                    <h3>Calculated activities</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Activity Name</th>
                                <th>Duration</th>
                                <th>Early Start</th>
                                <th>Early Finish</th>
                                <th>Late Start</th>
                                <th>Late Finish</th>
                                <th>Slack Time</th>
                                <th>Critical Activity</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CPM;
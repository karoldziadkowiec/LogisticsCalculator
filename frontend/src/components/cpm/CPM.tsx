import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import NumberOfActivitiesModal from './NumberOfActivitiesModal';
import { sendAndProcessData, fetchCriticalPath } from '../../services/api/CPMApi';
import { Activity } from '../../models/Activity';
import '../../App.css';
import '../../styles/CPM.css';

const CPM = () => {
    const [numberOfActivities, setNumberOfActivities] = useState(1);
    const [showModal, setShowModal] = useState(true);
    const [dependencyValues, setDependencyValues] = useState<string[]>(Array(numberOfActivities).fill(''));
    const [durations, setDurations] = useState<number[]>(Array(numberOfActivities).fill(0));
    const [showCalculatedActivities, setShowCalculatedActivities] = useState(false);
    const [calculatedActivities, setCalculatedActivities] = useState<Activity[]>([]);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showCriticalPath, setShowCriticalPath] = useState<boolean>(false);
    const [criticalPath, setCriticalPath] = useState<string[]>([]);
    const [showActivityGraph, setShowActivityGraph] = useState<boolean>(false);

    const handleSaveModal = () => {
        setShowModal(false);
    };

    const handleNumberOfActivitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setNumberOfActivities(value);
            setDurations(Array(value).fill(0));
            setDependencyValues(Array(value).fill(''));
        } else {
            setNumberOfActivities(1);
            setDurations([0]);
            setDependencyValues(['']);
        }
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newDurations = [...durations];
        newDurations[index] = parseInt(e.target.value);
        setDurations(newDurations);

        const updatedActivities = calculatedActivities.map((activity, i) => {
            if (i === index) {
                return { ...activity, duration: parseInt(e.target.value) };
            }
            return activity;
        });
        setCalculatedActivities(updatedActivities);
    };

    const handleDependencyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = e.target.value.trim().toUpperCase();

        if (newValue.includes(' ')) {
            setAlertMessage('Dependency Name field cannot contain spaces.');
            setShowAlert(true);
            return;
        }

        if (newValue.length > 1 && !newValue.includes(',')) {
            setAlertMessage('Dependency Name field must have commas (",") between characters.');
            setShowAlert(true);
            return;
        }

        const newDependencies = [...dependencyValues];
        newDependencies[index] = newValue;
        setDependencyValues(newDependencies);
    };

    const handleCalculate = async () => {
        const areFieldsFilled = dependencyValues.every(value => value.trim() !== '') && durations.every(duration => duration >= 0);

        if (!areFieldsFilled) {
            setAlertMessage('All text fields are required.');
            setShowAlert(true);
            return;
        }

        const activities: Activity[] = [];
        for (let i = 0; i < numberOfActivities; i++) {
            let dependencyNames: string[] = [];
            if (dependencyValues[i].trim() !== '-') {
                dependencyNames = dependencyValues[i].trim().split(',').map(dep => dep.trim()).filter(Boolean);
            }
            const activity: Activity = {
                id: i + 1,
                name: String.fromCharCode(65 + i),
                duration: durations[i],
                earlyStart: 0,
                earlyFinish: 0,
                lateStart: 0,
                lateFinish: 0,
                slackTime: 0,
                isCriticalActivity: 'No',
                childList: [],
                parentList: [],
                dependencyNames: dependencyNames,
            };
            activities.push(activity);
        }
        sendAndProcessData(activities, setCalculatedActivities, setShowCalculatedActivities, setAlertMessage, setShowAlert);
    };

    const handleShowCriticalPath = async () => {
        try {
            const criticalPathNames = await fetchCriticalPath(calculatedActivities);
            setCriticalPath(criticalPathNames);
            setShowCriticalPath(true);
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Error occurred while fetching critical path.');
            setShowAlert(true);
        }
    };

    const handleGenerate = () => {
        setShowActivityGraph(true);
    };

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
                            required
                        />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <Form.Control
                            type="number"
                            size="sm"
                            style={{ width: '100px', margin: 'auto' }}
                            value={durations[i]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDurationChange(e, i)}
                            className="form-control"
                            min="0"
                            required
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
            <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
                {alertMessage}
            </Alert>
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
                            <th>Dependency Name (format: -,A,B,C...)</th>
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
                            {calculatedActivities.map((activity, index) => (
                                <tr key={index}>
                                    <td>{activity.id}</td>
                                    <td>{activity.name}</td>
                                    <td>{activity.duration}</td>
                                    <td>{activity.earlyStart}</td>
                                    <td>{activity.earlyFinish}</td>
                                    <td>{activity.lateStart}</td>
                                    <td>{activity.lateFinish}</td>
                                    <td>{activity.slackTime}</td>
                                    <td>{activity.isCriticalActivity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button variant="danger" onClick={handleShowCriticalPath}>Show critical path</Button>
                </div>
            )}
            {showCriticalPath && (
                <div className="critical-path">
                    <h3>Critical Path</h3>
                    <span className="critical-path-letters">
                        {criticalPath.map((activityName, index) => (
                            <span key={index}>
                                {activityName}
                                {index < criticalPath.length - 1 && ' -> '}
                            </span>
                        ))}
                    </span>
                    <p></p>
                    <Button variant="dark" onClick={handleGenerate}>Generate graph</Button>
                </div>
            )}
            {showActivityGraph && (
                <div className="activity-graph">
                    <h3>Activity graph</h3>
                </div>
            )}
        </div>
    );
}

export default CPM;
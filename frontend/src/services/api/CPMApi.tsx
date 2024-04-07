import { Activity } from '../../models/Activity';
import { ActivityRequest } from '../../models/ActivityRequest';
import { Dispatch, SetStateAction } from 'react';
import ApiURL from '../../constants/ApiConfig';

export const sendAndProcessData = async (
    activities: Activity[],
    setCalculatedActivities: Dispatch<SetStateAction<Activity[]>>,
    setShowCalculatedActivities: Dispatch<SetStateAction<boolean>>,
    setAlertMessage: Dispatch<SetStateAction<string>>,
    setShowAlert: Dispatch<SetStateAction<boolean>>
) => {
    try {
        const response = await fetch(`${ApiURL}/cpm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activities),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: ActivityRequest[] = await response.json();
        const processedData = processReceivedData(data);
        setCalculatedActivities(processedData);
        setShowCalculatedActivities(true);
    } catch (error) {
        console.error('Error:', error);
        setAlertMessage('Error occurred while calculating activities.');
        setShowAlert(true);
    }
};

export const fetchCriticalPath = async (activities: Activity[]): Promise<string[]> => {
    try {
        const response = await fetch(`${ApiURL}/cpm/critical-path`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activities),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const criticalPathNames: string[] = await response.json();
        return criticalPathNames;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error occurred while fetching critical path.');
    }
};

export const processReceivedData = (data: ActivityRequest[]): Activity[] => {
    const convertedData: Activity[] = data.map(activity => ({
        id: activity.id,
        name: activity.name,
        duration: activity.duration,
        earlyStart: activity.earlyStart,
        earlyFinish: activity.earlyFinish,
        lateStart: activity.lateStart,
        lateFinish: activity.lateFinish,
        slackTime: activity.slackTime,
        isCriticalActivity: activity.isCriticalActivity,
        childList: [],
        parentList: [],
        dependencyNames: [],
    }));
    return convertedData;
};
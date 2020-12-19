import firebase from 'firebase';
import { store } from 'redux/store';

export const logEvent = (eventName, eventData = {}) => {
    const date = new Date()
    const eventNameSlug = eventName.toLowerCase().split(" ").join("_")
    const data= {account_id: store.getState().auth.userID + '', event_type: eventName, ...eventData, event_log_time: date.toLocaleString()}
    firebase.analytics().logEvent(eventNameSlug, data)
}


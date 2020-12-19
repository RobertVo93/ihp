import { MY_public_holidays } from "./data/publicholidays";
import moment from 'moment';

function checkPublicHoliday(date) {
    date.setHours(0, 0, 0, 0);
    for (var i = 0; i < MY_public_holidays.length; i++) {
        if (MY_public_holidays[i].date.getFullYear() != date.getFullYear()) continue;
        if (MY_public_holidays[i].date.getMonth() != date.getMonth()) continue;
        if (MY_public_holidays[i].date.getDate() == date.getDate()) return true;
    }
    return false;
}

/**
 * Creating the Calculations of TAT (Turn Around Time) here
 * @param {*} before The date need to calculate TAT
 */
export function calculateAging(before) {
    if (before > new Date()) { //if before date is more than today's date
        return 0;
    }
    if (before == null) return 0;
    //get input before and after string YYYY-MM-DD
    let TAT = 0;
    let beforeDate = new Date(before);
    let todayDate = new Date();
    let currentMovingDate = beforeDate;
    let MDText = currentMovingDate.getFullYear() + "-" + (currentMovingDate.getMonth() + 1) + "-" + currentMovingDate.getDate();
    let TDText = todayDate.getFullYear() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getDate();

    while (TDText != MDText) {
        currentMovingDate.setDate(currentMovingDate.getDate() + 1);
        MDText = currentMovingDate.getFullYear() + "-" + (currentMovingDate.getMonth() + 1) + "-" + currentMovingDate.getDate();
        if (currentMovingDate.getDay() != 1 && currentMovingDate.getDay() != 0) { //checking if its a weekend
            if (!checkPublicHoliday(currentMovingDate)) {
                TAT++;
            }
        }

    }
    return TAT;
}

/**
 * Calculate the zone (help alert user when zone = red-danger and need to complete)
 * @param {*} TAT Turn Around Time
 */
export function calculateZone(TAT) {
    let greenControl = 2;
    let orangeControl = 4;
    let zone = "Red";
    if (TAT <= greenControl) {
        zone = "Green";
    } else if (TAT <= orangeControl) {
        zone = "Orange";
    }
    return zone;
}

export function getEmployeeHeadcount(results) {
    if (results == null || results.length == 0) return 0;
    let headcount = 0;
    for (var i = 0; i < results.length; i++) {
        if (results[i].Relation == "E0") {
            headcount = results[i].HCount;
            break;
        }
    }
    return headcount;
}

export function checkPermissions(pArray, permission) {
    for (var i = 0; i < pArray.length; i++) {
        if (pArray[i] == permission) return true;
    }
    return false;
}

export function calculatePercentage(low, total) {
    return Math.round(low / total * 100) + "%";
}

export function convertDateTime(dateTimeString) {
    if (dateTimeString == null) return null;
    return moment(dateTimeString.replace("Z", "")).utcOffset('+0800').format("DD MMM YYYY h:mma");
}

export function convertDateTimeObject(dateTimeString) {
    if (dateTimeString == null) return null;
    //alert(dateTimeString);
    //let newDT = dateTimeString.split(" ")[0] + "T" + dateTimeString.split(" ")[1] + "Z";
    //alert(newDT);
    let newDT = new Date(dateTimeString);
    newDT.setHours(newDT.getHours() - 8); //offset
    //newDT.setDate(newDT.getDate()-1);
    return newDT;
}

export function convertDateTimeToServer(dateObject) {
    if (dateObject == null) return null;
    return dateObject.getFullYear() + "-" +
        (dateObject.getMonth() + 1 > 10 ? dateObject.getMonth() + 1 : "0" + (dateObject.getMonth() + 1)) + "-" +
        (dateObject.getDate() + 1 > 10 ? dateObject.getDate() : "0" + (dateObject.getDate() + 1)) + " " +
        (dateObject.getHours() > 10 ? dateObject.getHours() : "0" + dateObject.getHours()) + ":" +
        (dateObject.getMinutes() > 10 ? dateObject.getMinutes() : "0" + dateObject.getMinutes()) + ":" +
        (dateObject.getSeconds() > 10 ? dateObject.getSeconds() : "0" + dateObject.getSeconds());
}

export function getObject(array, key, value) {
    if (array == null) return null;
    /*for(var i=0; i<array.length; i++){
        if(array[i][key] == value){
            return array;
        })
    }*/
    return null;
}

export function convertEmployeeType(type) {
    switch (type) {
        case "E0":
            return "Employee";
        case "S":
            return "Spouse";
        case "C":
            return "Child";
        default:
            break;
    }
    return "Employee";
}

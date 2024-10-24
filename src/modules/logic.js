import { saveToLocalStorage, storage } from "./storage";
let idgen = require("genid");
import { isToday } from "date-fns";
import { isThisWeek } from 'date-fns';

const create = (project, id) => {
    const obj = {
        tasks: [],
        project: project,
        id: id,
    };
    return obj;
}

export const ifToday = (date) => {
    const sdate = new Date(date);
    return isToday(sdate);
};

export const ifWeek = (date) => {
    const sdate = new Date(date);
    return isThisWeek(sdate, { weekStartsOn: 1 });
};

export const getID = (n) => idgen(n);

export const addProject = (project) => {
    let id = idgen(16);
    const obj = create(project, id);
    storage.push(obj);
    saveToLocalStorage();
    return id;
};
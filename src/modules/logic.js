import { storage } from "./storage";
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
    return id;
};

// let idgen = require("genid");

// for (let i = 1; i < 11; ++i) {
//     let id = idgen(16);
//     const obj = create("clean", "the dishes", "22-10-2024", "Important", i, id);
//     storage.push(obj);
// }


// import { compareAsc, format } from "date-fns";
// const fdate = format(new Date(2014, 1, 11), "dd-MM-yyyy");
// //=> '2014-02-11'

// const dates = [
//   new Date(1995, 6, 2),
//   new Date(1987, 1, 11),
//   new Date(1989, 6, 10),
// ];
// dates.sort(compareAsc);

//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]
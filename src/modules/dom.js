import { addProject, getID, ifToday, ifWeek } from './logic';
import { storage } from './storage';

const dom = () => {
    const body = document.querySelector('body');
    body.addEventListener('click', function (e) {
        const className = e.target.getAttribute('class');

        // append project (done)
        if (
            className === 'nav-projects-svg' ||
            className === 'SVG-SIDEBAR-FILL'
        ) {
            const nav = document.querySelector('.nav-projects-title-top');
            const addProject = document.createElement('div');
            if (nav.childElementCount === 1) {
                addProject.innerHTML = `<div class="addProjectInput-div">
                                <div><input class="addProjectInput" type="text" placeholder="Project name"></div>
                                <div><button class="btn-addproject">Submit</button></div>
                            </div>`;
                nav.append(addProject);
            } else {
                nav.lastElementChild.remove();
            }
        }

        // append task (done)
        else if (className === 'addTaskSvg') {
            const addTask = document.querySelector('.container-addTask');
            const addTasks = document.createElement('div');
            if (!addTask.childElementCount) {
                addTasks.innerHTML = `<div class="addTasks">
                            <div class="addTasks-wrap">
                                <input class="input-addTask1" type="text" placeholder="Title" />
                                <input class="input-addTask2" type="text" placeholder="Description" />
                                <input class="input-addTask3" type="date" />
                                <select class="input-addTask4" value="priority">
                                    <option value="Not so important" name="important 1">
                                        Not so important
                                    </option>
                                    <option value="Important" name="important 2">
                                        important
                                    </option>
                                    <option value="Very important" name="important 3">
                                        Very important
                                    </option>
                                </select>
                                <button class="input-addTask-btn">Submit</button>
                            </div>
                        </div>`;
                addTask.append(addTasks);
            } else {
                addTask.firstElementChild.remove();
            }
        }

        // filter
        // show all
        else if (className !== null && className.includes('showAll')) {
            displayWithFilters('All');
        }

        // show today
        else if (className !== null && className.includes('showToday')) {
            displayWithFilters('Today');
        }

        // show week
        else if (className !== null && className.includes('showWeek')) {
            displayWithFilters('Week');
        }

        // show important
        else if (className !== null && className.includes('showImportant')) {
            displayWithFilters('Important');
        }

        // show completed
        else if (className !== null && className.includes('showCompleted')) {
            displayWithFilters('Completed');
        }

        // switch on/off
        else if (className === 'sw') {
            const title = document
                .querySelector('.title p')
                .getAttribute('class');
            const taskid = e.target.parentElement.parentElement;

            let index;
            for (let i = 0; i < storage.length; ++i) {
                if (storage[i].id === title) {
                    index = i;
                    break;
                }
            }
            for (let i = 0; i < storage[index].tasks.length; ++i) {
                if (
                    storage[index].tasks[i].taskID ===
                    taskid.getAttribute('class')
                ) {
                    if (storage[index].tasks[i].switch === 'off') {
                        storage[index].tasks[i].switch = 'on';
                    } else {
                        storage[index].tasks[i].switch = 'off';
                    }
                    break;
                }
            }
        }

        // add task (todo)
        else if (className === 'input-addTask-btn') {
            const in1 = document.querySelector('.input-addTask1');
            const in2 = document.querySelector('.input-addTask2');
            const in3 = document.querySelector('.input-addTask3');
            const in4 = document.querySelector('.input-addTask4');
            if (
                in1.value &&
                in3.value &&
                !in1.value.includes('<') &&
                !in1.value.includes('>') &&
                !in1.value.includes('/') &&
                !in2.value.includes('<') &&
                !in2.value.includes('>') &&
                !in2.value.includes('/')
            ) {
                // STORAGE
                const title = document
                    .querySelector('.title p')
                    .getAttribute('class');

                let index;
                for (let i = 0; i < storage.length; ++i) {
                    if (storage[i].id === title) {
                        index = i;
                        break;
                    }
                }
                const taskID = getID(3);
                const obj = {
                    name: in1.value,
                    desc: in2.value,
                    date: in3.value,
                    prop: in4.value,
                    taskID: taskID,
                    switch: 'off',
                };

                storage[index].tasks.push(obj);

                // DOM
                const container = document.querySelector(
                    '.container-tasks-info'
                );
                const div = document.createElement('div');
                const len = storage[index].tasks.length - 1;
                div.classList.add(storage[index].tasks[len].taskID);
                div.innerHTML = `<div>
                                <input class="sw" type="checkbox" />
                                <p>${storage[index].tasks[len].name}</p>
                                <p>${storage[index].tasks[len].desc}</p>
                                <p>${storage[index].tasks[len].prop}</p>
                            </div>
                            <div>
                                <p>${storage[index].tasks[len].date}</p>
                                <button class="btn-addtask">del</button>
                            </div>`;
                container.append(div);

                // Nr o' tasks
                const taskslength = document.querySelector(
                    '.list-head .nrOfList'
                );
                taskslength.textContent = storage[index].tasks.length;

                in1.value = '';
                in2.value = '';
                in3.value = '';
                in4.value = 'Not so important';
            }
        }

        // remove task (done)
        else if (className !== null && className === 'btn-addtask') {
            const title = document
                .querySelector('.title p')
                .getAttribute('class');
            const taskid = e.target.parentElement.parentElement;

            let index;
            for (let i = 0; i < storage.length; ++i) {
                if (storage[i].id === title) {
                    index = i;
                    break;
                }
            }
            for (let i = 0; i < storage[index].tasks.length; ++i) {
                if (
                    storage[index].tasks[i].taskID ===
                    taskid.getAttribute('class')
                ) {
                    const container = document.querySelector(
                        '.container-tasks-info'
                    );
                    container.removeChild(taskid);
                    storage[index].tasks.splice(i, 1);
                    break;
                }
            }
            const taskslength = document.querySelector('.list-head .nrOfList');
            taskslength.textContent = storage[index].tasks.length;
        }

        // add project (done)
        else if (className === 'btn-addproject') {
            const in1 = document.querySelector('.addProjectInput');
            if (in1.value) {
                // STORAGE
                let id = addProject(in1.value);
                // append to nav
                const parent = document.querySelector('.projects-links-div');
                const div = document.createElement('div');
                div.innerHTML = `<div class="card-list">
                                <div><p class="card-list-p ${id}">${in1.value}</p></div>
                                <div><button class="delProject ${id}">del</button></div>
                        </div>`;
                parent.append(div);
                in1.value = '';
                const projectCounts = document.querySelector('.projects-count');
                projectCounts.textContent = storage.length;
            }
        }

        // del project
        else if (
            className !== null &&
            className.includes('delProject') === true
        ) {
            // get the id
            const id = className.substr(11, 27);

            for (let i = 0; i < storage.length; ++i) {
                if (storage[i].id === id) {
                    const container = document.querySelector(
                        '.projects-links-div'
                    );
                    const card =
                        e.target.parentElement.parentElement.parentElement;
                    container.removeChild(card);
                    storage.splice(i, 1);
                    const projectCounts =
                        document.querySelector('.projects-count');
                    projectCounts.textContent = storage.length;
                    // if () storage.empty, show nothing
                    break;
                }
            }
        }

        // acces project card list (done)
        else if (
            className !== null &&
            className.includes('card-list-p') === true
        ) {
            const id = className.substr(12, 17);
            // get the project index
            let index;
            for (let i = 0; i < storage.length; ++i) {
                if (storage[i].id === id) {
                    index = i;
                    break;
                }
            }

            // addsvg
            const listHead = document.querySelector('.list-head');
            const addSVG = document.querySelector('.addTaskSvg');
            if (addSVG === null) {
                const div = document.createElement('div');
                div.innerHTML = `<svg
                            class="addTaskSvg"
                            width="32px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                class="addTaskSvg"
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    class="addTaskSvg"
                                    class="SVG-SIDEBAR-FILL"
                                    d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z"
                                ></path>
                                <path
                                    class="addTaskSvg"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                                ></path>
                            </g>
                        </svg>`;
                listHead.append(div);
            }

            const title = document.querySelector('.title p');
            title.textContent = storage[index].project;
            title.removeAttribute('class');
            title.classList.add(id);
            const taskslength = document.querySelector('.list-head .nrOfList');
            taskslength.textContent = storage[index].tasks.length; // FIX HERE

            const containerTasksInfo = document.querySelector(
                '.container-tasks-info'
            );
            // remove before content
            while (containerTasksInfo.childElementCount) {
                containerTasksInfo.firstElementChild.remove();
            }
            // add tasks (***TESTING***NOT*REAL*PROJECT*CODE***)
            // const taskID = getID(3);
            // const obj = {
            //     name: 1,
            //     desc: 1,
            //     date: 1,
            //     prop: 1,
            //     taskID: taskID,
            // };

            // storage[index].tasks.push(obj);
            let nr = storage[index].tasks.length;
            for (let i = 0; i < nr; ++i) {
                if (storage[index].tasks[i].switch === 'on') {
                    const div = document.createElement('div');
                    div.classList.add(storage[index].tasks[i].taskID);
                    div.innerHTML = `<div>
                                    <input class="sw" checked type="checkbox" />
                                    <p>${storage[index].tasks[i].name}</p>
                                    <p>${storage[index].tasks[i].desc}</p>
                                    <p>${storage[index].tasks[i].prop}</p>
                                </div>
                                <div>
                                    <p>${storage[index].tasks[i].date}</p>
                                    <button class="btn-addtask">del</button>
                                    </div>`;
                    containerTasksInfo.append(div);
                } else {
                    const div = document.createElement('div');
                    div.classList.add(storage[index].tasks[i].taskID);
                    div.innerHTML = `<div>
                                    <input class="sw" type="checkbox" />
                                    <p>${storage[index].tasks[i].name}</p>
                                    <p>${storage[index].tasks[i].desc}</p>
                                    <p>${storage[index].tasks[i].prop}</p>
                                </div>
                                <div>
                                    <p>${storage[index].tasks[i].date}</p>
                                    <button class="btn-addtask">del</button>
                                </div>`;
                    containerTasksInfo.append(div);
                }
            }
        }
    });

    // funtctions
    const displayWithFilters = (titleCnt) => {
        const title = document.querySelector('.title').firstElementChild;
        title.textContent = titleCnt;
        const listHead = document.querySelector('.list-head').lastElementChild;
        const addSVG = document.querySelector('.addTaskSvg');
        if (addSVG !== null) {
            listHead.removeChild(addSVG);
        }

        // gods work
        const containerAddTask = document.querySelector('.container-addTask');
        while (containerAddTask.childElementCount) {
            containerAddTask.firstElementChild.remove();
        }

        // gods work
        const containerTasksInfo = document.querySelector(
            '.container-tasks-info'
        );
        while (containerTasksInfo.childElementCount) {
            containerTasksInfo.firstElementChild.remove();
        }

        const filterTasks = (i, j) => {
            if (titleCnt === 'All') {
                return 1;
            } else if (titleCnt === 'Today') {
                return ifToday(storage[i].tasks[j].date);
            } else if (titleCnt === 'Week') {
                return ifWeek(storage[i].tasks[j].date);
            } else if (
                titleCnt === 'Important' &&
                (storage[i].tasks[j].prop === 'Important' ||
                    storage[i].tasks[j].prop === 'Very important')
            ) {
                return 1;
            } else if (
                titleCnt === 'Completed' &&
                storage[i].tasks[j].switch === 'on'
            ) {
                return 1;
            }
        };

        let sum = 0;

        for (let i = 0; i < storage.length; ++i) {
            for (let j = 0; j < storage[i].tasks.length; ++j) {
                if (filterTasks(i, j)) {
                    if (storage[i].tasks[j].switch === 'on') {
                        const div = document.createElement('div');
                        div.classList.add(storage[i].tasks[j].taskID);
                        div.innerHTML = `<div>
                                    <input class="sw" checked type="checkbox" />
                                    <p>${storage[i].tasks[j].name}</p>
                                    <p>${storage[i].tasks[j].desc}</p>
                                    <p>${storage[i].tasks[j].prop}</p>
                                </div>
                                <div>
                                    <p>${storage[i].tasks[j].date}</p>
                                    <button class="btn-addtask">del</button>
                                    </div>`;
                        containerTasksInfo.append(div);
                    } else {
                        const div = document.createElement('div');
                        div.classList.add(storage[i].tasks[j].taskID);
                        div.innerHTML = `<div>
                                    <input class="sw" type="checkbox" />
                                    <p>${storage[i].tasks[j].name}</p>
                                    <p>${storage[i].tasks[j].desc}</p>
                                    <p>${storage[i].tasks[j].prop}</p>
                                </div>
                                <div>
                                    <p>${storage[i].tasks[j].date}</p>
                                    <button class="btn-addtask">del</button>
                                </div>`;
                        containerTasksInfo.append(div);
                    }
                    sum++;
                }
            }
        }
        const nrolist = document.querySelector('.nrOfList');
        nrolist.textContent = sum;
    };

    // open && close sidebar
    const burger = document.querySelector('.burger');
    burger.addEventListener('click', function () {
        const nav = document.querySelector('nav');
        nav.classList.toggle('hide');
    });
};

export default dom;

// TO DO
// delete task dom && storage (done)
// bug duplicates (done)
// add custom task dom && storage (done)
// save if it s done or not (done)
// remove projects (done)
// project count (done)
// display all, today, week, important, completed tasks (done)
// local storage (god bless)
// default info (ez later)

// if (no projects) (ez later)

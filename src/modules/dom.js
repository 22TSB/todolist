const dom = () => {
    const body = document.querySelector('body');
    body.addEventListener('click', function (e) {
        const className = e.target.getAttribute('class');

        // append project
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
        
        
        // append task
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
                                    <option value="important" name="important 2">
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

        // add task
        else if (className === 'input-addTask-btn') {
            const in1 = document.querySelector('.input-addTask1');
            const in2 = document.querySelector('.input-addTask2');
            const in3 = document.querySelector('.input-addTask3');
            const in4 = document.querySelector('.input-addTask4');
            if (in1.value && in2.value && in3.value && in4.value) {
                // STORAGE
            }
        }

        // add project
        else if (className === 'btn-addproject') {
            const in1 = document.querySelector('.addProjectInput');
            if (in1.value) {
                // STORAGE
            }
        }
    });

    // open && close sidebar
    const burger = document.querySelector('.burger');
    burger.addEventListener('click', function () {
        const nav = document.querySelector('nav');
        nav.classList.toggle('hide');
    });

};

export default dom;

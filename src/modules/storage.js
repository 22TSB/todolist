export let storage = JSON.parse(localStorage.getItem('todolist')) || [
    {
        tasks: [
            {
                name: "lorem 1",
                desc: "ipsum 1",
                date: '2024-10-24',
                prop: 'Not so important',
                taskID: 'a13',
                switch: 'off',
            },
            {
                name: "lorem 2",
                desc: "ipsum 2",
                date: '2024-10-27',
                prop: 'Important',
                taskID: 'a23',
                switch: 'on',
            },
            {
                name: "lorem 3",
                desc: "ipsum 3",
                date: '2024-11-24',
                prop: 'Very important',
                taskID: 'a33',
                switch: 'off',
            },
        ],
        project: 'default project',
        id: 'veMaaV8sBt2xP4KM',
    },
];

export const saveToLocalStorage = () => {
    localStorage.setItem('todolist', JSON.stringify(storage));
};
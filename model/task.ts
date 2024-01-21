import fs from "fs";
const readAllTask = () => {
    try {
        const buffer = fs.readFileSync("task.json");
        const taskString = buffer.toString();
        return JSON.parse(taskString);
    }
    catch (error) {
        console.error("Error reading task.json:", error);
        return [];
    }
};
const createTask = (title, description) => {
    const newTask = {
        id: Math.random().toString(),
        title,
        description,
    };
    const taskList = [...readAllTask(), newTask];
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
};
const readDetailTask = (id) => {
    const taskList = readAllTask();
    return taskList.find((task) => task.id === id);
};
const updateTask = (id, title, description) => {
    const taskList = readAllTask();
    const index = taskList.findIndex((task) => task.id === id);
    if (index !== -1) {
        const oldTask = taskList[index];
        const newTask = Object.assign(Object.assign({}, oldTask), { title, description });
        taskList[index] = newTask;
        fs.writeFileSync("task.json", JSON.stringify(taskList));
        return newTask;
    }
    else {
        return false;
    }
};
const deleteTask = (id) => {
    const taskList = readAllTask();
    const index = taskList.findIndex((task) => task.id === id);
    if (index !== -1) {
        const task = taskList[index];
        taskList.splice(index, 1);
        fs.writeFileSync("task.json", JSON.stringify(taskList));
        return task;
    }
    else {
        return false;
    }
};
export { readAllTask, createTask, readDetailTask, updateTask, deleteTask };

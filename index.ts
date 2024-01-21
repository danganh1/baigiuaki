import yargs from "yargs";
import chalk from "chalk";
import {
 readAllTask,
 createTask,
 readDetailTask,
 updateTask,
 deleteTask,
} from "./model/task";

// Tạo lệnh test
yargs.command({
 command: "test",
 handler: () => {
   console.log("test");
 },
});

// CRUD

// create
yargs.command({
 command: "create",
 builder: {
   title: {
     type: "string",
     demandOption: true,
   },
   description: {
     type: "string",
     demandOption: true,
   },
 },
 handler: (args) => {
   const { title, description } = args;
   const newTask = createTask(title, description);
   console.log("đã tạo mới công việc thành công: ", newTask);
 },
});

// read-all
yargs.command({
 command: "read-all",
 handler: () => {
   const result = readAllTask();
   console.log(chalk.blue("taskJson: "), result);
 },
});

// read-detail
yargs.command({
 command: "read-detail",
 builder: {
   id: {
     type: "string",
     demandOption: true,
   },
 },
 handler: (args) => {
   const { id } = args;
   const task = readDetailTask(id);
   if (task) {
     console.log("task: ", task);
   } else {
     console.log("Not Found!");
   }
 },
});

// update
yargs.command({
 command: "update",
 builder: {
   id: {
     type: "string",
     demandOption: true,
   },
   title: {
     type: "string",
     demandOption: true,
   },
   description: {
     type: "string",
     demandOption: true,
   },
 },
 handler: (args) => {
   const { id, title, description } = args;
   const task = updateTask(id, title, description);
   if (task) {
     console.log("task updated: ", task);
   } else {
     console.log(chalk.red("Not Found!"));
   }
 },
});

// delete
yargs.command({
 command: "delete",
 builder: {
   id: {
     type: "string",
     demandOption: true,
   },
 },
 handler: (args) => {
   const { id } = args;
   const task = deleteTask(id);
   if (task) {
     console.log("delete task: ", task);
   } else {
     console.log("Not Found");
   }
 },
});

yargs.parse();

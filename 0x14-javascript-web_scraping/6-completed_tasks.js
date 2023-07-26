#!/usr/bin/node

const request = require('request');

function countCompletedTasks(apiUrl) {
  request(apiUrl, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else if (response.statusCode !== 200) {
      console.error('Status:', response.statusCode);
    } else {
      const todos = JSON.parse(body);
      const completedTasksByUserId = {};

      todos.forEach((todo) => {
        if (todo.completed) {
          if (completedTasksByUserId[todo.userId]) {
            completedTasksByUserId[todo.userId]++;
          } else {
            completedTasksByUserId[todo.userId] = 1;
          }
        }
      });

      console.log(completedTasksByUserId);
    }
  });
}

const apiUrl = process.argv[2];

if (!apiUrl) {
  console.error('Usage: ./6-completed_tasks.js <API_URL>');
  process.exit(1);
}

countCompletedTasks(apiUrl);

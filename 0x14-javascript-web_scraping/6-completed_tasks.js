#!/usr/bin/node

const request = require('request');
const url = process.argv[2];

request(url, (err, response, body) => {
  if (err) {
    console.error(err);
    return;
  }
  const todos = JSON.parse(body);
  const uniqueUserIds = new Set();
  todos.forEach(entry => {
    uniqueUserIds.add(entry.userId);
  });

  const completed = {};
  for (const i of uniqueUserIds) {
    let n = 0;
    for (const dos of todos) {
      if (dos.userId === i && dos.completed) {
        n++;
      }
    }
    completed[i] = n;
  }
  console.log(completed);
});

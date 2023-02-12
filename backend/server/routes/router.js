const express = require('express')
const route = express.Router();
const controller = require("../controller/controller")

// Routes

route.post('/api/filters', controller.create);

route.get('/api/filters', controller.find);

route.put('/api/filters/:id', controller.update);

route.delete('/api/filters/:id', controller.delete);

module.exports = route;
const createActivities = require("./activities")
const createShifts = require("./shifts.js")
const createClients = require("./clients") 

createShifts().then(() => createActivities()).then(() => createClients())

const fs = require('fs')
const csv = require('csv-parser');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const inputCSV = "hwwk9csv.csv"
const outputCSV = "sumOfDataWk9.csv"

const sum_array = [
    {
        "state":"WA",
        "sum": 0,
        "noOfMines": 0
    },
    {
        "state":"SA",
        "sum": 0,
        "noOfMines": 0
    },
    {
        "state":"VIC",
        "sum": 0,
        "noOfMines": 0
    },
    {
        "state":"TAS",
        "sum": 0,
        "noOfMines": 0
    },
    {
        "state":"NSW",
        "sum": 0,
        "noOfMines": 0
    },
    {
        "state":"QLD",
        "sum": 0,
        "noOfMines": 0
    },
    {
        "state":"NT",
        "sum": 0,
        "noOfMines": 0
    },

]


fs.createReadStream(inputCSV).pipe(csv()).on("data", (row) => {
    let no_processed = row["Processed"]
    let state_name = row["State /"]
    if (no_processed) {
        if (no_processed.substr(-1) === 'E') {
            no_processed = no_processed.slice(0, -1)
        }

        if (no_processed.includes(',')) {
            no_processed = no_processed.replace(",", "")
        }

        sum_array.forEach((state) => {
            if (state.state == state_name) {
                state.sum += parseFloat(no_processed)
                state.noOfMines += 1
            }
        })
    }

    console.log(sum_array)


})

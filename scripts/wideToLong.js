const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const inputFilePath = "week-10-hw.csv";
const outputFilePath = "gold_production_long.csv";

const longFormatData = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const keys = Object.keys(row);
    console.log("Row keys:", keys);

    keys.forEach((key, index) => {
      console.log(`Key ${index}: "${key}"`);
      console.log(
        "Character codes:",
        key.split("").map((c) => c.charCodeAt(0))
      );
    });

    const yearKey = keys.find((k) => k.toUpperCase().includes("YEAR"));
    const year = row[yearKey];
    console.log("Year:", year);

    const states = ["QLD", "NSW", "VIC", "TAS", "SA", "WA", "NT"];

    states.forEach((state) => {
      let goldProduced = row[state];

      if (goldProduced && goldProduced.trim() !== "") {
        goldProduced = parseFloat(goldProduced.replace(/,/g, ""));

        longFormatData.push({
          YEAR: year,
          State: state,
          GoldProduced: goldProduced,
        });
      }
    });
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");

    const csvWriter = createCsvWriter({
      path: outputFilePath,
      header: [
        { id: "YEAR", title: "YEAR" },
        { id: "State", title: "State" },
        { id: "GoldProduced", title: "GoldProduced" },
      ],
    });

    csvWriter
      .writeRecords(longFormatData)
      .then(() => {
        console.log(`Long-format CSV file saved as ${outputFilePath}`);
      })
      .catch((error) => {
        console.error("Error writing CSV file:", error);
      });
  })
  .on("error", (error) => {
    console.error("Error reading CSV file:", error);
  });

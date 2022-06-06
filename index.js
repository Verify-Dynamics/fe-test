const express = require("express");
const app = express();
const port = 8000 || process.env.PORT;
const quotesRouter = require("./routes/quotes");
const authorsRouter = require("./routes/authors");
const initialiseTables = require("./services/init");
const data = require("./services/data.json");

console.log("\x1b[37m", "\n Launching Express Server...\n");

app.use(express.json());

console.log(
  `__________________________________________________________________
                        WELCOME TO THE 
___________________________________________________________________`
);
console.log(
  "\x1b[31m",
  `

    ██    ██    ███████    ██████     ██    ███████    ██    ██    
    ██    ██    ██         ██   ██    ██    ██          ██  ██     
    ██    ██    █████      ██████     ██    █████        ████      
     ██  ██     ██         ██   ██    ██    ██            ██       
      ████      ███████    ██   ██    ██    ██            ██       
`
);
console.log(
  "\x1b[37m",
  `
                          DYNAMICS

___________________________________________________________________
            FRONT END CHALLENGE - [Level: Beginner]
___________________________________________________________________\n`
);

console.log("\x1b[1m", "Mounting SQL Lite Database with API endpoints... \n");

const createTablesResponse = initialiseTables(data);
console.log("Creating Tables:");
createTablesResponse.forEach((table) => {
  console.log(
    "\x1b[32m",
    ` - ${table.name} listening at http://localhost:${port}/${table.name}`
  );
});
console.log("\x1b[37m", "\n");
console.log("\x1b[1m", "And we're go...\n\n");

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.use("/quotes", quotesRouter);
app.use("/authors", authorsRouter);

app.listen(port, () => {
  console.log(`Your API is listening at http://localhost:${port}`);
});

console.log("\x1b[33m%s\x1b[0m", "Good luck! :) \n");

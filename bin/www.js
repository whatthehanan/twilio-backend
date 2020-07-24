require("dotenv").config();

const program = require("commander");
const app = require("../HTTP/Server");

program.command("start").action(() => {
  app.listen(8080, "0.0.0.0", () => {
    console.log("listening on 8080");
  });
});

program.parse(process.argv);

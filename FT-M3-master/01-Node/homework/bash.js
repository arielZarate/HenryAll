const fs = require("fs");

/* const commands = require("./commands/index");
const cmd = "pwd";

commands[cmd]();
 */
//========PROCESS========
//console.log(process);

//console.log(Object.keys(process));

/* 

in -out 
stdin -stdout

*/

// Output un prompt
/* process.stdout.write("<prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
  var cmd = data.toString().trim(); // remueve la nueva línea
  process.stdout.write("You typed: " + cmd);
  process.stdout.write("\nprompt > ");
});
 */
//======date========pdw =========

//console.log(process);

//========FS=============

/* fs.readdir(".", function (err, files) {
  if (err) throw err;
  files.forEach(function (file) {
    process.stdout.write(file.toString() + "\n");
  });
  process.stdout.write("prompt > ");
}); */

//=========curl -require =================

let go = "http:www.google.com";

//console.log(`curl ${go}`);

const commands = {
  ls: function (file, done) {
    var output = "";
    fs.readdir(".", function (err, files) {
      files.forEach(function (file) {
        output += file.toString() + "\n";
      });
      done(output);
    });
  },
};

console.log(commands);

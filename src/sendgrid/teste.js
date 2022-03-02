var cron = require('node-cron');
const { time } = require('node:console');
const { exit } = require('node:process');

 var task = cron.schedule('*/1 * * * * *', () => {
  console.log('running a task every second');
})
function ContarSegundos(){
    var segundos = 1;
    // document.Writeln("Já passou " + segundos +" segundos...");
    task.stop()
    exit()
}
setInterval(ContarSegundos, 1000);
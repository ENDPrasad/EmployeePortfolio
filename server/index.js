const XLSX = require('xlsx');
const http = require('http');
const cors = require('cors')


const workbook = XLSX.readFile("H:/Web Development/EmployeeDetails/server/data/employeeDetails.xlsx")
const worksheet = workbook.Sheets[workbook.SheetNames[0]]
console.log(worksheet.length)
var i = 1
var index = 0
var dataList = []
var rowCount = 0
var alphabets = 65;
while(worksheet[`A${i}`] != undefined){
  // Need to find row size
  rowCount++
  i++
}

console.log(rowCount)


for(i=2;i<rowCount+1;i++){
    // var row = []
    // row.concat(worksheet[`A${i}`].v)
    // row.concat(worksheet[`B${i}`].v)
    // row.concat(worksheet[`C${i}`].v)
    // row.concat(worksheet[`D${i}`].v)
    // row.concat(worksheet[`E${i}`].v)
    // row.concat(worksheet[`F${i}`].v)
    var item = {
        cognizant_ID: worksheet[`A${i}`].v, 
        name: worksheet[`B${i}`].v, 
        cognizant_email: worksheet[`C${i}`].v, 
        NBCU_ID: worksheet[`D${i}`].v, 
        manager: worksheet[`E${i}`].v, 
        NBCU_mail: worksheet[`F${i}`].v
    }

    dataList[index] = item
    index += 1
}
console.log(dataList)

const hostname = '127.0.0.1';
const port = 3002;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(dataList));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


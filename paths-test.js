const fileName = "allornothing";  // replace with 'labels'
const data = require("./data/"+fileName+".json");
let pathHelper = require("./utils/path-helper");

let allPaths = pathHelper.getAllPaths(data, fileName);
pathHelper.printPaths(allPaths);

// const graphHelper = require("./utils/graph-helper");
// graphHelper.generateAdjacentMatrix(data)




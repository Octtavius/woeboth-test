/**
 * This is a onefile solution. It doesn't depend on any moduels except node.js modules
 */

const _ = require("lodash")
const fileName = "allornothing";  // replace with 'labels'
const data = require("../data/"+fileName+".json");

const st = fileName+ "-start";
const startObject = getStartingObject(st);
let allPaths = [];
let mappingResult = [];

generateAllPaths([], startObject, {});

let tempArr = []
for (let i in allPaths) {
    let arr = allPaths[i];
    let str = "";
    for ( let j in arr) {
        let elem = arr[j];
        str += elem + ","
    }
    
    tempArr.push(str)
}

tempArr.sort()
for (let i in tempArr) {
    console.log("path " + (parseInt(i)+1))
    console.log(tempArr[i])
}

function generateAllPaths(path, obj, mappings) {
    const routes = obj.routes.split("|");

    for (let i =0; i < routes.length; i++) {
        const destination = routes[i];

        // when there are multiple decisions, we need to create new copies of path and map.
        // to avoid endless loops
        let pathMapping = _.clone(mappings, true);
        let separatePath = _.clone(path, true);
        const payload = obj.payloads.split("|")[i];
        
        // comment out the linke 53 and enable the code on 54.
        // this will show you how exactly some paths differ when they look identical.
        // if the payload is not displayed in path, some paths might look identical, 
        // but they actually differ in some properties like payload
        separatePath.push(obj.id + "("+payload+")");
        // separatePath.push(obj.id + "("+payload+")");

        if (obj.tag === "bye") {
            allPaths.push(separatePath);
            mappingResult.push(pathMapping)
            continue;
        }
        if (!wasVisited(destination, pathMapping, obj, i)){
            map(obj, routes[i], payload, pathMapping);
            generateAllPaths(separatePath, data[destination], pathMapping);
        }
    }
}


function map(obj, to, value, objectMapping) {
    if (!objectMapping[obj.id]) {
        objectMapping[obj.id] = {};
    } 
    
    if (objectMapping[obj.id][to] !== value) {
        objectMapping[obj.id][to] = [];
        objectMapping[obj.id][to].push(value);
    }
    
}

function wasVisited (destination, mappings, obj, payloadIdx) {
    const from = obj.id;
    if (!mappings[from]) {
        return false;
    } else {
        const mappedPayloads = mappings[from][destination];
        if (mappedPayloads === undefined) {
            return false;
        } else {
            return mappings[from][destination].includes(obj.payloads.split("|")[payloadIdx])
        }
    }
}

// function test() {
//     const mapping = {}
//     {
//         ZVQ: {
//             ZVQ: [2,"huh"]
//         }
//     }
//
//     const payloadIndex = 1;
//     const to = "CWP";
//     const obj = {
//         "ZVQ": {
//             "id": "ZVQ",
//             "text": "Which of these is an example of all-or-nothing thinking?|1. My classmates don't like me|2. I wish I knew more people|3. I feel lonely sometimes",
//             "replies": "1|2|3|All or Nothing??",
//             "payloads": "1|2|3|huh",
//             "routes": "CWP|LIQ|LIQ|CFK",
//             "tag": "",
//             "lesson": "allornothing",
//             "stage": ""
//           }
//     }
//
//     const response = wasVisited(mapping, obj, to, payloadIndex);
//     console.log(response)
// }

// test()

function getStartingObject(startTag) {
    let startObject = null;
    
    for (var entry in data) {
        const object = data[entry];
        
        if (object.tag !== "" && object.tag === startTag) {
            startObject = object;
            break;
        }
    }
    
    return startObject;
}
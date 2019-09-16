// another way
const data = require("./data/labels.json");
const startObject = getStartingObject();

let allPaths = [];
let objectMapping = {};
if (startObject !== null) {
    getAllPaths([], startObject);
    console.log(allPaths)

}


function getAllPaths(path, obj) {

    const routes = obj.routes.split("|");
    console.log(obj.id)
    if (routes.length === 1) {
        if (!vertexVisited(obj.id, routes[0], obj.payloads)) {
            if (obj.tag !== "bye") {
                
                addToPath(obj, routes[0], path, obj.payloads)
                getAllPaths(path, data[routes[0]])
            } else {
                allPaths.push(path);
                return;
            }
        }
    } else {
        var payloadsArr = obj.payloads.split("|");

        for (const route in routes) {
            if (!vertexVisited(obj.id, routes[route], payloadsArr[route])) {
                addToPath(obj, routes[route], path, payloadsArr[route])
                let tempPath = path.slice();
                getAllPaths(tempPath, data[routes[route]]);
            }
        }
        return;
    }
}

function vertexVisited(from, to, payload) {
    if (!objectMapping[from]) {
        objectMapping[from] = {};
        return false;
    } else {
        return objectMapping[from][to] === payload;
    }
}

function addToPath(obj, destination, path, payload) {
    path.push(obj.id);
    objectMapping[obj.id][destination] = payload;
}

function getStartingObject() {
    const startTag = "labels-start";
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


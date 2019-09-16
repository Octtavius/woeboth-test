exports.getMappedObjects = function(data){
    return getMappedObjects(data);
}

/**
 * It won't work as some responses point to same destination but with different values
 */
exports.generateAdjacentMatrix = function(data) {
    let objectMapping = getMappedObjects(data)

    printMatrix();

    function printMatrix() {
        // print the horizontal table column
        var horizontalHeader = ""
        
        for (var key in data) {
            horizontalHeader += "    " + data[key].id;
        }
        
        console.log(horizontalHeader)
        var horizontalData = ""
        for (var verticalKey in data) {
            horizontalData += data[verticalKey].id;
            
            for (var horizontalKey in data) {
                var val = objectMapping[verticalKey][horizontalKey];
                if (val === undefined) {
                    val = 0;
                }
                horizontalData += "  " + val + "    " ;
            }
            
            console.log(horizontalData)
            horizontalData = "";
        }
    }
}

function getMappedObjects(data) {
    let objectMapping = {};
    mapObjects(data);

    function map(from, to) {
        if (!objectMapping[from]) {
            objectMapping[from] = {};
        } 
        
        objectMapping[from][to] = 1;
        
    }
    
    function mapObjects(data) {
        for (let key in data) {
            const currentObject = data[key];
    
            const routes = currentObject.routes.split("|");
            
            for (route in routes) {
                map(currentObject.id, routes[route]);
            }
        }
    }

    return objectMapping;
}
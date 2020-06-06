/**
This file contains the algorithm to find bridges and articulation points.
This file runs in a separate thread from the main thread.
 */
self.onmessage = (e) => {
    // -- Initialize variables -- //
    const startId = e.data[0];
    const endId = e.data[1];
    const node_li = e.data[2];
    const line_li = e.data[3];
    const adjacency_matrix = e.data[4];
    for (let row=0;row<adjacency_matrix.length;row++) {
        for (let col=0;col<adjacency_matrix[row].length;col++) {
            if (adjacency_matrix[row][col] != Infinity) {
                adjacency_matrix[row][col] = Number(adjacency_matrix[row][col]);    // This is done because the non-infinity values of the adjacency matrix are strings so they need to be converted back to numbers
            }
        }
    }
    const sleep_time = e.data[5];
    const dir_bool = e.data[6];
    const undir_bool = e.data[7];

    let visited = [];   // Tracks the nodes that have been visited
    let neighbors = []; // Tracks the neighbors of the currently explored node
    let disc = [];  // Tracks the order in which the node is explored
    let low = [];   // Tracks the low-link value of the node
    let cumul = 0;  // Tracks the cumulative number of nodes explored
    let lowVal;    // Tracks the low-link values
    let art = [];   // Stores the index's of the articulation points

    // -- Functions -- //
    function sleep(milliseconds) {  // Pauses the program
        const date = Date.now();
        let currentDate = null;
        do {
        currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function idToIndex(id) {  // Find the index position of node with specified id
        return node_li.findIndex((element) => element.id == id);
    }

    function indexToId(index) { // Finds the id of the node given index
        return node_li[index].id;
    }

    function updateNode(index, color) {
        self.postMessage([index, color, null, null]);
    }

    function updateLine(index, color) {
        self.postMessage([null, null, index, color]);
    }

    function find(nodeIndex, prevIndex) {    // NodeIndex and prevIndex are the index's relative to node_li
        if (visited.includes(nodeIndex)) {
            return low[nodeIndex]; 
        }    
        visited.push(nodeIndex);    // Tracks nodes that have been visited
        disc[nodeIndex] = cumul;    // Sets the disc => order node was explored
        low[nodeIndex] = cumul; // Sets the low link value to the disc value
        cumul++;
        updateNode(nodeIndex, "#FFA849");  // Sets node color indicating exploring
        sleep(sleep_time);
        
        neighbors.push([]); // Pushes an empty array
        for (let id=0;id<adjacency_matrix[nodeIndex].length;id++) {    // Searches through the adjacency matrix
            if ((adjacency_matrix[nodeIndex][id] != Infinity) && (idToIndex(id) != prevIndex)) {   // Finds any values that are not infinity and makes sure to disclude the node it just came from
                neighbors[neighbors.length - 1].push(id);    // Adds the id if value is not infinity
            }
        }
        let id_arr = [];  // Gets the last value for the variable
        for (id of neighbors[neighbors.length - 1]) {    // For each of the current nodes neighbors
            id_arr.push(id);
            lowVal = find(idToIndex(id_arr[id_arr.length - 1]), nodeIndex);   // Recursively do a depth first search. Returns the low-link value of the neighboring node
            if (lowVal < low[nodeIndex]) { // If search finds a new lowest-value node
                low[nodeIndex] = lowVal;   // Update lowest value node
            } 

            if (disc[nodeIndex] < low[idToIndex(id_arr[id_arr.length - 1])]) {  // Checks if edge connecting the two nodes is a bridge

                // Find bridges //
                for (let line_index=0;line_index<line_li.length;line_index++) { // Find the line(s) that match the above condition
                    let from = idToIndex(line_li[line_index].startNodeId);  // Stores the index position of the starting node
                    let to = idToIndex(line_li[line_index].endNodeId);  // stores the index position of the end node
                    if (((from == nodeIndex) && (to == idToIndex(id_arr[id_arr.length - 1]))) ||
                    ((from == idToIndex(id_arr[id_arr.length - 1])) && (to == nodeIndex))) {    // If a line connects the start and end node
                        updateLine(line_index, "red");  // Draw line red
                    }
                }
                sleep(sleep_time);
            }
            id_arr.pop();   // Remove neighbor to check from stack
        }
        neighbors.pop();
        updateNode(nodeIndex, "#397EC9");  // Resets the node color      
        sleep(sleep_time);
        return low[nodeIndex];
    }

    // -- Code Starts Here -- //
    find(0, null);
}

// Notes //
/*
Conditions for articulation point(s):
    a) A node is connected to a bridge and has at least 2 edges
    b) The node is part of a cycle and has at least 3 neighbors
*/
/* 
This file contains the Breadth First Search algorithm. 
This algorithm finds the shortest path between two points on an unweighted graph.
This file runs in a separate thread from the main thread. 
*/
self.onmessage = (e) => {
    // -- Initialize variables -- //
    const startId = e.data[0];
    const endId = e.data[1];
    const node_li = e.data[2];
    const line_li = e.data[3];
    const adjacency_matrix = e.data[4];
    const sleep_time = e.data[5];
    const dir_bool = e.data[6];
    const undir_bool = e.data[7];

    let q = []; // This is a queue data structure. Stores the index position of nodes.
    q.push(idToIndex(startId));
    let visited = [];   // Array tracks which nodes have been visited. The index of element corresponds to index in node_li.

    let prev = [];  // Stores the index position of previous node

    for (let i=0;i<node_li.length;i++) {
        visited[i] = false; // Sets all nodes to unvisited
        prev[i] = null;
    }
    visited[idToIndex(startId)] = true; // Sets starting node as visited

    let neighbors = []; // Stores the neighbors

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

    function updateNode(index, color) {    // Sends data for main thread to update
        self.postMessage([index, color, null, null]);
        sleep(sleep_time);
    }

    function updateLine(index, color) {
        self.postMessage([null, null, index, color]);
    }

    function breadthFirstSearch(i) {
        // -- Breadth First Search the graph -- //
        while (q.length > 0) {  // While the queue is not empty
            nodeToCheck = q[0]; // Gets the index position of node to check
            q.shift();  // Removes first index

            updateNode(nodeToCheck, "#858891"); // Draws root node as visited

            neighbors = [];
            // Get Neighbors //
            for (let id = 0; id < adjacency_matrix[indexToId(nodeToCheck)].length; id++) {  // Searches through the adjacency matrix
                if (adjacency_matrix[indexToId(nodeToCheck)][id] != Infinity) { // If value is not infinity
                    neighbors.push(idToIndex(id));    // Gets the index position of neighbors
                }
            }

            // Visit Neighbors //
            for (next of neighbors) {   // For each of the neighbors
                if (!visited[next]) {   // If the neighbor has not been visited
                    q.push(next);   // Adds node index to queue
                    visited[next] = true;   // Marks node index as visited
                    prev[next] = nodeToCheck;   // Sets previous node of current node
                    updateNode(next, "#FFA849");    // Draws node as currently visiting
                }
            } 
        }

        // Display shortest path between end node and start node //
        currentNode = idToIndex(endId); // Get the index of the current node
        previousNode = prev[currentNode];   // Get the index of the previous node
        while (previousNode != null) {   // While a previous node exists
            for (let line_index = 0;line_index < line_li.length;line_index++) { // Finds the line(s)
                if ((idToIndex(line_li[line_index].endNodeId) == currentNode) && 
                (idToIndex(line_li[line_index].startNodeId) == previousNode) && dir_bool) {    // If an edge connects the current node and the previous node
                    updateLine(line_index, "#2F7B1F");   // Updates the line
                    sleep(sleep_time);
                }
                if (((idToIndex(line_li[line_index].startNodeId) == currentNode) && 
                (idToIndex(line_li[line_index].endNodeId) == previousNode)) || 
                ((idToIndex(line_li[line_index].endNodeId) == currentNode) && 
                (idToIndex(line_li[line_index].startNodeId) == previousNode)) && undir_bool) {    // If an edge connects the current node and the previous node
                    updateLine(line_index, "#2F7B1F");   // Updates the line
                }
            }
            sleep(sleep_time);  // Sleep
            currentNode = previousNode; // Sets current node to its previous node
            previousNode = prev[previousNode];  // Sets previous node to its corresponding previous node
        }
    }

    // -- Code Starts Here -- //
    breadthFirstSearch(startId);
    self.postMessage("terminate");
};
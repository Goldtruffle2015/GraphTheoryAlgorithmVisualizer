/*
File handles all canvas functionality
*/
// -- Global Variables -- //    *Access on any js file
let node_li = [];   // Stores nodes
let line_li = [];   // Stores lines
let edge_draw_active = false;   // Tracks when the user is drawing a line or not
let cumulative_nodes = 0;   // Tracks the number of nodes drawn, including the ones removed.
let adjacency_matrix = [];   // Represents node relationships

// Initialize the adjacency matrix //
for (let row=0;row<133;row++) {   // For simplicity the program will only handle 133 nodes including those that have been removed. 133 is the max number of nodes that can fit in canvas assuming none have been removed.
    adjacency_matrix[row] = [];    // Creates an empty row in adjacency matrix
    for (let col=0;col<133;col++) {
        adjacency_matrix[row][col] = Infinity;  // Infinity means there is no edge linking the two nodes
    }
}

window.addEventListener("load", () => {
    // -- Local Variables -- // * Access only on canvas.js
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d"); 
    temp_line = null;  // Creates a temporary line object

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.75;  // Canvas is 3/4 of virtual height
    
    // -- Classes -- //
    class CustomNode {  // Builds nodes
        constructor(x, y, id) {
            this.x = x; // Stores the x-coordinate of node in pixels
            this.y = y; // Stores the y-coordinate of node in pixels
            this.id = id;   // Tracks the id of the node
        }

        draw() {    // Draws the node
            ctx.beginPath();    // Starts a new starting point
            ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);    // Draws a circle
            ctx.fillStyle = "#397EC9";
            ctx.fill();
        }

    }

    class CustomLine {  // Builds lines
        constructor(x1, y1, startNodeId) {
            this.startx = x1;   // Stores the starting x-position
            this.starty = y1;   // Stores the starting y-position
            this.endx = null;   // Stores the ending x-position
            this.endy = null;   // Stores the ending y-position
            this.startNodeId = startNodeId; // Stores the id of the starting node
            this.endNodeId = null;  // Stores the id of the ending node
        }

        initialize() {
            ctx.beginPath();    // Initializes the line
            ctx.moveTo(this.startx, this.starty);   // Starts the line at the selected node
        }

        draw(x2, y2) {
            ctx.lineTo(x2, y2); // Draws line at end node
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.stroke();   // Renders the line
        }
    }

    // -- Functions -- //
    function distance(x1, x2, y1, y2) { // Calculates distance between mouse click and node center
        return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));    // Pythagoras Theorem
    }

    // -- Event Listeners -- //
    canvas.addEventListener("click", (e) => {
        // -- Add node -- //
        if (add_node_bool) {
            // -- Add Node -- //
            if (e.offsetX < 40 || e.offsetX > canvas.width - 40) return;  // Ensures node is not overflowing out of page
            if (e.offsetY < 40 || e.offsetY > canvas.height - 40) return; // Ensures node is not overflowing out of page
            for (c of node_li) {
                if (distance(c.x, e.offsetX, c.y, e.offsetY) < 80) return;    // Prevents nodes from overlapping
            }
            node_li.push(new CustomNode(e.offsetX, e.offsetY, cumulative_nodes)); // Adds node to node list
            node_li[node_li.length - 1].draw();    // Draws newly added node
            cumulative_nodes++; // Defined as nodes added + nodes removed

        // -- Remove node -- //
        } else if (rem_node_bool) {
            // -- Remove Node -- //
            node_id_of_removed_node = 0;    // Stores the node id of the node removed
            let click_detected = false; // Checks if user clicked on a node
            for (let i=0; i<node_li.length; i++) {// Finds the node user clicked on
                if (distance(node_li[i].x, e.offsetX, node_li[i].y, e.offsetY) <= 40) {// Checks if distance is valid
                    click_detected = true;  // User has successfully clicked on a node
                    node_id_of_removed_node = node_li[i].id;    // Stores the id of node being removed
                    node_li.splice(i, 1);   // Remove node from list
                    break;
                }
            }

            if (!click_detected) return;    // If user did not click on a node exit out of event

            ctx.clearRect(0, 0, canvas.width, canvas.height);   // Clears the canvas

            let indices_to_remove = []; // Stores the indices in line list to remove
            for (let l=0;l<line_li.length;l++) {
                if (line_li[l].startNodeId == node_id_of_removed_node || line_li[l].endNodeId == node_id_of_removed_node) {
                    indices_to_remove.unshift(l);   // Adds index at beginning of array so that array is in decending order
                }
            }

            for (index of indices_to_remove) {
                line_li.splice(index, 1);   // Removes the line from the line list
            }

            for (l of line_li) {
                l.initialize(); // Initializes the line
                l.draw(l.endx, l.endy); // Draws the line
            }

            for (c of node_li) {    // Redraws remaining nodes
                c.draw();
            }
        
        // -- Add edge -- //
        } else if (add_edge_bool) {
            if (!edge_draw_active) {    // If player has not selected a starting node
                for (c of node_li) {    // Checks each node
                    if (distance(c.x, e.offsetX, c.y, e.offsetY) <= 40) { // Checks if user clicked on a node
                        temp_line = new CustomLine(c.x, c.y, c.id); // Creates a new line object
                        temp_line.initialize(); // Initializes the line
                        edge_draw_active = true;    // Sets draw state to true
                        break;
                    }
                }   
                return; // Breaks out of event. Player must click a second time to select an end nodes
            }
            if (edge_draw_active) { // If player has selected a starting node
                for (c of node_li) {
                    if (distance(c.x, e.offsetX, c.y, e.offsetY) <= 40) {   // Checks if user clicked on a node
                        temp_line.draw(c.x, c.y);   // Draws the line
                        temp_line.endNodeId = c.id; // Sets the end node id

                        if ((adjacency_matrix[temp_line.startNodeId][temp_line.endNodeId] == Infinity) || (adjacency_matrix[temp_line.endNodeId][temp_line.startNodeId] == Infinity)) {// Checks if line does not exist
                            temp_line.endx = c.x;   // Sets endx
                            temp_line.endy = c.y;   // Sets endy 
                            line_li.push(temp_line);    // Adds line to line list if line does not exist
                            d = distance(temp_line.startx, temp_line.endx, temp_line.starty, temp_line.endy);   // Calculate distance of line
                            adjacency_matrix[temp_line.startNodeId][temp_line.endNodeId] = d;   // Sets element in adjacency matrix to distance
                            adjacency_matrix[temp_line.endNodeId][temp_line.startNodeId] = d;   // Sets element in adjacency matrix to distance
                        }

                        for (c_2 of node_li) {    // Draws all the nodes again. This ensures nodes are stacked on top of lines
                            c_2.draw();
                        }
                        edge_draw_active = false;   // Drawing is complete. Revert back to non-active draw state
                        break;
                    }
                }
            }
            
        // -- Remove edge -- //
        } else if (rem_edge_bool) {

        }
    })
})
/* This file stores all the variables, functions, and classes that require a global scope */

// -- Variables -- //
let node_li = [];   // Stores nodes
let line_li = [];   // Stores lines
let edge_draw_active = false;   // Tracks when the user is drawing a line or not
let cumulative_nodes = 0;   // Tracks the number of nodes drawn, including the ones removed.
let adjacency_matrix = [];   // Represents node relationships
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d"); 

// Initialize the adjacency matrix //
for (let row=0;row<133;row++) {   // For simplicity the program will only handle 133 nodes including those that have been removed. 133 is the max number of nodes that can fit in canvas assuming none have been removed.
    adjacency_matrix[row] = [];    // Creates an empty row in adjacency matrix
    for (let col=0;col<133;col++) {
        adjacency_matrix[row][col] = Infinity;  // Infinity means there is no edge linking the two nodes
    }
}

// -- Functions -- //
function render() { // Draws the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // Clears the canvas

    for (l of line_li) {
        l.initialize(); // Initializes the line
        l.draw(l.endx, l.endy); // Draws the line
    }

    for (c of node_li) {    // Redraws remaining nodes
        c.draw();
    }
}

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
/*
File handles all nav functionality
*/
// -- Global Variables -- //
let add_node_bool = false;  // Checks active state of button
let rem_node_bool = false;  // Checks active state of button
let add_edge_bool = false;  // Checks active state of button
let rem_edge_bool = false;  // Checks active state of button

window.addEventListener("load", () => {
    // -- Attributes -- //
    const add_node_button = document.getElementById("add-node-but");
    const rem_node_button = document.getElementById("rem-node-but");
    const add_edge_button = document.getElementById("add-edge-but");
    const rem_edge_button = document.getElementById("rem-edge-but");
    const clear_button = document.getElementById("clear-but");

    // -- Code Starts Here -- //
    // -- Add Node Button -- //
    add_node_button.addEventListener("click", () => {
        if (node_li.length > 100) return;   // For simplicity this program will only handle up to 100 nodes including
        // Toggle active state of button 
        add_node_button.classList.toggle("node-edge-button-background-color-toggle");
        add_node_bool = add_node_bool ? false : true;   // Switches the active state

        // Remove active background from remaining buttons
        rem_node_button.classList.remove("node-edge-button-background-color-toggle");
        add_edge_button.classList.remove("node-edge-button-background-color-toggle");
        rem_edge_button.classList.remove("node-edge-button-background-color-toggle");

        // Set remaining bools to false
        rem_node_bool = false;
        add_edge_bool = false;
        rem_edge_bool = false;
    })

    // -- Remove Node Button -- //
    rem_node_button.addEventListener("click", () => {
        if (node_li.length == 0) return;    // Must be at least 1 node to use command
        // Toggle active state of button 
        rem_node_button.classList.toggle("node-edge-button-background-color-toggle");
        rem_node_bool = rem_node_bool ? false : true;

        // Remove active background from remaining buttons
        add_node_button.classList.remove("node-edge-button-background-color-toggle");
        add_edge_button.classList.remove("node-edge-button-background-color-toggle");
        rem_edge_button.classList.remove("node-edge-button-background-color-toggle"); 

        // Set remaining bools to false
        add_node_bool = false;
        add_edge_bool = false;
        rem_edge_bool = false;
    })

    // -- Add Edge Button -- //
    add_edge_button.addEventListener("click", () => {
        if (node_li.length < 2) return; // There must be at least 2 nodes to place one edge
        // Toggle active state of button 
        add_edge_button.classList.toggle("node-edge-button-background-color-toggle");
        add_edge_bool = add_edge_bool ? false : true;

        // Remove active background from remaining buttons
        add_node_button.classList.remove("node-edge-button-background-color-toggle");
        rem_node_button.classList.remove("node-edge-button-background-color-toggle");
        rem_edge_button.classList.remove("node-edge-button-background-color-toggle");

        // Set remaining bools to false
        add_node_bool = false;
        rem_node_bool = false;
        rem_edge_bool = false;
    })

    // -- Remove Edge Button -- //
    rem_edge_button.addEventListener("click", () => {
        if (line_li.length == 0) return;    // Must be at least 1 line to use command
        // Toggle active state of button 
        rem_edge_button.classList.toggle("node-edge-button-background-color-toggle");
        rem_edge_bool = rem_edge_bool ? false : true;

        // Remove active background from remaining buttons
        add_node_button.classList.remove("node-edge-button-background-color-toggle");
        rem_node_button.classList.remove("node-edge-button-background-color-toggle");
        add_edge_button.classList.remove("node-edge-button-background-color-toggle");

        // Set remaining bools to false
        add_node_bool = false;
        rem_node_bool = false;
        add_edge_bool = false;
    })

    // -- Clear Button -- //
    clear_button.addEventListener("click", () => {
        node_li = [];   // Clears the nodes
        line_li = [];   // Clears the edges
        cumulative_nodes = 0;   // Resets cumulative nodes
        for (let row=0;row<133;row++) { // Resets the adjacency matrix
            adjacency_matrix[row] = [];    // Creates an empty row in adjacency matrix
            for (let col=0;col<133;col++) {
                adjacency_matrix[row][col] = Infinity;  // Infinity means there is no edge linking the two nodes
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);   // Clears the canvas
    })
})
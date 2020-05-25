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

    // -- Code Starts Here -- //
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
})
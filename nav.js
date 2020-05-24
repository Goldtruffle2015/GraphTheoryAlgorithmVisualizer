/*
File handles all nav functionality
*/

window.addEventListener("load", () => {
    // -- Attributes -- //
    const add_node_button = document.getElementById("add-node-but");
    const rem_node_button = document.getElementById("rem-node-but");
    const add_edge_button = document.getElementById("add-edge-but");
    const rem_edge_button = document.getElementById("rem-edge-but");

    let add_node_bool = false;  // Checks active state of button
    let rem_node_bool = false;  // Checks active state of button
    let add_edge_bool = false;  // Checks active state of button
    let rem_edge_bool = false;  // Checks active state of button

    // -- Code Starts Here -- //
    add_node_button.addEventListener("click", () => {
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
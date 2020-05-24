/*
File handles all nav functionality
*/

window.addEventListener("load", () => {
    // -- Attributes -- //
    const add_node_button = document.getElementById("add-node-but");
    const rem_node_button = document.getElementById("rem-node-but");
    const add_edge_button = document.getElementById("add-edge-but");
    const rem_edge_button = document.getElementById("rem-edge-but");

    let toggle_add_node_button = true;  // Checks if button can be toggled
    let toggle_rem_node_button = true;  // Checks if button can be toggled
    let toggle_add_edge_button = true;  // Checks if button can be toggled
    let toggle_rem_edge_button = true;  // Checks if button can be toggled

    // -- Code Starts Here -- //
    add_node_button.addEventListener("click", () => {
        if (toggle_add_node_button) {
            add_node_button.classList.toggle("node-edge-button-background-color-toggle");
            // Enables/isables remaining buttons //
            toggle_rem_node_button = toggle_rem_node_button ? false : true; // Flips the boolean
            toggle_add_edge_button = toggle_add_edge_button ? false : true; // Flips the boolean
            toggle_rem_edge_button = toggle_rem_edge_button ? false : true; // Fiips the boolean
        }
    })

    rem_node_button.addEventListener("click", () => {
        if (toggle_rem_node_button) {
            rem_node_button.classList.toggle("node-edge-button-background-color-toggle");  
            // Enables/disables remaining buttons //
            toggle_add_node_button = toggle_add_node_button ? false : true; // Flips the boolean
            toggle_add_edge_button = toggle_add_edge_button ? false : true; // Flips the boolean
            toggle_rem_edge_button = toggle_rem_edge_button ? false : true; // Flips the boolean
        }
    })

    add_edge_button.addEventListener("click", () => {
        if (toggle_add_edge_button) {
            add_edge_button.classList.toggle("node-edge-button-background-color-toggle");
            // Enables/disables remaining buttons //
            toggle_add_node_button = toggle_add_node_button ? false : true; // Flips the boolean
            toggle_rem_node_button = toggle_rem_node_button ? false : true; // Flips the boolean
            toggle_rem_edge_button = toggle_rem_edge_button ? false : true; // Flips the boolean
        }
    })

    rem_edge_button.addEventListener("click", () => {
        if (toggle_rem_edge_button) {
            rem_edge_button.classList.toggle("node-edge-button-background-color-toggle");
            // Enables/disables remaining buttons //
            toggle_add_node_button = toggle_add_node_button ? false : true; // Flips the boolean
            toggle_rem_node_button = toggle_rem_node_button ? false : true; // Flips the boolean
            toggle_add_edge_button = toggle_add_edge_button ? false : true; // Flips the boolean    
        }
    })
})
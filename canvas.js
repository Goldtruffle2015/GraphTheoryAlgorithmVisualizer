/*
File handles all canvas functionality
*/

window.addEventListener("load", () => {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d"); 
    let node_li = [];   // Stores nodes

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.75;  // Canvas is 3/4 of virtual height
    
    // -- Classes -- //
    class CustomNode {  // Builds nodes
        constructor(x, y) {
            this.x = x;
            this.y = y - window.innerHeight * 0.25; // Canvas position is offset by 1/4 of viewport height 
        }

        draw() {    // Draws the node
            ctx.beginPath();
            ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "#397EC9"
            ctx.fill();
        }
    }

    canvas.addEventListener("click", (e) => {
        if (e.clientX < 40 || e.clientX > window.innerWidth - 40) return;  // Ensures node is not overflowing out of page
        if (e.clientY < window.innerHeight * 0.25 + 40 || e.clientY > window.innerHeight - 40) return; // Ensures node is not overflowing out of page
        node_li.push(new CustomNode(e.clientX, e.clientY));
        node_li[node_li.length - 1].draw();
    })
})
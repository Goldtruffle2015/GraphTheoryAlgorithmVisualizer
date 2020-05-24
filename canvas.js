window.addEventListener("load", () => {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d"); 
    let node_li = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // -- Classes -- //
    class CustomNode {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "#397EC9"
            ctx.fill();
        }
    }

    canvas.addEventListener("mousedown", (e) => {
        if (e.clientY < canvas.height * 0.25 + 40) return;
        testNode = new CustomNode(e.clientX, e.clientY);
        testNode.draw();
    })
})

// window.addEventListener("resize", () => {   // Resizes the canvas
//     const canvas = document.querySelector(".canvas");

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight * 0.75;
// })
let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let turnO = true; // turn of player O

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

reset.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.backgroundColor = "#F7DD72";
        box.classList.remove("vibrate");
        box.disabled=false;
    });
    turnO = true;
});
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        
        }
    box.disabled=true;
    checkWinner();
    
    });
    
});

let checkWinner = () => {
    for (let pattern of winPatterns) {
        
        let pos1=   boxes[pattern[0]].innerText;
        let pos2=   boxes[pattern[1]].innerText;
        let pos3=   boxes[pattern[2]].innerText;
        if(pos1==pos2 && pos2==pos3 && pos1!=""){
            console.log("Winner");
            boxes[pattern[0]].style.backgroundColor="green";
            boxes[pattern[1]].style.backgroundColor="green";
            boxes[pattern[2]].style.backgroundColor="green";
            boxes[pattern[0]].classList.add("vibrate");
            boxes[pattern[1]].classList.add("vibrate");
            boxes[pattern[2]].classList.add("vibrate");
            boxes.forEach((box)=>{
                box.disabled=true;
               

            });
        }
        
    
        
    }

}

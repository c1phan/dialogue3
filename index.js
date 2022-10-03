const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

var container = document.querySelector('.text');

//screen size
canvas.width = 523;
canvas.height = 703;

ctx.fillStyle = 'white';

const parkerImg = new Image();
parkerImg.src = './img/parker.png'; //referencing image of the parker

//background
const bgImg = new Image();
bgImg.src = './img/background.jpg'; //referencing background image
bgImg.onload = () => {
    ctx.drawImage(bgImg, 0,0); //position of image
    ctx.drawImage(parkerImg, 324, 215);
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.rect(-1,514,525,200);
    ctx.fillStyle='white';
    ctx.fillRect(-1,514,525,200);
    ctx.stroke();
};


var speeds = {
    pause: 500,
    veryslow: 350,
    slow: 170,
    normal: 100,
    fast: 1
};

var textLines = [
        { string: "That", speed: speeds.pause},
        { string: " was amazing queen! ", speed: speeds.slow},
        { string: "You ate! ", speed: speeds.pause},
        { string: "Now you see that boundary separating the sun’s corona from the solar winds? We high-key need you to make it to the Alfvén surface. ", speed: speeds.normal},
        { string: "Periodt. ", speed: speeds.veryslow},
        { string: "Sheesh, this is going to be tough. We’re almost there. But we need you to make it to our last destination, the corona. If you know you know.", speed: speeds.normal}
];

var characters = [];

textLines.forEach((line, index) => {
    line.string.split("").forEach((character) => {
        var span = document.createElement("span");
        span.textContent = character;
            container.appendChild(span);
            characters.push({
                span: span,
                isSpace: character === " " && !line.pause,
                delayAfter: line.speed,
                classes: line.classes || []
            });
    });
});

function revealOneCharacter(list) {
    var next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");
    next.classes.forEach((c) => {
        next.span.classList.add(c);
    });

    var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

    if(list.length > 0){
        setTimeout(function() {
            revealOneCharacter(list);
        }, delay)
    }
}

setTimeout(() => {
    revealOneCharacter(characters);
}, 600)

if(!(Array.isArray(textLines) && textLines.length)){
    console.log("I'm here!!!");
}
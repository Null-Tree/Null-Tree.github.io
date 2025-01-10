//javascript controls for the cat animation, basic movement
//refrenced some parts Drew Conley's yt guide for cat animation

//adapted ideas into two d movement

//debug



document.addEventListener("DOMContentLoaded", (e) =>{

var character = document.querySelector(".character");
var main = document.querySelector("#bg");
var x=0;
var y =0;
var speed = 1.2; //unscaled pixels per frame
var bgspeed = 1; //scaled pixels per frame
var held_directions = [];
/*put own implementation of held dir later*/
var direction = ""
var dir=""

var bgx=1000;
var bgy=1000;


const placeCharacter = () => {
    var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")); //pixelsize checked ok
    const held_direction = held_directions[0]; //sets var as first of held

    if (held_direction) {

    if (held_direction == directions.right) {
        x+= speed;
        dir="R";

        bgx-= bgspeed;

    }
    if (held_direction == directions.left) {
        x-= speed;
        dir="L";

        bgx+= bgspeed;
    }

    }

    character.style.transform = `translate3d(${x*pixelSize}px, ${y*pixelSize}px,0)`;

    main.style.backgroundPosition=`${bgx}px ${bgy}px`;



}




function step()
{
placeCharacter();
setstate();
window.requestAnimationFrame(()=>{step();}) //around 60fps
}

function setstate()
{
//dir =  R/L
var root = document.querySelector(':root');
var hd = held_directions.length;

if (dir == "R")
    {
        if (hd!=0)
        {
            root.style.setProperty('--state', 15);
        }
        else
        {
            root.style.setProperty('--state', 1);
        }


    }
else if (dir == "L")
        {
        if (hd!=0)
            {
            root.style.setProperty('--state', 14);
            }
        else
            {
            root.style.setProperty('--state', 0);
            }
        }
else
    {root.style.setProperty('--state', 0);}

}





//------------------------------------------------
    //sets up directions
const directions = {
left:"left",
right:"right",
}

const keys = {
37:directions.left,
39: directions.right,
65: directions.left,
68: directions.right,
}

function initalise()
{
step(); //starts first tick

document.addEventListener("keydown", (e) => {
var dir = keys[e.which]; //check key , sees if supported

//checks if direction already in array
// direction and the index of dir, if it doesnt find then return -1 add to array
if (dir && held_directions.indexOf(dir) === -1)
{
    held_directions.unshift(dir); //use last in first considered
}


});


document.addEventListener("keyup", (e) => {

var dir = keys[e.which]; //check key , sees if supported

//checks if direction already in array
// direction and the index of dir, if it doesnt find then return -1 add to array
var index = held_directions.indexOf(dir);
if (index > -1)
{
    held_directions.splice(index,1); //splices it out
}


});
}
initalise();



})




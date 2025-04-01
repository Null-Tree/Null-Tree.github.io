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
                var touchx=0;
                var touching=false;

                var bgx=1000;
                var bgy=1000;
                var event;


                const placeCharacter = () => {
                    var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")); //pixelsize checked ok
                    const held_direction = held_directions[0]; //sets var as first of held
                    
                    if (held_direction) {

                        if (held_direction == directions.right || held_direction == directions.tRight) 
                        {
                            x+= speed;
                            dir="R";

                            // bgx-= bgspeed;

                        }
                        if (held_direction == directions.left || held_direction == directions.tLeft) 
                        {
                            x-= speed;
                            dir="L";

                            // bgx+= bgspeed;
                        }

                    }

                    character.style.transform = `translate3d(${x*pixelSize}px, ${y*pixelSize}px,0)`;

                    main.style.backgroundPosition=`${bgx}px ${bgy}px`;



                }




                function step()
                {
                    if (touching && ((held_directions[0] != "tRight") && (held_directions[0] != "tLeft")))  //keyboard overrides touch
                    {
                        registerTouchEnd(); 
                    }
                    else if (touching)
                    {
                        registerNewTouch(touchx);
                    }


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
                    tRight:"tRight",
                    tLeft:"tLeft",
                }

                const keys = {
                37:directions.left,
                39: directions.right,
                65: directions.left,
                68: directions.right,
                }




                
                //=========================

                // touch screen support

                function registerNewTouch(touchX)
                {
                    
                    
                    // alert(touchX);

                    const cat = document.querySelector('#cat');
                    const rect = cat.getBoundingClientRect();
                    const catx = (rect.left + rect.right) / 2;
                    var tDir = '';

                    // alert(catx);
                    
                    var range = 20;
                    if (touchX < catx - range) //if touch to left      =>move left
                    {
                        tDir=directions.tLeft;
                        
                        // alert("logged L");
                    }
                    else if(touchX > catx + range) //if touch to right     => move right
                    {
                        tDir=directions.tRight;
                    }
                    else
                    {
                        // alert("elsed");
                        registerTouchEnd();
                        return;
                    }

                    // tDir=directions.tLeft;
                    // alert(tDir);

                    //looks if there is already an occrence, if so moves it to frount
                    var index = held_directions.indexOf(tDir);
                    // alert(tDir);

                    if (index === -1) // if does nto exist, prepend
                    {
                        held_directions.unshift(tDir);
                    }
                    else // if exists, deletes, then prepend
                    {
                        held_directions.splice(index,1);
                        held_directions.unshift(tDir);
                    }
                }




                function registerTouchEnd()
                {
                    // alert("toff");
                    //clears both
                    var indexR = held_directions.indexOf("tRight");
                    var indexL = held_directions.indexOf("tLeft");

                    if (indexR != -1) // if exist remove
                    {
                        held_directions.splice(indexR,1);
                    }
                    if (indexL != -1) // if exist remove
                    {
                        held_directions.splice(indexL,1);
                    }
                }
                //==================


                function initalise()
                {
                    step(); //starts first tick

                    document.addEventListener("keydown", (e) => {
                        var dir = keys[e.which]; //check key , sees if supported

                        //checks if direction already in array
                        // direction and the index of dir, if it doesnt find then return -1 add to array
                        var index = held_directions.indexOf(dir);
                        if (dir)
                        {
                            if ( held_directions.indexOf(dir) === -1)
                            {
                                held_directions.unshift(dir); //use last in first considered
                            }
                            else 
                            {
                                held_directions.splice(index,1);
                                held_directions.unshift(dir);
                            }
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

                    
                    var touchcanvas = document.querySelector("#main");

                    touchcanvas.addEventListener("touchstart", function(e)
                    {
                        touchx=e.touches[0].clientX;
                        touching=true;
                        registerNewTouch(touchx); 
                    }, false);
                          
                    touchcanvas.addEventListener("touchmove", function(e)
                    {
                        touchx=e.touches[0].clientX;
                        touching=true;
                        registerNewTouch(touchx); 
                    }, false);

                    touchcanvas.addEventListener("touchend", function(e){touching=false; registerTouchEnd();}, false);
                    touchcanvas.addEventListener("touchcancel", function(e){touching=false; registerTouchEnd();}, false);
                
                }// this is end of function initialise
                
                initalise();



            })//end of on dom loaded




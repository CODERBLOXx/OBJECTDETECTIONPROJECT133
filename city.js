img = "";
status = "";
objects = [];

function back_city(){
    window.location = "index.html";
}

function preload(){
    img = loadImage("city.jpg");
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("city_status").innerHTML = "Status: Detecting Objects";
}

function draw(){
    if(status != ""){
        image(img,0,0,500,500);
        for(i = 0; i < objects.length; i++){
            r = 255;
            g = 255;
            b = 255;
            document.getElementById("city_status").innerHTML = "Status: Objects Detected";
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x - 15,objects[i].y - 15);
            fill(r,g,b)
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            document.getElementById("city").innerHTML = "There are 128 big objects in the image from which cocossd model has detected " + objects.length + " " + "objects";
        }
    } 
}

function modelLoaded(){
    status = true;
    objectDetector.detect(canvas,gotResult);
    console.log("Object Detector is initialized");
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
    }
    objects = results;
}
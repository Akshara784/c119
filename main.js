function setup(){
    canvas=createCanvas(281,281);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth= window.speechSynthesis;
}

function clearCanvas(){
    background("white");
}

function preload(){
    classifier=ml5.imgClassifier('DoodleNet');
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("label").innerHTML='Doodle: '+results[0].label;
        document.getElementById("confidence").innerHTML='Doodle: '+Math.round(results[0].confidence*100)+'%';
        utterThis= new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}
/**
 * UE IADE ED3 2021/2022
 * 
 * P5.js coding exercise.
 * 
 * Write up a game where the player has to click on a rectangle that has the color
 * displayed in a text. There should be four possible colors (red, gree, blue, yellow).
 * The player has to guess click correctly as many times as possible during a set 
 * time interval (say, 5 seconds).
 * When the time runs up, show the final score.
 */

 let colors = ["RED", "GREEN", "BLUE", "YELLOW"]; // Color array
 let colorId = NaN;                               // Index of the current color
 let points = 0;                                  // Initial score
 let correct = false;                             // Current guess
 let totalTime = 5;                               // Max game time, in seconds
 let remainingTime = totalTime;                   // Time remaining
 
 function setup() {
     createCanvas(800, 600);
     background(255);
     textSize(50);
     setColor(); // Chose a random color to guess
 }
 
 function draw() {
     remainingTime = totalTime - frameCount / 60; // Calculate the remaining time
 
     if (remainingTime <= 0) {
         // If the remaining time reaches zero, 
         // terminate the game, and show the final score.
         remainingTime = 0;
         showFinalScore();
     }
     else {
         // Show four rectangles, each with a color in the array.
         // These should be evenly separated.
         fill(255, 0, 0); stroke(255, 0, 0);
         rect(0, 0, width / 4, height / 2);
         fill(0, 255, 0); stroke(0, 255, 0);
         rect(width / 4, 0, width / 4, height / 2);
         fill(0, 0, 255); stroke(0, 0, 255);
         rect(width / 2, 0, width / 4, height / 2);
         fill(255, 255, 0); stroke(255, 255, 0);
         rect(width - width / 4, 0, width / 4, height / 2);
 
         // If the current guess is correct, select another color, randomly.
         if (correct) {
             setColor(); // Set the next color to guess.
             correct = false; // Reset the guess status.
         }
 
         // A guess is a click in a color rectangle.
         if (mouseIsPressed) {
             // The click should occur at the upper half of the canvas,
             // because that is where the color rectangles are.
             if (mouseY < height / 2) {
                 // We know that the rectangles are evenly separated,
                 // so we need to check the x coordinate of the mouse click to 
                 // identify the guess.
                 // When the player gets is right, the point score is increased, and 
                 // we set the guess as correct, so that the next color may be selected 
                 // when the draw function reruns (see line 49).
                 if (mouseX < width / 4) {
                     if (colors[colorId] === "RED") {
                         points++;
                         correct = true;
                     }
                 }
                 else if (mouseX < width / 2) {
                     if (colors[colorId] === "GREEN") {
                         points++;
                         correct = true;
                     }
                 }
                 else if (mouseX < (width - width / 4)) {
                     if (colors[colorId] === "BLUE") {
                         points++;
                         correct = true;
                     }
                 }
                 else {
                     if (colors[colorId] === "YELLOW") {
                         points++;
                         correct = true;
                     }
                 }
             }
         }
         showTime(); // Show the remaining time
         showScore(); // Show the current score
     }
 }
 
 // Select a random color from the colors array. Show the
 // name of the color in a text box at the bottom left corner of the canvas.
 function setColor() {
     fill(255);
     stroke(255);
     rect(0, 500, 400, 100)
     fill(0);
     colorId = round(random(3), 0);
     text(colors[colorId], 0, 550);
 }
 
 // Show a text box at the bottom right corner, with
 // the current score.
 function showScore() {
     fill(255);
     stroke(255);
     rect(width - 100, 500, 400, 100)
     fill(0);
     text(points, width - 100, 550);
 }
 
 // Show a text box at the bottom right corner, with
 // the remaining time.
 function showTime() {
     fill(255);
     stroke(255);
     rect(width / 2, 500, 400, 100)
     fill(0);
     text(round(remainingTime, 2), width / 2, 550);
 }
 
 // Black out the screen, and show a text box, at the middle
 // of the canvas, with the final score.
 function showFinalScore() {
     background(0);
     fill(255);
     stroke(0);
     let fontSize = 50;
     textSize(fontSize);
     let message = "Score: " + points;
     text(message, width/2 - message.length/4*fontSize, height/2)
 }
let currentQuestionIndex = 0; // To track the current question index
document.getElementById("background-music").volume = 0.5; // Set volume to 50%
const answers = [
    "a", // Answer for question 1
    "c", // Answer for question 2
    "d", // Answer for question 3
    "a", // Answer for question 4
    "b"  // Answer for question 5
];

const qt = [
    "What is my favorite color?",
    "What is my favorite food?",
    "What is my love language?",
    "Who is my favorite person?",
    "What did I say when we first chatted?"
];

const options = [
    ["black", "pink", "red", "maroon"],
    ["pancit", "biko", "ampalaya", "lucky me"],
    ["seduce you", "giving kiss", "hug", "make you smile"],
    ["you", "selena", "layla", "si mama"],
    ["gwapa lagi ka", "unsay requirement nimo ma'am", "magkano pandesal", "magkano ka pinadala"]
];

const inaswr = []; // To store correct/incorrect answers

let timeLeft; // Variable to hold the time left
let countdown; // Declare countdown globally

function showfunc() {
    var show = document.getElementsByClassName("quizbox")[0]; // Get the first element with the class "quizbox"
    var hide = document.getElementById("startbutton"); // Get the element with id "startbutton"
    
    if (show && hide) { // Ensure both elements exist
        show.style.display = "block";  // Display the quizbox
        hide.style.display = "none";   // Hide the startbutton
        document.getElementById("icon1").style.display = "none";  // Hide the image

        question(); // Call the question function
        startTimer(); // Start the timer
    }
}

function startTimer() {
    var timerDisplay = document.getElementById("timercount"); // Get the timer display element
    timeLeft = 30;  // Set the countdown time to 30 seconds

    // Start the countdown
    countdown = setInterval(function() {
        timerDisplay.textContent = timeLeft + "s"; // Update the timer display
        timeLeft--;  // Decrease the time left by 1 second

        // Stop the countdown when timeLeft reaches 0
        if (timeLeft < 0) {
            clearInterval(countdown);  // Stop the timer
            alert("Time's up! Proceed to the next question.");
            
            inaswr[currentQuestionIndex] = false; // Mark as incorrect if time runs out
            currentQuestionIndex++;
            
            if (currentQuestionIndex < answers.length) {
                resetTimer();
                question(); // Load the next question
            } else {
                finishQuiz();
            }
        }
    }, 1000);  // Repeat every 1000 milliseconds (1 second)
}

function resetTimer() {
    clearInterval(countdown); // Clear the existing timer
    startTimer(); // Restart the timer
}

function question() {
    // Set the question text
    document.getElementById("question").innerHTML = qt[currentQuestionIndex]; // Display the current question

    // Get the option buttons
    const optionButtons = document.getElementsByClassName("optionup")[0].children; // Get the first set of option buttons
    const optionDownButtons = document.getElementsByClassName("optiondown")[0].children; // Get the second set of option buttons

    // Set the options for the current question
    const currentOptions = options[currentQuestionIndex];

    // Populate the buttons with options
    optionButtons[0].innerHTML = currentOptions[0]; // Set first button option (a)
    optionButtons[1].innerHTML = currentOptions[1]; // Set second button option (b)
    optionDownButtons[0].innerHTML = currentOptions[2]; // Set third button option (c)
    optionDownButtons[1].innerHTML = currentOptions[3]; // Set fourth button option (d)

    // Assign click events with proper options
    optionButtons[0].onclick = () => handleOptionClick('a');
    optionButtons[1].onclick = () => handleOptionClick('b');
    optionDownButtons[0].onclick = () => handleOptionClick('c');
    optionDownButtons[1].onclick = () => handleOptionClick('d');
}

function handleOptionClick(option) {
    // Clear the existing timer before checking the answer
    clearInterval(countdown);
    
    if (option === answers[currentQuestionIndex]) {
        alert("Correct answer!"); // Notify user of correct answer
        inaswr[currentQuestionIndex] = true; // Store true if correct
    } else {
        alert("Wrong answer!"); // Notify user of wrong answer
        inaswr[currentQuestionIndex] = false; // Store false if incorrect
    }

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < answers.length) {
        resetTimer();
        question(); // Load the next question
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    // Store the result in Local Storage
    localStorage.setItem('inaswr', JSON.stringify(inaswr));
    alert("Quiz complete!"); // Notify when quiz is completed
    window.open('result.html', '_self');
}
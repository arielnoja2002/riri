function showresult() {
    // Hide initial elements
    document.getElementById('icn3').style.display = "none";
    document.getElementById('startbutton').style.display = "none";

    // Show the result box
    alert('I love you so much baby ko!');
    var show = document.getElementsByClassName('resultbox')[0];
    show.style.display = "block";

    // Get data from localStorage
    const datastored = localStorage.getItem('inaswr');
    const parsedata = JSON.parse(datastored);

    // Loop through parsed data to show/hide elements
    if (parsedata && Array.isArray(parsedata)) {
        for (let i = 0; i < parsedata.length; i++) {
            if (parsedata[i]) {
                // If true, display the corresponding prize element
                document.getElementById(`g${i + 1}`).style.display = "block";
            } else {
                // If false, hide the corresponding prize element (optional if they are hidden by default)
                document.getElementById(`g${i + 1}`).style.display = "none";
            }
        }
    }
}
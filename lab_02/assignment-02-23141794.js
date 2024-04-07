document.addEventListener('DOMContentLoaded', function() {

    const start_button = document.getElementById("start_btn");
    const green_button = document.getElementById("green_circle_btn");
    const red_button = document.getElementById("red_circle_btn");
    const yellow_button = document.getElementById("yellow_circle_btn");
    const blue_button = document.getElementById("blue_circle_btn");

    const button_list = [green_button, red_button, yellow_button, blue_button];

    let button_list_human_names = [];
    let button_list_agent = [];
    let button_list_agent_names = [];
    let sequence_result = [];
    let counter = 0;
    let iterate_Button_List_Agent_timer = 0;

    let interval_for_loading;
    let timer_game;

    let time_for_last_flash_button = 0;
    
    start_button.addEventListener("click", function(event) {
        // After clicking on start button, no button can be clicked by user.
        start_button.disabled = true;
        four_Buttons_Notclickable();
        //the color of circle change from red to green.
        document.getElementById("starter").style.backgroundColor = 'green';

        //Game starts in 3 seconds.
        setTimeout(startGame, 3000);
    });


    function startGame() {
        // Buttons which will be flashed are loaded and then the same buttons are iterated
        load_Button_List_Agent();
        iterate_Button_List_Agent(iterate_Button_List_Agent_timer);

        // Then game goes on
        gameGoesOn();
    }


    // Assure that the big rectangle is changed to Play
    function playButton() {
        start_button.innerHTML = 'PLAY';
    }
    

    // Assure that the big rectangle is changed to Wait
    function waitButton() {
        start_button.innerHTML = 'WAIT';
    }


    // Assure that the big rectangle is changed to Start
    function startButton() {
        start_button.innerHTML = 'START';
    }


    function gameGoesOn() {
        // method testSequence is fired after 4,9 seconds + time for last flashed button by Simon
        interval_for_loading = setInterval(testSequence, time_for_last_flash_button + 4999)
        // method notPressed is fired after 5 seconds + time for last flashed button by Simon
        timer_game = setTimeout(notPressed, time_for_last_flash_button + 5000);

        // user can click the buttons after time when the last button was flashed by Simon
        setTimeout(four_Buttons_Clickable, time_for_last_flash_button);

        document.addEventListener("click", function(event) {
            // prevent Event Bubbling - firing twice -> see the online resource https://copyprogramming.com/howto/onclick-event-triggering-twice-code-example
            event.stopImmediatePropagation();

            // only green, red, yellow and blue buttons are clickable by user
            let clicked_button = document.getElementById(event.target.id)
            if(clicked_button === green_button || clicked_button === red_button
                || clicked_button === yellow_button || clicked_button === blue_button){
                // reset animation if button is clicked by user
                resetAnimation(clicked_button);
                // start animation
                clicked_button.style.animation='flash 0.2s linear';
                // method is called with parameter clicked_button which will be pushed to the human array
                load_Button_List_Human(clicked_button)
            }
        })        
    }


    // buttons are clickable + playButton method is called
    function four_Buttons_Clickable() {
        green_button.disabled = false;
        red_button.disabled = false;
        yellow_button.disabled = false;
        blue_button.disabled = false;
        playButton();
    }


    // buttons are not clickable + waitButton method is called
    function four_Buttons_Notclickable() {
        green_button.disabled = true;
        red_button.disabled = true;
        yellow_button.disabled = true;
        blue_button.disabled = true;
        waitButton();
    }

    function testSequence() {
        // necessary to clear Interval for comparing arrays/sequence
        clearInterval(interval_for_loading)

        // array with buttons clicked by Simon is same like array with buttons clicked by human
        if (compareArrays(button_list_agent_names, button_list_human_names)) {
            // keep track of time of last button which was flashed by Simon 
            time_for_last_flash_button = 0;
            // clearTimeout as sequence is correct
            clearTimeout(timer_game);

            // counter for speed up a sequence and keeps track of correct sequence result
            counter++;
            if (counter < 5) {
                iterate_Button_List_Agent_timer = 800;
            }
            if (counter >= 5 && counter < 9) {
                iterate_Button_List_Agent_timer = 600;
            }
            if (counter >= 9 && counter < 13) {
                iterate_Button_List_Agent_timer = 400;
            }
            if (counter >= 13) {
                iterate_Button_List_Agent_timer = 200;
            }

            // user has a correct array -> the human array is set to empty since the sequence starts from 0
            button_list_human_names = []
            // Buttons which will be flashed are loaded and then the same buttons are iterated
            load_Button_List_Agent();
            iterate_Button_List_Agent(iterate_Button_List_Agent_timer);
            // user can not click buttons while buttons are clicked by Simon in sequence
            four_Buttons_Notclickable();

            // start next round
            gameGoesOn();
        }
    }


    // 2 arrays are compared whether they are same or not
    function compareArrays(button_list_agent_names, button_list_human_names) {
        let check = false
        let array_length_agent = button_list_agent_names.length;
        let array_length_human = button_list_human_names.length;
        let count = 0;
        for (let i = 0; i < array_length_agent;i++) {
            if (button_list_agent_names[i] === button_list_human_names[i]) {
                count++;
            }
        }
        if (count === array_length_agent && count === array_length_human) {
            check = true;
        }
        else {
            check = false;
        }
        return check
    }


    // when user clicked on clickable button, the button is pushed to the human array
    function load_Button_List_Human(clicked_button) {
        button_list_human_names.push(clicked_button.id)
    }


    function load_Button_List_Agent() {
        // number is randomly selected -> number representing a certain colorful button
        let load_button = button_list[(Math.floor(Math.random() * button_list.length))];
        // selected button is then pushed to Simon array
        button_list_agent.push(load_button);
        button_list_agent_names.push(load_button.id)
    }


    // this function assures to flash the colorful buttons
    function iterate_Button_List_Agent(iterate_Button_List_Agent_timer) {
        for (let b = 0; b < button_list_agent.length; b++) {
            // a sequence of colorful buttons is not flashed at the same time ->
            // setTimeout is used in order for user to see a sequence of flashed colorful buttons
            setTimeout(function() {
                let elem = button_list_agent[b];
                resetAnimation(elem);
                elem.style.animation='flash 0.2s linear';
            // thanks to iterate_Button_List_Agent_timer, the interval between signals can be speed up
            }, b * iterate_Button_List_Agent_timer)
            // to add last iteration time to timer_game and interval_for_loading in order for user to have still 5 seconds time to answer
            time_for_last_flash_button = (b * iterate_Button_List_Agent_timer)
        }
    }


    function notPressed() {
        let j = 0;
        // 5 times is called function gameOverLoop(j)
        while ( j < 5) {
            gameOverLoop(j);
            j++;
        }

        // user can click on start button and start playing a new game
        start_button.disabled = false;
        document.getElementById("starter").style.backgroundColor = 'red';

        // push counter for last game to the sequence history
        sequence_result.push(counter);
        // find all-time highest score = max
        let max_number = 0
        for(let i = 0; i < sequence_result.length; i++) {
            if (sequence_result[i] > max_number) {
                max_number = sequence_result[i]
            }
        }
        
        // display all-time highest score 
        document.querySelector(".number_left").innerHTML = max_number;

        // set last game score to counter and display for number_right
        let last_game = counter;
        document.querySelector(".number_right").innerHTML = last_game;

        // set to 0 after game over
        counter = 0;
        iterate_Button_List_Agent_timer = 0

        // set lists to empty
        button_list_human_names = [];
        button_list_agent = [];
        button_list_agent_names = [];

        // After game over, user can not press the 4 buttons unless start is clicked
        four_Buttons_Notclickable();
        // method startButton is called as four_Buttons_Notclickable() includes changing text to wait
        startButton();
    }


    // this function assures that 4 buttons are clicked at the same time
    function gameOverLoop(j) {
        setTimeout(function() {
            for (let i = 0; i < button_list.length; i++) {
                resetAnimation(button_list[i]);
                button_list[i].style.animation='flash 0.2s linear';
            }
        // j variable is increased in the while loop in notPressed() function,
        // the goal is to clicked 4 buttons at the same time in 5 times in a row
        }, 300 * j)
    }

    // restart the animation to original state -> see the online resource  https://stackoverflow.com/questions/6268508/restart-animation-in-css3-any-better-way-than-removing-the-element
    function resetAnimation(element) {
        element.style.animation='none';
        element.offsetHeight;
        element.style.animation= null;
    }
})
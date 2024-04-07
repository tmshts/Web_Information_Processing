document.addEventListener('DOMContentLoaded', function() {

let currentDate = new Date().toDateString();
document.getElementById("date").innerHTML = currentDate;

});

document.addEventListener("click", function(event) {
    let values_for_level_6 = document.getElementById("value_for_level_6").innerHTML;
    let values_for_level_5 = document.getElementById("value_for_level_5").innerHTML;
    let values_for_level_4 = document.getElementById("value_for_level_4").innerHTML;
    let values_for_level_3 = document.getElementById("value_for_level_3").innerHTML;
    let values_for_level_2 = document.getElementById("value_for_level_2").innerHTML;
    let values_for_level_1 = document.getElementById("value_for_level_1").innerHTML;

    switch (event.target.id) {
        case "button_6_plus":
            document.getElementById("value_for_level_6").innerHTML = parseInt(values_for_level_6) + 1;
            break;
        case "button_6_minus":
            let base_6 = document.getElementById("value_for_level_6").innerHTML = parseInt(values_for_level_6) - 1;
            if (base_6 < 0)
            {
                alert("you can not go to minus :)")
                document.getElementById("value_for_level_6").innerHTML = 0;
            }
            break;
        case "button_5_plus":
            document.getElementById("value_for_level_5").innerHTML = parseInt(values_for_level_5) + 1;
            break;
        case "button_5_minus":
            let base_5 = document.getElementById("value_for_level_5").innerHTML = parseInt(values_for_level_5) - 1;
            if (base_5 < 0)
            {
                alert("you can not go to minus :)")
                document.getElementById("value_for_level_5").innerHTML = 0;
            }
            break;
        case "button_4_plus":
            document.getElementById("value_for_level_4").innerHTML = parseInt(values_for_level_4) + 1;
            break;
        case "button_4_minus":
            let base_4 = document.getElementById("value_for_level_4").innerHTML = parseInt(values_for_level_4) - 1;
            if (base_4 < 0)
            {
                alert("you can not go to minus :)")
                document.getElementById("value_for_level_4").innerHTML = 0;
            }
            break;
        case "button_3_plus":
            document.getElementById("value_for_level_3").innerHTML = parseInt(values_for_level_3) + 1;
            break;
        case "button_3_minus":
            let base_3 = document.getElementById("value_for_level_3").innerHTML = parseInt(values_for_level_3) - 1;
            if (base_3 < 0)
            {
                alert("you can not go to minus :)")
                document.getElementById("value_for_level_3").innerHTML = 0;
            }
            break;
        case "button_2_plus":
            document.getElementById("value_for_level_2").innerHTML = parseInt(values_for_level_2) + 1;
            break;
        case "button_2_minus":
            let base_2 = document.getElementById("value_for_level_2").innerHTML = parseInt(values_for_level_2) - 1;
            if (base_2 < 0)
            {
                alert("you can not go to minus :)")
                document.getElementById("value_for_level_2").innerHTML = 0;
            }
            break;
        case "button_1_plus":
            document.getElementById("value_for_level_1").innerHTML = parseInt(values_for_level_1) + 1;
            break;
        case "button_1_minus":
            let base_1 = document.getElementById("value_for_level_1").innerHTML = parseInt(values_for_level_1) - 1;
            if (base_1 < 0)
            {
                alert("you can not go to minus :)")
                document.getElementById("value_for_level_1").innerHTML = 0;
            }            
            break;
      default:
        break;
    }
  });
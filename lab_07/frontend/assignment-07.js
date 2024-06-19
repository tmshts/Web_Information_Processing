// Browser: Chrome
// Operating System: macOS
// Browser version: Version 122.0.6261.129 (Official Build) (arm64)
// used framework ajax, jQuery

$(document).ready( () => {

    loadMemberClass();

    // handle search member class by member class ID logic
    $('#search_member_class').keyup(() => {
        let input = $('#search_member_class').val();

        let input_int = parseInt(input)
        let name;
        let first_name;
        let surname;
        let price;
        let result_classes;
        if(input == '') {
            $('#options_member_class_member').html('')
            $('#options_member_class_classes').html('')
            let div_form_update_member_class = $('.div_form_update_member_class')[0];
            div_form_update_member_class.style.display = 'none'
        }
        else {
            $('#options_member_class_member').html('')
            $('#options_member_class_classes').html('')
            // get particular member class link from database and update html
            $.get('http://localhost:8000/api/members_classes/member_class/' + input_int, (data_member_class) => {

                // get all data related to member_id
                $.get('http://localhost:8000/api/members/member/objectID/' + data_member_class[0].member_ID, (data) => {

                    first_name = data.first_name
                    surname = data.surname
                    email = data.email
                    premium_membership = data.premium_membership

                    let result_member = `
                    <tr>
                        <th>First Name</th><th>Surname</th><th>Email</th><th>Premium Membership</th>
                    </tr>
                    <tr>
                        <td class="options_row_long">${first_name}</td><td class="options_row_long">${surname}</td><td class="options_row_long">${email}</td><td class="options_row_long">${premium_membership}</td>
                        <td><button onclick="updateTheMemberClass('${input_int}')" class="btn_update_member_class">Update</button></td>
                        <td><button onclick="deleteTheMemberClass('${input_int}')" class="btn_delete">Delete</button></td>
                    </tr>
                    `
                
                    $('#options_member_class_member').html(result_member)

                    let result_classes_headers = 
                    `
                    <tr>
                        <th>Name</th><th>Day</th><th>Session Lenght (in hours)</th><th>Price</th><th>Number of Members</th>
                    </tr>
                    `

                    $('#options_member_class_classes').html(result_classes_headers)

                    for(let j = 0; j < data_member_class[0].taken_classes.length; j++) {
                        // get all data related to class_id
                        $.get('http://localhost:8000/api/classes/class/objectID/' + data_member_class[0].taken_classes[j].class_ID, (data_class) => {
                    
                            name = data_class.name
                            day = data_class.day
                            session_length = data_class.session_length
                            price = data_class.price
                            number_of_members = data_class.number_of_members


                            result_classes = `
                                    <tr>
                                        <td class="options_row_long">${name}</td><td class="options_row_long">${day}</td><td class="options_row_long">${session_length}</td><td class="options_row_long">${price}</td><td class="options_row_long">${number_of_members}</td>
                                    </tr>
                                `
                            $('#options_member_class_classes').append(result_classes)
                        })
                    }
                })
            })
        }
    })


    // handle search member by surname logic
    $('#search_member').keyup(() => {
        let input = $('#search_member').val();
        if(input == '') {
            $('#options_member').html('')
            let div_form_update_member = $('.div_form_update_member')[0];
            div_form_update_member.style.display = 'none'
        }
        else {
            // get particular members from database based on surname and update html
            $.get('http://localhost:8000/api/members/' + input, (data) => {
                let result = data.map(row => {
                    return (`
                        <tr>
                            <th>Member ID</th>
                        </tr>
                        <tr>
                            <td class="center_id">${row.ID}</td>
                        </tr>

                        <tr>
                            <th>Title</th><th>First Name</th><th>Surname</th><th>Email</th><th>Premium Membership</th>
                        </tr>
                        <tr>
                            <td>${row.title === null ? "" : row.title}</td><td>${row.first_name}</td><td>${row.surname}</td><td>${row.email}</td><td>${row.premium_membership}</td>
                            <td><button onclick="updateMember('${row.ID}')" class="btn_update_member">Update</button></td>
                            <td><button onclick="deleteTheMember('${row.ID}', '${row.first_name}', '${row.surname}')" class="btn_delete">Delete</button></td>
                        </tr>

                        <tr class="blank_row"></tr>
                        `)
                })
                $('#options_member').html(result)
            })
        }
    })


    // handle search class by model logic
    $('#search_class').keyup(() => {
        let input = $('#search_class').val();
        if(input == '') {
            $('#options_class').html('')
            let div_form_update_class = $('.div_form_update_class')[0];
            div_form_update_class.style.display = 'none'
        }
        else {
            // get particular classes from database based on model and update html
            $.get('http://localhost:8000/api/classes/' + input, (data) => {
                let result = data.map(row => {
                    return (`
                        <tr>
                            <th>Class ID</th>
                        </tr>
                        <tr>
                            <td class="center_id">${row.ID}</td>
                        </tr>
                        <tr>
                            <th>Name</th><th>Day</th><th>Session Length (in hours)</th><th>Price</th><th>Number of Members</th>
                        </tr>

                        <tr>
                            <td>${row.name}</td><td>${row.day}</td><td>${row.session_length}</td><td>${row.price}</td><td>${row.number_of_members}</td>
                            <td><button onclick="updateClass('${row.ID}')" class="btn_update_class">Update</button></td>
                            <td><button onclick="deleteTheClass('${row.ID}', '${row.name}')" class="btn_delete">Delete</button></td>
                        </tr>

                        <tr class="blank_row"></tr>

                        `)
                })
                $('#options_class').html(result)
            })
        }
    })


    // handle to add member class logic
    $('.btn_add_new_member_class').click(() => {
        let btn_add_new_member_class = $('.btn_add_new_member_class')[0]
        btn_add_new_member_class.style.display = 'none'
        let div_form_member_class = $('.div_form_member_class')[0];
        div_form_member_class.style.display = 'block'
        $('.btn_cancel_member_class').click(() => {
            div_form_member_class.style.display = 'none'
            btn_add_new_member_class.style.display = 'block'
        })
        
    })

    //$('#members_add').html('')

    // need to refresh a page in order to see new added members and classes -> why???
    // get all members and append to members selection in form for adding new member class
    $.get('http://localhost:8000/api/members', (data_members) => {

        let each_member;

        let each_member_start = 
        ` <select name="member_class_members_selection" id="member_class_members_selection"> `

        let each_member_end = 
        ` </select><br><br> `

        for(let a = 0; a < data_members.length; a++) {
            each_member +=
                ` <option value="${data_members[a].id}">${data_members[a].first_name} ${data_members[a].surname} ${data_members[a].email}</option> `
        }

        let all_in_one_members = each_member_start + each_member + each_member_end

        $('#members_add').html(all_in_one_members)
    })


    // get all classes and append to classes selection in form for adding new member class link
    $.get('http://localhost:8000/api/classes', (data_classes) => {

        for(let b = 0; b < 3; b++) {
            let each_class_start
            let each_class;
            let each_class_end

            each_class_start = 
            ` <select name="member_class_classes_selection_${b}" id="member_class_classes_selection_${b}"> `
            each_class_end = 
            ` </select><br><br> `
    
            for(let a = 0; a < data_classes.length; a++) {
    
                each_class +=
                    ` <option value="${data_classes[a].id}">${data_classes[a].name}</option> `
    
            }
            let all_in_one_classes = each_class_start + each_class + each_class_end

            $(`#class_cluster_${b}`).html(all_in_one_classes)
        }

    })


    // add new member class link
    $('#form_add_new_member_class').submit((event) => {
        event.preventDefault();

        let taken_classes = [];
        // iterate over entire classes in member class link
        for(let b = 0; b < 3; b++) {
            let member_class_class_id = $(`#member_class_classes_selection_${b}`).find(':selected','selected').val();
            taken_classes.push({
                "class_ID": member_class_class_id,
            })
        }

        let member_class_member_id = $('#member_class_members_selection').find(':selected','selected').val();

        let data_post_member_class = {
            "member_ID": member_class_member_id,
            "taken_classes": taken_classes
        }

        let notification_error_member_class = $('.notification_error_member_class')[0]

        let clear_error_member_class = null;

        // update database and html
        const the_url = 'http://localhost:8000/api/members_classes';
        $.ajax({
            url: the_url,
            type: 'POST',
            data: JSON.stringify(data_post_member_class),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
                // handle success
                // if user gets error message and then corrects input field within 5 sec and it is successfully inserted into database
                // -> it is necessary to clear the error message
                notification_error_member_class.innerHTML = '';
                notification_error_member_class.style.display = 'none';

                // inform user about updated member class link successfully
                $('#form_add_new_member_class').trigger("reset");
                let notification_success_member_class = $('.notification_success_member_class')[0]
                notification_success_member_class.style.display = 'block';
                notification_success_member_class.innerHTML = 'New Member Class Link ' + response.ID + ' has just been created.'
                let div_form_member_class = $('.div_form_member_class')[0];
                div_form_member_class.style.display = 'none'
                let btn_add_new_member_class = $('.btn_add_new_member_class')[0]
                btn_add_new_member_class.style.display = 'block'

                // after 5 sec notification success is hidden
                setTimeout(() =>{
                    notification_success_member_class.innerHTML = '';
                    notification_success_member_class.style.display = 'none';
                }, "5000");

                // set empty in search bar and options
                $('#options_member_class_member').html('')
                $('#options_member_class_classes').html('')
                $('#search_member_class').val('')

                loadMemberClass()
        }).fail((error) => {

            notification_error_member_class.style.display = 'block';
            notification_error_member_class.innerHTML = error.responseText + '.<br><br>' + 'Please insert different one.'

            // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
            if (clear_error_member_class) {
                clearTimeout(clear_error_member_class);
            }
            
            // after 5 sec notification error is hidden
            clear_error_member_class = setTimeout(() => {
                notification_error_member_class.innerHTML = '';
                notification_error_member_class.style.display = 'none';
            }, "5000");
        })
    })



    // handle to add class logic
    $('.btn_add_new_class').click(() => {
        let btn_add_new_class = $('.btn_add_new_class')[0]
        btn_add_new_class.style.display = 'none'
        let div_form_class = $('.div_form_class')[0];
        div_form_class.style.display = 'block'
        $('.btn_cancel_class').click(() => {
            div_form_class.style.display = 'none'
            btn_add_new_class.style.display = 'block'
        })
    })

    // declare and initial variable for timeout logic
    let clear_error_class = null;

    // get values from form add new class
    $('#form_add_new_class').submit((event) => {
        event.preventDefault();

        let name = $('#class_fname').val()
        let day = $('#class_fday').val()
        let session_length = $('#class_fsession_length').val()
        let price = $('#class_fprice').val()

        let data_post_class = {
            "name": name,
            "day": day,
            "session_length": session_length,
            "price": price,
            "number_of_members": 0
        }

        let notification_error_class = $('.notification_error_class')[0]

        // post into database and update html
        const the_url = 'http://localhost:8000/api/classes';
        $.post({
            url: the_url,
            data: JSON.stringify(data_post_class),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {

            // if user gets error message and then corrects input field within 5 sec and it is successfully inserted into database
            // -> it is necessary to clear the error message
            notification_error_class.innerHTML = '';
            notification_error_class.style.display = 'none';

            // inform user about added class successfully
            $('#form_add_new_class').trigger("reset");
            let notification_success_class = $('.notification_success_class')[0]
            notification_success_class.style.display = 'block';
            notification_success_class.innerHTML = 'Class ' + name + ' has just been added.'
            let div_form_class = $('.div_form_class')[0];
            div_form_class.style.display = 'none'

            $('#options_class').html('')

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_class.innerHTML = '';
                notification_success_class.style.display = 'none';
            }, "5000");

            let btn_add_new_class = $('.btn_add_new_class')[0]
            btn_add_new_class.style.display = 'block'

        })
        .fail((error) => {

            notification_error_class.style.display = 'block';
            notification_error_class.innerHTML = error.responseJSON.class_message + '.<br><br>' + 'Please insert different one.'

            // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
            if (clear_error_class) {
                clearTimeout(clear_error_class);
            }
            
            // after 5 sec notification error is hidden
            clear_error_class = setTimeout(() => {
                notification_error_class.innerHTML = '';
                notification_error_class.style.display = 'none';
            }, "5000");
          })
    })


    // handle to add member logic
    $('.btn_add_new_member').click(() => {
        let btn_add_new_member = $('.btn_add_new_member')[0]
        btn_add_new_member.style.display = 'none'
        let div_form_member = $('.div_form_member')[0];
        div_form_member.style.display = 'block'
        $('.btn_cancel_member').click(() => {
            div_form_member.style.display = 'none'
            btn_add_new_member.style.display = 'block'
        })
    })

    // declare and initial variable for timeout logic
    let clear_error_member = null;

    // get values from form add new member
    $('#form_add_new_member').submit((event) => {
        event.preventDefault();

        let title = $('#member_ftitle').val()
        let first_name = $('#member_ffirst_name').val()
        let surname = $('#member_fsurname').val()
        let email = $('#member_femail').val()
        let premium_membership = $("input[type='radio'][name='premium_membership']:checked").val()

        let data_post_member = {
            "title": title,
            "first_name": first_name,
            "surname": surname,
            "email": email,
            "premium_membership": premium_membership
        }

        let notification_error_member = $('.notification_error_member')[0]

        // post into database
        const the_url = 'http://localhost:8000/api/members';
        $.post({
            url: the_url,
            data: JSON.stringify(data_post_member),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
            // if user gets error message and then corrects input field within 5 sec and it is successfully inserted into database
            // -> it is necessary to clear the error message
            notification_error_member.innerHTML = '';
            notification_error_member.style.display = 'none';

            // inform user about updated member successfully
            $('#form_add_new_member').trigger("reset");
            let notification_success_member = $('.notification_success_member')[0]
            notification_success_member.style.display = 'block';
            notification_success_member.innerHTML = first_name + ' ' + surname + ' has just been added.'
            let div_form_member = $('.div_form_member')[0];
            div_form_member.style.display = 'none'

            $('#options_member').html('')


            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_member.innerHTML = '';
                notification_success_member.style.display = 'none';
            }, "5000");

            let btn_add_new_member = $('.btn_add_new_member')[0]
            btn_add_new_member.style.display = 'block'

        })
        .fail((error) => {

            notification_error_member.style.display = 'block';
            notification_error_member.innerHTML = error.responseJSON.member_message + '.<br><br>' + 'Please insert different one.'

            // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
            if (clear_error_member) {
                clearTimeout(clear_error_member);
            }
            
            // after 5 sec notification error is hidden
            clear_error_member = setTimeout(() => {
                notification_error_member.innerHTML = '';
                notification_error_member.style.display = 'none';
            }, "5000");
          })
    })
})



// handle delete member when delete btn is clicked
function deleteTheMember(member_id, member_first_name, member_surname) {

    if (window.confirm(`Do you want to delete ${member_first_name} ${member_surname}?`)) {

        // update database
        const the_url = 'http://localhost:8000/api/members/member/' + member_id;
        $.ajax({
            url: the_url,
            type: 'DELETE',
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
            // if update form is shown -> hide it
            let div_form_update_member = $('.div_form_update_member')[0];
            div_form_update_member.style.display = 'none'
            
            // inform user about deleted member successfully
            let notification_success_delete_member = $('.notification_success_delete_member')[0]
            notification_success_delete_member.style.display = 'block';
            notification_success_delete_member.innerHTML = member_first_name + ' ' + member_surname + ' has just been deleted.'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_delete_member.innerHTML = '';
                notification_success_delete_member.style.display = 'none';
            }, "5000");

            // set empty in search bar and options
            $('#options_member').html('')
            $('#search_member').val('')
        })
    }
}



// handle delete class when delete btn is clicked
function deleteTheClass(class_id, class_name) {

    if (window.confirm(`Do you want to delete ${class_name}?`)) {

        // update database and html
        const the_url = 'http://localhost:8000/api/classes/class/' + class_id;
        $.ajax({
            url: the_url,
            type: 'DELETE',
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
            // if update form is shown -> hide it
            let div_form_update_class = $('.div_form_update_class')[0];
            div_form_update_class.style.display = 'none'
            
            // inform user about deleted member successfully
            let notification_success_delete_class = $('.notification_success_delete_class')[0]
            notification_success_delete_class.style.display = 'block';
            notification_success_delete_class.innerHTML = class_name + ' has just been deleted.'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_delete_class.innerHTML = '';
                notification_success_delete_class.style.display = 'none';
            }, "5000");

            // set empty in search bar and options
            $('#options_class').html('')
            $('#search_class').val('')
        })
    }
}



// handle delete member class when delete btn is clicked
function deleteTheMemberClass(member_class_id) {

    if (window.confirm(`Do you want to delete ${member_class_id}?`)) {

        // update database and update html
        const the_url = 'http://localhost:8000/api/members_classes/member_class/' + member_class_id;
        $.ajax({
            url: the_url,
            type: 'DELETE',
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {

            loadMemberClass();

            // if update form is shown -> hide it
            let div_form_update_member_class = $('.div_form_update_member_class')[0];
            div_form_update_member_class.style.display = 'none'
            
            // inform user about deleted member class successfully
            let notification_success_delete_member_class = $('.notification_success_delete_member_class')[0]
            notification_success_delete_member_class.style.display = 'block';
            notification_success_delete_member_class.innerHTML = 'Member Class ID ' + member_class_id + ' has just been deleted.'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_delete_member_class.innerHTML = '';
                notification_success_delete_member_class.style.display = 'none';
            }, "5000");

            // set empty in search bar and options
            $('#options_member_class_member').html('')
            $('#options_member_class_classes').html('')
            $('#search_member_class').val('')
        })
    }
}




let data_member_class_taken_classes_length;
let member_ID;
let member_objectID;

// handle update member when update btn is clicked
function updateTheMemberClass(member_class_id) {
    // show update form
    let div_form_update_member_class = $('.div_form_update_member_class')[0];
    div_form_update_member_class.style.display = 'block'

    $('#class_cluster_0').html('')
    $('#class_cluster_1').html('')
    $('#class_cluster_2').html('')

    // get all data related for member_class_id
    $.get('http://localhost:8000/api/members_classes/member_class/' + member_class_id, (data_member_class) => {
 
            member_objectID = data_member_class[0].member_ID

            $.get('http://localhost:8000/api/members/member/objectID/' + member_objectID, (member_data) => {

                // pre-fill the form for update with data from database
                member_ID = member_data.ID

                $('#member_class_fmember_id_update').val(member_ID)
            })

            data_member_class_taken_classes_length = data_member_class[0].taken_classes.length
                for(let j = 0; j < data_member_class_taken_classes_length; j++) {
                    // get all data related to class_id and pre-fill the update form for member class link
                    $.get('http://localhost:8000/api/classes/class/objectID/' + data_member_class[0].taken_classes[j].class_ID, (data_class) => {

                        // get all classes and append to classes selection in form for adding new member class link
                        $.get('http://localhost:8000/api/classes', (data_classes) => {

                                let each_class_start
                                let each_class;
                                let each_class_end;

                                each_class_start = 
                                ` <select name="member_class_classes_selection_update_${j}" id="member_class_classes_selection_update_${j}"> `
                                each_class_end = 
                                ` </select><br><br> `
                        
                                for(let a = 0; a < data_classes.length; a++) {

                                    if(data_classes[a].name === data_class.name) {
                                        each_class +=
                                        ` <option value="${data_classes[a].id}" selected >${data_classes[a].name}</option> ` 
                                    }
                                    else {
                                        each_class +=
                                        ` <option value="${data_classes[a].id}">${data_classes[a].name}</option> `
                                    }
                        
                                }
                                let all_in_one_classes = each_class_start + each_class + each_class_end

                                $(`#class_cluster_update_${j}`).html(all_in_one_classes)
                        })
                    })
                }
    })

    
    // hide update form
    $('.btn_cancel_update_member_class').click(() => {
        div_form_update_member_class.style.display = 'none'
    })

    // declare and initial variable for timeout logic
    let clear_error_update_member_class = null;


    // get values from form update member class
    $('#form_update_member_class').submit((event) => {
        event.preventDefault();

        let taken_classes_update = [];

        for(let j = 0; j < data_member_class_taken_classes_length; j++) {
            let class_id_to_update = $(`#member_class_classes_selection_update_${j}`).val()
            taken_classes_update.push({
                "class_ID": class_id_to_update,
            })
        }

        let data_update_member_class = {
            "member_ID": member_objectID,
            "taken_classes": taken_classes_update
        }    
        

        let notification_error_update_member_class = $('.notification_error_update_member_class')[0]

        // update database and html
        const the_url = 'http://localhost:8000/api/members_classes/member_class/' + member_class_id;
        $.ajax({
            url: the_url,
            type: 'PUT',
            data: JSON.stringify(data_update_member_class),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
                // handle success
                // if user gets error message and then corrects input field within 5 sec and it is successfully inserted into database
                // -> it is necessary to clear the error message
                notification_error_update_member_class.innerHTML = '';
                notification_error_update_member_class.style.display = 'none';

                // inform user about updated member successfully
                $('#form_update_member_class').trigger("reset");
                let notification_success_update_member_class = $('.notification_success_update_member_class')[0]
                notification_success_update_member_class.style.display = 'block';
                notification_success_update_member_class.innerHTML = member_ID + ' has just been updated.'
                let div_form_update_member_class = $('.div_form_update_member_class')[0];
                div_form_update_member_class.style.display = 'none'

                // after 5 sec notification success is hidden
                setTimeout(() =>{
                    notification_success_update_member_class.innerHTML = '';
                    notification_success_update_member_class.style.display = 'none';
                }, "5000");

                // set empty in search bar and options
                $('#options_member_class_member').html('')
                $('#options_member_class_classes').html('')
                $('#search_member_class').val('')

                loadMemberClass();

        }).fail((error) => {

            notification_error_update_member_class.style.display = 'block';
            notification_error_update_member_class.innerHTML = error.responseJSON.classes_message + '.<br><br>' + 'Please insert different one.'

            // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
            if (clear_error_update_member_class) {
                clearTimeout(clear_error_update_member_class);
            }
            
            // after 5 sec notification error is hidden
            clear_error_update_member_class = setTimeout(() => {
                notification_error_update_member_class.innerHTML = '';
                notification_error_update_member_class.style.display = 'none';
            }, "5000");
          })
    })
}



// handle update class when update btn is clicked
function updateClass(class_id) {
    // show update form
    let div_form_update_class = $('.div_form_update_class')[0];
    div_form_update_class.style.display = 'block'

    // get all data related to class id
    $.get('http://localhost:8000/api/classes/class/' + class_id, (data) => {
 
            let name = data[0].name
            let day = data[0].day
            let session_length = data[0].session_length
            let price = data[0].price
            let number_of_members = data[0].number_of_members

            // pre-fill the form for update with data from database
            $('#class_fname_update').val(name)
            $('#class_fday_update').val(day)
            $('#class_fsession_length_update').val(session_length)
            $('#class_fprice_update').val(price)
            $('#class_fnumber_members_update').val(number_of_members)
    })

    // hide update form
    $('.btn_cancel_update_class').click(() => {
        div_form_update_class.style.display = 'none'
    })

    // declare and initial variable for timeout logic
    let clear_error_update_class = null;
    let clear_notification_update_class = null;

    // get values from form update class
    $('#form_update_class').submit((event) => {
        event.preventDefault();

        let name_update = $('#class_fname_update').val()
        let day_update = $('#class_fday_update').val()
        let session_length_update = $('#class_fsession_length_update').val()
        let price_update = $('#class_fprice_update').val()
        let number_of_members_update = $('#class_fnumber_members_update').val()

        let data_update_class = {
            "name": name_update ,
            "day": day_update,
            "session_length": session_length_update,
            "price": price_update,
            "number_of_members": number_of_members_update,
        }

        let notification_error_update_class = $('.notification_error_update_class')[0]

        // update database
        const the_url = 'http://localhost:8000/api/classes/class/' + class_id;
        $.ajax({
            url: the_url,
            type: 'PUT',
            data: JSON.stringify(data_update_class),
            contentType: 'application/json; charset=utf-8',
            // success triggered even there is an error. why???????
            success: (response) => {
                    // handle success
                    // if user gets error message and then corrects input field within 5 sec and it is successfully inserted into database
                    // -> it is necessary to clear the error message
                    notification_error_update_class.innerHTML = '';
                    notification_error_update_class.style.display = 'none';
        
                    // inform user about updated member successfully
                    $('#form_update_class').trigger("reset");
                    let notification_success_update_class = $('.notification_success_update_class')[0]
                    notification_success_update_class.style.display = 'block';
                    notification_success_update_class.innerHTML = name_update + ' has just been updated.'
                    let div_form_update_class = $('.div_form_update_class')[0];
                    div_form_update_class.style.display = 'none'
        
                    // after 5 sec notification success is hidden
                    setTimeout(() =>{
                        notification_success_update_class.innerHTML = '';
                        notification_success_update_class.style.display = 'none';
                    }, "5000");
        
                    // set empty in search bar and options
                    $('#options_class').html('')
                    $('#search_class').val('')
            },
            error: (error) => {
        
                notification_error_update_class.style.display = 'block';
                notification_error_update_class.innerHTML = error.responseJSON.class_message + '.<br><br>' + 'Please insert different one.'
        
                // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
                if (clear_error_update_class) {
                    clearTimeout(clear_error_update_class);
                }
                
                // after 5 sec notification error is hidden
                clear_error_update_class = setTimeout(() => {
                    notification_error_update_class.innerHTML = '';
                    notification_error_update_class.style.display = 'none';
                }, "5000");
            }
        })
    })
}



// handle update member
function updateMember(member_id) {
    // show update form
    let div_form_update_member = $('.div_form_update_member')[0];
    div_form_update_member.style.display = 'block'

    // get all data related to member_id
    $.get('http://localhost:8000/api/members/member/' + member_id, (data) => {
 
            let title_update = data[0].title
            let first_name_update = data[0].first_name
            let surname_update = data[0].surname
            let email_update = data[0].email
            let premium_membership_update = data[0].premium_membership

            // pre-fill the form for update with data from database
            $('#member_ftitle_update').val(title_update).attr('selected','selected')
            $('#member_ffirst_name_update').val(first_name_update)
            $('#member_fsurname_update').val(surname_update)
            $('#member_femail_update').val(email_update)
            $(`input[name=premium_membership][value='${premium_membership_update}']`).prop("checked",true);
    })


    // hide update form
    $('.btn_cancel_update_member').click(() => {
        div_form_update_member.style.display = 'none'
    })

    // declare and initial variable for timeout logic
    let clear_error_update_member = null;
    let clear_notification_update_member = null;

    // get values from form update member
    $('#form_update_member').submit((event) => {
        event.preventDefault();

        let title_update = $('#member_ftitle_update').val()
        let first_name_update = $('#member_ffirst_name_update').val()
        let surname_update = $('#member_fsurname_update').val()
        let email_update = $('#member_femail_update').val()
        let premium_membership_update = $("input[type='radio'][name='premium_membership']:checked").val()

        let data_update_member = {
            "title": title_update ,
            "first_name": first_name_update,
            "surname": surname_update,
            "email": email_update,
            "premium_membership": premium_membership_update
        }

    let notification_error_update_member = $('.notification_error_update_member')[0]

    // update database
    const the_url = 'http://localhost:8000/api/members/member/' + member_id;
    $.ajax({
        url: the_url,
        type: 'PUT',
        data: JSON.stringify(data_update_member),
        contentType: 'application/json; charset=utf-8'
    // success triggered even there is an error. why?????
    }).done( (response) => {

            // handle success
            // if user gets error message and then corrects input field within 5 sec and it is successfully inserted into database
            // -> it is necessary to clear the error message
            notification_error_update_member.innerHTML = '';
            notification_error_update_member.style.display = 'none';

            // inform user about updated member successfully
            $('#form_update_member').trigger("reset");
            let notification_success_update_member = $('.notification_success_update_member')[0]
            notification_success_update_member.style.display = 'block';
            notification_success_update_member.innerHTML = first_name_update + ' ' + surname_update + ' has just been updated.'
            let div_form_update_member = $('.div_form_update_member')[0];
            div_form_update_member.style.display = 'none'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_update_member.innerHTML = '';
                notification_success_update_member.style.display = 'none';
            }, "5000");

            // set empty in search bar and options
            $('#options_member').html('')
            $('#search_member').val('')
    }).fail((error) => {

        notification_error_update_member.style.display = 'block';
        notification_error_update_member.innerHTML = error.responseJSON.member_message + '.<br><br>' + 'Please insert different one.'

        // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
        if (clear_error_update_member) {
            clearTimeout(clear_error_update_member);
        }
        
        // after 5 sec notification error is hidden
        clear_error_update_member = setTimeout(() => {
            notification_error_update_member.innerHTML = '';
            notification_error_update_member.style.display = 'none';
        }, "5000");
        })
    })
}


// get data from database and update html
function loadMemberClass() {

    // body starts from nothing
    $('.tbody').html('')

    // get all data related to member class
    $.get('http://localhost:8000/api/members_classes', (data_members_classes) => {

    if(data_members_classes.length != 0) {

        let theaders = `
        <tr>
            <th>Member-Class Link ID</th><th>First Name</th><th>Surname</th><th>Email</th><th>Premium Membership</th><th>Created</th><th>Updated</th>
        </tr>
        `
    
        $('.theaders').html(theaders)

        for(let i = 0; i < data_members_classes.length; i++) {

            // get all data related to member_id
            $.get('http://localhost:8000/api/members/member/objectID/' + data_members_classes[i].member_ID, (data_member) => {

                // data about member class
                let member_class_ID = data_members_classes[i].ID
                let createdAt = data_members_classes[i].createdAt
                let updatedAt = data_members_classes[i].updatedAt

                // data about data_member
                let first_name = data_member.first_name
                let surname = data_member.surname
                let email = data_member.email
                let premium_membership = data_member.premium_membership


                let tbody = 
                `
                <tr>
                    <th>${member_class_ID}</th><th>${first_name}</th><th>${surname}</th><th>${email}</th><th>${premium_membership}</th><th>${createdAt}</th><th>${updatedAt}</th>
                </tr>
                `

                $('.tbody').append(tbody)

            })
        }
    }
    })
}


/* NOT working why??

// get data from database and update html
function loadMemberClass() {
    // get all data related to member class
    $.get('http://localhost:8000/api/members_classes', (data) => {

    let theaders = `
        <tr>
            <th>Member Class ID</th><th>First Name</th><th>Surname</th><th>Email</th><th>Premium Membership</th><th>Class 1</th><th>Class 2</th><th>Class 3</th>
        </tr>
        `
    
        $('.theaders').html(theaders)

        for(let i = 0; i < data.length; i++) {

            // get all data related to member_id
            $.get('http://localhost:8000/api/members/member/objectID/' + data[i].member_ID, (data_member) => {

                first_name = data_member.first_name
                surname = data_member.surname
                email = data_member.email
                premium_membership = data_member.premium_membership

                let registered_classes = []

                for(let j = 0; j < data[i].taken_classes.length; j++) {
                    // get all data related to taken classes
                    $.get('http://localhost:8000/api/classes/class/objectID/' + data[i].taken_classes[j].class_ID, (data_class) => {

                        registered_classes.push(data_class.name)
                    })

                }

                let tbody = 
                `
                <tr>
                    <th>${data[i].ID}</th><th>${first_name}</th><th>${surname}</th><th>${email}</th><th>${premium_membership}</th><th>${registered_classes[0]}</th><th>${registered_classes[1]}</th><th>${registered_classes[2]}</th>
                </tr>
                `

                $('.tbody').append(tbody)

            })
        }
    })
}
*/
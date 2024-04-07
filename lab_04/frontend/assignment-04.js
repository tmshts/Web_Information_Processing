// Browser: Chrome
// Operating System: macOS
// Browser version: Version 122.0.6261.129 (Official Build) (arm64)

$(document).ready( () => {

    /////////// start of ingest data /////////////

    // send data
    let front_data_post = {
        "title": "Mr",
        "first_name": "F first C",
        "surname": "F surname C",
        "mobile": "F mobile C",
        "email": "F email C",
        "home_address_1": "F home 1 C",
        "home_address_2": "F home 2 C",
        "home_town": "F home town C",
        "home_city": "F home city C",
        "home_eircode": "F home eir C",
        "shipping_address_1": "F ship 1 C",
        "shipping_address_2": "F ship 2 C",
        "shipping_town": "F ship town C",
        "shipping_city": "F ship city C",
        "shipping_eircode": "F ship eir C"
    }
    const the_url_send = 'http://localhost:8000/api/users';
    $.post({
        url: the_url_send,
        data: JSON.stringify(front_data_post),
        contentType: 'application/json; charset=utf-8'
    }).done( (response) => {
        // update data in front-end
        loadUsers()
        })


    // update data
    let front_data_update = {
        "id": 5,
        "title": "Dr",
        "mobile": "F mobile up",
        "email": "F email up",
        "home_address_1": "F home 1 up",
        "home_address_2": "F home 2 up",
        "home_town": "F home town up",
        "home_city": "F home city up",
        "home_eircode": "F home eir up",
        "shipping_address_1": "F ship 1 up",
        "shipping_address_2": "F ship 2 up",
        "shipping_town": "F ship town",
        "shipping_city": "F ship city",
        "shipping_eircode": "F ship eir up"
        }
    const the_url_update = 'http://localhost:8000/api/users/user/';
    $.ajax({
        url: the_url_update + 5,
        type: 'PUT',
        data: JSON.stringify(front_data_update),
        contentType: 'application/json; charset=utf-8'
    }).done( (response) => {
        // update data in front-end
        loadUsers()
        })

    // delete data
    let front_data_delete = {
        "first_name": "Jana",
        "surname": "Tok",
        "mobile": "2345699",
        "email": "jana.tok@mu.ie"
    }
    const the_url = 'http://localhost:8000/api/users';
    $.ajax({
        url: the_url,
        type: 'DELETE',
        data: JSON.stringify(front_data_delete),
        contentType: 'application/json; charset=utf-8'
    }).done( (response) => {
        // update data in front-end
        loadUsers()
        })

    /////////// end of ingest data /////////////
    

    // handle search by surname logic
    $('#search').keyup(() => {
        let input = $('#search').val();
        if(input == '') {
            $('#options').html('')
        }
        else {
            // get particular users from database and update html
            $.get('http://localhost:8000/api/users/' + input, (data) => {
                let result = data.map(row => {
                    return (`
                        <tr>
                            <td>${row.title === null ? "" : row.title}</td><td>${row.first_name}</td><td>${row.surname}</td><td>${row.mobile}</td><td>${row.email}</td>
                            <td><button onclick="updateUser(${row.user_id})" class="btn_update">Update</button></td>
                            <td><button onclick="deleteTheUser('${row.first_name}', '${row.surname}', '${row.mobile}', '${row.email}')" class="btn_delete">Delete</button></td>
                        </tr>

                        <tr>
                            <th>Home Address Line 1</th><th>Home Address Line 2</th><th>Home Town</th><th>Home City</th><th>Home Eircode</th>
                        </tr>

                        <tr>
                            <td>${row.home_address_line_1}</td><td>${row.home_address_line_2 === null ? "" : row.home_address_line_2}</td><td>${row.home_town}</td><td>${row.home_city}</td><td>${row.home_eircode === null ? "" : row.home_eircode}</td>
                        </tr>

                        <tr>
                            <th>Shipping Address Line 1</th><th>Shipping Address Line 2</th><th>Shipping Town</th><th>Shipping City</th><th>Shipping Eircode</th>
                        </tr>

                        <tr>
                            <td>${row.shipping_address_line_1}</td><td>${row.shipping_address_line_2 === null ? "" : row.shipping_address_line_2}</td><td>${row.shipping_town}</td><td>${row.shipping_city}</td><td>${row.shipping_eircode === null ? "" : row.shipping_eircode}</td>
                        </tr>

                        <tr class="blank_row"></tr>
                        `)
                })
                $('#options').html(result)
            })
        }
    })

    // handle to add user logic
    $('.btn_add_new_user').click(() => {
        let btn_add_new_user = $('.btn_add_new_user')[0]
        btn_add_new_user.style.display = 'none'
        let div_form = $('.div_form')[0];
        div_form.style.display = 'block'
        $('.btn_cancel').click(() => {
            div_form.style.display = 'none'
            btn_add_new_user.style.display = 'block'
        })
    })

    // declare and initial variable for timeout logic
    let clear_error = null;
    let clear_notification = null;

    // get values from form add new user
    $('#form_add_new_user').submit((event) => {
        event.preventDefault();

        let title = $('#ftitle').val()
        let first_name = $('#ffirst_name').val()
        let surname = $('#fsurname').val()
        let mobile = $('#fmobile').val()
        let email = $('#femail').val()
        let address1_home = $('#faddress1_home').val()
        let address2_home = $('#faddress2_home').val()
        let town_home = $('#ftown_home').val()
        let city_home = $('#fcity_home').val()
        let eircode_home = $('#feircode_home').val()
        let address1_shipping = $('#faddress1_shipping').val()
        let address2_shipping = $('#faddress2_shipping').val()
        let town_shipping = $('#ftown_shipping').val()
        let city_shipping = $('#fcity_shipping').val()
        let eircode_shipping = $('#feircode_shipping').val()

        let data_post = {
            "title": title,
            "first_name": first_name,
            "surname": surname,
            "mobile": mobile,
            "email": email,
            "home_address_1": address1_home,
            "home_address_2": address2_home,
            "home_town": town_home,
            "home_city": city_home,
            "home_eircode": eircode_home,
            "shipping_address_1": address1_shipping,
            "shipping_address_2": address2_shipping,
            "shipping_town": town_shipping,
            "shipping_city": city_shipping,
            "shipping_eircode": eircode_shipping
        }


        // post into database
        const the_url = 'http://localhost:8000/api/users';
        $.post({
            url: the_url,
            data: JSON.stringify(data_post),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {

            let notification_error = $('.notification_error')[0]

            // handle error message from database
            if (response.includes("Duplicate")) {
                notification_error.style.display = 'block';
                notification_error.innerHTML = response + '.<br><br>' + 'Please insert different one.'

                // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
                if (clear_error) {
                    clearTimeout(clear_error);
                }
                
                // after 5 sec notification error is hidden
                clear_error = setTimeout(() => {
                    notification_error.innerHTML = '';
                    notification_error.style.display = 'none';
                }, "5000");
            }
            else {
                // handle success
                
                // if user gets error message and then corrects input field within 5 sec and it is successfully inserted into database
                // -> it is necessary to clear the error message
                notification_error.innerHTML = '';
                notification_error.style.display = 'none';

                // inform user about updated user successfully
                $('#form_add_new_user')[0].reset();
                let notification_success = $('.notification_success')[0]
                notification_success.style.display = 'block';
                notification_success.innerHTML = first_name + ' ' + surname + ' has just been added.'
                let div_form = $('.div_form')[0];
                div_form.style.display = 'none'

                // after 5 sec notification success is hidden
                setTimeout(() =>{
                    notification_success.innerHTML = '';
                    notification_success.style.display = 'none';
                }, "5000");

                let btn_add_new_user = $('.btn_add_new_user')[0]
                btn_add_new_user.style.display = 'block'

                // after inserting user into database -> update the user database state in html
                // so that the user can see the up-to-date database even without refreshing page
                loadUsers()
            }
        })
    }) 
})

// get data from database and update html
function loadUsers() {
    $.get('http://localhost:8000/api/users', (data) => {
        let theaders = '<tr><th>ID</th><th>Title</th><th>First Name</th><th>Surname</th><th>Mobile</th><th>Email</th><th>Home Address Line 1</th><th>Home Address Line 2</th><th>Home Town</th><th>Home City</th><th>Home Eircode</th><th>Shipping Address Line 1</th><th>Shipping Address Line 2</th><th>Shipping Town</th><th>Shipping City</th><th>Shipping Eircode</th></tr>'
        let tbody = data.map(row => {
            return ('<tr><td>'+ row.user_id +'</td><td>' + (row.title === null ? "" : row.title) + '</td><td>' + row.first_name + '</td><td>' + row.surname + '</td><td>' + row.mobile + '</td><td>' + row.email + '</td><td>' + row.home_address_line_1 + '</td><td>' + (row.home_address_line_2 === null ? "" : row.home_address_line_2) + '</td><td>' + row.home_town + '</td><td>' + row.home_city + '</td><td>' + (row.home_eircode === null ? "" : row.home_eircode) + '</td><td>' + row.shipping_address_line_1 + '</td><td>' + (row.shipping_address_line_2 === null ? "" : row.shipping_address_line_2) + '</td><td>' + row.shipping_town + '</td><td>' + row.shipping_city + '</td><td>' + (row.shipping_eircode === null ? "" : row.shipping_eircode) + '</td></tr>')
        })                    
        $(".theaders").html(theaders)
        $(".tbody").html(tbody)
    })
}

// handle delete user when delete btn is clicked
function deleteTheUser(user_first_name, user_surname, user_mobile, user_email) {

    if (window.confirm(`Do you want to delete ${user_first_name} ${user_surname}?`)) {

        let data_delete = {
        "first_name": user_first_name,
        "surname": user_surname,
        "mobile": user_mobile,
        "email": user_email
        }

        // update database
        const the_url = 'http://localhost:8000/api/users';
        $.ajax({
            url: the_url,
            type: 'DELETE',
            data: JSON.stringify(data_delete),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {

            // if update form is shown -> hide it
            let div_form_update = $('.div_form_update')[0];
            div_form_update.style.display = 'none'

            // inform user about deleted user successfully
            let notification_success_delete = $('.notification_success_delete')[0]
            notification_success_delete.style.display = 'block';
            notification_success_delete.innerHTML = user_first_name + ' ' + user_surname + ' has just been deleted.'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_delete.innerHTML = '';
                notification_success_delete.style.display = 'none';
            }, "5000");

            // set empty in search bar and options
            $('#options').html('')
            $('#search').val('')

            // after updating user in database -> update the user database state in html
            // so that the user can see the up-to-date database even without refreshing page
            loadUsers()
        })
    }
}

// handle update user when update btn is clicked
function updateUser(user_id) {
    // show update form
    let div_form_update = $('.div_form_update')[0];
    div_form_update.style.display = 'block'

    // get all data related to user_id
    $.get('http://localhost:8000/api/users/user/' + user_id, (data) => {
            let title_update = data[0].title
            let first_name_update = data[0].first_name
            let surname_update = data[0].surname
            let mobile_update = data[0].mobile
            let email_update = data[0].email
            let home_address_line_1_update = data[0].home_address_line_1
            let home_address_line_2_update = data[0].home_address_line_2
            let home_town_update = data[0].home_town
            let home_city_update = data[0].home_city
            let home_eircode_update = data[0].home_eircode
            let shipping_address_line_1_update = data[0].shipping_address_line_1
            let shipping_address_line_2_update = data[0].shipping_address_line_2
            let shipping_town_update = data[0].shipping_town
            let shipping_city_update = data[0].shipping_city
            let shipping_eircode_update = data[0].shipping_eircode

            // pre-fill the form for update with data from database
            $('#ftitle_update').val(title_update).attr('selected','selected')
            $('#ffirst_name_update').val(first_name_update)
            $('#fsurname_update').val(surname_update)
            $('#fmobile_update').val(mobile_update)
            $('#femail_update').val(email_update)
            $('#faddress1_home_update').val(home_address_line_1_update)
            $('#faddress2_home_update').val(home_address_line_2_update)
            $('#ftown_home_update').val(home_town_update)
            $('#fcity_home_update').val(home_city_update)           
            $('#feircode_home_update').val(home_eircode_update)
            $('#faddress1_shipping_update').val(shipping_address_line_1_update)
            $('#faddress2_shipping_update').val(shipping_address_line_2_update)
            $('#ftown_shipping_update').val(shipping_town_update)
            $('#fcity_shipping_update').val(shipping_city_update)
            $('#feircode_shipping_update').val(shipping_eircode_update)
    })
    
    // hide update form
    $('.btn_cancel_update').click(() => {
        div_form_update.style.display = 'none'
    })

    // declare and initial variable for timeout logic
    let clear_error_update = null;
    let clear_notification_update = null;

    // get values from form update user
    $('#form_update_user').submit((event) => {
        event.preventDefault();

        let title_update = $('#ftitle_update').val()
        let first_name_update = $('#ffirst_name_update').val()
        let surname_update = $('#fsurname_update').val()
        let mobile_update = $('#fmobile_update').val()
        let email_update = $('#femail_update').val()
        let address1_home_update = $('#faddress1_home_update').val()
        let address2_home_update = $('#faddress2_home_update').val()
        let town_home_update = $('#ftown_home_update').val()
        let city_home_update = $('#fcity_home_update').val()
        let eircode_home_update = $('#feircode_home_update').val()
        let address1_shipping_update = $('#faddress1_shipping_update').val()
        let address2_shipping_update = $('#faddress2_shipping_update').val()
        let town_shipping_update = $('#ftown_shipping_update').val()
        let city_shipping_update = $('#fcity_shipping_update').val()
        let eircode_shipping_update = $('#feircode_shipping_update').val()

        let data_update = {
            "id": user_id,
            "title": title_update,
            "mobile": mobile_update,
            "email": email_update,
            "home_address_1": address1_home_update,
            "home_address_2": address2_home_update,
            "home_town": town_home_update,
            "home_city": city_home_update,
            "home_eircode": eircode_home_update,
            "shipping_address_1": address1_shipping_update,
            "shipping_address_2": address2_shipping_update,
            "shipping_town": town_shipping_update,
            "shipping_city": city_shipping_update,
            "shipping_eircode": eircode_shipping_update
        }

        // update database
        const the_url = 'http://localhost:8000/api/users/user/';
        $.ajax({
            url: the_url + user_id,
            type: 'PUT',
            data: JSON.stringify(data_update),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {

            let notification_error_update = $('.notification_error_update')[0]
            // handle error message from database
            if (response.includes("Duplicate")) {
                notification_error_update.style.display = 'block';
                notification_error_update.innerHTML = response + '.<br><br>' + 'Please insert different one.'

                // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
                if (clear_error_update) {
                    clearTimeout(clear_error_update);
                }
                
                // after 5 sec notification error is hidden
                clear_error_update = setTimeout(() => {
                    notification_error_update.innerHTML = '';
                    notification_error_update.style.display = 'none';
                }, "5000");
            }
            else {
                // handle success
                
                // if user gets error message and then corrects input field within 5 sec and it is successfully inserted into database
                // -> it is necessary to clear the error message
                notification_error_update.innerHTML = '';
                notification_error_update.style.display = 'none';

                // inform user about updated user successfully
                $('#form_update_user')[0].reset();
                let notification_success_update = $('.notification_success_update')[0]
                notification_success_update.style.display = 'block';
                notification_success_update.innerHTML = first_name_update + ' ' + surname_update + ' has just been updated.'
                let div_form_update = $('.div_form_update')[0];
                div_form_update.style.display = 'none'

                // after 5 sec notification success is hidden
                setTimeout(() =>{
                    notification_success_update.innerHTML = '';
                    notification_success_update.style.display = 'none';
                }, "5000");

                // set empty in search bar and options
                $('#options').html('')
                $('#search').val('')

                // after updating user in database -> update the user database state in html
                // so that the user can see the up-to-date database even without refreshing page
                loadUsers()
            }
        })
    })
}
// Browser: Chrome
// Operating System: macOS
// Browser version: Version 122.0.6261.129 (Official Build) (arm64)

// keep track if user wants to add new item for his/her order
let counter_items = 0;

$(document).ready( () => {

    loadOrders();


    // handle search order by order ID logic
    $('#search_order').keyup(() => {
        let input = $('#search_order').val();
        let first_name;
        let surname;
        let mobile;
        let manufacturer;
        let model;
        let price;
        let result_items;
        if(input == '') {
            $('#options_order').html('')
            $('#options_order_items').html('')
        }
        else {
            $('#options_order').html('')
            $('#options_order_items').html('')
            // get particular customers from database and update html
            $.get('http://localhost:8000/api/orders/order/' + input, (data_order) => {

                // get all data related to customer_id
                $.get('http://localhost:8000/api/customers/customer/' + data_order.customer_id, (data) => {
            
                    first_name = data.first_name
                    surname = data.surname
                    mobile = data.mobile

                    let result_customer = `
                    <tr>
                        <th>First Name</th><th>Surname</th><th>Mobile</th>
                    </tr>
                    <tr>
                        <td class="options_row_long">${first_name}</td><td class="options_row_long">${surname}</td><td class="options_row_long">${mobile}</td>
                        <td><button onclick="updateOrder('${input}')" class="btn_update_order">Update</button></td>
                        <td><button onclick="deleteTheOrder('${input}')" class="btn_delete">Delete</button></td>
                    </tr>
                    `
                
                    $('#options_order').html(result_customer)

                    let result_items_headers = 
                    `
                    <tr>
                        <th>Manufacturer</th><th>Model</th><th>Price</th><th>Quantity</th>
                    </tr>
                    `

                    $('#options_order_items').html(result_items_headers)

                    for(let j = 0; j < data_order.bought_items.length; j++) {
                        // get all data related to item_id
                        $.get('http://localhost:8000/api/items/item/' + data_order.bought_items[j].item_id, (data_item) => {
                    
                            manufacturer = data_item.manufacturer
                            model = data_item.model
                            price = data_item.price


                            result_items = `
                                    <tr>
                                        <td class="options_row_long">${manufacturer}</td><td class="options_row_long">${model}</td><td class="options_row_long">${price}</td><td class="options_row_middle">${data_order.bought_items[j].quantity}</td>
                                    </tr>
                                `
                            $('#options_order_items').append(result_items)
                        })
                    }
                })
            })
        }
    })


    // handle search customer by surname logic
    $('#search_customer').keyup(() => {
        let input = $('#search_customer').val();
        if(input == '') {
            $('#options_customer').html('')
        }
        else {
            // get particular customers from database based on surname and update html
            $.get('http://localhost:8000/api/customers/' + input, (data) => {
                let result = data.map(row => {
                    return (`
                        <tr>
                            <th>User ID</th>
                        </tr>
                        <tr>
                            <td>${row.id}</td>
                        </tr>
                        <tr>
                            <td>${row.title === null ? "" : row.title}</td><td>${row.first_name}</td><td>${row.surname}</td><td>${row.mobile}</td><td>${row.email}</td>
                            <td><button onclick="updateCustomer('${row.id}')" class="btn_update_customer">Update</button></td>
                            <td><button onclick="deleteTheCustomer('${row.id}', '${row.first_name}', '${row.surname}')" class="btn_delete">Delete</button></td>
                        </tr>

                        <tr>
                            <th>Home Address Line 1</th><th>Home Address Line 2</th><th>Home Town</th><th>Home City</th><th>Home Eircode</th>
                        </tr>

                        <tr>
                            <td>${row.home_address.home_address_line_1}</td><td>${row.home_address.home_address_line_2 === null ? "" : row.home_address.home_address_line_2}</td><td>${row.home_address.home_town}</td><td>${row.home_address.home_city}</td><td>${row.home_address.home_eircode === null ? "" : row.home_address.home_eircode}</td>
                        </tr>

                        <tr>
                            <th>Shipping Address Line 1</th><th>Shipping Address Line 2</th><th>Shipping Town</th><th>Shipping City</th><th>Shipping Eircode</th>
                        </tr>

                        <tr>
                            <td>${row.shipping_address.shipping_address_line_1}</td><td>${row.shipping_address.shipping_address_line_2 === null ? "" : row.shipping_address.shipping_address_line_2}</td><td>${row.shipping_address.shipping_town}</td><td>${row.shipping_address.shipping_city}</td><td>${row.shipping_address.shipping_eircode === null ? "" : row.shipping_address.shipping_eircode}</td>
                        </tr>

                        <tr class="blank_row"></tr>
                        `)
                })
                $('#options_customer').html(result)
            })
        }
    })



    // handle search item by model logic
    $('#search_item').keyup(() => {
        let input = $('#search_item').val();
        if(input == '') {
            $('#options_item').html('')
        }
        else {
            // get particular items from database based on model and update html
            $.get('http://localhost:8000/api/items/' + input, (data) => {
                let result = data.map(row => {
                    return (`
                        <tr>
                            <th>Item ID</th>
                        </tr>
                        <tr>
                            <td>${row.id}</td>
                        </tr>
                        <tr>
                            <th>Manufacturer</th><th>Model</th><th>Price</th>
                        </tr>

                        <tr>
                            <td>${row.manufacturer}</td><td>${row.model}</td><td>${row.price}</td>
                            <td><button onclick="updateItem('${row.id}')" class="btn_update_item">Update</button></td>
                            <td><button onclick="deleteTheItem('${row.id}', '${row.manufacturer}', '${row.model}')" class="btn_delete">Delete</button></td>
                        </tr>

                        `)
                })
                $('#options_item').html(result)
            })
        }
    })

    // handle to add order logic
    $('.btn_add_new_order').click(() => {
        let btn_add_new_order = $('.btn_add_new_order')[0]
        btn_add_new_order.style.display = 'none'
        let div_form_order = $('.div_form_order')[0];
        div_form_order.style.display = 'block'
        $('.btn_cancel_order').click(() => {
            div_form_order.style.display = 'none'
            btn_add_new_order.style.display = 'block'
        })
        
    })

    $('#users_add').html('')
    $('#item_cluster').html('')


    // get all users and append to users selection in form for adding new order
    $.get('http://localhost:8000/api/customers', (data) => {

        let each_user;

        let each_user_start = 
        ` <select name="order_users_selection" id="order_users_selection"> `

        let each_user_end = 
        ` </select><br><br> `

        for(let a = 0; a < data.length; a++) {
            each_user +=
                ` <option value="${data[a].id}">${data[a].first_name} ${data[a].surname} ${data[a].email}</option> `
        }

        let all_in_one_users = each_user_start + each_user + each_user_end

        $('#users_add').append(all_in_one_users)
    })


    // get all items and append to items selection in form for adding new order
    $.get('http://localhost:8000/api/items', (data) => {

        let each_item;

        let each_item_start = 
        ` <select name="order_items_selection" id="order_items_selection_${counter_items}"> `
        let each_item_end = 
        ` </select><br><br> `

        for(let a = 0; a < data.length; a++) {

            each_item +=
                ` <option value="${data[a].id}">${data[a].model}</option> `

        }

        let all_in_one_quantity = 
        `
            <div>Quantity</div>
            <input type="number" id="order_fquantity_add_${counter_items}" required><br><br>
        `

        let add_item_button =
        ` <div><button type="button" class="add_item_button" onclick="addItemCluster()">Add Item</button></div> `        

        $('#add_item_button').append(add_item_button)

        let all_in_one_items = each_item_start + each_item + each_item_end

        let all_in_one = all_in_one_items + all_in_one_quantity

        $('#item_cluster').append(all_in_one)
    })


    // get values from form add new customer
    $('#form_add_new_order').submit((event) => {
        event.preventDefault();

        let bought_items = [];
        // iterate over entire items in order
        for(let b = 0; b <= counter_items; b++) {
            let order_item_id = $(`#order_items_selection_${b}`).find(':selected','selected').val();
            let order_quantity = $(`#order_fquantity_add_${b}`).val();
            bought_items.push({
                "item_id": order_item_id,
                "quantity": order_quantity
            })
        }

        let order_user_id = $('#order_users_selection').find(':selected','selected').val();

        let data_post_order = {
            "customer_id": order_user_id,
            "bought_items": bought_items
        }

        let notification_error_order = $('.notification_error_order')[0]

        let clear_error_order = null;

        // update database and html
        const the_url = 'http://localhost:8000/api/orders';
        $.ajax({
            url: the_url,
            type: 'POST',
            data: JSON.stringify(data_post_order),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
                // handle success
                // if customer gets error message and then corrects input field within 5 sec and it is successfully inserted into database
                // -> it is necessary to clear the error message
                notification_error_order.innerHTML = '';
                notification_error_order.style.display = 'none';

                // inform customer about updated customer successfully
                $('#form_add_new_order').trigger("reset");
                let notification_success_order = $('.notification_success_order')[0]
                notification_success_order.style.display = 'block';
                notification_success_order.innerHTML = 'New order ' + response.id + ' has just been created.'
                let div_form_order = $('.div_form_order')[0];
                div_form_order.style.display = 'none'

                let btn_add_new_order = $('.btn_add_new_order')[0]
                btn_add_new_order.style.display = 'block'

                // after 5 sec notification success is hidden
                setTimeout(() =>{
                    notification_success_order.innerHTML = '';
                    notification_success_order.style.display = 'none';
                }, "5000");

                // set empty in search bar and options
                $('#options_order').html('')
                $('#options_order_items').html('')
                $('#search_order').val('')

                loadOrders()
        }).fail((error) => {

            notification_error_order.style.display = 'block';
            notification_error_order.innerHTML = error.responseText + '.<br><br>' + 'Please insert different one.'

            // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
            if (clear_error_order) {
                clearTimeout(clear_error_order);
            }
            
            // after 5 sec notification error is hidden
            clear_error_order = setTimeout(() => {
                notification_error_order.innerHTML = '';
                notification_error_order.style.display = 'none';
            }, "5000");
        })
    })



    // handle to add item logic
    $('.btn_add_new_item').click(() => {
        let btn_add_new_item = $('.btn_add_new_item')[0]
        btn_add_new_item.style.display = 'none'
        let div_form_item = $('.div_form_item')[0];
        div_form_item.style.display = 'block'
        $('.btn_cancel_item').click(() => {
            div_form_item.style.display = 'none'
            btn_add_new_item.style.display = 'block'
        })
    })

    // declare and initial variable for timeout logic
    let clear_error_item = null;

    // get values from form add new item
    $('#form_add_new_item').submit((event) => {
        event.preventDefault();

        let manufacturer = $('#item_fmanufacturer').val()
        let model = $('#item_fmodel').val()
        let price = $('#item_fprice').val()

        let data_post_item = {
            "manufacturer": manufacturer,
            "model": model,
            "price": price
        }

        let notification_error_item = $('.notification_error_item')[0]

        // post into database and update html
        const the_url = 'http://localhost:8000/api/items';
        $.post({
            url: the_url,
            data: JSON.stringify(data_post_item),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
            
            // if user gets error message and then corrects input field within 5 sec and it is successfully inserted into database
            // -> it is necessary to clear the error message
            notification_error_item.innerHTML = '';
            notification_error_item.style.display = 'none';

            // inform user about updated customer successfully
            $('#form_add_new_item').trigger("reset");
            let notification_success_item = $('.notification_success_item')[0]
            notification_success_item.style.display = 'block';
            notification_success_item.innerHTML = manufacturer + ' ' + model + ' has just been added.'
            let div_form_item = $('.div_form_item')[0];
            div_form_item.style.display = 'none'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_item.innerHTML = '';
                notification_success_item.style.display = 'none';
            }, "5000");

            let btn_add_new_item = $('.btn_add_new_item')[0]
            btn_add_new_item.style.display = 'block'

        })
        .fail((error) => {

            notification_error_item.style.display = 'block';
            notification_error_item.innerHTML = error.responseJSON.item_message + '.<br><br>' + 'Please insert different one.'

            // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
            if (clear_error_item) {
                clearTimeout(clear_error_item);
            }
            
            // after 5 sec notification error is hidden
            clear_error_item = setTimeout(() => {
                notification_error_item.innerHTML = '';
                notification_error_item.style.display = 'none';
            }, "5000");
          })
    })


    

    // handle to add customer logic
    $('.btn_add_new_customer').click(() => {
        let btn_add_new_customer = $('.btn_add_new_customer')[0]
        btn_add_new_customer.style.display = 'none'
        let div_form_customer = $('.div_form_customer')[0];
        div_form_customer.style.display = 'block'
        $('.btn_cancel_customer').click(() => {
            div_form_customer.style.display = 'none'
            btn_add_new_customer.style.display = 'block'
        })
    })

    // declare and initial variable for timeout logic
    let clear_error_customer = null;

    // get values from form add new customer
    $('#form_add_new_customer').submit((event) => {
        event.preventDefault();

        let title = $('#customer_ftitle').val()
        let first_name = $('#customer_ffirst_name').val()
        let surname = $('#customer_fsurname').val()
        let mobile = $('#customer_fmobile').val()
        let email = $('#customer_femail').val()
        let address1_home = $('#customer_faddress1_home').val()
        let address2_home = $('#customer_faddress2_home').val()
        let town_home = $('#customer_ftown_home').val()
        let city_home = $('#customer_fcity_home').val()
        let eircode_home = $('#customer_feircode_home').val()
        let address1_shipping = $('#customer_faddress1_shipping').val()
        let address2_shipping = $('#customer_faddress2_shipping').val()
        let town_shipping = $('#customer_ftown_shipping').val()
        let city_shipping = $('#customer_fcity_shipping').val()
        let eircode_shipping = $('#customer_feircode_shipping').val()

        let data_post_customer = {
            "title": title,
            "first_name": first_name,
            "surname": surname,
            "mobile": mobile,
            "email": email,
            "home_address": {
                "home_address_line_1": address1_home,
                "home_address_line_2": address2_home,
                "home_town": town_home,
                "home_city": city_home,
                "home_eircode": eircode_home
            },
            "shipping_address": {
                "shipping_address_line_1": address1_shipping,
                "shipping_address_line_2": address2_shipping,
                "shipping_town": town_shipping,
                "shipping_city": city_shipping,
                "shipping_eircode": eircode_shipping
            }
        }

        let notification_error_customer = $('.notification_error_customer')[0]

        // post into database
        const the_url = 'http://localhost:8000/api/customers';
        $.post({
            url: the_url,
            data: JSON.stringify(data_post_customer),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
            // if user gets error message and then corrects input field within 5 sec and it is successfully inserted into database
            // -> it is necessary to clear the error message
            notification_error_customer.innerHTML = '';
            notification_error_customer.style.display = 'none';

            // inform user about updated customer successfully
            $('#form_add_new_customer').trigger("reset");
            let notification_success_customer = $('.notification_success_customer')[0]
            notification_success_customer.style.display = 'block';
            notification_success_customer.innerHTML = first_name + ' ' + surname + ' has just been added.'
            let div_form_customer = $('.div_form_customer')[0];
            div_form_customer.style.display = 'none'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_customer.innerHTML = '';
                notification_success_customer.style.display = 'none';
            }, "5000");

            let btn_add_new_customer = $('.btn_add_new_customer')[0]
            btn_add_new_customer.style.display = 'block'

        })
        .fail((error) => {

            notification_error_customer.style.display = 'block';
            notification_error_customer.innerHTML = error.responseJSON.customer_message + '.<br><br>' + 'Please insert different one.'

            // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
            if (clear_error_customer) {
                clearTimeout(clear_error_customer);
            }
            
            // after 5 sec notification error is hidden
            clear_error_customer = setTimeout(() => {
                notification_error_customer.innerHTML = '';
                notification_error_customer.style.display = 'none';
            }, "5000");
          })
    })

})



function addItemCluster() {

        // when user want to buy another item
        counter_items++;

        // get all users and update html
        $.get('http://localhost:8000/api/items', (data) => {
            
            let each_item;

            let each_item_start = 
            ` <select name="order_items_selection" id="order_items_selection_${counter_items}"> `
            let each_item_end = 
            ` </select><br><br> `

            for(let a = 0; a < data.length; a++) {
                each_item +=
                    ` <option value="${data[a].id}">${data[a].model}</option> `

            }

            let all_in_one_quantity = 
            `
                <div>Quantity</div>
                <input type="number" id="order_fquantity_add_${counter_items}" required><br><br>
            `

            let all_in_one_items = each_item_start + each_item + each_item_end

            let all_in_one = all_in_one_items +  all_in_one_quantity

            $('#item_cluster').append(all_in_one)
        })
}



// handle delete customer when delete btn is clicked
function deleteTheCustomer(customer_id, customer_first_name, customer_surname) {

    if (window.confirm(`Do you want to delete ${customer_first_name} ${customer_surname}?`)) {

        // update database
        const the_url = 'http://localhost:8000/api/customers/customer/' + customer_id;
        $.ajax({
            url: the_url,
            type: 'DELETE',
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
            // if update form is shown -> hide it
            let div_form_update_customer = $('.div_form_update_customer')[0];
            div_form_update_customer.style.display = 'none'
            
            // inform user about deleted customer successfully
            let notification_success_delete_customer = $('.notification_success_delete_customer')[0]
            notification_success_delete_customer.style.display = 'block';
            notification_success_delete_customer.innerHTML = customer_first_name + ' ' + customer_surname + ' has just been deleted.'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_delete_customer.innerHTML = '';
                notification_success_delete_customer.style.display = 'none';
            }, "5000");

            // set empty in search bar and options
            $('#options_customer').html('')
            $('#search_customer').val('')
        })
    }
}



// handle delete item when delete btn is clicked
function deleteTheItem(item_id, item_manufacturer, item_model) {

    if (window.confirm(`Do you want to delete ${item_manufacturer} ${item_model}?`)) {

        // update database and html
        const the_url = 'http://localhost:8000/api/items/item/' + item_id;
        $.ajax({
            url: the_url,
            type: 'DELETE',
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
            // if update form is shown -> hide it
            let div_form_update_item = $('.div_form_update_item')[0];
            div_form_update_item.style.display = 'none'
            
            // inform user about deleted customer successfully
            let notification_success_delete_item = $('.notification_success_delete_item')[0]
            notification_success_delete_item.style.display = 'block';
            notification_success_delete_item.innerHTML = item_manufacturer + ' ' + item_model + ' has just been deleted.'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_delete_item.innerHTML = '';
                notification_success_delete_item.style.display = 'none';
            }, "5000");

            // set empty in search bar and options
            $('#options_item').html('')
            $('#search_item').val('')
        })
    }
}



// handle delete order when delete btn is clicked
function deleteTheOrder(order_id) {

    if (window.confirm(`Do you want to delete ${order_id}?`)) {

        // update database and update html
        const the_url = 'http://localhost:8000/api/orders/order/' + order_id;
        $.ajax({
            url: the_url,
            type: 'DELETE',
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {

            loadOrders();

            // if update form is shown -> hide it
            let div_form_update_order = $('.div_form_update_order')[0];
            div_form_update_order.style.display = 'none'
            
            // inform user about deleted order successfully
            let notification_success_delete_order = $('.notification_success_delete_order')[0]
            notification_success_delete_order.style.display = 'block';
            notification_success_delete_order.innerHTML = order_id + ' has just been deleted.'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_delete_order.innerHTML = '';
                notification_success_delete_order.style.display = 'none';
            }, "5000");

            // set empty in search bar and options
            $('#options_order').html('')
            $('#options_order_items').html('')
            $('#search_order').val('')
        })
    }
}



// handle update customer when update btn is clicked
function updateOrder(order_id) {
    // show update form
    let div_form_update_order = $('.div_form_update_order')[0];
    div_form_update_order.style.display = 'block'

    $('#bought_items_update').html('')

    let data_bought_items_length;
    // get all data related for order_id
    $.get('http://localhost:8000/api/orders/order/' + order_id, (data) => {
 
            let customer_id = data.customer_id

            // pre-fill the form for update with data from database
            $('#order_fcustoemer_id_update').val(customer_id)

            data_bought_items_length = data.bought_items.length
                for(let j = 0; j < data_bought_items_length; j++) {
                    // get all data related to item_id and pre-fill the update form for order
                    $.get('http://localhost:8000/api/items/item/' + data.bought_items[j].item_id, (data_item) => {
                
                        let item_to_update = 
                            `
                            <label for="order_fitem_id_update_${j}">Item ID<span>&#42;</span>:</label><br>
                            <input type="text" id="order_fitem_id_update_${j}" name="order_fitem_id_update_${j}" value="${data_item.id}" disabled required><br><br>
                        
                            <label for="order_fmodel_update_${j}">Model<span>&#42;</span>:</label><br>
                            <input type="text" id="order_fmodel_update_${j}" name="order_fmodel_update_${j}" value="${data_item.model}" disabled required><br><br>

                            <label for="order_fquantity_update_${j}">Quantity<span>&#42;</span>:</label><br>
                            <input type="number" id="order_fquantity_update_${j}" name="order_fquantity_update_${j}" value"${data.bought_items[j].quantity}" required><br><br>
                            `

                        $('#bought_items_update').append(item_to_update)
                    })
                }
    })

    
    // hide update form
    $('.btn_cancel_update_order').click(() => {
        div_form_update_order.style.display = 'none'
    })

    // declare and initial variable for timeout logic
    let clear_error_update_order = null;

    // get values from form update order
    $('#form_update_order').submit((event) => {
        event.preventDefault();

        let bought_items_to_update = [];

        for(let j = 0; j < data_bought_items_length; j++) {
            let item_id_to_update = $(`#order_fitem_id_update_${j}`).val()
            let quantity = $(`#order_fquantity_update_${j}`).val()
            bought_items_to_update.push({
                "item_id": item_id_to_update,
                "quantity": quantity
            })
        }

        let customer_id = $('#order_fcustoemer_id_update').val()

        let data_update_order = {
            "customer_id": customer_id,
            "bought_items": bought_items_to_update
        }        

        let notification_error_update_order = $('.notification_error_update_order')[0]

        // update database and html
        const the_url = 'http://localhost:8000/api/orders/order/' + order_id;
        $.ajax({
            url: the_url,
            type: 'PUT',
            data: JSON.stringify(data_update_order),
            contentType: 'application/json; charset=utf-8'
        }).done( (response) => {
                // handle success
                // if customer gets error message and then corrects input field within 5 sec and it is successfully inserted into database
                // -> it is necessary to clear the error message
                notification_error_update_order.innerHTML = '';
                notification_error_update_order.style.display = 'none';

                // inform customer about updated customer successfully
                $('#form_update_order').trigger("reset");
                let notification_success_update_order = $('.notification_success_update_order')[0]
                notification_success_update_order.style.display = 'block';
                notification_success_update_order.innerHTML = order_id + ' has just been updated.'
                let div_form_update_order = $('.div_form_update_order')[0];
                div_form_update_order.style.display = 'none'

                // after 5 sec notification success is hidden
                setTimeout(() =>{
                    notification_success_update_order.innerHTML = '';
                    notification_success_update_order.style.display = 'none';
                }, "5000");

                // set empty in search bar and options
                $('#options_order').html('')
                $('#options_order_items').html('')
                $('#search_order').val('')

                loadOrders();

        }).fail((error) => {

            notification_error_update_order.style.display = 'block';
            notification_error_update_order.innerHTML = error.responseJSON.order_message + '.<br><br>' + 'Please insert different one.'

            // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
            if (clear_error_update_order) {
                clearTimeout(clear_error_update_order);
            }
            
            // after 5 sec notification error is hidden
            clear_error_update_order = setTimeout(() => {
                notification_error_update_order.innerHTML = '';
                notification_error_update_order.style.display = 'none';
            }, "5000");
          })
    })
}




// handle update item when update btn is clicked
function updateItem(item_id) {
    // show update form
    let div_form_update_item = $('.div_form_update_item')[0];
    div_form_update_item.style.display = 'block'

    // get all data related to item id
    $.get('http://localhost:8000/api/items/item/' + item_id, (data) => {
 
            let manufacturer = data.manufacturer
            let model = data.model
            let price = data.price

            // pre-fill the form for update with data from database
            $('#item_fmanufacturer_update').val(manufacturer)
            $('#item_fmodel_update').val(model)
            $('#item_fprice_update').val(price)
    })

    // hide update form
    $('.btn_cancel_update_item').click(() => {
        div_form_update_item.style.display = 'none'
    })

    // declare and initial variable for timeout logic
    let clear_error_update_item = null;
    let clear_notification_update_item = null;

    // get values from form update customer
    $('#form_update_item').submit((event) => {
        event.preventDefault();

        let manufacturer_update = $('#item_fmanufacturer_update').val()
        let model_update = $('#item_fmodel_update').val()
        let price_update = $('#item_fprice_update').val()

        let data_update_item = {
            "manufacturer": manufacturer_update ,
            "model": model_update,
            "price": price_update,
        }

    let notification_error_update_item = $('.notification_error_update_item')[0]

    // update database
    const the_url = 'http://localhost:8000/api/items/item/' + item_id;
    $.ajax({
        url: the_url,
        type: 'PUT',
        data: JSON.stringify(data_update_item),
        contentType: 'application/json; charset=utf-8'
    }).done( (response) => {
            // handle success
            // if customer gets error message and then corrects input field within 5 sec and it is successfully inserted into database
            // -> it is necessary to clear the error message
            notification_error_update_item.innerHTML = '';
            notification_error_update_item.style.display = 'none';

            // inform customer about updated customer successfully
            $('#form_update_item').trigger("reset");
            let notification_success_update_item = $('.notification_success_update_item')[0]
            notification_success_update_item.style.display = 'block';
            notification_success_update_item.innerHTML = manufacturer_update + ' ' + model_update + ' has just been updated.'
            let div_form_update_item = $('.div_form_update_item')[0];
            div_form_update_item.style.display = 'none'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_update_item.innerHTML = '';
                notification_success_update_item.style.display = 'none';
            }, "5000");

            // set empty in search bar and options
            $('#options_item').html('')
            $('#search_item').val('')
    }).fail((error) => {

        notification_error_update_item.style.display = 'block';
        notification_error_update_item.innerHTML = error.responseJSON.item_message + '.<br><br>' + 'Please insert different one.'

        // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
        if (clear_error_update_item) {
            clearTimeout(clear_error_update_item);
        }
        
        // after 5 sec notification error is hidden
        clear_error_update_item = setTimeout(() => {
            notification_error_update_item.innerHTML = '';
            notification_error_update_item.style.display = 'none';
        }, "5000");
        })
    })
}



// handle update customer when update btn is clicked
function updateCustomer(customer_id) {
    // show update form
    let div_form_update_customer = $('.div_form_update_customer')[0];
    div_form_update_customer.style.display = 'block'

    // get all data related to customer_id
    $.get('http://localhost:8000/api/customers/customer/' + customer_id, (data) => {
 
            let title_update = data.title
            let first_name_update = data.first_name
            let surname_update = data.surname
            let mobile_update = data.mobile
            let email_update = data.email
            let home_address_line_1_update = data.home_address.home_address_line_1
            let home_address_line_2_update = data.home_address.home_address_line_2
            let home_town_update = data.home_address.home_town
            let home_city_update = data.home_address.home_city
            let home_eircode_update = data.home_address.home_eircode
            let shipping_address_line_1_update = data.shipping_address.shipping_address_line_1
            let shipping_address_line_2_update = data.shipping_address.shipping_address_line_2
            let shipping_town_update = data.shipping_address.shipping_town
            let shipping_city_update = data.shipping_address.shipping_city
            let shipping_eircode_update = data.shipping_address.shipping_eircode

            // pre-fill the form for update with data from database
            $('#customer_ftitle_update').val(title_update).attr('selected','selected')
            $('#customer_ffirst_name_update').val(first_name_update)
            $('#customer_fsurname_update').val(surname_update)
            $('#customer_fmobile_update').val(mobile_update)
            $('#customer_femail_update').val(email_update)
            $('#customer_faddress1_home_update').val(home_address_line_1_update)
            $('#customer_faddress2_home_update').val(home_address_line_2_update)
            $('#customer_ftown_home_update').val(home_town_update)
            $('#customer_fcity_home_update').val(home_city_update)           
            $('#customer_feircode_home_update').val(home_eircode_update)
            $('#customer_faddress1_shipping_update').val(shipping_address_line_1_update)
            $('#customer_faddress2_shipping_update').val(shipping_address_line_2_update)
            $('#customer_ftown_shipping_update').val(shipping_town_update)
            $('#customer_fcity_shipping_update').val(shipping_city_update)
            $('#customer_feircode_shipping_update').val(shipping_eircode_update)
    })

    // hide update form
    $('.btn_cancel_update_customer').click(() => {
        div_form_update_customer.style.display = 'none'
    })

    // declare and initial variable for timeout logic
    let clear_error_update_customer = null;
    let clear_notification_update_customer = null;

    // get values from form update customer
    $('#form_update_customer').submit((event) => {
        event.preventDefault();

        let title_update = $('#customer_ftitle_update').val()
        let first_name_update = $('#customer_ffirst_name_update').val()
        let surname_update = $('#customer_fsurname_update').val()
        let mobile_update = $('#customer_fmobile_update').val()
        let email_update = $('#customer_femail_update').val()
        let address1_home_update = $('#customer_faddress1_home_update').val()
        let address2_home_update = $('#customer_faddress2_home_update').val()
        let town_home_update = $('#customer_ftown_home_update').val()
        let city_home_update = $('#customer_fcity_home_update').val()
        let eircode_home_update = $('#customer_feircode_home_update').val()
        let address1_shipping_update = $('#customer_faddress1_shipping_update').val()
        let address2_shipping_update = $('#customer_faddress2_shipping_update').val()
        let town_shipping_update = $('#customer_ftown_shipping_update').val()
        let city_shipping_update = $('#customer_fcity_shipping_update').val()
        let eircode_shipping_update = $('#customer_feircode_shipping_update').val()

        let data_update_customer = {
            "title": title_update ,
            "first_name": first_name_update,
            "surname": surname_update,
            "mobile": mobile_update,
            "email": email_update,
            "home_address": {
                "home_address_line_1": address1_home_update,
                "home_address_line_2": address2_home_update,
                "home_town": town_home_update,
                "home_city": city_home_update,
                "home_eircode": eircode_home_update
            },
            "shipping_address": {
                "shipping_address_line_1": address1_shipping_update,
                "shipping_address_line_2": address2_shipping_update,
                "shipping_town": town_shipping_update,
                "shipping_city": city_shipping_update,
                "shipping_eircode": eircode_shipping_update
            }
        }

    let notification_error_update_customer = $('.notification_error_update_customer')[0]

    // update database
    const the_url = 'http://localhost:8000/api/customers/customer/' + customer_id;
    $.ajax({
        url: the_url,
        type: 'PUT',
        data: JSON.stringify(data_update_customer),
        contentType: 'application/json; charset=utf-8'
    }).done( (response) => {
            // handle success
            // if customer gets error message and then corrects input field within 5 sec and it is successfully inserted into database
            // -> it is necessary to clear the error message
            notification_error_update_customer.innerHTML = '';
            notification_error_update_customer.style.display = 'none';

            // inform customer about updated customer successfully
            $('#form_update_customer').trigger("reset");
            let notification_success_update_customer = $('.notification_success_update_customer')[0]
            notification_success_update_customer.style.display = 'block';
            notification_success_update_customer.innerHTML = first_name_update + ' ' + surname_update + ' has just been updated.'
            let div_form_update_customer = $('.div_form_update_customer')[0];
            div_form_update_customer.style.display = 'none'

            // after 5 sec notification success is hidden
            setTimeout(() =>{
                notification_success_update_customer.innerHTML = '';
                notification_success_update_customer.style.display = 'none';
            }, "5000");

            // set empty in search bar and options
            $('#options_customer').html('')
            $('#search_customer').val('')
    }).fail((error) => {

        notification_error_update_customer.style.display = 'block';
        notification_error_update_customer.innerHTML = error.responseJSON.customer_message + '.<br><br>' + 'Please insert different one.'

        // if user clicks 2x within 5 sec -> necessary to restart the timeout so that the second message is also seen for 5 sec
        if (clear_error_update_customer) {
            clearTimeout(clear_error_update_customer);
        }
        
        // after 5 sec notification error is hidden
        clear_error_update_customer = setTimeout(() => {
            notification_error_update_customer.innerHTML = '';
            notification_error_update_customer.style.display = 'none';
        }, "5000");
        })
    })
}



// get data from database and update html
function loadOrders() {
    $.get('http://localhost:8000/api/orders', (data) => {
        let theaders;
        let tbody;
        for(let i = 0; i < data.length; i++) {
            // get all data related to customer_id
            theaders = '<tr><th>Order ID</th><th>Created</th><th>Updated</th></tr>'
            tbody = tbody + '<tr><td>'+ data[i].id +'</td><td>'+ data[i].createdAt +'</td><td>'+ data[i].updatedAt +'</td></tr>'
        }
        $(".theaders").html(theaders)
        $(".tbody").html(tbody)
    })
}
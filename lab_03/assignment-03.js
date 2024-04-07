// Browser: Chrome
// Operating System: macOS
// Browser version: Version 122.0.6261.129 (Official Build) (arm64)

document.addEventListener('DOMContentLoaded', function() {

    // models
    let headers = {
        StudentName: "Student Name",
        StudentID: "Student ID",
        1: "Assignment 1",
        2: "Assignment 2",
        3: "Assignment 3",
        4: "Assignment 4",
        5: "Assignment 5",
        average_header: "Average[%]"
    }
    let students = [
        {
            StudentName: "Peter Smith",
            StudentID: 1,
            assignment_1: "",
            assignment_2: "",
            assignment_3: "",
            assignment_4: "",
            assignment_5: "",
            average: 0,
        },
        {
            StudentName: "Martin Conor",
            StudentID: 2,
            assignment_1: "",
            assignment_2: "",
            assignment_3: "",
            assignment_4: "",
            assignment_5: "",
            average: 0,
        },
        {
            StudentName: "Pedro Mancha",
            StudentID: 3,
            assignment_1: "",
            assignment_2: "",
            assignment_3: "",
            assignment_4: "",
            assignment_5: "",
            average: 0,
        },
        {
            StudentName: "Christian Janu",
            StudentID: 4,
            assignment_1: "",
            assignment_2: "",
            assignment_3: "",
            assignment_4: "",
            assignment_5: "",
            average: 0,
        },
        {
            StudentName: "Martin Suchy",
            StudentID: 5,
            assignment_1: "",
            assignment_2: "",
            assignment_3: "",
            assignment_4: "",
            assignment_5: "",
            average: 0,
        },
        {
            StudentName: "Jana Prava",
            StudentID: 6,
            assignment_1: "",
            assignment_2: "",
            assignment_3: "",
            assignment_4: "",
            assignment_5: "",
            average: 0,
        },
        {
            StudentName: "Petra Smutna",
            StudentID: 7,
            assignment_1: "",
            assignment_2: "",
            assignment_3: "",
            assignment_4: "",
            assignment_5: "",
            average: 0,
        },
        {
            StudentName: "Josef Tuma",
            StudentID: 8,
            assignment_1: "",
            assignment_2: "",
            assignment_3: "",
            assignment_4: "",
            assignment_5: "",
            average: 0,
        },
        {
            StudentName: "Cristiana Veselov",
            StudentID: 9,
            assignment_1: "",
            assignment_2: "",
            assignment_3: "",
            assignment_4: "",
            assignment_5: "",
            average: 0,
        },
        {
            StudentName: "Lucka Prava",
            StudentID: 10,
            assignment_1: "",
            assignment_2: "",
            assignment_3: "",
            assignment_4: "",
            assignment_5: "",
            average: 0,
        }
    ]

    // initialize data
    // load body table dynamically from nested javascript objects headers after refreshing
    loadTable(headers, students);

    // view
    function loadTable(headers_input, students_input) {
        document.querySelector('.theaders').innerHTML = ""

        let tr = '<tr>' + '<th class="header_center_aligned">' + headers_input.StudentName + '</th>'
        + '<th class="header_center_aligned">'+ headers_input.StudentID + '</th>'
        for(let i = 0; i < get_number_assignments(headers_input); i++) {
            tr = tr + '<th class="header_center_aligned">' + headers_input[i+1] + '</th>'
        }
        tr = tr + '<th class="header_center_aligned final_grade">' + headers_input.average_header + '</th>' + '</tr>';
        document.querySelector('.theaders').innerHTML = tr

        document.querySelector('.tbody').innerHTML = "";
        for(let i = 0; i < students_input.length; i++) {
            let tr = '<tr>'
            tr += '<td class="left_aligned_column">' + students_input[i].StudentName + '</td>'
            + '<td class="left_aligned_column">'+ students_input[i].StudentID + '</td>'
            for(let j = 0; j < get_number_assignments(headers_input); j++) {
                let assig = j + 1
                tr = tr + '<td contenteditable="true" class="number_column changeable_numbers" placeholder="-">' + students_input[i]["assignment_"+assig] + '</td>'
            }
            //tr = tr + '<td class="grade_average number_column"">' + students_input[i].average + '%' + '</td>' + '</tr>';
            tr = tr + '<td class="grade_average number_column"">' + students_input[i].average + '</td>' + '</tr>';
            document.querySelector('.tbody').innerHTML += tr
        }
    }

    // assignment_number needs to be changed dynamically
    function get_number_assignments(headers) {
        let keys = Object.keys(headers).map(key => parseInt(key));
        let number = 0;
        for(let p = 0; p < keys.length; p++) {
            if(!isNaN(keys[p])) {
                number++;
            }
        }
        return number
    }

    function get_columns(headers_input) {
        return Object.keys(headers_input).length;
    }

    function get_rows_of_students(students){
        return students.length
    }

    // get number of assignments in array
    function get_assignments_array(headers) {
        let keys = Object.keys(headers).map(key => parseInt(key))
        let ass_array = [];
        for(let p = 0; p < keys.length; p++) {
            if(!isNaN(keys[p])) {
                ass_array[p] = keys[p];
            }
        }
        return ass_array
    }

    // create table without headers for storing pure values (0-100) of assignments and final grade as sum
    let table_without_headers = [];
    let rows = document.querySelectorAll('tr');

    create_table_without_headers();
    function create_table_without_headers() {
        // fill the table by default
        for (let x = 0; x < rows.length - 1; x++) {
            table_without_headers[x] = [];
            for (let y = 0; y < get_columns(headers); y++) {
                if (y == 0) {
                    table_without_headers[x][y] = students[x].StudentName;
                }
                else if (y == 1) {
                    table_without_headers[x][y] = students[x].StudentID;
                }
                else {
                    table_without_headers[x][y] = 0;
                }
            }
        }
    }

    /* ------------------- */

    // difficult to save and restore data when I designed this app very badly
    let headers_saved = {...headers};
    let students_saved = [...students];
    let table_without_headers_saved = [...table_without_headers];
    document.querySelector('.save_state').addEventListener('click', () => {
        console.log("saved");
        headers_saved = headers;
        students_saved = students;
        table_without_headers_saved = table_without_headers;
    })
    document.querySelector('.restore_state').addEventListener('click', () => {
        console.log("suprise, it it not restored");
        //console.log(table_without_headers_saved);
        //loadTable(headers_saved, students_saved);
    })

    /* ------------------- */


    // create table mirroring the contenteditable values to check who already submitted assignment and who not
    let table_assignments = [];
    let count_no_assignments = 0;

    // after refreshing page -> assignment 2 d array to keep whether the assignment is done or not
    // default 1 -> no assignment
    fill_table_assignments();
    function fill_table_assignments() {
        for (let i = 0; i < students.length; i++) {
            table_assignments[i] = [];
            for (let j = 0; j < get_number_assignments(headers); j++)
            {
                table_assignments[i][j] = 1;
                count_no_assignments = count_no_assignments + 1;
            }
        }
    }

    // after adding new student -> checking who already submit with table_without_headers
    function fill_table_assignments_after_adding_student() {
        // add new row filled by 1 (no assigment submitted) to table_assignments
        let new_student_array = [];
        for (let o = 0; o < get_number_assignments(headers); o++) {
            new_student_array.push(1);
        }
        table_assignments.push(new_student_array);

        for (let i = 0; i < students.length; i++) {
            for (let j = 0; j < get_number_assignments(headers); j++)
            {
                // if table_assignments value == 1 -> keep 1 (no assigmnet submited)
                if(table_assignments[i][j] == 1) {
                    table_assignments[i][j] = 1;
                    count_no_assignments = count_no_assignments + 1;
                }
            }
        }
    }

    // after adding new column -> adding colum of 1
    function fill_table_assignments_after_adding_column() {
        let colum_new = (get_columns(headers));

        // update table_without_headers
        for (let i = 0; i < table_assignments.length; i++) {
            for (let j = 0; j < colum_new; j++) {
                // push 1 on the last index of 2 d array
                if (j == colum_new - 1) {
                    table_assignments[i].push(1);
                }
            }
        }
    }

    // initial state / after refreshing - counter number assignments for all the students
    let number_no_assignments = document.querySelector('.number_no_assignments');
    // view
    number_no_assignments.innerHTML = count_no_assignments;

    // when user insert points for particular assignment -> count for assignment has to be updated as well
    let counterNoAssignments = 0;
    // update view
    function countAssignments(in_headers, in_students) {
        for (let i = 0; i < in_students.length; i++) {
            for (let j = 0; j < get_number_assignments(in_headers); j++)
            {
                // if cell has 1 -> 1 assignment has not been submitted yet
                if (table_assignments[i][j] == 1) {
                    counterNoAssignments++;
                }
            }
        }
        // update HTML
        number_no_assignments.innerHTML = counterNoAssignments;
        // start counting from 0
        counterNoAssignments = 0;
    }

    let final_grade = document.querySelector('.final_grade');

    let state_toggle = 0;
    handle_toggle();
    // handle toggle for average grade + update view
    function handle_toggle() {
        let final_grade = document.querySelector('.final_grade');

        final_grade.addEventListener("click", () => {
            if (state_toggle == 3) {
                state_toggle = 0;
            }
            // Letter Grade
            if (state_toggle == 0) {
                final_grade.innerHTML = 'Average [Letter]';
                calculateLetterGrade();
            }
            // Scale
            if (state_toggle == 1) {
                final_grade.innerHTML = 'Average [4.0]';
                calculateScale();
            }
            // Percent Average
            if (state_toggle == 2) {
                final_grade.innerHTML = 'Average[%]';
                calculatePercent();
            }
            state_toggle++;
        })
    }

    // update view and model
    function calculatePercent() {
        let grade_average = document.querySelectorAll('.grade_average');

        final_grade.innerHTML = 'Average[%]';
        headers.average_header = 'Average[%]';
        for (let u = 0; u < students.length; u++) {
            for (let o = 0; o < get_columns(headers); o++ ) {
                if (o == get_columns(headers) - 1) {
                    grade_average[u].innerHTML = table_without_headers[u][o];
                    //grade_average[u].innerHTML = table_without_headers[u][o] + '%' ; 
                }
            }
        }
    }

    // update view and model
    function calculateScale() {
        let grade_average = document.querySelectorAll('.grade_average');

        final_grade.innerHTML = 'Average [4.0]';
        headers.average_header = 'Average [4.0]';
        for (let u = 0; u < students.length; u++) {
            for (let o = 0; o < get_columns(headers); o++ ) {
                if (o == get_columns(headers) - 1) {
                    if (table_without_headers[u][o] >= 93 && table_without_headers[u][o] <= 100) {
                        grade_average[u].innerHTML = '4.0';
                    }
                    if (table_without_headers[u][o] >= 90 && table_without_headers[u][o] <= 92) {
                        grade_average[u].innerHTML = '3.7';
                    }
                    if (table_without_headers[u][o] >= 87 && table_without_headers[u][o] <= 89) {
                        grade_average[u].innerHTML = '3.3';
                    }
                    if (table_without_headers[u][o] >= 83 && table_without_headers[u][o] <= 86) {
                        grade_average[u].innerHTML = '3.0';
                    }
                    if (table_without_headers[u][o] >= 80 && table_without_headers[u][o] <= 82) {
                        grade_average[u].innerHTML = '2.7';
                    }
                    if (table_without_headers[u][o] >= 77 && table_without_headers[u][o] <= 79) {
                        grade_average[u].innerHTML = '2.3';
                    }
                    if (table_without_headers[u][o] >= 73 && table_without_headers[u][o] <= 76) {
                        grade_average[u].innerHTML = '2.0';
                    }
                    if (table_without_headers[u][o] >= 70 && table_without_headers[u][o] <= 72) {
                        grade_average[u].innerHTML = '1.7';
                    }
                    if (table_without_headers[u][o] >= 67 && table_without_headers[u][o] <= 69) {
                        grade_average[u].innerHTML = '1.3';
                    }
                    if (table_without_headers[u][o] >= 63 && table_without_headers[u][o] <= 66) {
                        grade_average[u].innerHTML = '1.0';
                    }
                    if (table_without_headers[u][o] >= 60 && table_without_headers[u][o] <= 62) {
                        grade_average[u].innerHTML = '0.7';
                    }
                    if (table_without_headers[u][o] < 60) {
                        grade_average[u].innerHTML = '0.0';
                    }
                }
            }
        }
    }

    // update view and model
    function calculateLetterGrade() {
        let grade_average = document.querySelectorAll('.grade_average');

            final_grade.innerHTML = 'Average [Letter]';
            headers.average_header = 'Average [Letter]';
            for (let u = 0; u < students.length; u++) {
                for (let o = 0; o < get_columns(headers); o++ ) {
                    if (o == get_columns(headers) - 1) {
                        if (table_without_headers[u][o] >= 93 && table_without_headers[u][o] <= 100) {
                            grade_average[u].innerHTML = 'A';
                        }
                        if (table_without_headers[u][o] >= 90 && table_without_headers[u][o] <= 92) {
                            grade_average[u].innerHTML = 'A-';
                        }
                        if (table_without_headers[u][o] >= 87 && table_without_headers[u][o] <= 89) {
                            grade_average[u].innerHTML = 'B+';
                        }
                        if (table_without_headers[u][o] >= 83 && table_without_headers[u][o] <= 86) {
                            grade_average[u].innerHTML = 'B';
                        }
                        if (table_without_headers[u][o] >= 80 && table_without_headers[u][o] <= 82) {
                            grade_average[u].innerHTML = 'AB-';
                        }
                        if (table_without_headers[u][o] >= 77 && table_without_headers[u][o] <= 79) {
                            grade_average[u].innerHTML = 'C+';
                        }
                        if (table_without_headers[u][o] >= 73 && table_without_headers[u][o] <= 76) {
                            grade_average[u].innerHTML = 'C';
                        }
                        if (table_without_headers[u][o] >= 70 && table_without_headers[u][o] <= 72) {
                            grade_average[u].innerHTML = 'C-';
                        }
                        if (table_without_headers[u][o] >= 67 && table_without_headers[u][o] <= 69) {
                            grade_average[u].innerHTML = 'D+';
                        }
                        if (table_without_headers[u][o] >= 63 && table_without_headers[u][o] <= 66) {
                            grade_average[u].innerHTML = 'D';
                        }
                        if (table_without_headers[u][o] >= 60 && table_without_headers[u][o] <= 62) {
                            grade_average[u].innerHTML = 'D-';
                        }
                        if (table_without_headers[u][o] < 60) {
                            grade_average[u].innerHTML = 'F';
                        }
                    }
                }
            }
    }

    function create_student_object(input_student, input_id) {
        let student_object = {};
        for (let p = 0; p < get_number_assignments(headers); p++) {
            let key = "assignment_"+get_assignments_array(headers)[p];
            student_object[key] = "";
        }
        student_object.StudentName = input_student;
        student_object.StudentID = input_id;
        student_object.average = 0;

        return student_object
    }

    // when adding student -> assignments and final grade are 0
    function create_student_array(name_input, id_input) {
        let student_array = [name_input, id_input];
        for (let p = 0; p < get_number_assignments(headers)+1; p++) {
            student_array.push(0);
        } 
        return student_array
    }

    // add new column filled with 0 into 2 d array of table_without_headers but preserving existing values in table_without_headers
    function update_table_without_headers(table_headers, new_column) {
        let colum_old = (get_columns(headers)-1);
        let colum_new = (get_columns(headers));

        // filled only final grades into array
        let final_grade = [];
        for (let i = 0; i < table_headers.length; i++) {
            for (let j = 0; j < colum_old; j++) {
                if (j == colum_old - 1) {
                    final_grade.push(table_headers[i][j]);            
                }
            }
        }

        let all_grade_averag = document.querySelectorAll('.grade_average');

        // update table_without_headers
        for (let i = 0; i < table_headers.length; i++) {
            for (let j = 0; j < colum_new; j++) {
                // changed final grade in 2 d array for the new column
                if (j == colum_new - 2) {
                    table_headers[i][j] = new_column[i];      
                }
                // push final grade on the last index of 2 d array
                if (j == colum_new - 1) {

                    let old_number_assignments = get_number_assignments(headers) - 1;
                    let final_grade_absolute = (final_grade[i] / 100) * (old_number_assignments * 100);

                    let new_result = Math.floor(((100 * final_grade_absolute) / (get_number_assignments(headers) * 100)));
                    table_headers[i].push(new_result);
                    //all_grade_averag[i].innerHTML = new_result + '%' ;
                    // update view
                    all_grade_averag[i].innerHTML = new_result;
                    // update model
                    // update average grades in students
                    students[i].average = new_result;
                }
            }
        }
        return table_headers;        
    }

    // handle form for adding new column
    document.querySelector('#form_assignment').addEventListener('submit', (event) => {
        event.preventDefault();

        // add new column for new assignment for header
        let headers_length_by_new_column = get_number_assignments(headers) + 1;
        headers[headers_length_by_new_column] = "Assignment "+headers_length_by_new_column;

        // add new column for new assignment in students
        for(let s = 0; s < students.length; s++) {
            students[s]["assignment_"+headers_length_by_new_column] = "";
        }

        // new_column_array filled with 0 
        let new_column_array = []
        for (let r = 0; r < get_rows_of_students(students); r++) {
            new_column_array[r] = 0;
        }
        // add above mentioned column into table_without_headers
        update_table_without_headers(table_without_headers, new_column_array);
        // update view
        loadTable(headers, students);
        fill_table_assignments_after_adding_column();
        input_change();
        countAssignments(headers, students);
        checkTitleFinalGrade();
        handle_toggle();
        handle_styling_for_grade_average();
    })

    // update view - check all the final grades for all the students and style accordingly
    function handle_styling_for_grade_average() {
        let grade_average = document.querySelectorAll('.grade_average');
        let average_grad = table_without_headers.map(t => t[get_columns(headers)-1]);
    
        for(let t = 0; t < grade_average.length; t++) {
            styleGradeAverage(average_grad[t], grade_average[t]);
        }
    }


    // handle form for adding new student
    document.querySelector('#form_student').addEventListener('submit', (event) => {
        event.preventDefault();

        let input_student = document.querySelector("#input_student");
        let input_student_value = input_student.value;
        input_student.value = "";
        let data_length_by_new_row = students.length + 1;

        let returned_student_object = create_student_object(input_student_value, data_length_by_new_row);
        // update model
        students.push(returned_student_object);

        let returned_student_array = create_student_array(input_student_value, data_length_by_new_row);
        table_without_headers.push(returned_student_array)
        // update view
        loadTable(headers, students);
        fill_table_assignments_after_adding_student();
        input_change();
        countAssignments(headers, students);
        checkTitleFinalGrade();
        handle_toggle();
        handle_styling_for_grade_average();
    })

    // update view
    function styleGradeAverage(result, element) {
        if (result < 60) {
            element.style.backgroundColor = 'red';
            element.style.color = 'white';
        }
        else {
            element.style.backgroundColor = 'transparent';
            element.style.color = 'black'
        }
    }

    function checkTitleFinalGrade() {
        if (final_grade.innerHTML == 'Average [%]') {
            calculatePercent();
        }
        if (final_grade.innerHTML == 'Average [4.0]') {
            calculateScale();
        }
        if(final_grade.innerHTML == 'Average [Letter]') {
            calculateLetterGrade();
        } 
    }

    input_change();

    function input_change() {
        // whenever user input any character to the contenteditable fields
        document.querySelectorAll(".number_column").forEach((number) => {
            number.addEventListener("input", (event) => {
                // to get row index and column index
                // code from StackOverflow -> https://stackoverflow.com/questions/45656949/how-to-return-the-row-and-column-index-of-a-table-cell-by-clicking#:~:text=Another%20Native%20JS%20way%20to,shown%20on%20the%20following%20code.
                let rows = document.querySelectorAll('tr');
                // number of table rows converted into array
                let rowsArray = Array.from(rows);
                // find index in row
                let rowIndex = rowsArray.findIndex(row => row.contains(event.target));
                // number of columns in particular array
                let columns = Array.from(rowsArray[rowIndex].querySelectorAll('td'));
                // find index in 
                let columnIndex = columns.findIndex(column => column == event.target);
                //console.log(rowIndex, columnIndex)
    
                // iterate over contenteditable columns + average grades
                for (let i=2; i < columns.length; i++) {
    
                    let inputed_value = columns[i].innerHTML;
                    // check if number
                    let isNum = /^\d+$/.test(inputed_value);
                    // convert String to Float
                    let inputed_number = parseFloat(inputed_value);
    
                    // find inputed value in table
                    if(columnIndex == i) {
                        // if inputed value is number and input(number) fulfils below conditions
                        if(isNum && inputed_number >= 0 && inputed_number <= 100) {
                            // upddate table_without_headers
                            table_without_headers[rowIndex - 1][columnIndex] = inputed_number;
                            // update table_assignments
                            table_assignments[rowIndex - 1][columnIndex - 2] = 0;
                            //students[rowIndex - 1].assignment_1 = inputed_number
                            columns[i].style.backgroundColor = 'transparent';

                            // need the word e. g. assignment_1 in order to insert inputed_number into students 
                            let assignment_object = Object.values(headers);
                            // assignments are ordered after student id -> i-2
                            let particular_assignment = assignment_object[i-2];
                            // changed e. g. Assignment 1 into assignment_1
                            let particular_assignment_trim = particular_assignment.replace(" ", "_").replace("A", "a");

                            // update students
                            let student = students.find(student => student.StudentID === rowIndex);
                            let changedStudent = { ...student, [particular_assignment_trim] : inputed_number };

                            let updated_data = students.map(obj => {
                                return obj.StudentID == rowIndex ? changedStudent : obj
                                }
                            );
                            // assign to students
                            students = updated_data;
                            countAssignments(headers, students);
                            checkTitleFinalGrade();
                        }
                        else {
                            columns[i].innerHTML = '';
                            // upddate table_without_headers
                            table_without_headers[rowIndex - 1][columnIndex] = 0;

                            // update table_assignments -> no value -> no submitted assignment
                            table_assignments[rowIndex - 1][columnIndex - 2] = 1;

                            columns[i].style.backgroundColor = 'yellow';

                            // need the word e. g. assignment_1 in order to insert "" into students 
                            let assignment_object = Object.values(headers);
                            // assignments are ordered after student id -> i-2
                            let particular_assignment = assignment_object[i-2];
                            // changed e. g. Assignment 1 into assignment_1
                            let particular_assignment_trim = particular_assignment.replace(" ", "_").replace("A", "a");

                            // update students
                            let student = students.find(student => student.StudentID === rowIndex);
                            let changedStudent = { ...student, [particular_assignment_trim] : "" };

                            let updated_data = students.map(obj => {
                                return obj.StudentID == rowIndex ? changedStudent : obj
                                }
                            );
                            // assign to students
                            students = updated_data;
                            countAssignments(headers, students);
                            checkTitleFinalGrade();
                        }
                    }
                    // insert the average grade
                    if (i == get_columns(headers) - 1) {
                        let sum = 0;
                        // iterate over nested array table_without_headers
                        for (let a = 0; a < rows.length; a++) {
                            // iterate only for columns in the correct row / only one row
                            if (a == (rowIndex - 1)) {
                                // b = 2 because we omit first 2 columns for name and id
                                for(let b = 2; b < get_columns(headers); b++) {
                                        // not sum average grade
                                        if ( b != get_columns(headers) - 1) {
                                            // sum only particular array
                                            sum = sum + table_without_headers[rowIndex - 1][b];
                                        }
                                        // insert sum into average column
                                        if ( b == get_columns(headers) - 1) {
                                            // calculate average grade for affected row
                                            let result = Math.floor(((100 * sum) / (get_number_assignments(headers) * 100)));
                                            table_without_headers[rowIndex - 1][b] = result;
                                            students[rowIndex - 1].average = result;
                                            //columns[i].innerHTML = result + '%' ;
                                            columns[i].innerHTML = result;
                                            styleGradeAverage(result, columns[i]);
                                            checkTitleFinalGrade();
                                        }
                                    }
                            }
                        }     
                    }
                }
            })
        })
    }
})
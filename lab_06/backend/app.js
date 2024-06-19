const memberRouter = require('./controllers/member');
const classesRouter = require('./controllers/class');
const members_classesRouter = require('./controllers/member_class');
//const middleware = require('./utils/middleware')
const express = require('express');
const mongoose = require('mongoose')
//const cors = require('cors');

const config = require('./utils/config')


// Creates the app
const app = express();

// for request.body in order to be possible to transfer data from front-end into back-end
// not necessary for this assignment
app.use(express.json())
//app.use(cors())

// hide URL path for security reasons
const mongoUrl = config.MONGODB_URI
console.log('connecting to', mongoUrl)

// add middlewares
app.use('/api/members', memberRouter);
app.use('/api/classes', classesRouter);
app.use('/api/members_classes', members_classesRouter);

// all the routes should be registered before this middleware
//app.use(middleware.errorHandler)

const service_member = require('./services/member')
const service_class = require('./services/class')
const service_members_classes = require('./services/member_class')

mongoose.connect(mongoUrl)

/////// YOU CAN RUN THIS APP ONLY ONCE BECAUSE I DATA ARE HARD-CRAFTED  //////////
// If you want to keep running this app just delete or comment the function run() below.
//run();
//Promise.allSettled([run()]);

async function run() {
    //////////// MEMBERS ////////////
    // inject hard-coded data for members

    // CREATE
    const member_1 = {
        title_1: "Mr",
        first_name_1: "Tomas",
        surname_1: "Hatas",
        email_1: "tomas.hatas@gmail.com",
        premium_membership_1: true
    }
    const { title_1, first_name_1, surname_1, email_1, premium_membership_1 } = member_1;

    await service_member.insertMember( title_1, first_name_1, surname_1, email_1, premium_membership_1 );
    

    const member_2 = {
        title_2: "Mr",
        first_name_2: "Jan",
        surname_2: "Levy",
        email_2: "jan.levy@gmail.com",
        premium_membership_2: true
    }
    const { title_2, first_name_2, surname_2, email_2, premium_membership_2 } = member_2;

    await service_member.insertMember( title_2, first_name_2, surname_2, email_2, premium_membership_2 );


    const member_3 = {
        title_3: "Mrs",
        first_name_3: "Jana",
        surname_3: "Leva",
        email_3: "jana.leva@gmail.com",
        premium_membership_3: true
    }
    const { title_3, first_name_3, surname_3, email_3, premium_membership_3 } = member_3;

    await service_member.insertMember( title_3, first_name_3, surname_3, email_3, premium_membership_3 );


    const member_4 = {
        title_4: "Mr",
        first_name_4: "Update",
        surname_4: "Update",
        email_4: "update.update@gmail.com",
        premium_membership_4: true
    }
    const { title_4, first_name_4, surname_4, email_4, premium_membership_4 } = member_4;

    await service_member.insertMember( title_4, first_name_4, surname_4, email_4, premium_membership_4 );


    const member_5 = {
        title_5: "Mr",
        first_name_5: "Delete",
        surname_5: "Delete",
        email_5: "delete.delte@gmail.com",
        premium_membership_5: true
    }
    const { title_5, first_name_5, surname_5, email_5, premium_membership_5 } = member_5;

    await service_member.insertMember( title_5, first_name_5, surname_5, email_5, premium_membership_5 );


    // RETRIEVE
    await service_member.findMember(1);

    await service_member.findMember(2);

    await service_member.findMember(3);

    await service_member.findMember(4);

    await service_member.findMember(5);


    // UPDATE
    const member_to_update = {
        title: "Mr",
        first_name: "Updated",
        surname: "Updated",
        email: "update.update@gmail.com",
        premium_membership: false
    }

    const { title, first_name, surname, email, premium_membership } = member_to_update;

    await service_member.updateMember( 4, title, first_name, surname, email, premium_membership );


    // DELETE
    await service_member.deleteMember(5);



    //////////// CLASSES ////////////
    // inject hard-coded data for classes

    // CREATE
    const class_1 = {
        name_1: "Yoga",
        day_1: "Monday",
        session_length_1: 2,
        price_1: 30,
        number_of_members_1: 0
    }
    const { name_1, day_1, session_length_1, price_1, number_of_members_1 } = class_1;

    await service_class.insertClass( name_1, day_1, session_length_1, price_1, number_of_members_1 )


    const class_2 = {
        name_2: "Cross Fit",
        day_2: "Monday",
        session_length_2: 2,
        price_2: 30,
        number_of_members_2: 0
    }
    const { name_2, day_2, session_length_2, price_2, number_of_members_2 } = class_2;

    await service_class.insertClass( name_2, day_2, session_length_2, price_2, number_of_members_2 )


    const class_3 = {
        name_3: "Cardio",
        day_3: "Monday",
        session_length_3: 2,
        price_3: 30,
        number_of_members_3: 0
    }
    const { name_3, day_3, session_length_3, price_3, number_of_members_3 } = class_3;

    await service_class.insertClass( name_3, day_3, session_length_3, price_3, number_of_members_3 )


    const class_4 = {
        name_4: "Jumping",
        day_4: "Jumping",
        session_length_4: 2,
        price_4: 30,
        number_of_members_4: 0
    }
    const { name_4, day_4, session_length_4, price_4, number_of_members_4 } = class_4;

    await service_class.insertClass( name_4, day_4, session_length_4, price_4, number_of_members_4 )

    
    const class_5 = {
        name_5: "Update",
        day_5: "Update",
        session_length_5: 2,
        price_5: 30,
        number_of_members_5: 0
    }
    const { name_5, day_5, session_length_5, price_5, number_of_members_5 } = class_5;

    await service_class.insertClass( name_5, day_5, session_length_5, price_5, number_of_members_5 )

  
    const class_6 = {
        name_6: "Delete",
        day_6: "Delete",
        session_length_6: 2,
        price_6: 30,
        number_of_members_6: 0
    }
    const { name_6, day_6, session_length_6, price_6, number_of_members_6 } = class_6;

    await service_class.insertClass( name_6, day_6, session_length_6, price_6, number_of_members_6 )


    // RETRIEVE
    await service_class.findClass(1);

    await service_class.findClass(2);

    await service_class.findClass(3);

    await service_class.findClass(4);

    await service_class.findClass(5);

    await service_class.findClass(6);



    // UPDATE
    const class_to_update = {
        name: "Updated",
        day: "Updated",
        session_length: 2,
        price: 30,
        number_of_members: 0
    }

    await service_class.updateClass(5, class_to_update)


    // DELETE
    await service_class.deleteClass(6)


    
    //////////// MEMBER CLASS link ////////////
    // inject hard-coded data for MEMBER CLASS link


    const get_member_1 = await service_member.findMember(1)
    const member_objectID_1 = get_member_1.member[0].id
    //console.log(member_objectID_1)

    const get_member_2 = await service_member.findMember(2)
    const member_objectID_2 = get_member_2.member[0].id
    //console.log(member_objectID_2)

    const get_class_1 = await service_class.findClass(1)
    const class_objectID_1 = get_class_1.clas[0].id
    //console.log(get_class_1.clas[0].id)

    const get_class_2 = await service_class.findClass(2)
    const class_objectID_2 = get_class_2.clas[0].id
    //console.log(get_class_2.clas[0].id)

    const get_class_3= await service_class.findClass(3)
    const class_objectID_3 = get_class_3.clas[0].id
    //console.log(get_class_3.clas[0].id)

    const get_class_4 = await service_class.findClass(4)
    const class_objectID_4 = get_class_4.clas[0].id
    //console.log(get_class_4.clas[0].id)


    // CREATE
    const member_class_1 = {
        member_ID_1: member_objectID_1,
        taken_classes_1: [
            {
                class_ID: class_objectID_1
            },
            {
                class_ID: class_objectID_2
            },
            {
                class_ID: class_objectID_3
            }
        ]
    }

    const { member_ID_1, taken_classes_1 } = member_class_1
    await service_members_classes.insertMember_Class(member_ID_1, taken_classes_1);


    // updated classes
    const class_1_update = {
        name: "Yoga",
        day: "Monday",
        session_length: 2,
        price: 30,
        number_of_members: 1
    }
    await service_class.updateClass(1, class_1_update );


    const class_2_update = {
        name: "Cross Fit",
        day: "Monday",
        session_length: 2,
        price: 30,
        number_of_members: 1
    }

    await service_class.updateClass(2, class_2_update );


    const class_3_update = {
        name: "Cardio",
        day: "Monday",
        session_length: 2,
        price: 30,
        number_of_members: 1
    }

    await service_class.updateClass(3, class_3_update );


    const member_class_2 = {
        member_ID_2: member_objectID_2,
        taken_classes_2: [
            {
                class_ID: class_objectID_1
            },
            {
                class_ID: class_objectID_2
            },
            {
                class_ID: class_objectID_3
            }
        ]
    }

    const { member_ID_2, taken_classes_2 } = member_class_2
    await service_members_classes.insertMember_Class(member_ID_2, taken_classes_2);

        // updated classes
        const class_1_update_1 = {
            name: "Yoga",
            day: "Monday",
            session_length: 2,
            price: 30,
            number_of_members: 2
        }
        await service_class.updateClass(1, class_1_update_1 );
    
    
        const class_2_update_2 = {
            name: "Cross Fit",
            day: "Monday",
            session_length: 2,
            price: 30,
            number_of_members: 2
        }
    
        await service_class.updateClass(2, class_2_update_2 );
    
    
        const class_3_update_3 = {
            name: "Cardio",
            day: "Monday",
            session_length: 2,
            price: 30,
            number_of_members: 2
        }
    
        await service_class.updateClass(3, class_3_update_3 );




    // RETRIEVE

    await service_members_classes.findMember_Class(1)

    await service_members_classes.findMember_Class(2)


    // UPDATE
    const member_class_to_update = {
        member_ID: member_objectID_1,
        taken_classes: [
            {
                class_ID: class_objectID_1
            },
            {
                class_ID: class_objectID_2
            },
            {
                class_ID: class_objectID_4
            }
        ]
    }
    const { member_ID, taken_classes } = member_class_to_update;

    await service_members_classes.updateMember_Class(2, member_ID, taken_classes );

        // updated classes
        const class_3_update_31 = {
            name: "Cardio",
            day: "Monday",
            session_length: 2,
            price: 30,
            number_of_members: 1
        }
        await service_class.updateClass(3, class_3_update_31 );
    
    
        const class_4_update_42 = {
            name: "Jumping",
            day: "Jumping",
            session_length: 2,
            price: 30,
            number_of_members: 1
        }
    
        await service_class.updateClass(4, class_4_update_42 );



    // DELETE
    await service_members_classes.deleteMember_Class(2)

            // updated classes
            const class_1_update_11 = {
                name: "Yoga",
                day: "Monday",
                session_length: 2,
                price: 30,
                number_of_members: 1
            }
            await service_class.updateClass(1, class_1_update_11 );
        
        
            const class_2_update_22 = {
                name: "Cross Fit",
                day: "Monday",
                session_length: 2,
                price: 30,
                number_of_members: 1
            }
        
            await service_class.updateClass(2, class_2_update_22 );
        
        
            const class_3_update_33 = {
                name: "Jumping",
                day: "Jumping",
                session_length: 2,
                price: 30,
                number_of_members: 0
            }
        
            await service_class.updateClass(4, class_3_update_33 );

            // delete member 2
            await service_member.deleteMember(2);
}


module.exports = app

/*
Your code should include a brief description for the database design (your data modeling ap-
proach) and the impact on your code development. This should be included as a comment at the
bottom of your code submission.

Structure:
Created 3 collections in total.
1 collection for storing information about members
1 collection for storing information about classes
1 collection for storing information about link between members and classes.

Consequences:
The most challenging part was to handle number of members in class collection. In other word, the updating collections.
To give you an example, if I deleted link between members and classes, I needed to decrease number of members in those classes.
Another example would be if I delete member. If this member took some classes, I also need to delete a link between this member
and classes. Furthermore, I needed to decrease the number of members in those classes.
Other example would be if I delete class and this class was taken by some members, I need to delete this class in the links
between member and classes.

Notes:
I wanted to move the service class from controllers member_class.js (see from line 68 in controllers member_class.js) into
services member_class.js but I got an error ... circular dependency. Therefore, I kept the service class in controllers member_class.js.
The same analogy also happend for service member_class in controllers class.js. I did not know how to figure out the circular dependency
and hence I just designed it as it is as of now.

Final Note:
File with name backend_members is another solution where a member can take at least 3 classes. As you can imagine, the solution
with at least 3 classes is more complicated.

Connection to mongoDB:
Connection String: 
mongodb+srv://tmshts:tmshts@store.dddy5dv.mongodb.net/ or 
mongodb+srv://tmshts:tmshts@store.dddy5dv.mongodb.net/gym?retryWrites=true&w=majority&appName=gym

*/
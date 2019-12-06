let inputName = document.getElementById('lessonName');
let inputStartDateTime = document.getElementById('lessonStart');
let inputEndDateTime = document.getElementById('lessonEnd');
let inputTeacherName = document.getElementById('lessonTeacher');
let inputLinkedStudentName = document.getElementById('linkedStudent');
let returnMessage = document.getElementById('returnMessage');

let inputAttachLessonId = document.getElementById('attachLessonId');

let submitButton = document.getElementById('submitButton');
let submitAttachButton = document.getElementById('submitAttachButton');

if (document.contains(submitButton)) {
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();

        if (
            inputName.value !== "" && inputStartDateTime.value !== "" && inputEndDateTime.value !== ""
            && inputLinkedStudentName.options[inputLinkedStudentName.selectedIndex].value !== ""
            && inputLinkedStudentName.selectedIndex !== "0" && inputTeacherName.value !== ""
        )
        {
            $.ajax('/ajouter-cours/insertion', {
                type: 'POST',
                data: {
                    'title': inputName.value,
                    'start_at': inputStartDateTime.value,
                    'end_at': inputEndDateTime.value,
                    'user_id': inputLinkedStudentName.options[inputLinkedStudentName.selectedIndex].value,
                    'teacher': inputTeacherName.value,
                },
                success: function (data, status, xhr) {
                    console.log('Ok données envoyées en base 👍');

                    //Reset fields values after submit
                    inputName.value = "";
                    inputStartDateTime.value = "";
                    inputEndDateTime.value = "";
                    inputLinkedStudentName.selectedIndex = "0";
                    inputTeacherName.value = "";
                    returnMessage.style.display = "";

                    setTimeout(function() {
                    window.location.reload();
                    }, 800);
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    console.error(errorMessage);
                }
            });
        }

    });
}

if (document.contains(submitAttachButton)) {
    submitAttachButton.addEventListener('click', function (e) {
        e.preventDefault();

        if (
            inputLinkedStudentName.options[inputLinkedStudentName.selectedIndex].value !== ""
            && inputLinkedStudentName.selectedIndex !== "0"
            && inputAttachLessonId.options[inputAttachLessonId.selectedIndex].value !== ""
            && inputAttachLessonId.selectedIndex !== "0"
        ) {
            $.ajax('/attacher-cours/insertion', {
                type: 'POST',
                data: {
                    'user_id': inputLinkedStudentName.options[inputLinkedStudentName.selectedIndex].value,
                    'cours_id': inputAttachLessonId.options[inputAttachLessonId.selectedIndex].value,
                },
                success: function (data, status, xhr) {
                    console.log('Ok données envoyées en base 👍');

                    //Reset fields values after submit
                    inputLinkedStudentName.options[inputLinkedStudentName.selectedIndex].value = "";
                    inputLinkedStudentName.selectedIndex = "0";
                    inputAttachLessonId.options[inputAttachLessonId.selectedIndex].value = "";
                    inputAttachLessonId.selectedIndex = "0";
                    returnMessage.style.display = "";

                    setTimeout(function() {
                        window.location.reload()
;                   }, 800);
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    console.error(errorMessage);
                }
            });
        }

    });
}

//Get all users informations
$.ajax('/liste-eleves', {
    type: 'POST',  // http method
    data: {},  // data to submit
    success: function (data, status, xhr) {
        data.forEach(function(user) {

            let option = document.createElement('option');


            option.innerHTML = user.firstname + " " + user.lastname + " - " + user.email;
            option.value = user.id;

            inputLinkedStudentName.appendChild(option);
        });
    },
    error: function (jqXhr, textStatus, errorMessage) {
        console.error('Get All Users Informations from database : Request failed');
    }
});



//Get all users informations
$.ajax('/liste-eleves', {
    type: 'POST',  // http method
    data: {},  // data to submit
    success: function (data, status, xhr) {
        data.forEach(function (user) {

            let option = document.createElement('option');


            option.innerHTML = user.firstname + " " + user.lastname + " - " + user.email;
            option.value = user.id;

            inputLinkedStudentName.appendChild(option);
        });
    },
    error: function (jqXhr, textStatus, errorMessage) {
        console.error('Get All Users Informations from database : Request failed');
    }
});

if (document.contains(inputAttachLessonId))
{
    //Get all lessons
    $.ajax('/liste-cours', {
        type: 'POST',  // http method
        data: {},  // data to submit
        success: function (data, status, xhr) {
            data.forEach(function(lesson) {

                let option = document.createElement('option');

                option.innerHTML = lesson.title + " - avec " + lesson.teacher;
                option.value = lesson.id;

                inputAttachLessonId.appendChild(option);
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.error('Get All Lessons from database : Request failed');
        }
    });
}


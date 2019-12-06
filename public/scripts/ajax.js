let inputName = document.getElementById('lessonName');
let inputStartDateTime = document.getElementById('lessonStart');
let inputEndDateTime = document.getElementById('lessonEnd');
let inputTeacherName = document.getElementById('lessonTeacher');
let inputLinkedStudentName = document.getElementById('linkedStudent');

let submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', function(e) {
    e.preventDefault();

    if (
        inputName.value !== "" && inputStartDateTime.value !== "" && inputEndDateTime.value !== ""
        && inputLinkedStudentName.options[inputLinkedStudentName.selectedIndex].value !== ""
        && inputLinkedStudentName.selectedIndex !== "0" && inputTeacherName.value !== ""
    )
    {
        $.ajax('/ajouter-cours/insertion', {
            type: 'POST',  // http method
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
            },
            error: function (jqXhr, textStatus, errorMessage) {
                console.error(errorMessage);
            }
        });
    }

});

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

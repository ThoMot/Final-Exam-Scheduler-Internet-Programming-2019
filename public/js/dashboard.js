$(document).ready(() => {
    //$("#createFailed").hide();
    //$("#deleteFailed").hide();
    $("#detailsFailed").hide();
    retreiveAppointments(1);

    // Adding eventlisteners for author in quotes
    $("#tableBod").on("click", "a", function() {
        const appointment = $(this)[0].id;
        if ($(this)[0].innerHTML === "Details") {
            getAppointmentInfo(appointment);
        } else {
            $("#deletedAuthorId").text(appointment);
        }
    });
});

//Gets author info for populating the update modal
function getAppointmentInfo(appID) {
    $.ajax({
        url: `/dashboard/appointment/${appID}`,
        method: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            populateDetailsModal(result.appointment);
        },
        error: function(xhr, status) {
            $("#detailsFailed").show();
            console.log("error calling to POST router", status);
        },
        complete: function() {}
    });
}

//populates the update modal with info from the database
function populateDetailsModal(appointment) {
    const {
        id,
        name,
        start_time,
        end_time,
        booked_by,
        duration
    } = appointment;

    $("#appID").text(id);
    $("#name").val(name);
    $("#starttime").val(start_time);
    $("#endtime").val(end_time);
    $("#booked").val(booked_by);
    $("#duration").val(duration);
}

//gets all author info that is set on page load
function retreiveAppointments(userID) {
    $.ajax({
        url: `/dashboard/fetchAppointments/${userID}`,
        method: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#tableBod").empty();
            result.appointments.forEach(appointment => {
                displayAppointments(
                    appointment.id,
                    appointment.date,
                    appointment.start_time,
                    appointment.duration,
                    appointment.booked_by,
                );
            });
        },
        error: function(xhr, status) {
            console.log("error calling to POST router", status);
        },
        complete: function() {}
    });
}

//populates the table of authors on page load
function displayAppointments(id, date, startTime, duration, bookedBy) {
    console.log(duration);
    const appointResult = `
        <tr>
        <td>${date}</td>
        <td>${startTime}</td>
        <td>${duration}</td>
        <td>${bookedBy}</td>
        <td><a href="" class="btn btn-primary" data-toggle="modal" id="${id}" data-target="#modalDetails">Details</a></td>
        <td><a href="" class="btn btn-danger" data-toggle="modal" id="${id}" data-target="#deleteModal">Delete</a></td>

    </tr>
    `;
    $("#tableBod").append(appointResult);
}

function logout() {
    $.ajax({
        url: "/dashboard/logout",
        method: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            if (result.successful) {
                window.location.reload();
            }
        },
        error: function(xhr, status) {
            console.log("Error logging out: ", status);
        },
        complete: function() {}
    });
}
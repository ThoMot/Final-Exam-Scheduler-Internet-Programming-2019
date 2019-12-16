$(document).ready(() => {
    $("#addFailed").hide();
    $("#deleteFailed").hide();
    $("#detailsFailed").hide();
    retreiveAppointments();

    $("#addAppointment").on("click", function () {
        const newApp = {
            start_time: $("#newDate").val() + " " + $("#newStart").val(),
            end_time: $("#newDate").val() + " " + $("#newEnd").val(),
        };
        createAppointment(newApp);
    });

    //listener for deleting Appointment
    $("#deleteAuthor").on("click", function() {
        deleteAuthor($("#deletedAuthorId").html());
    });

    // Adding eventlisteners for author in quotes
    $("#tableBod").on("click", "a", function() {
        const appointment = $(this)[0].id;
        if ($(this)[0].innerHTML === "Details") {
            getAppointmentInfo(appointment);
        } else {
            getAppointmentInfoDelete(appointment);
            $("#deletedAuthorId").text(appointment);
        }
    });
});

function createAppointment(newApp){
    $.ajax({
        url: "/dashboard/add",
        method: "post",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(newApp),
        success: function(result) {
            if (result.status === "success") {
                $("#createSuccess").html(result.message);
                retreiveAppointments();
            } else {
                $("#addFailed").show();
            }
        },
        error: function(xhr, status) {
            $("#createFailed").show();
            console.log("error calling to POST router", status);
        },
        complete: function() {}
    });
}

function deleteAuthor(appointmentId) {
    $.ajax({
        url: "/dashboard/delete",
        method: "DELETE",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            appointmentId: appointmentId
        }),
        success: function(result) {
            $("#deleteSuccess").html(result.message);
            retreiveAppointments();
        },
        error: function(xhr, status) {
            $("#deleteFailed").show();
            console.log("error calling to POST router", status);
        },
        complete: function() {}
    });
}

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

function getAppointmentInfoDelete(appID) {
    $.ajax({
        url: `/dashboard/appointment/${appID}`,
        method: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            populateDeleteModal(result.appointment);
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
    $("#duration").val(duration + " Minutes");
}

function populateDeleteModal(appointment) {
    const {
        date,
        start_time,
        end_time,
    } = appointment;

    $("#startTimeDelete").text(date + " " + start_time);
    $("#endTimeDelete").text(date + " " + end_time);
}

//gets all author info that is set on page load
function retreiveAppointments() {
    $.ajax({
        url: `/dashboard/fetchAppointments`,
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
                    appointment.duration + " Minutes",
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
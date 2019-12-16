
$(document).ready(() => {

    //sign in button
    $("#loginButton").on("click", function() {
       $("#modalSignIn").modal("show");
    });
    //sign up button
    $("#signUpBtn").on("click", function() {
        if (inputValidation()) {
            signUp();
            $("#feedbkSignup").html("");
        } else {
            $("#feedbkSignup").html("Please check your inputs!");
        }
    });

    //sign in button
    $("#signin").on("click", function() {
        signIn();
    });
});


function inputValidation() {
    valid = true;
    if($("#signupfirstname").val() === "" || $("#signuplastname").val() === "" ||
        $("#signupPassword").val() === "" || $("#signupemail").val() === ""){
        valid = false;
    }
    return valid;
}

function signUp() {
    $.ajax({
        url: "/signup",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            firstname: $("#signupfirstname").val(),
            lastname: $("#signuplastname").val(),
            email: $("#signupemail").val(),
            password: $("#signupPassword").val()
        }),
        success: function(result) {
            if (result.status === "success") {
                $("#modalRegisterForm").modal("hide");
                $("#creationSuccessMessage").text(result.message);
                $("#userCreationModal").modal("show");
            } else {
                $("#feedbkSignup").html(result.message);
            }
        },
    });
}

function signIn() {
    $.ajax({
        url: "/signin",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            email: $("#username").val(),
            password: $("#signinPassword").val(),
        }),
        success: function(result) {
            if (result.status === "success") {
                window.location.reload();
            } else {
                $("#feedbkSignin").html(result.message);
            }
        }
    });
}

function logout() {
    $.ajax({
        url: "/logout",
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
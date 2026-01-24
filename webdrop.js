function sendQuote() {
    debugger;
    var objQuote = new Quote();
    if ($('#quote_username').val() == null || $('#quote_username').val() == undefined || $('#quote_username').val() == '') {
        alert('Error: Please Enter Your Name')
        $('#quote_username').focus();
        return false;
    }
    else {
        objQuote.UserName = $('#quote_username').val();
    }

    if ($('#quote_mobile').val() == null || $('#quote_mobile').val() == undefined || $('#quote_mobile').val() == '') {
        alert('Error: Please Enter Your Mobile')
        $('#quote_mobile').focus();
        return false;
    }
    else {
        objQuote.Mobile = $('#quote_mobile').val();
    }
    if ($('#quote_email').val() == null || $('#quote_email').val() == undefined || $('#quote_email').val() == '') {
        alert('Error: Please Enter Your Email Address')
        $('#quote_email').focus();
        return false;
    }
    else {
        var userinput = $('#quote_email').val();
        var pattern = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        var testEmail = pattern.test(userinput);
        if (testEmail) {
            objQuote.Email = $('#quote_email').val();
        }
        else {
            alert('Error: Please Enter a valid Email Address');
            return false;
        }
    }
    if ($('#quote_service').val() == null || $('#quote_service').val() == undefined || $('#quote_service').val() == '') {
        alert('Error: Please One or More Services')
        $('#quote_service').focus();
        return false;
    }
    else {
        objQuote.Quote_ForServices = $('#quote_service').val();
    }
    if ($('#quote_message').val() == null || $('#quote_message').val() == undefined || $('#quote_message').val() == '') {
        alert('Error: Please Enter Brief Description')
        $('#quote_message').focus();
        return false;
    }
    else {
        objQuote.Quote_Message = $('#quote_message').val();
    }
    data = JSON.stringify(objQuote);
    $.ajax({
        type: "POST",
        url: "index.aspx/sendQuote",
        data: "{data:'" + data + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            debugger;
            $('#quote_username').val('');
            $('#quote_mobile').val('');
            $('#quote_email').val('');
            $('#quote_service').val('0');
            $('#quote_message').val('');
            alert('Data Save Successfully.');
        },
        error: function (r) {
            debugger;
            alert('error occured');
        }
    })
}


class Quote {
    constructor() {
        var Quote_ID;
        var UserName;
        var Mobile;
        var Email;
        var Quote_ForServices;
        var Quote_Message;
    }
}

class Message {
    constructor() {
        var Name;
        var UserMobile;
        var Email;
        var Subjects;
        var MessageText;
    }
}

function isNumeric(obj) {
    if (isNaN($(obj).val())) {
        alert('Please enter only numeric values');
        $(obj).val('');
        $(obj).focus();
        return;
    }
}
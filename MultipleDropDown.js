window.onload = (event) => {
    //fillServicesDropDownFromDatabase();
    initMultiselect();

};

function initMultiselect() {
    checkboxStatusChange();

    document.addEventListener("click", function(evt) {
        var flyoutElement = document.getElementById('myMultiselect'),
          targetElement = evt.target; // clicked element

        do {
            if (targetElement == flyoutElement) {
                // This is a click inside. Do nothing, just return.
                //console.log('click inside');
                return;
            }

            // Go up the DOM
            targetElement = targetElement.parentNode;
        } while (targetElement);

        // This is a click outside.
        toggleCheckboxArea(true);
        //console.log('click outside');
    });
}

function checkboxStatusChange() {
    var multiselect = document.getElementById("mySelectLabel");
    var multiselectOption = multiselect.getElementsByTagName('option')[0];

    var values = [];
    var checkboxes = document.getElementById("mySelectOptions");
    var checkedCheckboxes = checkboxes.querySelectorAll('input[type=checkbox]:checked');

    for (const item of checkedCheckboxes) {
        var checkboxValue = item.getAttribute('value');
        values.push(checkboxValue);
    }

    var dropdownValue = "Select Services";
    if (values.length > 0) {
        dropdownValue = values.join(', ');
    }

    multiselectOption.innerText = dropdownValue;
}

function toggleCheckboxArea(onlyHide = false) {
    var checkboxes = document.getElementById("mySelectOptions");
    var displayValue = checkboxes.style.display;

    if (displayValue != "block") {
        if (onlyHide == false) {
            checkboxes.style.display = "block";
        }
    } else {
        checkboxes.style.display = "none";
    }
}


    function fillServicesDropDownFromDatabase() {
        debugger;
        $.ajax({
            type: "POST",
            url: "index.aspx/GetServicesDropDownFromDatabase",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {               
                debugger;
                if(r.Message!='Authentication failed.'){
                    var data = JSON.parse(r.d);
                    var innerHTMLs = "";
                    for (var i = 0; i < data.length; i++) {
                        var serviceID = data[i].Service_ID;
                        var serviceName = data[i].Services_Name;
                        innerHTMLs += "<label for='" + serviceName + "'><input type='checkbox' id='" + serviceID + "' onchange='checkboxStatusChange()' value='" + serviceName + "' />" + serviceName + "</label>";
                    }
                    $('#mySelectOptions').html(innerHTMLs);
                }
            },
            error: function (r) {
                debugger;
                alert('error occured');
            }
        });
    }
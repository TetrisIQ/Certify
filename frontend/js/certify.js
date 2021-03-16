const backend = "http://localhost:8080/api/"
const verifyUrl = "http://192.168.0.49:5500/"


function login() {
    const username = $("#username").val();
    const password = $("#pwd").val();

    $.ajax({
        url: `${backend}login`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        type: 'POST',
        //dataType: 'json',
        //contentType: 'application/json',
        //processData: false,
        //data: "",
        success: function () {
            sessionStorage.setItem("username", username)
            sessionStorage.setItem("password", password)
            location.reload();
        },
        error: function () {
            $("#upwrong").collapse('show');
            setInterval(() => {
                $("#upwrong").collapse('hide');
            }, 3000);
        }
    });
}

function newLine() {
    $(".add").remove()
    $('#table tbody').append(`<tr><td><input type="text" class="form-control" placeholder="Fach"></td><td><input type="text" class="form-control" placeholder="Note" aria-label="Note"aria-describedby="basic-addon1"></td><td><button onclick="newLine()" class="btn btn-secondary text-white add">+</button></td></tr>`);

}

function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
        return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    });
}

function generate() {
    var data = {}
    $('table > tbody  > tr').each(function (index, tr) {
        var n = tr.children[1].children[0].value;
        var f = tr.children[0].children[0].value;
        f = f.trim();
        n = n.trim();
        data[f] = n;
    });

    data['name'] = $("#name").val()
    data['organisation'] = $("#organisation").val()
    data['text'] = $("#text").val()

    sha512(data).then(function (hash) {
        $.ajax({
            url: `${backend}${hash}`,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(sessionStorage.getItem("username") + ":" + sessionStorage.getItem("password")));
            },
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            success: function (ret) {
                $("#verify-text").toggle();
                $("#verify-token").html(ret.verifyToken);
                createQR(createUrl(data))
            },
            error: function () {
                
            }
        });
    });

}

function createQR(url) {
    const qrCode = new QRCodeStyling({
        //to begin with we need to set the size of our QR code using the following
          width: 300,
          height: 300,
        //then we pass the data we want to share with the qr code
          data: url,
        //the following option is to set an image on the center (if you want one, if not you can avoid this )
          //image: "https://lh3.googleusercontent.com/ogw/ADGmqu_MN8SycvmR5uqUWFdKpIJ4-LP1NWLBKoNmQ0JO=s83-c-mo",
        //then we can style the dots of the QR code
        //it has 3 different types of dots 'rounded' 'dots' and'square' 
        //for this example I will use square which is also the default type
          dotsOptions: {
            color: "#F3969A",
            type: "square"
          },
        //and at last we will set the style of the background of the QR code
          backgroundOptions: {
            color: "#FFFFFF",
          }
        });
        qrCode.append(document.getElementById("qr-code"));

        
}

function createUrl(data) {
    var ret = `${verifyUrl}verify.html?`;
    for (const p in data) {
        ret += `${p}=${data[p]}&`
    }
    return ret.substring(0, ret.length - 1);

}

function openPwChangeDialog(){
    $("#modal").load("modal/pwreset.html");
    setTimeout(() => {
        $("#myModal").modal()
    }, 100);


}

$('#pw, #pwW').on('keyup', function () {
    if ($('#pwdId').val() != '' && $('#cPwdId').val() != '' && $('#pwdId').val() == $('#cPwdId').val()) {
      $("#submitBtn").attr("disabled",false);
      $('#cPwdValid').show();
      $('#cPwdInvalid').hide();
      $('#cPwdValid').html('Valid').css('color', 'green');
      $('.pwds').removeClass('is-invalid')
    } else {
      $("#submitBtn").attr("disabled",true);
      $('#cPwdValid').hide();
      $('#cPwdInvalid').show();
      $('#cPwdInvalid').html('Not Matching').css('color', 'red');
      $('.pwds').addClass('is-invalid')
    }
});


function resetPW(){
    var newPW = $("#pw");
    //TODO: CHECK PASSWORD EQUALS
    $.ajax({
        url: `${backend}user/password/change?newPassword=${newPW}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(sessionStorage.getItem("username") + ":" + sessionStorage.getItem("password")));
        },
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (ret) {
            sessionStorage.clear();
            location.reload();
        },
        error: function () {
            
        }
    });

}



$(function () {
    if (sessionStorage.getItem("username") == null) {
        $("#modal").load("modal/login.html");
    } else {
        // Load settings modal
        $("#modal").load("modal/settings.html");
    }



    $("#login").click(function () {
        console.log("NASE")
    })

});

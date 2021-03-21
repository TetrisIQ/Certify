const backend = "http://localhost:8080/api/";
const verifyUrl = "http://192.168.0.49:5500/";


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

function popperjs() {

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
    const qrCode = new QRCodeStyling(
        {
            "width": 300,
            "height": 300,
            "data": url,
            "margin": 0,
            "qrOptions": {"typeNumber": "0", "mode": "Byte", "errorCorrectionLevel": "Q"},
            "imageOptions": {"hideBackgroundDots": true, "imageSize": 0.4, "margin": 1},
            "dotsOptions": {"type": "square", "color": "#e74c3c"},
            "backgroundOptions": {"color": "#ffffff"},
            "image": "data:image/svg+xml;base64,PHN2ZyBpZD0iRWJlbmVfMSIgZGF0YS1uYW1lPSJFYmVuZSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NjYuOTMgNTY2LjkzIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzMzYjI5ODt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjgzLjQ2LDE3LjQ5Yy0xNDYuODksMC0yNjYsMTE5LjA4LTI2NiwyNjZzMTE5LjA4LDI2NiwyNjYsMjY2LDI2Ni0xMTkuMDgsMjY2LTI2NlM0MzAuMzYsMTcuNDksMjgzLjQ2LDE3LjQ5Wk0zNjgsNDQ5YTE3MC42OSwxNzAuNjksMCwwLDEtNjguNzIsMTQuNTJxLTQwLjE3LDAtNzQtMTIuNTh0LTU4LjU2LTM2LjA2UTE0MiwzOTEuMzksMTI4LjI0LDM1OHQtMTMuNzktNzQuNTNxMC00MS4xMSwxMy43OS03NC41MnQzOC40Ny01Ni44NlExOTEuNCwxMjguNjEsMjI1LjI3LDExNnQ3NC0xMi41OGExODEuODYsMTgxLjg2LDAsMCwxLDMwLjI1LDIuNjYsMTY0LDE2NCwwLDAsMSwzMSw4LjQ3LDEzOC4yNiwxMzguMjYsMCwwLDEsMjkuMjgsMTUuNDlBMTE2LjY0LDExNi42NCwwLDAsMSw0MTUsMTUzLjc3TDM1Ni45LDIwMS4xOWE3NC4xMSw3NC4xMSwwLDAsMC0yNy4zNC0yMC44cS0xNi4yMy03LjI2LTM3LjUxLTcuMjZhOTMuNzcsOTMuNzcsMCwwLDAtNzAuODksMzEuMjEsMTA3LjEyLDEwNy4xMiwwLDAsMC0yMC44MSwzNS4wOSwxMjYsMTI2LDAsMCwwLTcuNSw0NHEwLDI0LjIxLDcuNSw0NC4yOGExMDkuOTQsMTA5Ljk0LDAsMCwwLDIwLjU2LDM0Ljg1LDkzLjE4LDkzLjE4LDAsMCwwLDMwLjczLDIzLDg4LjgxLDg4LjgxLDAsMCwwLDM4LDguMjNxMjMuMjQsMCw0MS4xNC05LjY4QTgxLjkxLDgxLjkxLDAsMCwwLDM2MC4yOSwzNTdMNDIzLjIsNDA0QTEzMSwxMzEsMCwwLDEsMzY4LDQ0OVoiLz48L3N2Zz4=",
            "cornersSquareOptions": {"type": "square", "color": "#18bc9c"},
            "cornersDotOptions": {"type": "", "color": "#18bc9c"},
        }
    );
    qrCode.append(document.getElementById("qr-code"));


}

function createUrl(data) {
    var ret = `${verifyUrl}verify?`;
    for (const p in data) {
        ret += `${p}=${data[p]}&`
    }
    return ret.substring(0, ret.length - 1);

}

$('#pw, #pwW').on('keyup', function () {
    if ($('#pwdId').val() != '' && $('#cPwdId').val() != '' && $('#pwdId').val() == $('#cPwdId').val()) {
        $("#submitBtn").attr("disabled", false);
        $('#cPwdValid').show();
        $('#cPwdInvalid').hide();
        $('#cPwdValid').html('Valid').css('color', 'green');
        $('.pwds').removeClass('is-invalid')
    } else {
        $("#submitBtn").attr("disabled", true);
        $('#cPwdValid').hide();
        $('#cPwdInvalid').show();
        $('#cPwdInvalid').html('Not Matching').css('color', 'red');
        $('.pwds').addClass('is-invalid')
    }
});


function resetPW() {
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

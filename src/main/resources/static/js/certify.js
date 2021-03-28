const verifyUrl = window.location.origin;
const backend = `${verifyUrl}/api/`;

var qrCode;

function newLine() {
    $(".add").remove();
    $('#table tbody').append(`<tr><td><input type="text" class="form-control" placeholder="Fach"></td><td><input type="text" class="form-control" placeholder="Note" aria-label="Note"aria-describedby="basic-addon1"></td><td><button onclick="newLine()" class="btn btn-secondary text-white add">+</button></td></tr>`);
}

function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
        return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    });
}

// String => Base64
function encode(str) {
    return btoa(JSON.stringify(str));
}

// Base64 => String
function decode(str) {
    return atob(str)
}

function generate() {
    $("#qr-code").html("");
    var data = {};
    $('table > tbody  > tr').each(function (index, tr) {
        var n = tr.children[1].children[0].value;
        var f = tr.children[0].children[0].value;
        f = f.trim();
        n = n.trim();
        data[f] = n;
    });

    data['n'] = $("#name").val();
    data['o'] = $("#organisation").val();
    data['text'] = $("#text").val();
    var encodedData = encode(data);
    sha512(data).then(function (hash) {
        console.log(hash);
        $.ajax({
            url: `${backend}${hash}`,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            success: function (ret) {
                $("#verify-text").show();
                $("#verify-token").html(ret.verifyToken);
                createQR(`${verifyUrl}/verify?data=${encodedData}&hash=sha512&verify=${ret.verifyToken}`);
                $("#new > div > div.row > div.col.text-right > button").html("Download");
                $("#new > div > div.row > div.col.text-right > button").attr("onclick", "downloadQR()");
            },
            error: function () {

            }
        });
    });

}

function downloadQR() {
    var name = $("#name").val();
    var verifyToken = $("#verify-token").html();
    var name = `${name}-${verifyToken}.jpeg`;
    qrCode.download({name: name, extension: 'jpeg'});
}

function createQR(url) {
    console.log(url);
    qrCode = new QRCodeStyling(
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

var variables;

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = {}, hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {

        hash = hashes[i].split('=');
        var key = decodeURIComponent((hash[0] + '').replace(/\+/g, '%20'));
        var val = decodeURIComponent((hash[1] + '').replace(/\+/g, '%20'));
        vars[key] = val;
    }
    console.log(vars);
    variables = vars;
    variables.data = JSON.parse(decode(vars.data));
}

function createTable() {
    getUrlVars();
    for (const p in variables.data) {
        if (p === "text") {
            $("#text").html(variables.data[p])

        } else if (p === "n") {
            $("#name").html(variables.data[p])
        } else if (p === "o") {
            $("#organisation").html(variables.data[p])

        } else {
            $('#table tbody').append(`<tr><th>${p}</th><td>${variables.data[p]}</td></tr>`);
        }
    }
}

function verifyBtn() {
    sha512(variables).then(function (hash) {
        $.get(`${backend}verify/${hash}`, function (res) {
            $("#verifyToken").html(res);
            if(res === variables["verify"]) {
                $("body").css("background-color", "var(--success)")
            } else {
                $("body").css("background-color", "var(--danger)")
            }
        })
            .fail(function (e) {
                $("#verifyToken").html(e);
            })
    });
}


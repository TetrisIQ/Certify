const variables = getUrlVars();
const backend = "http://localhost:8080/api/verify/"
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
    console.log(vars)
    return vars;
}

function createTable() {
    for (const p in variables) {
        if (p === "n") {
            $("#name").html(variables[p])
        }
        else if (p === "o") {
            $("#organisation").html(variables[p])

        }
        else {
            $('#table tbody').append(`<tr><th>${p}</th><td>${variables[p]}</td></tr>`);
        }
    }
}

function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
        return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    });
}



$(function () {
    createTable();

    $("#btn-verify").click(function () {
        sha512(variables).then(function (hash) {
            console.log(hash);
            $.get(`${backend}${hash}`, function (res) {
                $("#verifyToken").html(res)
                console.log(res)

            })
                .done(function (res) {

                })
                .fail(function (e) {
                    alert("error");
                    console.error(e);
                })
        });


    });
});

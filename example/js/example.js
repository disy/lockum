/** @type {typeof import('../../src/index')} */
var myLibrary



$("#encryptButton").click(function () {

    let output = document.getElementById("out")

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>"
        return
    }

    navigator.geolocation.getCurrentPosition(success, error, geo_options)
    function success(position) {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let plaintext = $("#messageToEncrypt").val()
        let toleranceDistance = parseInt(toleranceDistanceField.value.toString())
        let ciphertext = lockum.encrypt(latitude, longitude, plaintext, toleranceDistance)
        ciphertext.then(function (ciphertext) {
            $("#messageToDecrypt").text(ciphertext)
        })
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location"
    }

    var geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    }
})

$("#decryptButton").click(function () {

    let output = document.getElementById("out")

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>"
        return
    }

    navigator.geolocation.getCurrentPosition(success, error, geo_options)
    function success(position) {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let ciphertext = $("#messageToDecrypt").val()
        let plaintext = lockum.decrypt(latitude, longitude, ciphertext)
        plaintext.then(function (plaintext) {
            console.log("plain textimiz:" + plaintext)
            $("#cipherTextArea").text(plaintext)
        })
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location"
    }

    var geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    }
})


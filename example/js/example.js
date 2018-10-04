/** @type {typeof import('..//..//src/index')} */
var library = mylib

$("#encryptButton").click(function () {

    let output = document.getElementById("out")

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>"
        return
    }

    navigator.geolocation.getCurrentPosition(success, error, geo_options)
    function success(position) {
        let latitude = position.coords.latitude
        latitude = convertToDegreesDecimalMinutes(latitude, true)
        let longitude = position.coords.longitude
        longitude = convertToDegreesDecimalMinutes(longitude, false)
        let plaintext = $("#messageToEncrypt").val()
        let toleranceDistance = parseInt(toleranceDistanceField.value.toString())
        let ciphertext = library.encrypt(latitude, longitude, plaintext, toleranceDistance)
        ciphertext.then(function (ciphertextResult) {
            $("#messageToDecrypt").text(ciphertextResult)
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
        latitude = convertToDegreesDecimalMinutes(latitude, true)
        let longitude = position.coords.longitude
        longitude = convertToDegreesDecimalMinutes(longitude, false)
        let ciphertext = $("#messageToDecrypt").val()
        let plaintext = library.decrypt(latitude, longitude, ciphertext)
        plaintext.then(function (plaintextResult) {
            $("#cipherTextArea").text(plaintextResult)
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

function convertToDegreesDecimalMinutes(locationValue, isLatitude) {
    let locationSign = ""
    if (locationValue < 0 && isLatitude) {
        locationSign = "S"
        locationValue = locationValue * -1
    } else if (locationSign < 0 && !isLatitude) {
        locationSign = "W"
        locationValue = locationValue * -1
    } else if (locationValue > 0 && isLatitude) {
        locationSign = "N"
    } else if (locationValue > 0 && !isLatitude) {
        locationSign = "E"
    }

    let degreesPart = Math.floor(locationValue)
    let floatingMinutes = +((locationValue % 1) * 60).toFixed(4)
    let minutesIntegralPart = Math.floor(floatingMinutes)
    let minutesIntegralDigitNumber = Math.floor(Math.log10(minutesIntegralPart)) + 1
    let degreesDecimalMinutes = (degreesPart * (Math.pow(10, minutesIntegralDigitNumber))) + floatingMinutes

    return [locationSign, degreesDecimalMinutes]
}


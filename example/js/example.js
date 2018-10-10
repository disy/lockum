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
        //get latitude and longitude values from API
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        //get plaintext and tolerance distance from the html page
        let plaintext = $("#messageToEncrypt").val()
        let toleranceDistance = parseInt(toleranceDistanceField.value.toString())

        latitude = convertToDegreesDecimalMinutes(latitude, true)
        longitude = convertToDegreesDecimalMinutes(longitude, false)

        let ciphertext = library.encrypt(latitude, longitude, plaintext, toleranceDistance)

        ciphertext.then(function (ciphertextResult) {

        const saltArray = Array.from(ciphertextResult[2])
        const storedSalt = JSON.stringify(saltArray)
        const ivArray = Array.from(ciphertextResult[3])
        const storedIV = JSON.stringify(ivArray)

         localStorage.setItem("keyhash", ciphertextResult[0])
         localStorage.setItem("salt", storedSalt)
         localStorage.setItem("iv", storedIV)
         console.log("ciphertext bakınız:"+ciphertextResult[1])
         localStorage.setItem("ciphertext", ciphertextResult[1])

            console.log("sonuc:")
            console.log(ciphertextResult)
            $("#keyhashField").text(localStorage.getItem("keyhash"))
            $("#messageToDecrypt").text(ciphertextResult[1])
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

        const salt = localStorage.getItem("salt")
        const retrievedSaltArray = JSON.parse(salt)
        const saltBytes = new Uint8Array(retrievedSaltArray)
        console.log("salt bytes receiver:"+saltBytes)

        const iv = localStorage.getItem("iv")
        const retrievedIvArray = JSON.parse(iv)
        const ivBytes = new Uint8Array(retrievedIvArray)
        console.log("iv bytes receiver:"+ivBytes)

        let ciphertext = localStorage.getItem("ciphertext")
        console.log("ciphertext receiver:"+ciphertext)
        let keyhash  =localStorage.getItem("keyhash")
        console.log("keyhash receiver taken as:"+keyhash)
        let toleranceDistance = parseInt(JSON.parse(localStorage.getItem("toleranceDistance")))
        console.log("tolerance distance taken as:"+toleranceDistance)

        let plaintext = library.decrypt(latitude, longitude, ciphertext, saltBytes, ivBytes, toleranceDistance, keyhash)
        plaintext.then(function (plaintextResult) {
            let hash = localStorage.getItem("keyhashReceiver")
            console.log(plaintextResult)
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


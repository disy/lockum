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

        let ciphertext = library.encrypt(latitude, longitude, plaintext, toleranceDistance)

        ciphertext.then(function (ciphertextResult) {

        const saltArray = Array.from(ciphertextResult[2])
        const storedSalt = JSON.stringify(saltArray)
        const ivArray = Array.from(ciphertextResult[3])
        const storedIV = JSON.stringify(ivArray)

         localStorage.setItem("keyhash", ciphertextResult[0])
         localStorage.setItem("salt", storedSalt)
         localStorage.setItem("iv", storedIV)
         localStorage.setItem("ciphertext", ciphertextResult[1])
         localStorage.setItem("toleranceDistance",parseInt(ciphertextResult[4]))

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
        let longitude = position.coords.longitude

        const salt = localStorage.getItem("salt")
        const retrievedSaltArray = JSON.parse(salt)
        const saltBytes = new Uint8Array(retrievedSaltArray)

        const iv = localStorage.getItem("iv")
        const retrievedIvArray = JSON.parse(iv)
        const ivBytes = new Uint8Array(retrievedIvArray)

        let ciphertext = localStorage.getItem("ciphertext")
        let keyhash  =localStorage.getItem("keyhash")
        let toleranceDistance = parseInt(JSON.parse(localStorage.getItem("toleranceDistance")))

        let plaintext = library.decrypt(latitude, longitude, ciphertext, saltBytes, ivBytes, toleranceDistance, keyhash)
        plaintext.then(function (plaintextResult) {
            $("#keyhashFieldReceiver").text(plaintextResult[1])
            $("#cipherTextArea").text(plaintextResult[0])
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


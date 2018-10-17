/** @type {typeof import('..//..//src/index')} */
var lockumLib = lockum

$("#encryptButton").click(function () {
    let output = document.getElementById("out")

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>"
        return
    }

    navigator.geolocation.getCurrentPosition(success, error, geo_options)
    function success(position) {

        let selectedLocation = document.querySelector('input[name="location"]:checked').value

        let latitude = position.coords.latitude
        let longitude = position.coords.longitude

        if (selectedLocation == "California") {
            latitude = 36.473202
            longitude = -119.748167
        } else if (selectedLocation == "Istanbul") {
            latitude = 41.006340
            longitude = 28.978664
        } else if (selectedLocation == "Konstanz") {
            latitude = 47.689759
            longitude = 9.185248
        }
        else {
            latitude = 59.329145
            longitude = 18.067918
        }


        //get plaintext and tolerance distance from the html page
        let plaintext = $("#messageToEncrypt").val()
        let toleranceDistance = parseInt(toleranceDistanceField.value.toString())

        let locationData = [latitude, longitude, toleranceDistance]

        console.log("latitude and longitude are1:" + latitude + longitude)

        //library call. It returns ciphertext,key hash, iv, salt and tolerance distance
        let ciphertext = lockumLib.encrypt(locationData, plaintext)
        ciphertext.then(function (ciphertextResult) {

            //save values to the browser from library call result so that receiver can take them
            const saltArray = Array.from(ciphertextResult[3])
            const storedSalt = JSON.stringify(saltArray)
            const ivArray = Array.from(ciphertextResult[4])
            const storedIV = JSON.stringify(ivArray)
            localStorage.setItem("keyhash", ciphertextResult[1])
            localStorage.setItem("salt", storedSalt)
            localStorage.setItem("iv", storedIV)
            localStorage.setItem("ciphertext", ciphertextResult[0])
            localStorage.setItem("toleranceDistance", parseInt(ciphertextResult[2]))

            console.log(ciphertextResult)
            //set the ciphertext and keyhash values in browser
            $("#keyhashField").text(ciphertextResult[1])
            $("#messageToDecrypt").text(ciphertextResult[0])
            $("#saltField").text(ciphertextResult[3])
            $("#ivField").text(ciphertextResult[4])
        }).catch(err => {
            console.log("library couldnt encrypt the message: " + err)
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

        let receiverLocation = document.querySelector('input[name="receiverLocation"]:checked').value

        let latitude = position.coords.latitude
        let longitude = position.coords.longitude

        if (receiverLocation == "California") {
            latitude = 36.473202
            longitude = -119.748167
        } else if (receiverLocation == "Istanbul") {
            latitude = 41.006340
            longitude = 28.978664
        } else if (receiverLocation == "Konstanz") {
            latitude = 47.689759
            longitude = 9.185248
        }
        else {
            latitude = 59.329145
            longitude = 18.067918
        }

        //get the salt value from return value of the library call
        const salt = localStorage.getItem("salt")
        const retrievedSaltArray = JSON.parse(salt)
        const saltBytes = new Uint8Array(retrievedSaltArray)

        //get the iv from return value of the library call
        const iv = localStorage.getItem("iv")
        const retrievedIvArray = JSON.parse(iv)
        const ivBytes = new Uint8Array(retrievedIvArray)

        //get the cipher text,key hash and tolerance distance from library call
        let ciphertext = localStorage.getItem("ciphertext")
        let keyhash = localStorage.getItem("keyhash")
        let toleranceDistance = parseInt(JSON.parse(localStorage.getItem("toleranceDistance")))

        let locationData = [latitude, longitude, toleranceDistance]
        let decryptionElements = [saltBytes, ivBytes, ciphertext, keyhash]

        console.log("latitude and longitude are:" + latitude + longitude)

        //call library to decrypt, returns the plain text and calculated key hash
        let plaintext = lockumLib.decrypt(locationData, decryptionElements)
        plaintext.then(function (plaintextResult) {
            $("#keyhashFieldReceiver").text(plaintextResult[1])
            $("#cipherTextArea").text(plaintextResult[0])
        }).catch(err => {
            console.log("library couldnt decrypt the ciphertext: " + err)
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


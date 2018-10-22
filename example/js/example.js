/** @type {typeof import('..//..//src/index')} */
var lockumLib = lockum

$("#encryptButton").click(function () {
    let latitude
    let longitude
    let output = document.getElementById("out")

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>"
        return
    }

    let locationSelection = document.querySelector('input[name="location"]:checked').value

    if (locationSelection == "Current") {

        navigator.geolocation.getCurrentPosition(success, error, geo_options)
        function success(position) {

            let latitude = position.coords.latitude
            let longitude = position.coords.longitude

            //get plaintext and tolerance distance from the html page
            let plaintext = $("#messageToEncrypt").val()
            let toleranceDistance = parseInt(toleranceDistanceField.value.toString())

            let locationData = [latitude, longitude, toleranceDistance]

            //library call. It returns an object of  ciphertext,key hash, iv, salt and tolerance distance
            let ciphertext = lockumLib.encrypt(locationData, plaintext)
            ciphertext.then(function (ciphertextResult) {
                //save values to the browser from library call result so that receiver can take them
                const saltArray = Array.from(ciphertextResult.getSalt())
                const storedSalt = JSON.stringify(saltArray)
                const ivArray = Array.from(ciphertextResult.getIV())
                const storedIV = JSON.stringify(ivArray)
                localStorage.setItem("keyhash", ciphertextResult.getKeyHash())
                localStorage.setItem("salt", storedSalt)
                localStorage.setItem("iv", storedIV)
                localStorage.setItem("ciphertext", ciphertextResult.getEncryptedText())
                localStorage.setItem("toleranceDistance", ciphertextResult.getToleranceDistance())

                //set the ciphertext and keyhash values in browser
                $("#keyhashField").text(ciphertextResult.getKeyHash())
                $("#messageToDecrypt").text(ciphertextResult.getEncryptedText())
                $("#saltField").text(ciphertextResult.getSalt())
                $("#ivField").text(ciphertextResult.getIV())
            }).catch(err => {
                console.log("library couldnt encrypt the message: " + err)
            })
        }

    } else {

        if (selectedLocation == "autopark") {
            latitude = 47.689401
            longitude = 9.186046
        } else if (selectedLocation == "zahringerplatz") {
            latitude = 47.672352
            longitude = 9.183634
        } else if (selectedLocation == "bahnhof") {
            latitude = 47.658895
            longitude = 9.176983
        }
        else if (selectedLocation == "meersburg") {
            latitude = 47.698774
            longitude = 9.266201
        }

        //get plaintext and tolerance distance from the html page
        let plaintext = $("#messageToEncrypt").val()
        let toleranceDistance = parseInt(toleranceDistanceField.value.toString())

        let locationData = [latitude, longitude, toleranceDistance]

        //library call. It returns an object of  ciphertext,key hash, iv, salt and tolerance distance
        let ciphertext = lockumLib.encrypt(locationData, plaintext)
        ciphertext.then(function (ciphertextResult) {
            //save values to the browser from library call result so that receiver can take them
            const saltArray = Array.from(ciphertextResult.getSalt())
            const storedSalt = JSON.stringify(saltArray)
            const ivArray = Array.from(ciphertextResult.getIV())
            const storedIV = JSON.stringify(ivArray)
            localStorage.setItem("keyhash", ciphertextResult.getKeyHash())
            localStorage.setItem("salt", storedSalt)
            localStorage.setItem("iv", storedIV)
            localStorage.setItem("ciphertext", ciphertextResult.getEncryptedText())
            localStorage.setItem("toleranceDistance", ciphertextResult.getToleranceDistance())

            //set the ciphertext and keyhash values in browser
            $("#keyhashField").text(ciphertextResult.getKeyHash())
            $("#messageToDecrypt").text(ciphertextResult.getEncryptedText())
            $("#saltField").text(ciphertextResult.getSalt())
            $("#ivField").text(ciphertextResult.getIV())
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
    let latitude
    let longitude
    let output = document.getElementById("out")

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>"
        return
    }

    let receiverLocationSelection = document.querySelector('input[name="receiverLocation"]:checked').value

    if (receiverLocationSelection == "Current") {

        navigator.geolocation.getCurrentPosition(success, error, geo_options)
        function success(position) {
            latitude = position.coords.latitude
            longitude = position.coords.longitude

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

            //call library to decrypt, returns the plain text and calculated key hash
            let plaintext = lockumLib.decrypt(locationData, decryptionElements)
            plaintext.then(function (plaintextResult) {
                $("#keyhashFieldReceiver").text(plaintextResult.getKeyHash())
                $("#cipherTextArea").text(plaintextResult.getEncryptedText())
            }).catch(err => {
                $("#keyhashFieldReceiver").text("library couldnt decrypt the ciphertext: " + err)
                $("#cipherTextArea").text("library couldnt decrypt the ciphertext: " + err)
            })
        }
    } else {

        if (receiverLocationSelection == "autopark") {
            latitude = 47.689401
            longitude = 9.186046
        } else if (receiverLocationSelection == "zahringerplatz") {
            latitude = 47.672352
            longitude = 9.183634
        } else if (receiverLocationSelection == "bahnhof") {
            latitude = 47.658895
            longitude = 9.176983
        }
        else if (receiverLocationSelection == "meersburg") {
            latitude = 47.698774
            longitude = 9.266201
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

        //call library to decrypt, returns the plain text and calculated key hash
        let plaintext = lockumLib.decrypt(locationData, decryptionElements)
        plaintext.then(function (plaintextResult) {
            $("#keyhashFieldReceiver").text(plaintextResult.getKeyHash())
            $("#cipherTextArea").text(plaintextResult.getEncryptedText())
        }).catch(err => {
            $("#keyhashFieldReceiver").text("library couldnt decrypt the ciphertext: " + err)
            $("#cipherTextArea").text("library couldnt decrypt the ciphertext: " + err)
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


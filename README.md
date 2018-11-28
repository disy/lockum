## Lockum: A Location Based Encryption Library

[![Build Status](https://travis-ci.org/disy/lockum.svg?branch=master)](https://travis-ci.org/disy/lockum)
[![codecov](https://codecov.io/gh/disy/lockum/branch/master/graph/badge.svg)](https://codecov.io/gh/disy/lockum)

Lockum is a location based encryption library, along with which one can encrypt and decrypt messages using the location information.

Essentially, the library lets a sender to encrypt messages using location information. To do that it uses latitude, longitude and tolerance distance values. Latitude and longitude values refer to geographical location of the sender. Tolerance distance is a value in meters specifying the decrypt-able message range from the center.

To encrypt a message, one can simply call the library as follows:

```
 let encryptMessage = lockum.encrypt(locationInfo, message)
 ```

 Encrypt function expects two arguments,namely locationInfo and message. LocationInfo is a tuple which has three elements: latitude, longitude and tolerance distance, respectively. Message refers to plain text string that will be encrypted.

 Once function is called, the library creates a 256 bits AES encryption key using these arguments. Later, the data is encrypted using AES-GCM.

 When encryption is completed, the library returns an object with the following information: ciphertext, key hash , tolerance distance , salt and IV. These information should then be passed to receiver in order to successfully decrypt a message.

Using secure channel between the sender and the receiver, receiver should send the aforementioned values to the receiver.

Once receiver gets the information, he could simply call the library in order to decrypt a message:

```
 let decryptMessage = lockum.encrypt(locationInfo, decryptionElements)
 ```

 The decrypt function has two arguments: locationInfo and decryptionElements, both of which are tuples.
LocationInfo is a tuple consisting of three elements: latitude, longitude and tolerance distance. DecryptionElements is also a tuple consisting of 4 elements, salt, IV, ciphertext and keyhash.

When decryption is completed, the library returns an object with plain text and calculated key hash by the receiver. This way if the decryption is successfull, a receiver will be able to read a message.

Overall, the library consists of 6 classes, DataConvertionCalculations, EncryptionHelper, Location, Receiver,ResultHolder and lastly Sender classes. Sender class refers to sender side and it basically helps sender to encrypt messages. Likewise the receiver class is related to receiver side and responsible for decrypting the messages. What is common both in these classes is  that they both use user's location in order to fulfill the decryption or encryption process. In this case, Location class is used in the encrypt and decrypt functions. Location class is the one that takes latitude, longitude and tolerance distance values as argument and then transforms this values into input which could be used  in key derivation process. It does this by transforming those values using the schema stated in the encryption protocol. At the end, it creates input values both for sender and the receiver sides. EncryptionHelper class is the one that handles all encryption stuff. It simply consists of deriveKey, encrypt and decrypt functions all of which are crucial for encryption.DataConvertion class is the one which transforms data types into one another such as converting from string to byte array and so on. Lastly, ResultHolder class is used to store data that yields from encryption and decryption functions and using this class values are returned as an object.


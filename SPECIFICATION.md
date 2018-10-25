# Table of Contents
1. [Abstract](#Abstract)
2. [Introduction](#Introduction)
3. [High Level Overview](#High-Level-Overview)
3. [Requirements](#Requirements)
4. [Location Conversions](#Location-Conversions)
5. [How does it work](#How-does-it-work)
6. [Security Considerations](#Security-Considerations)
7. [Acknowledgements](#Acknowledgements)

 

## Abstract
This specification describes a location based encryption protocol. The protocol allows a sender to encrypt a message using location information. The sender is also able to specify a certain range called tolerance distance to increase decrypt-able message range. This way, a receiver will be able to decrypt the information if and only if he is within this range of area. Importantly, the protocol is designed to be a lightweight encryption protocol, hence encryption of highly sensitive information is not intended. 

## High Level Overview
Protocol assumes that there is a secure channel between the sender and the receiver. All of the information exchange should be sent over this secure channel.

1. Alice has a message and she wants to send this message to Bob.
2. Alice wants the message to be readable only within the certain area she decides.
3. Alice captures her location information and decides  a tolerance distance value, which is a value in meters and will be used to increase  readable message range from the center.
4. Alice creates an encryption key from her location information and tolerance distance value , encrypts her message with a symmetric encryption algorithm using this key and afterward the message is sent to Bob over the secure channel.
5. Bob gets the cipher text, by moving around he uses his location information to find the right key for the decryption and tries to decrypt message.
6. If Bob is within the correct area, the message will be decrypted with the correct key and read.

## Introduction

The main motivation behind the protocol is to include the location information into encryption process.
 The protocol does this by using the location information(latitude and longitude values) during the key generation process. Besides, in order to increase decrypt-able message range, Tolerance Distance(TD) is introduced by the sender, which is a value in meters specifying the maximal distance from the center which allows the receiver to decrypt the message.
 
  This location information with a provided tolerance distance is used in a key derivation function called [PBKDF2][3].Later, [PBKDF2][3] creates a 256 bits  cryptographically secure encryption key.  This key is then utilized in a symmetric encryption algorithm, AES, to encrypt a given plain text. After, the cipher text and some additional information is sent to the receiver over te secure channel. The receiver uses these information to build his own key to decrypt the message and if the right key is found, the message is succesfully brought back from the ciphertext.


## Requirements 

Protocol assumes the following requirements are met:

**1. Secure Channel Between Users**

During the execution of the protocol, all shared information between two users are transmitted via a secure channel. E.g [end-to-end-encryption][1].

**2. Trusted System Users**

Decryption is based on the location provided by the receiver. Hence, the location provided by the receiver should not be spoofed. A receiver would simply try to decrypt the message by guessing and providing several different locations.System expects users to be trustworthy and to provide legitimate location information.


## Location Conversions 

A different type of representation of a location might be gathered from the user. As a first step, it should be converted into Degrees Decimal Minutes form. Following formulas should be used for the correct conversion.

* **Degrees Minutes Seconds to Decimal Degrees**

 The general rule regarding DMS(Degrees Minutes Seconds to Decimal Degrees) to Decimal Degrees is as follows
 
 ```
 Decimal Degrees =  Degrees+(Minutes/60)+(Seconds/3600)
 ```
  An example conversion: N  52° 31' 14.941" (DMS)

 ```
 Decimal Degrees =  52+(31/60)+(14.941/3600) = 52.520817
 ```
 
 * **Degrees Minutes Seconds to Degrees Decimal Minutes**
 
 The general rule regarding DMS(Degrees Minutes Seconds to Decimal Degrees) to Degrees Decimal Minutes is as follows
 
 ```
Degrees Decimal Minutes  =  Degrees+Minutes+(Seconds/60)
```
An example conversion: N  52° 31' 14.941" (DMS)
```
Degrees Decimal Minutes =  52+31+(14.941/60) = 5231.2490
```

## How does it work?

The protocol starts by capturing  the location input. Required location format is degrees decimal minutes and convertions regarding location types can be reached above. A typical location input example can be given as follow:

```
N 4741.3501       E 911.8132
```
The information consisting of latitude and longitude values can be interpreted as 47 Degrees 41.3501 Minutes North and 9 Degrees 11.8132 Minutes East. As the location information  is captured, now the sender is ready to encrypt his message.

Following steps have to be completed by the sender in order to encrypt the message. :
1. Latitude and longitude values are multiplied by 10000 to be an integer and then divided by (tolerance_distance *   hemisphere_coefficient). Hemisphere coefficients are 5.4 and 6 for the latitude and longitude values, respectively.
2. Integer parts of the yielding results are stored.
3. In order to add location signs, the integer parts are multiplied by -1 if the sign is east or south and by 1 for north and west.
4. Finally, two of these final values are put together and stored to create an input for the key derivation function.
5. Once above steps are completed, input for the key derivation function is now ready to use.

Pseudocode of aforementioned steps can be shown as follows:

```
 getTransformedLocation() {
    let latitudePart = transformLocation(latitudeSign, latitudeValue)
    let longitudePart = transformLocation(longitudeSign, longitudeValue)

    let result = new Int32Array([latitudePart, longitudePart])
    return result
  }
```

```
 transformLocation(hemisphere: string, locationValue: number) {
    locationValue = locationValue * 10000

    if (hemisphere == "N" || hemisphere == "S") {
      return includeLocationSign(hemisphere, locationValue/(toleranceDistance*latitudeCoefficient))
    } else {
      return includeLocationSign(hemisphere, locationValue/(toleranceDistance*longitudeCoefficent))
    }
  }
```
```
includeLocationSign(hemisphere: string, locationValue: number) {
    if (hemisphere == "N" || hemisphere == "W") {
      return locationValue
    } else {
      return locationValue * -1
    }
  }
```

Once the sender completes above calculations, now the message can be encryped using following steps:

7. As the input for the key generation function is now ready, the sender should put this value into key derivation function [PBKDF2][3] in order to create a cryptographically secure encryption key. 

8. PBKDF2 expects couple of parameters such as type of hash function, salt and initial key input value. Hash function should be specified as "SHA-256". Iteration number for the key derivation function should be 1.000.000 and the required salt should be 32 bytes long as iv 16 bytes and should be both created using a cryptographic pseudo-random number generator (CPRNG). Initial key input value is the value calculated in step number 4. Also, the key size should be specified as 256 bits.

9. After [PBKDF2][3] runs, the sender will get a 256 bits cryptographically strong encryption key. The sender should put this key value into SHA-256 hash function in order to create a key hash, which will be used by the receiver to validate his own key.

10. Next step is to encrypt the data. The protocol uses AES encryption algorithm with GCM mode. GCM mode also uses [IV(initialization vector)][5] which is helpful to generate different ciphertexts even if the same message is encrypted with the same key over and over again. [IV(initialization vector)][5] should be 16 bytes and again should be created by a cryptographic pseudo-random number generator (CPRNG). Using 256 bits key, encryption takes place and cipher text is generated.
11. Last step is that  the ciphertext should be transmitted to the receiver side. However, without the salt,tolerance distance , key hash and IV, the receiver won't be able to accomplish same steps to generate the same key. Therefore,  salt, tolerance distance, key hash and IV values should be transmitted to the receiver along with the ciphertext.

If the sender successfully accomplishes all of the steps above, the cipher text and other information is sent to receiver. Now that the receiver has the required information and the cipher text, he should also go through the same steps with slight changes.

Here are the steps that should be followed by the receiver:

1.  Latitude and longitude values of the receiver's location are multiplied by 10000 to be an integer and then divided by (tolerance_distance * hemisphere_coefficient). Hemisphere coefficients are the same as 5.4 and 6 for the latitude and longitude values, respectively. Tolerance distance is already transmitted by the sender and now can be used.
2. Integer parts of the yielding results are stored. However, when the same process is applied by the receiver side, it is observed that the integer part of the resulting calculation after dividing by tolerance distance might be somewhat different than the sender side. This difference varies between 0 and 1. In order to fix this, the algorithm introduces some inaccuracy tolerance such that the receiver side should also calculate the other two adjacent quadrants. This could be done by using (±)1 values in the beginning of the step number 2. This way there will be 3 different values to try for both latitude and longitude values ,therefore, making it a total of 9 possible values at the end when longitude values are also taken into consideration. This brings up some false negative and false positive results but this is accepted as okey by the protocol.


 An example case:
```
N 4741.3501       E 911.8132
```
Let's take a look at this data, assume that it's the location of the sender and given tolerance distance is 10 meters. If the pseudocode is applied, the integer part for the latitude will be 878027 and 151968 for latitude. 

Now , take a look at a receiver who is currently located 10 meters away from the center. This means that his location patemeters for the latitude and longitude values are 4741.3555 and 911.8192  respectively. If the pseudo code is applied again, the integer values will yield 878028 and 151969. As can be seen from the values, both of them are +1 compared to their base values. Hence, even though the receiver is within the 10 meter distance, he wont be able to generate correct key as they are not the same. This being the case, the receiver would try following combinations:

```
 878027     151968
 878027     151969
 878027     151970
 878028     151968
 878028     151969
 878028     151970
 878029     151968
 878029     151969
 878029     151970
```

4.  In order to add location signs, the integer parts are multiplied by -1 if the sign is east or south and by 1 for north and west.
5. Finally, two of these numbers are put together and stored to create an input for the key derivation function.
6. As the key generation input is now ready, the receiver should put this value into key derivation function [PBKDF2][3] in order to create the same key with the one the sender has.
7. PBKDF2 functions requires couple of paremeters such as  salt, iteration number and hash function type, the sender should provide these. The salt is retrieved from the sender.Iteration number is 1.000.000 again and the hash function type is "SHA-256". At the end , created key should be 256 bits. Here the point is as 9 combinations are  created from the step number 2, there will be 9 different keys created and stored by the receiver. These keys will be tried to decrypt the cipher text. An invalid key won't decrypt the cipher text.Hence, the receiver uses the key hash, he got from the sender. Using this hash, he can compare the hash results of 9 keys with the one he got from the sender and makes sure that he has the right key.
8. Last step is to decrypt the data. If the receiver sees that one of his keys' hash value is the same he got from the sender, he can now succesfully decrypt the cipher text. As explained before, AES encryption system with the GCM mode requires the key and the IV(initialization vector), he can  use the key  he built and and the IV provided by the sender. Using these two, he can decrypt the message.

## Security Considerations

In this section we will discuss some of the security considerations.

As mentioned before, the encryption scheme expects users to be trusted. Because, a receiver would simply guess the location instead of being there in the first place. 
 Here, our solution is based on the nature of the key derivation function. The main purpose of the key derivation function is to create keys that are resistant against dictionary attacks and it does this by applying a pseudorandom function (PRF) to the key input many times. We make use of this iteration number in the PBKDF2  by setting it to 1000000 although 10000 iterations considered as secure. However, as long as the system is not significantly slowed down by this calculation, the higher number is better. This way a receiver who wants to guess the location will have to apply to this function as many times and therefore has to deal with this extra computational work.

Second consideration is that the salt and IV values should be generated by cryptographic pseudo random number generator. Also, these values should be renewed for each message in order to prevent rainbow attacks. That means that reuse of the salt is not recommended.

Third consideration is the fact that system allows some false positive and negative values for the receiver. This will yield some of the messages being read by the receiver who is not exactly within the tolerance distance however this toleration is highly low and the system accepts this as okey.

Lastly, another important matter regarding the system is that all of the information is  transmitted over the secure channel. Because, information such as salt and IV are  used to provide uniqueness for each operation, leakage of these information would allow an attacker to perform several different attacks. Using end to to end cryption we unable attackers to get this information.

## Acknowledgements

Special thanks to [Klaus Herbeth][4], as a supervisor who was helpful throughout the time and enlightened me with his profound knowledge, feedbacks and design suggestions during the discussions. 


[1]: https://en.wikipedia.org/wiki/End-to-end_encryption
[2]: https://en.wikipedia.org/wiki/Geographic_coordinate_conversion
[3]: https://www.ietf.org/rfc/rfc2898.txt
[4]: https://www.disy.uni-konstanz.de/members/research-assistants/klaus-herberth/
[5]: https://tools.ietf.org/html/rfc3686

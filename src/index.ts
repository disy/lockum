import * as ahmet from "./LocationApi"


ahmet.encrypt().then(function(acccept ){
    let b = ahmet.decrypt()
    b.then(function(a){
        console.log("mesagimiz:"+a)
    })
})
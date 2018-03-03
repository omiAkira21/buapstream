const $ = require('jquery')

function getIceObject(cb){
//inicio ajax
// let customConfig
$.ajax({
    url : "https://service.xirsys.com/ice",
    data:{
        ident : "omar4598",
        secret : "d3b7ee3e-1c14-11e8-a836-b39d14360139",
        domain : "global.xirsys.net",
        application : "default",
            room : "default",
            secure : 1 
        },
        success: function (data,status){
            cb(data.d)
        },
    }) 
}
    module.exports = getIceObject
   // $.ajax ({
   //     url: "https://global.xirsys.net/_turn/BuapStream/",
   //     type: "PUT",
   //     async: false,
   //     headers: {
   //       "Authorization": "Basic " + btoa("omar4598:d3b7ee3e-1c14-11e8-a836-b39d14360139")
   //     },
   //     success: function (res){
   //       console.log("ICE List: "+res.v.iceServers);
   //     }
   // });

//fin ajax
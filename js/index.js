

$(document).ready(function () {
    $.getJSON("questions.json", function(data) {
        questionsList = data.questionsList;

        for(i=0; i < 61; i++) {
            $(".image-gallery").append("<img class=\"face\" onclick=\"faceSelect(" + i + ")\" src=\"images/faces/" + i + ".png\" height=\"160px\" width=\"160px\">\n")
        }

        for(i=0; i < questionsList.length; i++) {
            $(".questions-list").append("<li class=\"dropdown-item\" onclick=\"questionSelect('" + questionsList[i] + "')\">" + questionsList[i] + "</li>\n")
        }
    });
});

function faceSelect(imgNum) {
    console.log(imgNum);
    $(".faceSelect").html("<img src=\"images/faces/" + imgNum + ".png\" height=\"100\" width=\"100px\" class=\"selected-face\">");
}

// $("#btn1").click(function(){
//     $("#test1").text("Hello world!");
//   });
//   $("#btn2").click(function(){
//     $("#test2").html("<b>Hello world!</b>");
//   });
//   $("#btn3").click(function(){
//     $("#test3").val("Dolly Duck");
//   });

function questionSelect(questionText){
    $(".questions-button").text(questionText);
}
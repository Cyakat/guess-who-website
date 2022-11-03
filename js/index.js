var questionsList = []

$(document).ready(function () {
    $.getJSON("keywords.json", function(data) {
        keywords = data.keywords;
        keywordType = data.keywordType;

        for(i=0; i < keywords.length; i++) {
            if (keywordType[i] == "adj") {
                questionsList[i] = "Are they " + keywords[i] + "?";
            } else {
                questionsList[i] = "Do they have " + keywords[i] + "?";
            }
        }

        for(i=0; i < 61; i++) {
            if(i % 2 == 0) {
                $(".image-gallery").append("<img class=\"face attribute-black\" onclick=\"faceSelect(" + i + ")\" src=\"images/faces/" + i + ".png\" height=\"160px\" width=\"160px\">\n")
            } else {
                $(".image-gallery").append("<img class=\"face attribute-white\" onclick=\"faceSelect(" + i + ")\" src=\"images/faces/" + i + ".png\" height=\"160px\" width=\"160px\">\n")
            }
        }

        dropup(questionsList);
    });
});

function faceSelect(imgNum) {
    console.log(imgNum);
    $(".faceSelect").html("<img src=\"images/faces/" + imgNum + ".png\" height=\"100\" width=\"100px\" class=\"selected-face\">");
}

function questionSelect(questionText){
    $(".questions-button").text(questionText);
    $("#vote-button").html("<button class=\"vote\" onclick=\"vote('" + questionText + "')\">shidding rn</button>")
}

function vote(questionText) {
    console.log(questionText)
    console.log(questionText.endsWith("black?"));
    for(i=0; i < questionsList.length; i++) {
        console.log(keywords[i])
        if(questionText.endsWith(keywords[i] + "?")) {
            $(".attribute-" + keywords[i]).hide();
            break;
        }
    }

    $("#vote-button").html("<button class=\"change-vote\" onclick=\"changeVote()\">change vote</button>");
    $(".hud-dropup").html("<button type=\"button\" class=\"btn btn-secondary dropdown-toggle questions-button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\" disabled>Vote submited</button>");


}

function changeVote(){
    $("#vote-button").html("<button class=\"vote\">shidding rn</button>");
    $(".hud-dropup").html("<button type=\"button\" class=\"btn btn-secondary dropdown-toggle questions-button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">Select Question <ul class=\"dropdown-menu questions-list\"></ul></button>");
    dropup(questionsList);
}

function dropup(questionsList){
    for(i=0; i < questionsList.length; i++) {
        $(".questions-list").append("<li class=\"dropdown-item\" onclick=\"questionSelect('" + questionsList[i] + "')\">" + questionsList[i] + "</li>\n")
    }
}
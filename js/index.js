var questionsList = [];
var face = "none";

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
    if(face !== "voted"){
        $(".faceSelect").html("<img src=\"images/faces/" + imgNum + ".png\" height=\"100\" width=\"100px\" class=\"selected-face\">");
        face = "some";
        questionSelect("Choose a Face");
    } 

    return;
    
}

function questionSelect(questionText){
    $(".questions-button").text(questionText);
    if(questionText === "Choose a Face" && face === "none") {
        $("#vote-button").html("<p style=\"padding: 0.5em 1em; margin-bottom: 50px;\">Choose a Face to Vote For</p>");
        return;
    } else if(questionText !== "Choose a Face"){
        face = "none";
        $(".faceSelect").html("<img src=\"images/faces/images/no-character.jpg\" height=\"100\" width=\"100px\" class=\"selected-face\">");
    }
    $("#vote-button").html("<button class=\"vote\" onclick=\"vote('" + questionText + "')\">shidding rn</button>")
}

function vote(questionText) {
    console.log(questionText)
    console.log(questionText.endsWith("black?"));
    if(questionText === "Choose a Face") {
        console.log(`face chosen`);
        voted();
        return;
    }
    for(i=0; i < questionsList.length; i++) {
        console.log(keywords[i])
        if(questionText.endsWith(keywords[i] + "?")) {
            $(".attribute-" + keywords[i]).hide();
            break;
        }
    }

    voted();

}

function changeVote(){
    $("#vote-button").html("<p style=\"padding: 0.5em 1em; margin-bottom: 50px;\">Choose an Option Before Voting</p>");
    $(".hud-dropup").html("<button type=\"button\" id=\"hudDropup\" class=\"btn btn-secondary dropdown-toggle questions-button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">Select Question <ul class=\"dropdown-menu questions-list\"></ul></button>");
    dropup(questionsList);
    face = "none";
    $(".faceSelect").html("<img src=\"images/faces/images/no-character.jpg\" height=\"100\" width=\"100px\" class=\"selected-face\">");
    console.log(questionsList);
}

function dropup(questionsList){
    $(".hud-dropup").append("<ul class=\"dropdown-menu questions-list\"><!-- Dropdown menu links --></ul>");
    for(i=0; i < questionsList.length; i++) {
        $(".questions-list").append("<li class=\"dropdown-item\" onclick=\"questionSelect('" + questionsList[i] + "')\">" + questionsList[i] + "</li>\n")
    }
    $(".questions-list").append("<div class=\"dropdown-divider\"></div>");
    $(".questions-list").append("<li class=\"dropdown-item\" onclick=\"questionSelect('Choose a Face')\">Choose a Face</li>\n");
}

function voted(){
    $("#vote-button").html("<button class=\"change-vote\" onclick=\"changeVote()\">Change Vote</button>");
    $(".hud-dropup").html("<button type=\"button\" id=\"hudDropup\" class=\"btn btn-secondary dropdown-toggle questions-button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\" disabled>Vote Submited</button>");
    face = "voted";
}
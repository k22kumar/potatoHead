const potatoHeadApp = {
  //Variables
  //keeps track of which part is currently being shown
  partsCounter: 0,
  partsArray: $(".partBin"),
  $drawer: $(".drawer"),

  //paint variables
  primaryPressed: false,

  //all dropzones act as the containers for the dragabble parts
  eyeDropzones: document.querySelectorAll(".eye"),
  hatDropzones: document.querySelectorAll(".hat"),
  noseDropzones: document.querySelectorAll(".nose"),
  mouthDropzones: document.querySelectorAll(".mouth"),
  leftShoeDropzones: document.querySelectorAll(".leftShoe"),
  rightShoeDropzones: document.querySelectorAll(".rightShoe"),
  leftEarDropzones: document.querySelectorAll(".leftEar"),
  rightEarDropzones: document.querySelectorAll(".rightEar")
};

potatoHeadApp.init = function () {
    potatoHeadApp.makeEyes();
    potatoHeadApp.showNextPart();
    potatoHeadApp.showPrevPart();
    potatoHeadApp.primaryColor();
    potatoHeadApp.openToolBox();
}

potatoHeadApp.makeEyes = function () {
    //notes to self - in order for swappable to work, there needs to be an EXISTING element to swap WITH. OTHERWISE nothing will happen. possible fix, create an invisble element on body to swap WITH that user wont notice.
    let droppableEye = new Draggable.Swappable(
        potatoHeadApp.eyeDropzones,
        {
            draggable: '.draggable',
            dropzone: '.eye',
            mirror: { constrainDimensions: true }
        }
    );

    let droppableHat = new Draggable.Droppable(
        potatoHeadApp.hatDropzones,
        {
            draggable: '.draggable',
            dropzone: '.hat',
            mirror: { constrainDimensions: true }
        }
    );




    let droppableLeftEar = new Draggable.Swappable(potatoHeadApp.leftEarDropzones, {
      draggable: ".draggable",
      dropzone: ".leftEar",
      mirror: { constrainDimensions: true }
    });

    let droppableRightEar = new Draggable.Swappable(potatoHeadApp.rightEarDropzones,
      {
        draggable: ".draggable",
        dropzone: ".rightEar",
        mirror: { constrainDimensions: true }
      }
    );



    
    let droppableNose = new Draggable.Swappable(
        potatoHeadApp.noseDropzones,
        {
            draggable: '.draggable',
            dropzone: '.nose',
            mirror: { constrainDimensions: true }
        }
    );

    let droppableMouth = new Draggable.Swappable(
        potatoHeadApp.mouthDropzones,
        {
            draggable: '.draggable',
            dropzone: '.mouth',
            mirror: { constrainDimensions: true }
        }
    );

       let droppableLeftShoe = new Draggable.Swappable(
         potatoHeadApp.leftShoeDropzones,
         {
           draggable: ".draggable",
           dropzone: ".leftShoe",
           mirror: { constrainDimensions: true }
         }
       );

       let droppableRightShoe = new Draggable.Swappable(
         potatoHeadApp.rightShoeDropzones,
         {
           draggable: ".draggable",
           dropzone: ".rightShoe",
           mirror: { constrainDimensions: true }
         }
       );
}

//this function shows the next partOption by incrementing the partCounter and showing the partArray @ partCounter
potatoHeadApp.showNextPart = function() {
    $('#next').on('click', function () {
        potatoHeadApp.partsCounter > (potatoHeadApp.partsArray.length - 2) ?
        potatoHeadApp.partsCounter = 0 :
        potatoHeadApp.partsCounter++;
        potatoHeadApp.showBin(potatoHeadApp.partsCounter);
    });
}

potatoHeadApp.showPrevPart = function() {
  $("#previous").on("click", function() {
    potatoHeadApp.partsCounter === 0 ? 
    potatoHeadApp.partsCounter = potatoHeadApp.partsArray.length - 1 : 
    potatoHeadApp.partsCounter--;
    potatoHeadApp.showBin(potatoHeadApp.partsCounter);
  });
};

//this function updates the currentBin container to show only the part corresponding to currentPart
potatoHeadApp.showBin = function(partIndex) {
    const currentBin = potatoHeadApp.partsArray[partIndex].classList[1];
    potatoHeadApp.partsArray.each( function() {
        $(this).hasClass(`${currentBin}`) ?
        $(this).removeClass('hide') :
        $(this).addClass('hide');
    });
}

potatoHeadApp.primaryColor = function() {
    $('.primaryColor').on('click', function() {
        //starts off as false
        potatoHeadApp.primaryPressed ?
        potatoHeadApp.hideColorPalette() :
        potatoHeadApp.showColorPalette();
        
    });
};

potatoHeadApp.showColorPalette = function() {
    potatoHeadApp.hideParts();
    $('.paintBin').removeClass('hide');
}

potatoHeadApp.hideColorPalette = function() {
  $(".paintBin").addClass('hide');
  potatoHeadApp.showParts();
};

potatoHeadApp.hideParts = function() {
  potatoHeadApp.partsArray.each(function() {
    $(this).addClass("hide");
  });
  potatoHeadApp.primaryPressed = true;
  console.log("paints");
};

potatoHeadApp.showParts = function() {
    potatoHeadApp.showBin(potatoHeadApp.partsCounter);
    potatoHeadApp.primaryPressed = false;
};

potatoHeadApp.openToolBox = function() {
    $('.toolBoxInput').on('click', function() {
      console.log("toolbox");
      $(".canvas").toggleClass("openToolBox");
      $(".availableParts").toggleClass("openToolBox");
    });
}



potatoHeadApp.defaultLoad = function() {
    
    console.log("startup parts: " + potatoHeadApp.partsArray);
}

$(document).ready(function() {
    potatoHeadApp.init();
});



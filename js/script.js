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
  shoeDropzones: document.querySelectorAll(".shoe"),
  leftEarDropzones: document.querySelectorAll(".leftEar")
};

potatoHeadApp.init = function () {
    potatoHeadApp.defaultLoad();
    potatoHeadApp.showOptions();
    potatoHeadApp.makeEyes();
    potatoHeadApp.showNextPart();
    potatoHeadApp.showPrevPart();
    potatoHeadApp.primaryColor();
}

potatoHeadApp.makeEyes = function () {
    // let swappableEye = new Draggable.Swappable(
    //     potatoHeadApp.eyeDropzones,
    //     {
    //         draggable: '.eyes1',
    //         swappable: '.eye',
    //         mirror: { constrainDimensions: true }
    //     }
    // );
    let droppableEye = new Draggable.Droppable(
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




    let droppableLeftEar = new Draggable.Droppable(potatoHeadApp.leftEarDropzones, {
      draggable: ".draggable",
      dropzone: ".ear",
      mirror: { constrainDimensions: true }
    });



    
    let droppableNose = new Draggable.Droppable(
        potatoHeadApp.noseDropzones,
        {
            draggable: '.draggable',
            dropzone: '.nose',
            mirror: { constrainDimensions: true }
        }
    );

    let droppableMouth = new Draggable.Droppable(
        potatoHeadApp.mouthDropzones,
        {
            draggable: '.draggable',
            dropzone: '.mouth',
            mirror: { constrainDimensions: true }
        }
    );

    let droppableShoes = new Draggable.Droppable(
        potatoHeadApp.shoeDropzones,
        {
            draggable: '.draggable',
            dropzone: '.shoe',
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
    potatoHeadApp.pushDrawer();
    potatoHeadApp.partsArray.each( function() {
        $(this).hasClass(`${currentBin}`) ?
        $(this).removeClass('hide') :
        $(this).addClass('hide');
    });
    potatoHeadApp.pullDrawer();
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


potatoHeadApp.pullDrawer = function() {
 $(".drawer").addClass('pulledOut');
}

potatoHeadApp.pushDrawer = function() {
  $('.drawer').removeClass('pulledOut');
};

//this function shows the parts available upon user selction of a corresponding body part radio button
potatoHeadApp.showOptions = function() {
    $('input').on('click', function() {
        // const id = $(this).attr('id'); 
        // const className = `.${id}Bin`;
        // $bins = $('[class$="Bin"]');
        // $bins.addClass('hide');
        // if($('input').is(":checked")) {
        //     $(className).removeClass('hide');
        // }                       
    }); 
}

potatoHeadApp.defaultLoad = function() {
    
    console.log("startup parts: " + potatoHeadApp.partsArray);
}



potatoHeadApp.updatePartsContainer = function() {

}



$(document).ready(function() {
    potatoHeadApp.init();
});



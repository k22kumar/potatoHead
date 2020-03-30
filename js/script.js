const potatoHeadApp = {
  //Variables
  //keeps track of which part is currently being shown
  partsCounter: 0,
  partsArray: $(".partBin"),

  //paint variables
  paintPressed: false,
  accentPressed:false,
  currentColor: "",
  //saved paint color values of items
  setPrimary: "",
  setAccent: "",

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
    potatoHeadApp.makeBodyParts();
    potatoHeadApp.showNextPart();
    potatoHeadApp.showPrevPart();
    potatoHeadApp.primaryColor();
    potatoHeadApp.openToolBox();
    potatoHeadApp.paintColor();
    potatoHeadApp.setColor();
    potatoHeadApp.resetToDefault();
    potatoHeadApp.accentPainter();
    potatoHeadApp.savePrimary();
    potatoHeadApp.saveAccent();
    potatoHeadApp.hslColors();
    potatoHeadApp.updateHue();
    // potatoHeadApp.updateHSLValue();
}

potatoHeadApp.makeBodyParts = function () {
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
      mirror: { constrainDimensions: true,}
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
        //reset the current color if switching parts
        potatoHeadApp.currentColor = "";
        potatoHeadApp.partsCounter > (potatoHeadApp.partsArray.length - 2) ?
        potatoHeadApp.partsCounter = 0 :
        potatoHeadApp.partsCounter++;
        potatoHeadApp.showBin(potatoHeadApp.partsCounter);
        //save the colors of the body parts 
        potatoHeadApp.savePrimary();
        potatoHeadApp.saveAccent();
    });
}

potatoHeadApp.showPrevPart = function() {
  $("#previous").on("click", function() {
    //reset the current color if switching parts
    potatoHeadApp.currentColor = "";
    potatoHeadApp.partsCounter === 0 ? 
    potatoHeadApp.partsCounter = potatoHeadApp.partsArray.length - 1 : 
    potatoHeadApp.partsCounter--;
    potatoHeadApp.showBin(potatoHeadApp.partsCounter);
    //save the colors of the body parts 
    potatoHeadApp.savePrimary();
    potatoHeadApp.saveAccent();
  });
};

//this function updates the currentBin container to show only the part corresponding to currentPart
potatoHeadApp.showBin = function(partIndex) {
    potatoHeadApp.partsArray.each( function() {
        $(this).hasClass(`${potatoHeadApp.getCurrentBin()}`)
          ? $(this).removeClass("hide")
          : $(this).addClass("hide");
    });
}

potatoHeadApp.savePrimary = function() {
  primaryToBeSaved = `--preview-primary-${potatoHeadApp.getCurrentPartName()}`;
  potatoHeadApp.setPrimary = potatoHeadApp.getCSSVarValue(primaryToBeSaved);
}

potatoHeadApp.saveAccent = function() {
  accentToBeSaved = `--preview-accent-${potatoHeadApp.getCurrentPartName()}`;
  potatoHeadApp.setAccent = potatoHeadApp.getCSSVarValue(accentToBeSaved);
}


//returns the current parts Bin (eyesBin, noseBin)
potatoHeadApp.getCurrentBin = function() {
    return potatoHeadApp.partsArray[potatoHeadApp.partsCounter].classList[1];;
}

potatoHeadApp.primaryColor = function() {
    $('.paintButton').on('click', function() {
        //starts off as false
        potatoHeadApp.paintPressed ?
        potatoHeadApp.hideColorPalette() :
        potatoHeadApp.showColorPalette();
        
    });
};

potatoHeadApp.showColorPalette = function() {
    potatoHeadApp.hideParts();
    $('#next').toggleClass('disabled');
    $("#previous").toggleClass("disabled");
    $('.paintBin').removeClass('hide');
}

potatoHeadApp.hideColorPalette = function() {
  $("#next").toggleClass("disabled");
  $("#previous").toggleClass("disabled");
  $(".paintBin").addClass('hide');
  potatoHeadApp.showParts();
};

potatoHeadApp.hideParts = function() {
  potatoHeadApp.partsArray.each(function() {
    $(this).addClass("hide");
  });
  potatoHeadApp.paintPressed = true;
};

potatoHeadApp.showParts = function() {
    potatoHeadApp.showBin(potatoHeadApp.partsCounter);
    potatoHeadApp.paintPressed = false;
};

potatoHeadApp.openToolBox = function() {
    $('.toolBoxInput').on('click', function() {
      $(".canvas").toggleClass("openToolBox");
      $(".availableParts").toggleClass("openToolBox");
    });
}


//this function paints a specfic part of a body part (primary or accent portions) when a color is pressed. the paint is only a preview and can be undoed if user does not like it.
potatoHeadApp.paintColor = function() {
  $('.paintColor').on('click', function() {
    //get the color selected through the id of the button clicked
    const selectedColor = $(this).attr("id");
    const colorCode = potatoHeadApp.getCSSVarValue(`--current-${selectedColor}`);
    //save the color in memory
    potatoHeadApp.currentColor = colorCode;
    //find which body part is currently being shown to paint
    const partName = potatoHeadApp.getCurrentPartName();
    //did user only want the accents to be painted?
    const detail = potatoHeadApp.getDetail();
    const property = `--preview-${detail}-${partName}`;
    console.log("painter: " + property + " : " + colorCode);
    //set the PREVIEW to the desired color
    potatoHeadApp.setCSSVarValue(property, colorCode);
  });
}

potatoHeadApp.hslColors = function() {
  $('.hslColors').on('click', function() {
    $('.paintColor').toggleClass('hide');
    $('.hslField').toggleClass('hide');
  });
}

//function to update multiple input values at once. Adapted from Sean Stopnik codepen https://codepen.io/seanstopnik/pen/CeLqA
// potatoHeadApp.updateHSLValue = function() {
//   let value = $('output'),
//   slider = $('.hslField'),
//   range = $('.slider');
// slider.each(function() {
//   value.each(function() {
//     let value = $(this).prev().attr('value');
//     $(this).html(value);
//   });

//   range.on('input', function() {
//     $(this).next(value).html(this.value);
//   })
// });
// }

potatoHeadApp.updateHue = function() {
  $('#hslColorValue').on('input', function() {
    potatoHeadApp.updateRangeValue($(this));
    const hueValue = $(this).val();
    const cssValue =  `hsl(${hueValue}, 100%, 50%)`;
    const proprty = potatoHeadApp.setCSSVarValue(`--current-hue`, cssValue);
  })
}

potatoHeadApp.updateBrightness = function() {
  $('#brightness').on('input', function() {
    potatoHeadApp.updateRangeValue($(this));
    const brightnessValue = $(this).val();
    const cssValue = `hsl(${hueValue}, 100%, 50%)`;
  });
}


//this function updates the recieved range input's output upon change 
potatoHeadApp.updateRangeValue = function(inputThatWasChanged){
  const changedOutput = "#" + inputThatWasChanged.attr("id") + "Out";
  $(changedOutput).html(inputThatWasChanged.val());
}



//this function resets the primary or secondary 
potatoHeadApp.resetToDefault = function() {
  $('.defaultColor').on('click', function() {
    //find which body part is currently being shown to paint
    const partName = potatoHeadApp.getCurrentPartName();
    //did user only want the accents to be painted?
    const detail = potatoHeadApp.getDetail();
    const property = `--preview-${detail}-${partName}`;
    const defaultValue = `var(--default-${detail}-${partName})`;
    potatoHeadApp.setCSSVarValue(property, defaultValue);
  });
}

//this function sets a color for the current body part shown. this so that if the user wants to exeperiment with different colours and liked a certain color scheme, they can go back to this color
potatoHeadApp.setColor = function() {
  $('.setColor').on('click', function() {
    //check which detail is being set
    const detail = potatoHeadApp.getDetail();
    let colorSetting ="";
    potatoHeadApp.currentColor === "" ?
    colorSetting = "default" :
    colorSetting = "custom";
    const partName = potatoHeadApp.getCurrentPartName();
    const property = `--${colorSetting}-${detail}-${partName}`;
    console.log("setColor : " + property);

  });
}

//helper function that gets the name of the current part shown
potatoHeadApp.getCurrentPartName = function() {
  return potatoHeadApp.getCurrentBin().slice(0, potatoHeadApp.getCurrentBin().length - 3);
}

//helper function that checks which detail is pressed (primary or accent)
potatoHeadApp.getDetail = function() {
  let detail ="";
  potatoHeadApp.accentPressed ?
    detail = "accent" :
    detail = "primary";
    return detail;
}

//this function will apply paint to any accents on a body part, to indicate the change the main tools will also change color to show that to viewer.
potatoHeadApp.accentPainter = function() {
  $('.accent').on('click', function() {
    $('.paintTools').toggleClass('paintToolsAccent');
    potatoHeadApp.accentPressed = !potatoHeadApp.accentPressed;
  });
}

// this generic function recieves the name of a CSS variable, and returns its value 
//`--current-${id}`
potatoHeadApp.getCSSVarValue = function (property) {
  //not sure if trim is required but saw it on another post.
  let rootStyles = window.getComputedStyle(document.body);
  let cssValue = rootStyles.getPropertyValue(`${property}`).trim();
  console.log("getter: " + property + " : " + cssValue);
  return cssValue;
}

// this generic function recieves the name of a CSS variable plus a value and sets that property to that value var(--main-color2)
potatoHeadApp.setCSSVarValue = function(property, cssValue) {
$("body")
  .get(0)
  .style.setProperty(property, cssValue);
  console.log("setter: " + property + " : " + cssValue);
}

potatoHeadApp.defaultLoad = function() {
}

$(document).ready(function() {
    potatoHeadApp.init();
});



const potatoHeadApp = {
  //Variables
  //keeps track of which part is currently being shown
  partsCounter: 0,
  partsArray: $(".partBin"),

  //paint variables
  paintPressed: false,
  accentPressed:false,
  currentColor: "",
  hue: "0",
  saturation: "100",
  brightness: "50",

  //saved paint color values of items
  setPrimary: "",
  setAccent: "",

  //all dropzones act as the containers for the dragabble parts
  eyeDropzones: document.querySelectorAll(".eye"),
  hatDropzones: document.querySelectorAll(".hat"),
  noseDropzones: document.querySelectorAll(".nose"),
  mouthDropzones: document.querySelectorAll(".mouth"),
  shoeDropzones: document.querySelectorAll(".shoe"),
  // rightShoeDropzones: document.querySelectorAll(".rightShoe"),
  leftEarDropzones: document.querySelectorAll(".leftEar"),
  rightEarDropzones: document.querySelectorAll(".rightEar")
};

potatoHeadApp.init = function () {
    potatoHeadApp.makeBodyParts();
    potatoHeadApp.showNextPart();
    potatoHeadApp.showPrevPart();
    potatoHeadApp.paintPanelToggle();
    potatoHeadApp.openToolBox();
    potatoHeadApp.controlSound();
    potatoHeadApp.paintColor();
    potatoHeadApp.setColor();
    potatoHeadApp.resetToDefault();
    potatoHeadApp.accentPainter();
    potatoHeadApp.savePrimary();
    potatoHeadApp.saveAccent();
    potatoHeadApp.hslColors();
    potatoHeadApp.updateRangeValue();
    potatoHeadApp.updateBrightness(potatoHeadApp.brightness);
    potatoHeadApp.updateSaturation(potatoHeadApp.saturation);
    potatoHeadApp.undo();
    potatoHeadApp.hideApp();
    potatoHeadApp.startApp();
    // potatoHeadApp.updateHSLValue();
}

potatoHeadApp.hideApp = function() {
  $('main').hide();
}
potatoHeadApp.startApp = function() {
  $('.startPotato').on('click', function() {
    $("header").fadeOut(1000).delay(4000);
    $("#intro")[0].play();
    // $("#intro")[0].volume = 0.45;
    $("main").fadeIn(4000);
  });
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

    droppableEye.on("drag:start", function() {
      $(".eye").toggleClass("transparentBG");
      $(".eye").toggleClass("correct");
    });

    droppableEye.on("drag:stop", function() {
      $(".eye").toggleClass("transparentBG");
      $(".eye").toggleClass("correct");
    });

    let droppableHat = new Draggable.Swappable(
        potatoHeadApp.hatDropzones,
        {
            draggable: '.draggable',
            dropzone: '.hat',
            mirror: { constrainDimensions: true }
        }
    );

    droppableHat.on("drag:start", function() {
      $(".hat").toggleClass("transparentBG");
      $(".hat").toggleClass("correct");
    });

    droppableHat.on("drag:stop", function() {
      $(".hat").toggleClass("transparentBG");
      $(".hat").toggleClass("correct");
    });

    let droppableLeftEar = new Draggable.Swappable(potatoHeadApp.leftEarDropzones, {
      draggable: ".draggable",
      dropzone: ".leftEar",
      mirror: { constrainDimensions: true,}
    });

    droppableLeftEar.on("drag:start", function() {
      $(".leftEar").toggleClass("transparentBG");
      $(".leftEar").toggleClass("correct");
      $(".leftEar1").toggleClass("spin");
      $(".leftEar2").toggleClass("spin");
    });

    droppableLeftEar.on("drag:stop", function() {
      $(".leftEar").toggleClass("transparentBG");
      $(".leftEar").toggleClass("correct");
      $(".leftEar1").toggleClass("spin");
      $(".leftEar2").toggleClass("spin");
    });

    let droppableRightEar = new Draggable.Swappable(potatoHeadApp.rightEarDropzones,
      {
        draggable: ".draggable",
        dropzone: ".rightEar",
        mirror: { constrainDimensions: true }
      }
    );

      droppableRightEar.on("drag:start", function() {
        $(".rightEar").toggleClass("transparentBG");
        $(".rightEar").toggleClass("correct");
        $(".rightEar1").toggleClass("spin");
        $('.rightEar2').toggleClass('spin');
      });

      droppableRightEar.on("drag:stop", function() {
        $(".rightEar").toggleClass("transparentBG");
        $(".rightEar").toggleClass("correct");
        $(".rightEar1").toggleClass("spin");
        $(".rightEar2").toggleClass("spin");
      });

    
    let droppableNose = new Draggable.Swappable(
        potatoHeadApp.noseDropzones,
        {
            draggable: '.draggable',
            dropzone: '.nose',
            mirror: { constrainDimensions: true }
        }
    );

    droppableNose.on("drag:start", function() {
      $(".nose").toggleClass("transparentBG");
      $(".nose").toggleClass("correct");
    });

    droppableNose.on("drag:stop", function() {
      $(".nose").toggleClass("transparentBG");
      $(".nose").toggleClass("correct");
      
    });

    let droppableMouth = new Draggable.Swappable(
        potatoHeadApp.mouthDropzones,
        {
            draggable: '.draggable',
            dropzone: '.mouth',
            mirror: { constrainDimensions: true }
        }
    );

    droppableMouth.on("drag:start", function() {
      $(".mouth").toggleClass("transparentBG");
      $(".mouth").toggleClass("correct");
    });

    droppableMouth.on("drag:stop", function() {
      $(".mouth").toggleClass("transparentBG");
      $(".mouth").toggleClass("correct");
    });

       let droppableShoe = new Draggable.Swappable(
         potatoHeadApp.shoeDropzones,
         {
           draggable: ".draggable",
           dropzone: ".shoe",
           mirror: { constrainDimensions: true }
         }
       );

       droppableShoe.on("drag:start", function() {
         $(".shoe").toggleClass("transparentBG");
         $(".shoe").toggleClass("correct");
       });

       droppableShoe.on("drag:stop", function() {
         $(".shoe").toggleClass("transparentBG");
         $(".shoe").toggleClass("correct");
       });


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

potatoHeadApp.paintPanelToggle = function() {
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
      if(!$('.getStarted').hasClass('hide')){
          $('.getStarted').addClass('hide');
      }
      $('.canvas').toggleClass('openToolBox');
      $('.availableParts').toggleClass('openToolBox');
    });
}

potatoHeadApp.controlSound = function() {
  $(".soundInput").on("click", function() {
    $('.volUp').toggleClass('hide');
    $('.volOff').toggleClass('hide');
    $('.volOff').hasClass('hide') ?
    potatoHeadApp.restartSong():
    $("#intro")[0].pause();
  });
}

potatoHeadApp.restartSong = function() {
  $('#intro')[0].currentTime = 0;
  $("#intro")[0].volume = 0.45;
  $('#intro')[0].play();
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
    //set the PREVIEW to the desired color
    potatoHeadApp.setCSSVarValue(property, colorCode);
  });
}

//this function toggles the hslPanel
potatoHeadApp.hslColors = function() {
  $('.hslColors').on('click', function() {
    $('.paintColor').toggleClass('hide');
    $('.hslField').toggleClass('hide');
  });
}



//this function updates the changed input's output and calls input specific functions to update 
potatoHeadApp.updateRangeValue = function(){
  $('.hslInput').on('input', function() {
  const inputThatWasChanged = $(this);
  const changedOutput = "#" + inputThatWasChanged.attr("id") + "Out";
  $(changedOutput).html(inputThatWasChanged.val());
  // check which input that was changed and call the specfic updater function
  inputThatWasChanged.attr("id") === "hslColorValue"
    ? potatoHeadApp.updateHue(inputThatWasChanged.val())
    : inputThatWasChanged.attr("id") === "brightness"
    ? potatoHeadApp.updateBrightness(inputThatWasChanged.val())
    : potatoHeadApp.updateSaturation(inputThatWasChanged.val());
    //grab the current hsl value and store in currentColor if they want to save it
    potatoHeadApp.currentColor = potatoHeadApp.getCSSVarValue(`--current-saturation`);
    potatoHeadApp.paintHSL();
  });
}


potatoHeadApp.updateHue = function(hueValue) {
  const cssValue = `hsl(${hueValue}, 100%, 50%)`;
  potatoHeadApp.setCSSVarValue(`--current-hue`, cssValue);
  potatoHeadApp.hue = hueValue;
  potatoHeadApp.updateBrightness(potatoHeadApp.brightness);
  potatoHeadApp.updateSaturation(potatoHeadApp.saturation);
};

potatoHeadApp.updateBrightness = function(brightValue) {
  potatoHeadApp.brightness = brightValue;
  const cssValue = `hsl(${potatoHeadApp.hue}, ${potatoHeadApp.saturation}%, ${potatoHeadApp.brightness}%)`;
  potatoHeadApp.setCSSVarValue(`--current-brightness`, cssValue);
};

potatoHeadApp.updateSaturation = function(satValue) {
  potatoHeadApp.saturation = satValue;
  const cssValue = `hsl(${potatoHeadApp.hue}, ${potatoHeadApp.saturation}%, ${potatoHeadApp.brightness}%)`;
  potatoHeadApp.setCSSVarValue(`--current-saturation`, cssValue);
};

//this function takes care of painting  the body part using hsl
potatoHeadApp.paintHSL = function() {
   //save the color in memory
    // potatoHeadApp.currentColor = colorCode;
    //find which body part is currently being shown to paint
    const partName = potatoHeadApp.getCurrentPartName();
    //did user only want the accents to be painted?
    const detail = potatoHeadApp.getDetail();
    const property = `--preview-${detail}-${partName}`;
    const hslColor = `hsl(${potatoHeadApp.hue},${potatoHeadApp.saturation}%,${potatoHeadApp.brightness}%)`;
    //set the PREVIEW to the desired color
    potatoHeadApp.setCSSVarValue(property, hslColor);
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
    potatoHeadApp.currentColor = "";
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
    //set custom to a color
    potatoHeadApp.setCSSVarValue(property, potatoHeadApp.currentColor);
  });
}

potatoHeadApp.undo = function() {
  $('.undo').on('click', function() {
    const property = `--preview-${potatoHeadApp.getDetail()}-${potatoHeadApp.getCurrentPartName()}`;
    const value = `var(--custom-${potatoHeadApp.getDetail()}-${potatoHeadApp.getCurrentPartName()})`;
    potatoHeadApp.setCSSVarValue(property, value);
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
    $('.paintOptions').toggleClass('paintAccent');
    potatoHeadApp.accentPressed = !potatoHeadApp.accentPressed;
  });
}

// this generic function recieves the name of a CSS variable, and returns its value 
//`--current-${id}`
potatoHeadApp.getCSSVarValue = function (property) {
  //not sure if trim is required but saw it on another post.
  let rootStyles = window.getComputedStyle(document.body);
  let cssValue = rootStyles.getPropertyValue(`${property}`).trim();
  return cssValue;
}

// this generic function recieves the name of a CSS variable plus a value and sets that property to that value var(--main-color2)
potatoHeadApp.setCSSVarValue = function(property, cssValue) {
$("body")
  .get(0)
  .style.setProperty(property, cssValue);
}

potatoHeadApp.defaultLoad = function() {
}

$(document).ready(function() {
    potatoHeadApp.init();
});



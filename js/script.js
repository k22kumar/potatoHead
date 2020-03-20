const potatoHeadApp = {

    //Variables
    //keeps track of which part is currently being shown
    partsCounter: 0,
    partsArray: $('.partBin'),

    //all dropzones act as the containers for the dragabble parts
    eyeDropzones: document.querySelectorAll('.eye'),
    hatDropzones: document.querySelectorAll('.hat'),
    noseDropzones: document.querySelectorAll('.nose'),
    mouthDropzones: document.querySelectorAll('.mouth'),
    shoeDropzones: document.querySelectorAll('.shoe')
};

potatoHeadApp.init = function () {
    potatoHeadApp.defaultLoad();
    potatoHeadApp.showOptions();
    potatoHeadApp.makeEyes();
    potatoHeadApp.showNextPart();
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
            draggable: '.eyes1',
            dropzone: '.eye',
            mirror: { constrainDimensions: true }
        }
    );

    let droppableHat = new Draggable.Droppable(
        potatoHeadApp.hatDropzones,
        {
            draggable: '.bowlerHat',
            dropzone: '.hat',
            mirror: { constrainDimensions: true }
        }
    );

    let droppableNose = new Draggable.Droppable(
        potatoHeadApp.noseDropzones,
        {
            draggable: '.nose1',
            dropzone: '.nose',
            mirror: { constrainDimensions: true }
        }
    );

    let droppableMouth = new Draggable.Droppable(
        potatoHeadApp.mouthDropzones,
        {
            draggable: '.mouth1',
            dropzone: '.mouth',
            mirror: { constrainDimensions: true }
        }
    );

    let droppableShoes = new Draggable.Droppable(
        potatoHeadApp.shoeDropzones,
        {
            draggable: '.shoe1',
            dropzone: '.shoe',
            mirror: { constrainDimensions: true }
        }
    );
}

//this function shows the next partOption
potatoHeadApp.showNextPart = function() {
    const next = $("#next");
    console.log(next);
    $('#next').on('click', function () {

        if (potatoHeadApp.partsCounter > potatoHeadApp.partsArray.length) {
            console.log(potatoHeadApp.partsCounter + " too big reseting")
            potatoHeadApp.partsCounter = 0;
        }
        potatoHeadApp.partsCounter++;
        potatoHeadApp.showBin(potatoHeadApp.partsCounter);
    });
}

potatoHeadApp.showBin = function(partIndex) {
    console.log(partIndex);
    potatoHeadApp.partsArray.each( function() {
        
    });
}

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
    
    console.log(potatoHeadApp.partsArray);
}


potatoHeadApp.updatePartsContainer = function() {

}



$(document).ready(function() {
    potatoHeadApp.init();
});



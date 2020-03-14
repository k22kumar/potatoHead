const potatoHeadApp = {

    //all dropzones act as the containers for the dragabble parts
    eyeDropzones: document.querySelectorAll('.eye')
};

potatoHeadApp.init = function () {

    let droppable = new Draggable.Droppable(
        potatoHeadApp.eyeDropzones,
        {
            draggable: '.eyes1',
            dropzone: '.eye',
            mirror: { constrainDimensions: true }
        }
    );

}






$(document).ready(function() {
    potatoHeadApp.init();
});



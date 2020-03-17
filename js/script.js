const potatoHeadApp = {

    //all dropzones act as the containers for the dragabble parts
    eyeDropzones: document.querySelectorAll('.eye')
};

potatoHeadApp.init = function () {
    potatoHeadApp.showOptions();
    potatoHeadApp.makeEyes();


}

potatoHeadApp.makeEyes = function () {
    let droppable = new Draggable.Droppable(
        potatoHeadApp.eyeDropzones,
        {
            draggable: '.eyes1',
            dropzone: '.eye',
            mirror: { constrainDimensions: true }
        }
    );
}

//this function shows the parts available upon user selction of a corresponding body part radio button
potatoHeadApp.showOptions = function() {
    
    $('input').on('change', function() {
        const id = $(this).attr('id');
        const className = `.${id}Bin`;
        $bins = $('[class$="Bin"]');
        $bins.css("display","none");
            $(className).show();
    }); 
}

potatoHeadApp.updatePartsContainer = function() {

}




$(document).ready(function() {
    potatoHeadApp.init();
});



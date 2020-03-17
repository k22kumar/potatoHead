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

potatoHeadApp.showOptions = function() {
    $('input').on('click', function() {
        const id = $(this).attr('id');
        const className = `${id}Bin`;
        console.log(className);
        $bins = $('[class$="Bin"]');
        $bins.css("display","none");
        
        if (id==="eyes") {
            console.log("hide")
            $(".eyesBin").show();
        } else {
            console.log("seek")
        }
        

    }); 
}

potatoHeadApp.updatePartsContainer = function() {

}




$(document).ready(function() {
    potatoHeadApp.init();
});



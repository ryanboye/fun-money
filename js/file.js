function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    MINT.parse(files[0]);

}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

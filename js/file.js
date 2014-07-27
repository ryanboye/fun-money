  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    MINT.parse(files[0], function(){ console.log("loaded")});
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


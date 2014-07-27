  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    MINT.parse(files[0], onload);
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


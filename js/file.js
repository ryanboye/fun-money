  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    MINT.parse(files[0], update(moment(), 80000));
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


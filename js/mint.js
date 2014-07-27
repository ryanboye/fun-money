var MINT = (function () {
    var MINT = {};

    MINT.parse = function (file) {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            step: function (row) {
                console.log("Row:", row.data);
            },
            complete: function () {
                console.log("All done!");
            }
        });
    };

    return MINT;
}());

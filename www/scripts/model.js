var app = function(app) {  // module pattern
    app.makeModel = function() {
        const m = {};
        m.title = "Catch It!";
        return m;
    }
    return app; // module pattern
}(app||{}); // module pattern

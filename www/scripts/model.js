var app = function(app) {  // module pattern
    app.makeModel = function() {
        const m = {};
        m.title = "Catch It!";
	   m.instructions = "Catch the butterfly without falling!";
	   m.start = "Start";
        return m;
    }
    return app; // module pattern
}(app||{}); // module pattern

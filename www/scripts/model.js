var app = function(app) {  // module pattern
    app.makeModel = function() {
        const m = {};
        m.title = "Catch It!";
	   m.instructions = "Make the dog jump over the obstacles to catch the butterfly by tapping the screen!";
	   m.start = "Start";
        return m;
    }
    return app; // module pattern
}(app||{}); // module pattern

var app = function(app) {  // module pattern
    app.makeModel = function() {
        const m = {};
        m.title = "Catch It!";
	   m.instructions = "Tap the screen to make the dog jump to catch the butterfly!";

        return m;
    }
    return app; // module pattern
}(app||{}); // module pattern

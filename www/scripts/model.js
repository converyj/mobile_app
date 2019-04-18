var app = function(app) {  // module pattern
    app.makeModel = function() {
        // const m = {
        //     title:"Catch the Butterfly"
        // };
        const m = {};

        // // localStorage.clear();
        // if (localStorage && localStorage.exampleData) {
        //     m.data = JSON.parse(localStorage.exampleData);
        // } else {
        //     m.data = [0, 0];
        // }
	   //
        // m.updateData = function() {
        //     zog("updating");
        //     localStorage.exampleData = JSON.stringify(m.data);
        // }

        m.title = "Catch the Butterfly";
        return m;
    }
    return app; // module pattern
}(app||{}); // module pattern

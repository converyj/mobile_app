var app = function(app) {  // module pattern
    app.makeController = function(m, v, stage) {
        const c = {};

	   var fall = false;

        // Or use HotSpots for lots of navigation
        // can simplify with a loop - see MVC example https://zimjs.com/mvc
        const hs = new HotSpots([
            {page:v.page1, rect:v.page1.logo, call:()=>{zog("clicking on hotspot")}},
            // {page:v.page2, rect:v.page2.logo, call:()=>{v.pages.go(v.page1, "left");}},
            {page:v.page1, rect:v.page1.play, call:()=>{v.pages.go(v.page2, "right")}},
            {page:v.page2, rect:v.page2.button, call:()=>{v.pages.go(v.page1, "left");}},
		  // {page:v.page1, rect:v.page1.instructions, call:()=>{v.pages.go(v.page3, "left");}},
		  // {page:v.page3, rect:v.page3.start, call:()=>{v.pages.go(v.page1, "right");}},
        ]);
        hs.show();

	   v.page1.instructions.on("click", () => {
	   	v.page1.pane.show();
	});

	   v.page1.logo.animate({
		props: {scale:2, x:20, y:20},
		time: 2000,
		ease: "elasticOut",
		call: function() {
			v.page1.play.addTo(v.page1);
			// from - reverse of this
			v.page1.dog.centerReg(v.page1.content).loc(-250, 370).run({label: "walk", loop: true, time:1000}).sca(4)
			.animate({
				props: {x:stage.width+250},
				time: 3000,
				// wait: 200,
				// from: true,
				// time: 20000,
				ease: "linear"
		  });

	  }
});


// v.page3.start.on("click", function () {
//      location.reload();
// });

	v.pages.on("pagetransitioned", function(e) {
			zog("page2")
		 v.page2.acc.pause(false);
		 v.page2.acc.percentSpeed = 500;
		 var birds = frame.asset("birds.mp3").play();


		 function ticker() {
	 		Ticker.add(function() {
				if (!fall) {
		 			if (v.page2.log.backing1.hitTestReg(v.page2.dog)) {
		 				zog("hitting log1");
		 				fall = true;
						stage.off("mousedown", jump);
						frame.asset("lose.mp3").play();


		 				button = playAgain(v, stage);

		 				stage.update();
		 			}

		 			if (v.page2.log.backing2.hitTestReg(v.page2.dog)) {
		 				zog("hitting log2");
		 				fall = true;
						stage.off("mousedown", jump);
						frame.asset("lose.mp3").play();


		 				button = playAgain(v, stage);

		 				stage.update();
		 			}
				}
 			// if (v.page2.stick.backing1.hitTestReg(v.page2.dog)) {
 			// 	zog("hitting stick1");
 			// 	button = playAgain(v, stage);
			//
 			// 	stage.update();
 			// }
 			// if (v.page2.stick.backing2.hitTestReg(v.page2.dog)) {
 			// 	zog("hitting stick2");
 			// 	button = playAgain(v, stage);
			//
 			// 	stage.update();
 			// }
 		})
 	}



	 var jump = stage.on("mousedown", () => {
 		console.log("mousedown stage")
 		v.page2.dog.run({label: "jump", time: 1000})
 		v.page2.dog.animate({
 			props: [
				{props: {y:200, x: 200}, time: 700},
 				{props: {y:500}, time: 700}
 			],
 			time: 1000,
 			ease:"linear",
 			call: function() {
				if (fall) {
					zog(fall);
 					v.page2.dog.run({label: "fall", loop: true, time: 1000}).outline();
				} else {
					v.page2.dog.run({label: "walk", loop: true, time: 1000}).outline();

				}
 			}
 		})
		frame.asset("jump.mp3").play();

 		stage.update();
 	})

	 ticker();

	 stage.update();
	})


        frame.on("resize", () => {
		   console.log("resize");
            v.manager.resize();

            stage.update();
        });

        return c;
    }

    function playAgain(v, stage) {
	    zog("play Again");
	    fall = true;
	    v.page2.dog.run({label: "fall"});
	    v.page2.acc.pause(true, 2000);
	    v.page2.button.center();
	    v.page2.button.on("click", function () {
		    location.reload();
	    });
    }
    return app; // module pattern
}(app||{}); // module pattern

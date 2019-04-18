var app = function(app) {  // module pattern
    app.makeController = function(m, v, stage) {
        const c = {};


        // v.page1.tabs.change(function () {
        //     if (v.page1.tabs.text == 2) v.pages.go(v.page2, "down");
        // });

        // Or use HotSpots for lots of navigation
        // can simplify with a loop - see MVC example https://zimjs.com/mvc
        const hs = new HotSpots([
            {page:v.page1, rect:v.page1.logo, call:()=>{zog("clicking on hotspot")}},
            // {page:v.page2, rect:v.page2.logo, call:()=>{v.pages.go(v.page1, "left");}},
            {page:v.page1, rect:v.page1.play, call:()=>{v.pages.go(v.page2, "right")}},
            {page:v.page1, rect:v.page2.button, call:()=>{v.pages.go(v.page1, "left");}}
        ]);
        hs.show();


	   v.page1.start.centerReg(v.page1.content).sca(.7)
	   	.animate({
		   props: {y: stage.height-10},
		   from: true,
		   ease: "linear",
		   time: 200
	   })
	   v.page1.logo.animate({
		props: {scale:2, x:20, y:20},
		time: 3000,
		ease: "elasticOut",
		call: function() {
			v.page1.start.removeFrom();
			// from - reverse of this
			v.page1.dog.centerReg(v.page1.content).loc(-220).run({label: "walk", loop: true, time:1000}).sca(2)
			.animate({
				props: {x:stage.width+220},
				time: 3000,
				wait: 2000,
				// from: true,
				// time: 20000,
				ease: "linear"
		  });
		  v.page1.path.addTo(v.page1.content).loc(-168, 168).outline();

	   	  v.page1.path.visible = false;

		  frame.on("keydown", function(e) {
			zog(e.keyCode);
			if (e.keyCode == 82) { // R key
				path2.recordPoints(true);
			}
		});

			 v.page1.butterfly = new Sprite({
	    		   image: frame.asset("butterfly.png"),
	    		   cols: 4,
	    		   rows: 1
	    	   })
				 .sca(.1)
				 .centerReg(v.page1.content)
				 .loc(v.page1.path.pointCircles[0])
				.run({time:200}).outline()
				.animate({
					props: {path:v.page1.path},
					// loop: true,
					ease: "linear",
					time: 4000,
					call: () => {
						v.page1.butterfly.removeFrom();
					}
				});

		  v.page1.play.addTo(v.page1)
		}
	});

	v.pages.on("pagetransitioned", function() {
	 console.log("Page 2");
	 v.page2.acc.pause(false);

	 ticker();
	})
	// ticker();
	function ticker() {
		Ticker.add(function() {
			if (v.page2.log.backing1.hitTestReg(v.page2.dog)) {
				zog("hitting log1");

				button = playAgain(v);
				stage.update();
			}
			if (v.page2.log.backing2.hitTestReg(v.page2.dog)) {
				zog("hitting log2");
				button = playAgain(v);

				stage.update();
			}
			if (v.page2.stick.backing1.hitTestReg(v.page2.dog)) {
				zog("hitting stick1");
				button = playAgain(v);

				stage.update();
			}
			if (v.page2.stick.backing2.hitTestReg(v.page2.dog)) {
				zog("hitting stick2");
				button = playAgain(v);

				stage.update();
			}
		})
	}

	var mousedown = stage.on("mousedown", () => {
		console.log("mousedown stage")
		v.page2.dog.run({label: "jump", time: 2000})
		v.page2.dog.animate({
			props: [
				{props: {y:5}, time: 700},
				{props: {x:160, y:440}}
			],
			time: 1000,
			ease:"linear",
			call: function() {
				v.page2.dog.run({label: "walk", loop: true})
			}
		})
	})
	// .centerReg().pos(100, 150, null, true, v.page2.content).run({time: 1000}).sca(5);


	// props: [
	// 	  // {props: {y:5}},
	// 	  // up
	// 	  {props: {x: 160, y:5}, time: 700},
	// 	  {props: {x:160, y:440}}
  //
	//   ],
	//   time: 1000,
	//   ease: "linear"
  // })



	// v.page1.dog.animate({
	//   props:{x:stage.width*10},
	//   time: 2000,
	//   ease: "linear",
	//   call: function() {
  //
	//   }
  // });

        // v.dial.on("change", ()=>{ // not chainable
        //     zog(v.dial.currentValue)
        //     m.data[0] = v.dial.currentValue;
        //     m.updateData();
        // })
	   //
        // v.dial.change(()=>{ // chainable
        // })
	   //
        // v.slider.on("change", ()=>{ // not chainable
        //     m.data[1] = v.slider.currentValue;
        //     m.updateData();
        // })


        frame.on("resize", () => {
		   console.log("resize")

		   // v.page1.bg.resize();

            v.manager.resize();

            stage.update();
        });



        return c;
    }



    function playAgain(v) {
	    zog("play Again");
	    // mousedown.disable()
	    v.page2.dog.run({label: "fall"});
	    v.page2.butterfly.pauseRun();
	    v.page2.acc.pause(true, 2000);
	    // v.page2.bg.pause();
	    // v.page2.stick.pause();
	    // v.page2.log.pause();
	    v.page2.button.center();

	    v.page2.button.on("click", function () {
		    location.reload();
	    });
    }
    return app; // module pattern
}(app||{}); // module pattern

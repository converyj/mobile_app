var app = function(app) {  // module pattern
    app.makeController = function(m, v, stage) {
	    const c = {};

		var fall = false;

		const hs = new HotSpots([
			{page:v.page1, rect:v.page1.play, call:()=>{v.pages.go(v.page2, "right")}},
			{page:v.page2, rect:v.page2.button, call:()=>{v.pages.go(v.page1, "left");}},
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
				v.page1.play.pos(null, null, null, true, v.page1.content).loc(403, 216);

				v.page1.dog.centerReg(v.page1.content).loc(-600, 400).run({label: "walk", loop: true, time:1000}).sca(4)
				.animate({
					props: {x:stage.width+600},
					time: 5000,
					ease: "linear"
				});
			}
		});

		v.pages.on("pagetransitioned", function(e) {
			v.page2.acc.pause(false);
			v.page2.acc.percentSpeed = 500;
			var birds = frame.asset("birds.mp3").play();

			function ticker() {
				Ticker.add(function() {
					if (!fall) {
						if (v.page2.log.backing1.hitTestReg(v.page2.dog)) {
							fall = true;
							stage.off("mousedown", jump);
							frame.asset("lose.mp3").play();

							playAgain(v, stage);

							stage.update();
						}

						if (v.page2.log.backing2.hitTestReg(v.page2.dog)) {
							fall = true;
							stage.off("mousedown", jump);
							frame.asset("lose.mp3").play();

							playAgain(v, stage);

							stage.update();
						}
					}
				})
			}

		var jump = stage.on("mousedown", () => {
			v.page2.dog.run({label: "jump", time: 1000})
			v.page2.dog.animate({
				props: [
					{props: {y:200, x: 400}, time: 700},
					{props: {y:500}, time: 700}
				],
				time: 1000,
				ease:"linear",
				call: function() {
					if (fall) {
						v.page2.dog.run({label: "fall", loop: true, time: 1000});
					} else {
						v.page2.dog.run({label: "walk", loop: true, time: 1000});
					}
				}
			});
			frame.asset("jump.mp3").play();
			stage.update();
		});

		ticker();

			stage.update();
		});


		frame.on("resize", () => {
			v.manager.resize();
			stage.update();
		});

		return c;
	}

		function playAgain(v, stage) {
			fall = true;
			v.page2.dog.run({label: "fall"});
			v.page2.acc.pause(true, 2000);
			v.page2.button.pos(null, null, null, true, v.page2.content).loc(403, 216);
			v.page2.button.on("click", () => {
				location.reload();
			});
    	}

    return app; // module pattern
}(app||{}); // module pattern

var app = function(app) {  // module pattern
    app.makeView = function(m, stage) {
        var stageW = stage.width;
        var stageH = stage.height;
        const v = {};
	   // sqiggle for second page
	   var data = [
		   [340.6,-71.1,0,0,308.2,51.2,-308.2,-51.2],
		   [143.2,39.6,0,0,-97.4,167.6,97.4,-167.6],
		   [300,42,0,0,-100,200,100,-200]
	   ];
	   // squiggle for front page
	   var data1 = [
		   [-11,-65.8,0,0,-69.2,-7.3,69.2,7.3],
		   [80.5,17.7,0,0,-38.7,-20.7,38.7,20.7],
		   [220.4,-19.5,0,0,-53.3,100.8,53.3,-100.8],
		   [529.5,-33.3,0,0,-34.3,83.1,34.3,-83.1],
		   [808,14.2,0,0,-151.8,125.4,151.8,-125.4],
		   [1295,23.6,0,0,-94.8,0,94.8,0]
	   ];

	  //  const dog = new Sprite({
		//   image: frame.asset("dogsprite.png"),
		//   cols: 10,
		//   rows: 4,
		//   animations:{sit:[0-10], walk:[11,18], run: [11-18], jump:[33-43], fall:[44-47]}
	  // })


        STYLE = {
            type:{
                Button:{
				font: "Franklin Gothic",
                    width:70,
                    height:70,
                    corner:35,
                    label:"",
                    shadowBlur:-1
			},
			Squiggle: {
				visible: true,
				interactive: false,
				allowToggle: false,
				showControls: false
			},
			Label: {
				font: "Franklin Gothic"
			},
		}
        }

        const manager = v.manager = new Manager();

        const page1 = v.page1 = new Container(stageW, stageH);
	   let content = v.page1.content = new Container(stage.width, stage.height).addTo(page1);

	   let background = frame.asset("backgroundv3.png").center(content);

        let header = new Container().center(page1).outline();
        v.page1.logo = new Label(m.title).center(header).sca(0).outline();

        v.page1.dog = new Sprite({
		  image: frame.asset("dogsprite-cropped2.png"),
		  cols: 9,
		  rows: 3,
		  animations:{walk:[0,8], jump:[9,16], fall:[17,19]}
	  });


		 var path = v.page1.path = new Squiggle({
   		  points: data1
   	  })

	   v.page1.path.addTo(v.page1.content).loc(-168, 168).outline();

	   	   v.page1.butterfly = new Sprite({
	   	     image: frame.asset("butterfly.png"),
	   	     cols: 4,
	   	     rows: 3
	   	  })
	   	  	 .sca(.3)
	   	  	 .centerReg(v.page1.content)
	   	  	 .loc(v.page1.path.pointCircles[0])
	   	  	.run({time:200, loop: true}).outline()
	   	  	.animate({
	   	  		props: {path:v.page1.path},
	   	  		ease: "linear",
	   	  		time: 4000,
	   			wait: 400,
	   	  		call: () => {
	   	  			v.page1.butterfly.removeFrom();
	   	  		}
	   	  	});

        v.page1.play = new Button(100, 70, "PLAY").center(content);

	   var pane = new Pane({
		   width: 700,
		   height: 200,
		   label: m.instructions,
		   backgroundColor:"#42919a"
   })
	   .show();


	   const footer = v.page1.instructions = new Button({
		   icon:pizzazz.makeIcon("info", "white").sca(.7)
	   }).pos(null, null, true, true, page1).outline();

	   v.page1.instructions.on("click", () => {
	   	pane.show();

	   })
        manager.add(new Layout(page1, [
            {object:header, maxWidth:90, marginTop:5},
            {object:content, marginTop:2},
            {object:footer, maxWidth:90, marginTop:2}
	  ], 2, null, true, null, stage));

        const page2 = v.page2 = new Container(stageW, stageH);
	   // page2.name = "page2";
        content = v.page2.content =  new Container(1000,600).addTo(page2).outline();
	   const bg = v.page2.bg = new Scroller(frame.asset("backgroundv2.png").center(content), null, null, null, null, stage, content);

	   // const stick = v.page2.stick = new Scroller(frame.asset("puddle.png").center(content), null, null, null, null, stage, content);
	   // //
	   // stick.backing1.sca(.1).centerReg().pos(300, 50, null, true, content).outline();
	   // stick.backing2.sca(.1).centerReg().pos(500, 50, null, true, content).outline();

	   const log = v.page2.log = new Scroller(frame.asset("log.png").center(content), null, null, null, null, stage, content);

	   log.backing1.sca(.2).center().pos(950, 50, null, true, content).outline();
	   log.backing2.sca(.2).centerReg().pos(950, 50, null, true, content).outline();


	   var path2 = new Squiggle({
		  points: data
	  }).addTo(v.page2.content).loc(900, 188);

	  frame.on("keydown", function(e) {
		zog(e.keyCode);
		if (e.keyCode == 82) { // R key
			path2.recordPoints(true);
		}
	});

	   // run(time, "label")
	   v.page2.dog = new Sprite({
		  image: frame.asset("dogsprite-cropped2.png"),
		  cols: 9,
		  rows: 3,
		  animations:{walk:[0,8], jump:[9,16], fall:[17,19]}
	  });

	  v.page2.dog
	  .centerReg()
	  	// .reg(v.page2.dog.width, v.page2.height)
		  .pos(200, 50, null, true, content)
		  .run({label: "walk", time:1000, loop: true})
		  .sca(5).outline()

		  v.page2.button = new Button(200, 70, "Play Again");

		 const butterfly = v.page2.butterfly = new Sprite({
    		   image: frame.asset("butterfly.png"),
    		   cols: 4,
    		   rows: 3
    	   })
			 .sca(.3)
			 .centerReg(v.page2.content)
			 .loc(path2.pointCircles[0])
			.run({time:1000, loop: true})
			.animate({
				props: {path:path2},
				loop: true,
				ease: "linear",
				time: 4000
			})

	    v.page2.acc = new Accelerator([bg, log]);

	    v.page2.acc.pause();

        manager.add(new Layout(page2, [
            {object:content, maxHeight: stage.height, maxHeight: stage.width}
	  ], 2, null, true, new Shape(), stage));

        manager.add(v.pages = new Pages([
            {page:page1, swipe:[null, null, null, null]},
            {page:page2, swipe:[null, null, null, null]}
        ], "slide", 500).addTo());

	   v.pages.on("info", function(e) {
	   	zog("info requested");
	})
        return v;
    }
    return app; // module pattern
}(app||{}); // module pattern

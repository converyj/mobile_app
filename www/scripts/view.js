var app = function(app) {  // module pattern
    app.makeView = function(m, stage) {
        var stageW = stage.width;
        var stageH = stage.height;
        const v = {};
	   // sqiggle for second page
	   var data = [
		   [-78.4,-93.7,0,0,-42.8,17.4,42.8,-17.4],
		   [83.1,-64.4,0,0,0,-50,0,50],
		   [34.8,28.4,0,0,-86.1,-43.1,86.1,43.1],
		   [28.2,88.9,0,0,50,0,-50,0],
		   [-104.6,17.6,0,0,-11.3,33.6,11.3,-33.6],
		   [-74.9,-93.7,0,0,-280.7,-28.5,280.7,28.5]
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
                    width:200,
                    height:70,
                    // corner:35,
                    label:"",
                    shadowBlur:-1
			},
			Squiggle: {
				visible: false,
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
	   let content = v.page1.content = new Container(1000,600).addTo(page1);

	   let background = frame.asset("backgroundv3.png").center(content);

        // let header = new Container().center(page1).outline();
        v.page1.logo = new Label({
		   text: m.title,
	   	color: "green"
	}).pos(100, null, null, null, v.page1.content);

        v.page1.dog = new Sprite({
		  image: frame.asset("dogsprite-cropped2.png"),
		  cols: 9,
		  rows: 3,
		  animations:{walk:[0,8], jump:[9,16], fall:[17,19]}
	  });


		 var path = v.page1.path = new Squiggle({
   		  points: data1
   	  })

	   v.page1.path.addTo(v.page1.content).loc(-168, 168);

	   	   v.page1.butterfly = new Sprite({
	   	     image: frame.asset("butterfly.png"),
	   	     cols: 4,
	   	     rows: 3
	   	  })
	   	  	 .sca(.3)
	   	  	 .centerReg(v.page1.content)
	   	  	 .loc(v.page1.path.pointCircles[0])
	   	  	.run({time:200, loop: true})
	   	  	.animate({
	   	  		props: {path:v.page1.path},
	   	  		ease: "linear",
	   	  		time: 4000,
	   			wait: 400,
	   	  		call: () => {
	   	  			v.page1.butterfly.removeFrom();
	   	  		}
	   	  	});

        v.page1.play = new Button({label: "PLAY"});

	   var pane = v.page1.pane = new Pane({
		   width: 500,
		   height: 200,
		   backgroundColor:orange
   }).pos(null, null, null, true, v.page1.content).loc(403, 216).show().outline();

   var label = new Label({
	  text: m.instructions,
	  align:"center",
	  backgroundBorderColor:"#1c1c1c",
	  color: white,
	  corner:10,
	  padding:25,
	  labelWidth:500,
	  lineHeight:40
  }).center(pane)


		// const footer = new Container().center(page1);
	  v.page1.instructions = new Button({
		   icon:pizzazz.makeIcon("info", "white"),
		   corner: 35,
		   width: 70,
		   height: 70
	   }).pos(null, null, null, true, content).loc(469, 545);

        manager.add(new Layout(page1, [
            // {object:header, maxWidth:90, marginTop:5},
            {object:content,  maxHeight: stage.height, maxWidth: stage.width}
            // {object:footer, maxWidth:stage.width}
	  ], 2, null, true, new Shape(), stage));

        const page2 = v.page2 = new Container(stageW, stageH);
	   // page2.name = "page2";
        content = v.page2.content =  new Container(1000,600).addTo(page2);
	   const bg = v.page2.bg = new Scroller(frame.asset("backgroundv2.png").center(content), null, null, null, null, stage, content);

	   // const stick = v.page2.stick = new Scroller(frame.asset("puddle.png").center(content), null, null, null, null, stage, content);
	   // //
	   // stick.backing1.sca(.1).centerReg().pos(300, 50, null, true, content).outline();
	   // stick.backing2.sca(.1).centerReg().pos(500, 50, null, true, content).outline();

	   const log = v.page2.log = new Scroller(frame.asset("log.png").center(content), null, null, null, null, stage, content);

	   log.backing1.sca(.2).center().pos(950, 50, null, true, content);
	   log.backing2.sca(.2).centerReg().pos(950, 50, null, true, content);


	   var path2 = new Squiggle({
		  points: data
	  }).addTo(v.page2.content).loc(747, 306);

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
		  .sca(5);

		  v.page2.button = new Button({label: "Play Again"});

		 const butterfly = v.page2.butterfly = new Sprite({
    		   image: frame.asset("butterfly.png"),
    		   cols: 4,
    		   rows: 3
    	   })
			 .sca(.3)
			 .centerReg(v.page2.content)
			 .loc(path2.pointCircles[0])
			.run({time:200, loop: true})
			.animate({
				props: {path:path2, flip: true},
				loop: true,
				ease: "linear",
				time: 4000
			})

	    v.page2.acc = new Accelerator([bg, log]);

	    v.page2.acc.pause();

        manager.add(new Layout(page2, [
            {object:content, maxHeight: stage.height, maxWidth: stage.width}
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

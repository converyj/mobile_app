var app = function(app) {  // module pattern
    app.makeView = function(m, stage) {
        var stageW = stage.width;
        var stageH = stage.height;
        const v = {};
	   // sqiggle for second page
	   var data = [
		   [-11,-65.8,0,0,-69.2,-7.3,69.2,7.3],
		   [80.5,17.7,0,0,-38.7,-20.7,38.7,20.7],
		   [220.4,-19.5,0,0,-53.3,100.8,53.3,-100.8],
		   [529.5,-33.3,0,0,-34.3,83.1,34.3,-83.1],
		   [808,14.2,0,0,-151.8,125.4,151.8,-125.4],
		   [1130.2,2.7,0,0,-94.8,0,94.8,0]
	   ];
	   // squiggle for front page
	   var data1 = [
		   [-11,-65.8,0,0,-69.2,-7.3,69.2,7.3],
		   [80.5,17.7,0,0,-38.7,-20.7,38.7,20.7],
		   [220.4,-19.5,0,0,-53.3,100.8,53.3,-100.8],
		   [529.5,-33.3,0,0,-34.3,83.1,34.3,-83.1],
		   [808,14.2,0,0,-151.8,125.4,151.8,-125.4],
		   [1130.2,2.7,0,0,-94.8,0,94.8,0]
	   ];

	  //  const dog = new Sprite({
		//   image: frame.asset("dogsprite.png"),
		//   cols: 10,
		//   rows: 4,
		//   animations:{sit:[0-10], walk:[11,18], run: [11-18], jump:[33-43], fall:[44-47]}
	  // })


        STYLE = {
            type:{
                Tabs:{
                    width:160,
                    spacing:20,
                    currentSelected:false
                },
                Button:{
                    width:70,
                    height:70,
                    corner:35,
                    // backgroundColor:purple,
                    // rollBackgroundColor:pink,
                    label:"",
                    shadowBlur:-1
			},
		},
        }




        const manager = v.manager = new Manager();

        const page1 = v.page1 = new Container(stageW, stageH);
        let header = new Container().center(page1).outline();
        v.page1.logo = new Label(m.title).center(header).sca(0).outline();
	   v.page1.start = frame.asset("dog.png").sca(10);
        let content = v.page1.content = new Container(stage.width, stage.height).addTo(page1);
        v.page1.dog = new Sprite({
		  image: frame.asset("dogsprite-cropped2.png"),
		  cols: 9,
		  rows: 3,
		  animations:{walk:[0,8], jump:[9,16], fall:[17,19]}
	  });


		 var path = v.page1.path = new Squiggle({
   		  points: data1
   		  //  allowToggle: false,
   		  //  showControls: false,
   		  // interactive: false
   	  })
        // v.dial.currentValue = m.data[0];

        let footer = v.page1.play =
                new Button(100, 70, "PLAY")
			 // .addTo(page1);
        // footer.buttons[0].setIcon("icon", pizzazz.makeIcon("settings", "white"))

        manager.add(new Layout(page1, [
            {object:header, maxWidth:90, marginTop:5},
            {object:content, marginTop:2},
            {object:footer, maxWidth:90, marginTop:2}
	  ], 2, null, true, null, stage));

        const page2 = v.page2 = new Container(stageW, stageH);
        // header = new Container().addTo(page2);
        // v.page2.logo = new Label(m.title).addTo(header);
        content = v.page2.content =  new Container(1000,600).addTo(page2).outline();
	   const bg = v.page2.bg = new Scroller(frame.asset("backgroundv2.png").center(content), null, null, null, null, stage, content);

        // v.slider = new Slider().sca(1.5).center(content);
        // v.slider.currentValue = m.data[1];

	   // v.page2.stick = frame.asset("stick.png").center(page2)
	   const stick = v.page2.stick = new Scroller(frame.asset("stick.png").center(content), null, null, null, null, stage, content);

	   stick.backing1.sca(.1).centerReg().pos(100, 50, null, true, content);
	   stick.backing2.sca(.1).centerReg().pos(200, 50, null, true, content);

	   // v.page2.stick.backing1.paused = true;
	   // v.page2.stick.backing2.paused = true;


	   // v.page2.stick.sca(.1);
	   // .center(content).loc(69, 410).ske(20, -20);
	   const log = v.page2.log = new Scroller(frame.asset("log.png").center(content), null, null, null, null, stage, content);

	   log.backing1.sca(.2).centerReg().pos(300, 50, null, true, content);
	   log.backing2.sca(.2).centerReg().pos(400, 50, null, true, content);

	   v.page2.acc = new Accelerator([bg, stick, log]);

	   v.page2.acc.pause();
	   // v.page2.log.backing1.paused = true;
	   // v.page2.log.backing2.paused = true;

	   // .sca(.2).addTo());

	   var path2 = new Squiggle({
		  points: data
		  //  allowToggle: false,
		  //  showControls: false,
		  // interactive: false
	  }).addTo(v.page2.content).loc(-19, 271).outline();

	  path2.visible = true;

	   // run(time, "label")
	   v.page2.dog = new Sprite({
		  image: frame.asset("dogsprite-cropped2.png"),
		  cols: 9,
		  rows: 3,
		  animations:{walk:[0,8], jump:[9,16], fall:[17,19]}
	  });

	  v.page2.dog
	  	.reg(v.page2.dog.width-10, v.page2.dog.height/2+10)
		  .pos(60, 50, null, true, content)
		  .run({label: "walk", time:1000, loop: true})
		  .sca(5).outline()

		  v.page2.button = new Button(200, 70, "Play Again");
		 v.page2.butterfly = new Sprite({
    		   image: frame.asset("butterfly.png"),
    		   cols: 4,
    		   rows: 1
    	   })
			 .sca(.1)
			 .centerReg(v.page2.content)
			 .loc(path2.pointCircles[0])
			.run({time:2000, loop: true}).outline()
			.animate({
				props: {path:path2},
				loop: true,
				ease: "linear",
				time: 4000
			})
	    //v.page2.rect = new Rectangle().centerReg(content);



        // footer = v.page2.tabs = v.page1.tabs.clone().addTo(page2);
        manager.add(new Layout(page2, [
            {object:content, maxHeight: stage.height, maxHeight: stage.width}
	  ], 2, null, true, new Shape(), stage));

        manager.add(v.pages = new Pages([
            {page:page1, swipe:[null, null, null, null]},
            {page:page2, swipe:[null, null, null, null]}
        ], "slide", 500).addTo());

        return v;

    }
    return app; // module pattern
}(app||{}); // module pattern

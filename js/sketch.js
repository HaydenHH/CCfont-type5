window.onload = function(){

			// function begin(){
		// 	for(var i=0,l=200;i<l;i++){
		// 		strokeWeight(0);
		// 		colorMode(HSB);
		// 		x = dots[i].strokes * 20
		// 		y = dots[i].strokes * 20
		// 		fill(360/200*i, 100/200*mouseY*10, mouseX*i/200);

		// 		rowC = 100
		// 		row = Math.floor(i/rowC)
		// 		space = 10
		// 		rect(i*space-row*rowC*space,row*space,10,10)
		// 	}
		// }



}

		var allType = new Array(),
		allStroke = new Array(),
		allTone = new Array(),
		allRadicals = new Array(),
		pointWord = new Array,
		allPoints = new Array()
		var myObj = new Array()
		var lines,pointS,pointE,dots,xS,yS,xE,yE,x3,y3,x4,y4
		var pinyinStr
		var giveWord
		var dots;
		var obj,tonebase;
		var inp,btn,btn2,btn3,btn4,p1,p2,div
		var row,space,rowC
		var ch,cw,countofword



		function preload(){

			var obj = wordBank

			dots = obj

		}


		var slider;


		function setup(){
		slider = createSlider(1000, 3000, 10);
		  slider.addClass('Noprint btn-slider')
		  slider.style('width', '100px');
		  p1 = createP('1')
		  p1.addClass('Noprint showValue')
		  p2 = createP('2')
		  p2.addClass('printWord')



			ch = windowHeight
			cw = windowWidth
		  createCanvas(cw,ch);
		  p2.position(50,ch+10)

		  btn = createButton('P');
			 btn2 = createButton('A');
		  btn3 = createButton('R');
			btn4 = createButton('S');
		  btn.mousePressed(noLoop)
		  btn3.mousePressed(looop)
		 btn4.mousePressed(reCanvas)
		  btn2.mousePressed(begin)
		  //btn2.mousePressed(begin)
		  btn.addClass('Noprint btn-pause')
		  btn3.addClass('Noprint btn-render')
		  btn2.addClass('Noprint btn-auto')
			btn4.addClass('Noprint btn-reC')
		  inp = createInput('');
		  inp.addClass('inp');
		  inp.attribute('placeholder','Type Chinese to start')
		  inp.addClass('Noprint')
		  inp.style('width', '20%')
		  div = createDiv()
		  div.child(btn).child(btn2).child(btn3).child(slider).child(btn4).child(p1).addClass('control').addClass('Noprint')
		  //inp.input(begin);
		  //button.mouseClicked(redraw)


		}

		function windowResized() {
			cw = windowWidth
		  resizeCanvas(cw,ch);

		}

		function looop(){
			loop()
		}

		function reCanvas(){
			ch = slider.value()
			resizeCanvas(windowWidth,ch)
			p2.position(50,ch+90)
		}


		function draw(){
			p1.html('Canvas height:' + slider.value())
			p2.html(inp.value())
			colorMode(HSB)
		  	background(20)
				//resizeCanvas(windowWidth*0.8,ch)
		  	begin()
		  	
		  }

		


		function begin(){

				allType.splice(0)
				allStroke.splice(0)
				allTone.splice(0)
				allRadicals.splice(0)
				pointWord.splice(0)
				allPoints.splice(0)
			myObj.splice(0)

			var giveWord =  inp.value().replace(/\s+/g,"，");


			
			


			// function reCanvas(y){
			// 	resizeCanvas(windowWidth*0.8,y)
			// }
			//
			// reCanvas(giveWord.length)

			for(var i=0, l = giveWord.length; i < l; i++){
	       		allType.push(giveWord.charAt(i))

	    	}





	    	for(var count = 0, allword = allType.length; count < allword; count++){
	       		for (var bankIndex = 0, bank = wordBank.length; bankIndex < bank; bankIndex++){
	       			if (wordBank[bankIndex].word == allType[count]) {

	       				var pinyinStr = new Array()
	       			   pinyinStr.length = 0
	       			   var pinyin = wordBank[bankIndex].pinyin;
	       			   var symbolIndex = wordBank[bankIndex].strokes;

	       			     allStroke.push(wordBank[bankIndex].strokes);
	       			     allRadicals.push(wordBank[bankIndex].radicals)

	       			   //console.log(symbolIndex + '2')
	       			   //console.log(pinyin)
	       			   if(wordBank[bankIndex].radicals == 'symbol'){
	       			   		//renderSymbol('symbol', symbolIndex)
	       			   }
	       			   for(var i = 0, l = pinyin.length; i < l; i++){
	       			   		pinyinStr.push(pinyin.charAt(i))

	       			   }


	       				if(isNaN(pinyinStr) == true){
	       					for(var toneG = 0, toneGl = toneBank.length; toneG < toneGl; toneG++){
	       						for(var toneIndex = 0, tonel = toneBank[toneG].tone.length; toneIndex < tonel; toneIndex++){
	       					    	for(var pin = 0, pinl = pinyinStr.length; pin < pinl; pin++){
	       					       		if(toneG > 0 && toneBank[toneG].tone[toneIndex] == pinyinStr[pin]){
	       					       							// $('body').append($('<p>' + allType[count] + ':第' + [toneG + 1] + '声</p>'))
	       					       							//renderTone('tone',[toneG + 1])
	       					       			allTone.push([toneG])
	       					       		}else if(toneBank[toneG].tone[toneIndex] == pinyinStr[pin]){
	       					       							//$('body').append($('<p>' + allType[count] + ':轻声</p>'))
	       					       							//renderTone('toneLite',1)
	       					       			allTone.push([toneG])
	       					       		}
	       					       	}
	       					    }
	       					}
	       				}else{
	       					allTone.push('symbol')
	       				}




	       			var thisStrokes = allStroke[count];
					var thisTone = allTone[count];
					var thisCount = [count + 1]

					//console.log(thisTone)
					givePoint(thisCount,thisStrokes,thisTone)//标点给赋予了值

					function givePoint(count,strokes,tone){

						coor = new Array
						coor.length = 0


						space = cw / 10 //每个字的间距
						dotSpace = 30 //每个点的间距
						wordHeight = 5 //字的高度系数
						lineHeight = 100 //行距

						rowWord = 8  //每行的字数
						row = Math.floor(allStroke.length/rowWord)
						var centreX = count*space-row*rowWord*space 
						var centreY = row*lineHeight + 300

						if(tone == 0){
							centreX = centreX + space
							centreY = centreY
						}else if(tone == 1){
							centreX = centreX+ space
							centreY = centreY
						}else if(tone == 2){
							centreX = centreX+ space
							centreY = centreY + lineHeight*1.5
						}else if(tone == 3){
							centreX = centreX+ space
							centreY = centreY - lineHeight/1.5
						}else if(tone == 4){
							centreX = centreX+ space
							centreY = centreY - lineHeight*1.5
						}else if(tone == 'symbol'){
							centreX = count*space-row*rowWord*space+space*1.5
							centreY = centreY + lineHeight*1.5
						}


						for(var centreX,centreY,t = tone, i = 0, l = strokes; i < l;i++){
							if(t == 0){
								rowPoint = 8 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint) 


								var x = centreX + [i-layoutRow*rowPoint]*dotSpace,
									y = centreY + layoutRow*dotSpace

								coor.push({"x":x,"y":y,"t":t})
							}else if(t == 1){
								rowPoint = 4 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint)

								var x = centreX + [i-layoutRow*rowPoint]*dotSpace*1.5,
									y = centreY + layoutRow*dotSpace

								coor.push({"x":x,"y":y,"t":t})
							}else if(t == 2){
								rowPoint = 2 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint)

								var x = centreX + [i-layoutRow*rowPoint]*dotSpace,
									y = centreY - layoutRow*dotSpace

								coor.push({"x":x,"y":y,"t":t})

							}else if(t == 3){
								rowPoint = 3 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint)

								var x = centreX + [i-layoutRow*rowPoint]*dotSpace,
									y = centreY

								coor.push({"x":x,"y":y,"t":t})

							}else if(t == 4){
								rowPoint = 2 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint)

								var x = floor(centreX - [i-layoutRow*rowPoint]*dotSpace),
									y = centreY + layoutRow*dotSpace

								coor.push({"x":x,"y":y,"t":t})

							}else if(t == 'symbol'){
								rowPoint = 1 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint)

								var x = floor(centreX - [i-layoutRow*rowPoint]*dotSpace),
									y = centreY + layoutRow*dotSpace

								coor.push({"x":x,"y":y,"t":t})

							}


						}//一个字符的点
						pointWord.push([coor])
					}//绘点函数

					var userType = new Object()
					userType.getTone = thisTone;
					userType.getStro = thisStrokes;

					//console.log("JSON:" + userType.getTone + "Strokes:" +  userType.getStro)

					myObj.push(userType)


					}

	       	}//每个输入的字

	   	}


	 connect()
	}//开始检索

	function connect(){

 	 		function makeline(x,y,x2,y2,i,t){
 	 		 	 	//var lines = line(x,y,x2,y2)
 	 		 	 	var x3,x4,y3,y4
 	 		 	 	var x3 = [x+x2]/2
 	 		 	 		var x4 = x3
 	 		 	 		var y3 = y
 	 		 	 		var y4 = y2
 	 		 	 	// if(t == '0'){
	 	 		 	 // 	var x3 = [x+x2]/2
 	 		 	 	// 	var x4 = x3
 	 		 	 	// 	var y3 = y
 	 		 	 	// 	var y4 = y2
 	 		 	 	// }else if(t == '1'){
 	 		 	 	// 	var x3 = [x+x2]/2
 	 		 	 	// 	var x4 = x3
 	 		 	 	// 	var y3 = y
 	 		 	 	// 	var y4 = y2
 	 		 	 	// }else if(t == '2'){
 	 		 	 	// 	var x3 = [x+x2]/2
 	 		 	 	// 	var x4 = x3
 	 		 	 	// 	var y3 = 10 + y
 	 		 	 	// 	var y4 = y - 10
 	 		 	 	// }else if(t == '3'){
 	 		 	 	// 	var x3 = [x+x2]/2
	 	 		 	 // 	var x4 = x3
	 	 		 	 // 	var y3 = y2
	 	 		 	 // 	var y4 = y
 	 		 	 	// }else if(t == '4'){
 	 		 	 	// 	var x3 = [x+x2]/2
 	 		 	 	// 	var x4 = x3
 	 		 	 	// 	var y3 = y
 	 		 	 	// 	var y4 = y2
 	 		 	 	// }else if(t == 's'){
 	 		 	 	// 	var x3 = [x+x2]/2
 	 		 	 	// 	var x4 = x3
 	 		 	 	// 	var y3 = y
 	 		 	 	// 	var y4 = y2
 	 		 	 	// }
 	 		 	 	
 	 		 	 	noFill();
 	 		 	 	colorMode(HSB)
 	 		 	 	colorX = abs(sin(i))
 	 		 	 	sw = Math.sqrt(Math.pow([x2-x],2)+Math.pow([y2-y],2))
 	 		 	 	
 	 		 	 	//strokeWeight(sw)
 	 		 	 	line = bezier(x, y, x3, y3, x4, y4, x2, y2)
 	 		 	 	line.stroke(i,x/5,120)

 	 		}
 	 		for(var index = 1, allBox = pointWord.length; index<allBox; index++){
 	 			pointS = pointWord.slice(index-1,index)

 	 			pointS = pointS[0]

 	 			pointS = pointS[0]

 	 			pointE = pointWord.slice(index,index+1)
 	 			pointE = pointE[0]
 	 			pointE = pointE[0]

 	 			for(var i = 0, dots = pointS.length; i<dots; i++){
 	 				xS = pointS[i].x
 	 				yS = pointS[i].y
 	 				
 	 				for(var ii = 0, Edots = pointE.length; ii<Edots; ii++){
 	 					getToneA = pointE[ii].t
 	 					getTone = getToneA[0] 
 	 					xE = pointE[ii].x
 	 					yE = pointE[ii].y

 	 					makeline(xS,yS,xE,yE,index,getTone)

 	 				}
 	 			}

 	 		}
 	 	}//绘线函数

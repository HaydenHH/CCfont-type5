$(function(){
	
	var s = Snap('#svg1').attr({
		width:1440,
		height:2000,
		viewBox: '-20 0 1700 2300'
	})
	var p
	Snap.load("img/SVG/su.svg",function(su){
		s.append(su)

		 su01 = s.select('#su01')
		 su02 = s.select('#su02')
		 su03 = s.select('#su03')

		
		 // createShapeGroup(
		 // 	su03, 		//basic shape
		 // 	50, 		//quantity
		 // 	2, 			//pattern type
		 // 	5 			//pattern ele size
		 // )



		
	})
	
	var result, poAry
	var userType 
	var 
		allStroke = new Array(),
		allTone = new Array(),
		allRadicals = new Array(),
		myObj = new Array()

	var type = $("#inp1");

	

	
	$('#btn1').click(function(event) {

		getAPoem()
		
	});

	$('#btn2').click(function(event){
		var wordAttr = getAttrOfWord()

		sortData(wordAttr)
	})


	
	function getAPoem(){

		$.ajax({
			url: 'https://api.gushi.ci/all.json',
			type: 'GET'
			
		})
		.done(function(data) {
			poAry =  data.content
			//$('#gushici').text(content)
			type.val(poAry)
			//console.log(poAry)
			
			
		})
		.fail(function() {
			console.log("error");
		})
	}

	

	function getAttrOfWord(){
		var all = type.val().replace(/\s+/g,"，")

		allStroke.splice(0)
		allTone.splice(0)
		allRadicals.splice(0)
		myObj.splice(0)
		
		for(var count = 0, allword = all.length; count < allword; count++){
	       		for (var bankIndex = 0, bank = wordBank.length; bankIndex < bank; bankIndex++){
	       			if (wordBank[bankIndex].word == all[count]) {

	       				var pinyinStr = new Array()
	       			   pinyinStr.length = 0
	       			   var pinyin = wordBank[bankIndex].pinyin;
	       			   var symbolIndex = wordBank[bankIndex].strokes;

	       			     allStroke.push(wordBank[bankIndex].strokes);
	       			     allRadicals.push(wordBank[bankIndex].radicals)

	       			   
	       			   
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
	       					allTone.push('10')
	       				}




	       			var thisStrokes = allStroke[count];
					var thisTone = allTone[count];
					var thisRadi = allRadicals[count];
					var thisCount = [count + 1]

					

					
					var userType = new Object()
					userType.word = all[count]
					userType.getTone = parseInt(thisTone);
					userType.getStro = parseInt(thisStrokes);
					userType.getRadi = thisRadi;

					//console.log("JSON:" + userType.getTone + "Strokes:" +  userType.getStro)

					myObj.push(userType)


					}

	       	}//每个输入的字

	   	}
	   	// console.log(allTone)
	   	// console.log(allStroke)
	   	// console.log(allRadicals)

	   	return myObj
	}


	function rN(x){
		return Math.floor(Math.random()*(x+1))-x
	}//-x到x 随机数

	function rNF(x){
		return Math.floor(Math.random()*(x))+1
	}//0到x 随机数


	function sortData(d){
		s.selectAll('.suG').remove()

		var stroL = new Array,
			radiL = new Array,
			toneL = new Array,
			wordL = new Array

		for(var i = 0, l = d.length; i<l;i++){

			var stro = d[i].getStro
			var radi = d[i].getRadi
			var tone = d[i].getTone
			var word = d[i].word

			stroL.push(stro)
			radiL.push(radi)
			toneL.push(tone)
			wordL.push(word)

		}

		var dataCol = new Array
		
		
		console.log('all' + stroL)

		for(var i=0,l=50;i<l;i++){
			dataEle = new Object
			// var ranGet = rNF(dataCol.length)
			dataEle.stro = stroL[rNF(stroL.length)]
			dataEle.radi = radiL[rNF(radiL.length)]
			dataEle.tone = toneL[rNF(toneL.length)]
			dataEle.word = wordL[rNF(wordL.length)]
			dataCol.push(dataEle)
			//console.log(dataEle)

			
		}

		

		for(var i=0,l=dataCol.length;i<l;i++){
			createShapeGroup(
					 	su03, 		//basic shape
					 	i, 		//index
					 	l,     //总数
					 	dataCol[rNF(l)].radi, //符号判定
					 	2, 			//pattern type
					 	dataCol[rNF(l)].stro 			//pattern ele size
					 )
		}

		
		

	}
	
	// ---------------SVG 方法------------------------------SVG 方法------------------------------SVG 方法---------------

	function trans(x,y,r,ori){
			var m = new Snap.Matrix()
			m.translate(x,y)
			m.rotate(r,50,55)
			return m 
		}


	function createPattern(type,size){

			var size = size + 1

			if(type==1){
				var p = s.paper.circle(10,10,size).attr({
					fill:"red"
				}).pattern(0,5,15,15)

				return p
			}else if(type==2){
				var a = s.paper.circle(10,10,size),
					b = s.paper.circle(30,40,2*size)
				var p = s.paper.g(a,b).attr({
					fill:"red"
				}).pattern(0,0,8*size,8*size)

				return p
			}

	}


	function createShapeGroup(x,i,all,sym,pT,pS){
		//for(var i=0, c = [count+0];i<c;i++){
			//var i = count
			var r1 = rN(180),
				r2 = r1 + rN(5)
			var shape = s.use(x).attr({
		 	fill: '#3ac945',
		 	transform: trans(0,0,r1)
		 })

			var stro = s.use(x).attr({
		 	fill: "none",
		 	stroke:"grey",
		 	strokeWidth: 4,
		 	transform: trans(rN(10),0,r2)
		 })

			var pat = s.use(x).attr({
		 	fill:createPattern(pT,pS),
		 	transform: trans(0,0,r1)
		 })

			s.paper.g(shape,stro,pat).attr({
				transform:trans(LyR(i).x,LyR(i).y,0),
				class:'suG'
			})

			
		//}
		


	}



	function LyR(index){
		space = 160 //每个字的间距
		
		
		lineHeight = 200 //行距

		rowWord = 8  //每行的字数
		row = Math.floor(index/rowWord)
		var X = index*space-row*rowWord*space 
		var Y = row*lineHeight
		var cord = new Object
		cord.x = X
		cord.y = Y

		return cord

	}//排版方法，返回 x,y 值



	// ---------------SVG 方法------------------------------SVG 方法------------------------------SVG 方法---------------



})







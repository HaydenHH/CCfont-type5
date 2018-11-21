$(function(){
	
	var s = Snap('#svg1').attr({
		width:1440,
		height:2000,
		viewBox: '-20 0 1700 2300'
	})
	var p
	var ELE = new Array

	var basicG = new Array
	var CBL = new Array
	var CB = new Object

	var B2 = new Array 
	var BB = new Object
	// -------------load SVG basic--------------------------load SVG basic--------------------------load SVG basic-------------

	Snap.load("img/SVG/su.svg",function(su){
		s.append(su)

		 su01 = s.select('#su01')
		 su02 = s.select('#su02')
		 su03 = s.select('#su03')
		 basicG.push(su01,su02,su03)
		
	})

	Snap.load("img/SVG/lb1.svg",function(lb1){
		s.append(lb1)
		lb1 = s.select('#lb1')
		var lbG = lb1.selectAll('.eleG')

		
		 for(var i=0,l=lbG.length;i<l;i++){
		 	basicG.push(lbG[i])
		 }
	})

	

	function getColorFromSVG(name){
		

		Snap.load("img/SVG/color/" + name + ".svg",function(x){
			var typeL = x.node.getElementsByTagName('g')

			for (var i = 0; i < typeL.length; i++) {
				var list = new Array
				var colorL = new Array
				var typeID = typeL[i].getAttribute('id')
				colorL = typeL[i].getElementsByTagName('rect')
				for (var ii = 0; ii < colorL.length; ii++) {
					var color = colorL[ii].style.fill
					list[ii] = color
				}
				var CB = new Object
				CB.type = typeID
				CB.allColor = list
				CBL.push(CB)
				
			}
			
			
		//lo(CBL)
		})
		
		
	}

	getColorFromSVG('T4')
	getColorFromSVG('T3')
	getColorFromSVG('T2')
	getColorFromSVG('T1')

	function getBasicFromSVG(name){
		

		Snap.load("img/SVG/" + name + ".svg",function(x){
			s.select('defs').append(x)
			
			var eleL = x.selectAll('g')

			
				
				var typeID = name
				for (var ii = 0; ii < eleL.length; ii++) {
					var BB = new Object
					BB.shape = eleL[ii]
					BB.type = typeID
					BB.id = 'n' + ii
					
					B2[ii] = BB
					B2.id  = name
				}
				
				basicG.push(B2)
				
		})
		
		
	}
	getBasicFromSVG('B2')


	// -------------load SVG basic--------------------------load SVG basic--------------------------load SVG basic-------------
	
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

	function gColor(typeName,count){

			for(var i = 0, l = CBL.length;i<l;i++){

				if (typeName.id == CBL[i].type ){
					var c = CBL[i].allColor
					var useC = new Array;


					for(var i=0,l = count+1;i<l;i++){
						
						useC.push(c[rNF(c.length)])

					}

					
					return useC[rNF(useC.length)]
				}
			}
	}

	function sC(type){
				//sorted color, 3 counts
				var colorUseRange = new Array
				var cc
				if(type.c < 3){
					cc = type.c

				}else{
					cc = 4
				}
				for(var i=0,l=cc;i<l;i++){
					colorUseRange[i] = gColor(type.type,l)

				}
				return colorUseRange[rNF(colorUseRange.length)]
			}

	function sB(type,count){
				//sorted shape, max 4 counts
				var basicUseRange = new Array
				var cc
				if(count < 4){
					cc = count

				}else{
					cc = 4
				}
				for(var i=0,l=cc;i<l;i++){
					basicUseRange[i] = type[rNF(type.length)]

				}

				var usedBasic = basicUseRange[rNF(basicUseRange.length)]
				

				return usedBasic
			}//从待选区间选取基本形状

	

	// -----support function----------support function----------support function----------support function-----

	function rN(x){
		return Math.floor(Math.random()*(x+1))-x
	}//-x到x 随机数

	function rNF(x){
		return Math.floor(Math.random()*x)
	}//0到x 随机数

	function lo(x){
		return console.log(x)
	}

	function uni(arr){
	  var hash=[];
	  for (var i = 0; i < arr.length; i++) {
	     if(hash.indexOf(arr[i])==-1){
	      hash.push(arr[i]);
	     }
	  }
	  return hash;
	}

	function report(shapeC,rL,cUse,sUse){

				var report = new Object 

				if(shapeC < 4){
					var useC = shapeC
				}else{
					var useC = 4
				}

				var uSL = new Array
				for(var i=0;i<ELE.length;i++){
					uSL.push(ELE[i].bs)
				}


				report.opptionalShapes = sUse
				report.usedShapes = uni(uSL)
				report.colorStyle = cUse.id
				report.useRadicals = rL
				report.usedShapeCount = useC
				report.opptionalShape = shapeC
				report.StyleList = CBL

				return console.log(report)
			}

	// -----support function----------support function----------support function----------support function-----

	// function gRanEle(arr, x) {
 //    var shuffled = arr.slice(0), i = arr.length, min = i - x, temp, index;
 //    while (i-- > min) {
 //        index = Math.floor((i + 1) * Math.random());
 //        temp = shuffled[index];
 //        shuffled[index] = shuffled[i];
 //        shuffled[i] = temp;
 //    }
 //    return shuffled.slice(min);
	// }

	function getColorType(){

		var cTL = new Array

		for(var i=0,l=colorBase.length;i<l;i++){

			//cTL[i].type.substring(0, 3) 

			cTL.push(colorBase[i])
		}

		//console.log(cTL[1].type.substring(0, 3))
	}

	

	function sortData(d){
		//s.selectAll('.suG').remove()
		s.paper.selectAll('use').remove()
		s.selectAll('pattern').remove()

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


 		
		function Fcolor(typing){
		
			var seasonUse = new Array
			var timeUse = new Array
			var Fcolor = new Object

			//遍历键入字符,判断季节，输出到列表

			for(var i=0,l=typing.length;i<l;i++){
				for(var ia=0,la=seasonBank.season.length;ia<la;ia++){
					for(var ib=0,lb=seasonBank.season[ia].word.length;ib<lb;ib++){
						if(seasonBank.season[ia].word[ib]  == d[i].word){
							seasonUse.push(seasonBank.season[ia].num)
						}
					}
					
				}

				for(var iaa=0,laa=seasonBank.time.length;iaa<laa;iaa++){
					for(var ibb=0,lbb=seasonBank.time[iaa].word.length;ibb<lbb;ibb++){
						if(seasonBank.time[iaa].word[ibb]  == d[i].word){
							timeUse.push(seasonBank.time[iaa].num)
						}
					}
					
				}
			}
			var X

			if(seasonUse == 0){
				console.log('no season was found, return random season')
				Fcolor.season = seasonBank.season[rNF(seasonBank.season.length)].num

			}else{
				Fcolor.season = seasonUse[rNF(seasonUse.length)]
			}

			if(timeUse == 0){
				
				var X = 'G'

			}else{
				Fcolor.time = timeUse[rNF(timeUse.length)]
			}

			
			if(Fcolor.time == 1){
				var X = 'M'
			}else if(Fcolor.time == 2){
				var X = 'D'
			}
			else if(Fcolor.time == 3){
				var X = 'N'
			}
			
			Fcolor.id = 'T' + Fcolor.season + X

			return Fcolor

		}//返回了选用的颜色序列

		
		

		function Flocation(typing){
		//返回偏旁的类别和序列，可用于输出 基本形状

			var environUse = new Array
			var objectUse = new Array
			

			//遍历键入字符,判断季节，输出到列表



			for(var i=0,l=typing.length;i<l;i++){
				var FLoc = new Object
				for(var ia=0,la=locationBank.length;ia<la;ia++){
					for(var ib=0,lb=locationBank[ia].attr.length;ib<lb;ib++){
						for(var ic=0,lc=locationBank[ia].attr[ib].symbol.length;ic<lc;ic++){
							if(locationBank[ia].attr[ib].symbol[ic]  ==  d[i].getRadi){
							
							var type = locationBank[ia].type
							var num = locationBank[ia].attr[ib].num
							FLoc.id = type + num
							environUse.push(FLoc)
							}
						}
					}
				}
			}//遍历50字,输出50个属性到数组

			if(environUse == 0){
				console.log('no defined words were found, chose random attribute')
				var ranLoc = new Object
				
				ranLoc.type = locationBank[rNF(locationBank.length)].type
				var ranTAttr = locationBank[rNF(locationBank.length)].attr
				ranLoc.num = ranTAttr[rNF(ranTAttr.length)].num
				ranLoc.id = ranLoc.type + ranLoc.num
				return ranLoc.id
				
			}else{
				return environUse
				//返回能识别的数组
			}




		}

		var eleCount = d.length //键入的数量

		var US = ['B2']   

		
		function CB(uC){
				var basic = new Array
				

				for (var i = 0; i < eleCount; i++) {

					// basic[i] = basicG[rNF(basicG.length)]
					//basic[i] = B2[rNF(B2.length)].shape
				
					for(var ii=0,l=basicG.length;ii<l;ii++){
						
						for(var iii=0,lll=uC.length;iii<lll;iii++){
							if(basicG[ii].id == uC[iii]){
								var out = basicG[ii][rNF(basicG[ii].length)]
								basic[i] = out.shape
							
							}
						}
					}
				}
				return basic
			}//返回一个待选形状区间，由定义字符生成


			//var baseEle = lbG[rNF(lbG.length)]

			var CB = CB(US)
			var CS = Fcolor(d)
			var CType = new Object
			CType.type = CS
			CType.c = eleCount
			

			//createShapeGroup(x,i,all,type,sym,pT,pS)
			for(var i=0,l=48;i<l;i++){
				createShapeGroup(
					 	sB(CB,2), 		//basic shape
					 	i, 		//index
					 	d.length,     //总数
					 	CType,  // color type
					 	dataCol[rNF(l)].radi, //符号判定
					 	4, 			//pattern type
					 	dataCol[rNF(l)].stro 			//pattern ele size
					 )

				
			}
		

		report(eleCount,radiL,CS,Flocation(d))

		}//sort


		

		

		
		

	
	
	// ---------------SVG 方法------------------------------SVG 方法------------------------------SVG 方法---------------

	function trans(x,y,r,ori){
			var m = new Snap.Matrix()
			m.translate(x,y)
			m.rotate(r,50,55)
			return m 
		}


	function createPattern(type,size,pC,count){
			if(size == NaN){
				size = 1
			}
			var size = size + 1
			//console.log(size)

			if(type==1){
				var p = s.paper.circle(10,10,size).attr({
					fill:sC(pC)
				}).pattern(0,5,15,15)

				return p
			}else if(type==2){
				var a = s.paper.circle(10,10,size),
					b = s.paper.circle(30,40,2*size)
				var p = s.paper.g(a,b).attr({
					fill:sC(pC)
				}).pattern(0,0,8*size,8*size)

				return p
			}else if(type==3){
				var a = s.paper.rect(0,0,size,size*2)
				var b = s.paper.rect(0,0,size*0.5,size*2)
				var p = s.paper.g(a,b).attr({
					fill:sC(pC)
				}).pattern(0,0,8*size,8*size)

				return p
			}else if(type==4){
				var a = s.paper.rect(0,0,size*5,size*2)
				var b = s.paper.rect(20,20,size*5,size*1)
				var p = s.paper.g(a,b).attr({
					fill:sC(pC)
				}).pattern(0,0,5*size,3*size)

				return p
			}

	}


	function createShapeGroup(x,i,all,type,sym,pT,pS){
		
			var r1 = rNF(2),
				r2 = r1 + rNF(5)
			var shape = s.use(x).attr({
		 	fill: sC(type),
		 	transform: trans(0,0,r1)
		 })

			var stro = s.use(x).attr({
		 	fill: "none",
		 	stroke:"grey",
		 	strokeWidth: 4,
		 	transform: trans(rN(10),0,r2)
		 })

			var pat = s.use(x).attr({
		 	fill:createPattern(pT,pS,type,all),
		 	transform: trans(0,0,r1)
		 })

		ELE[i] = s.paper.g(shape,pat,stro).attr({
				transform:trans(LyR(i).x,LyR(i).y,0),
				class:'eleG'
			})

		//ELE[i].bs = x.node
			
		

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







window.onload = function(){


	for(var poemIndex = 0, poemL = poemBank.length; poemIndex < poemL; poemIndex++){
		var pShow = $('<a class="poemShow" href="#" index =' + poemIndex + '>' + poemBank[poemIndex].titles +'</a>')
		var pLi = $('<li></li>').addClass('poem').append(pShow)
		$('#getChinese ul').append(pLi)

		$('.poemShow').click(function(){
		var i = $(this).attr('index')
		var	pText = $('<p class="poemText">'+ poemBank[i].contents +'</p>'),
				pTran = $('<p class="poemTrans">'+ poemBank[i].translate +'</p>'),
				pCont = $('<p class="poemContent"></p>');
		var pCon = pCont.append(pText,pTran)
				$('#showContent').find('p').remove()
				$('#showContent').append(pCon)

		});
	}


	$('#giveBox').hide()
	//$('.poemContent').hide()


	$('#showBtn1').click(function(){
		$('#giveBox').stop().fadeToggle(200)

	});

	$('#showBtn2').click(function(){
		$('#giveBox').stop().fadeToggle(200)
	});





}

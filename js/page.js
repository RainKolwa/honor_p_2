(function ($, TL, TM) {
	var HONOR = {};

	// 入场动画
	HONOR.Landing = (function(){

		var text = " 他们有着独特的个性、出众的外表，拥有荣耀星人的特质，他们是我们的明星战队！ \
		在荣耀2周年狂欢Party现场，你们可以见到他们本人哦！ \
		让我们一起来猜一下，分别都有谁？",
			delay = 0,
			currentChar = 1;

		var init = function(){
			// startTyping(text, 50, "test");
			showPlanet();
		}

		var type = function(){
			var dest=document.getElementById(destination);
			if (dest)
			{
				dest.innerHTML=text.substr(0, currentChar)+"_";
				currentChar++;
				if (currentChar<=text.length)
				{
					setTimeout(type, delay);
				}else{
					console.log("complete")
					// 显示星球
					showPlanet();
				}
			}	
		}

		var startTyping = function(textParam, delayParam, destinationParam){
			text=textParam;
			delay=delayParam;
			currentChar=1;
			destination=destinationParam;
			type();
		}

		var showPlanet = function(){
			var planet1 = $('.planet-1');
			var planet2 = $('.planet-2');
			TL.from(planet1, 5, {left: '50%', top: '0%', scale: .1, opacity: .5, onComplete: completePlanetHandler})
			TL.from(planet2, 5, {left: '40%', top: '45%', scale: .3, opacity: .5})
		}

		var completePlanetHandler = function(){
			// 显示猜题入口
			console.log('start')
			HONOR.Panel.init();
			HONOR.Panel.setStatus('start');
		}
		
		return {
			init: init
		};
	})();

	// 控制面板
	HONOR.Panel = (function(){
		var panel = $('.panel'),
			statusBox = panel.find('.statusBox');

		var init = function(){

			bindEvents();
		}

		var bindEvents = function(){
			statusBox.on('click', 'a', function(e){
				e.preventDefault();
				if($(this).hasClass('start')){

				}else if($(this).hasClass('next')){

				}else if($(this).hasClass('submit')){

				}else{
					return;
				}
			})
		}

		var setStatus = function(type){
			switch (type){
				case 'start':
					statusBox.find('.start').show().siblings().hide();
					break;
				case 'next':
					statusBox.find('.next').show().siblings().hide();
					break;
				case 'submit':
					statusBox.find('.submit').show().siblings().hide();
					break;
				default:
					statusBox.find('.default').show().siblings().hide();
			}
		}

		return {
			init: init,
			setStatus: setStatus
		}
	})();

	// 抽题
	HONOR.Exam = (function(){

		var questions = [
			{
				desc: "哈哈",
				imgSrc: "",
				content: ["你","好","吗","停","之","哈","奇","葩","舒","服","撒","发","生","啊","是","分","手"]
			},
			{
				content: ["你","好","吗","停","之","哈","奇","葩","舒","服","撒","发","生","啊","是","分","手"]
			},
			{
				content: ["你","好","吗","停","之","哈","奇","葩","舒","服","撒","发","生","啊","是","分","手"]
			},
			{
				content: ["你","好","吗","停","之","哈","奇","葩","舒","服","撒","发","生","啊","是","分","手"]
			},
			{
				content: ["你","好","吗","停","之","哈","奇","葩","舒","服","撒","发","生","啊","是","分","手"]
			},
			{
				content: ["你","好","吗","停","之","哈","奇","葩","舒","服","撒","发","生","啊","是","分","手"]
			},
			{
				content: ["你","好","吗","停","之","哈","奇","葩","舒","服","撒","发","生","啊","是","分","手"]
			},
			{
				content: ["你","好","吗","停","之","哈","奇","葩","舒","服","撒","发","生","啊","是","分","手"]
			}
		];

		var examTotal = 3; // 随机题数
		var answeredCount = 0;
		var numberPerLine = 7;

		var examBox = $('.examBox');
		var 
		var selectionBox = examBox.find('.selections');

		var init = function(){
			bindEvents();
		}

		var bindEvents = function(){

		}

		var randomQuestionIndex = function(){
			// 随机产生[0,7]之间的整数
			return Math.floor(Math.random() * questions.length);
		}

		var showQuestion = function(index){
			// 显示第 index 条题目
			var content = questions[index].content; // array
			var desc = questions[index].desc;
			var questionHTML = '';
			for(var i = 0;i++;i > content.length){
				var left = 100 * i;
				var top = 0;
				if(i > numberPerLine){
					top = (i/numberPerLine>2)? 80 : 40;
				}
				var style = "position:absolute;left:"+left+"px;top:"+top+"px;";
				questionHTML += "<a style="+style+">"+content[i]+"</a>";
			}
			$('.dom').html(questionHTML);
			$('.dom').show();
		}

		var randomQuestion = function(){
			var index = randomQuestionIndex();
			showQuestion(index);
		}

		return {
			init: init,
			randomQuestion: randomQuestion
		}
	})();

	// 答题结果
	HONOR.Result = (function(){
		
		var show = function(){

		}

		return {

		}
	})();

	// 启动飞船
	HONOR.Landing.init();

})(jQuery, TweenLite, TweenMax);





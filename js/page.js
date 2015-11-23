(function ($, TL, TM, template) {

	var HONOR = {};
	window.HONOR = HONOR;

	// 入场动画
	HONOR.Landing = (function(){

		var text = " 他们有着独特的个性、出众的外表，拥有荣耀星人的特质，他们是我们的明星战队！在荣耀2周年狂欢Party现场，你们可以见到他们本人哦！让我们一起来猜一下，分别都有谁？",
			delay = 0,
			currentChar = 1;

		var init = function(){
			// startTyping(text, 50, "test");
			showPlanet();
		};

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
					console.log("complete");
					// 显示星球
					showPlanet();
				}
			}	
		};

		var startTyping = function(textParam, delayParam, destinationParam){
			text=textParam;
			delay=delayParam;
			currentChar=1;
			destination=destinationParam;
			type();
		};

		var showPlanet = function(){
			var planet1 = $('.planet-1');
			var planet2 = $('.planet-2');
			var planet3 = $('.planet-3');
			var planet4 = $('.planet-4');
			var planet5 = $('.planet-5');
			TL.from(planet1, 5, {left: '50%', top: '-19%', scale: 0.04, opacity: 1, onComplete: completePlanetHandler});
			TL.from(planet2, 5, {left: '23%', top: '20%', scale: 0.2, opacity: 1});
			TL.from(planet3, 5, {left: '35%', top: '25%', scale: 0.3, opacity: 1});
			TL.from(planet4, 5, {left: '59%', top: '36%', scale: 0.3, opacity: 1});
			TL.from(planet5, 5, {left: '52%', top: '33%', scale: 0.2, opacity: 1});
		};

		var completePlanetHandler = function(){
			// 显示猜题入口
			console.log('start');
			HONOR.Panel.init();
			HONOR.Panel.setStatus('start');
		};
		
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
		};

		var bindEvents = function(){
			statusBox.on('click', 'a', function(e){
				e.preventDefault();
				if($(this).hasClass('start')){

				}else if($(this).hasClass('next')){

				}else if($(this).hasClass('submit')){

				}else{
					return;
				}
			});
		};

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
		};

		return {
			init: init,
			setStatus: setStatus
		};
	})();

	// 抽题
	HONOR.Exam = (function(){
		// 定义题库
		var questions = [
			{
				id: 0,
				img: "images/star-1.png",
				desc: "哈哈",
				content: ["你","好","吗","停","之","哈","奇","葩","舒","服","撒","发","生","啊","是","分","手"]
			}
		];

		var examTotal = 3; // 随机题数
		var answeredCount = 0;
		var numberPerLine = 7;

		var examBox = $('.examBox');

		var init = function(){
			bindEvents();
		};

		var bindEvents = function(){

		};

		var randomQuestionIndex = function(){
			// 随机产生[0,questions.length]之间的整数
			return Math.floor(Math.random() * questions.length);
		};

		var showQuestion = function(index){
			// 显示第 index 条题目
			var html = template('examView', questions[index]);
			$('#examBox').html(html);
		};

		var randomQuestion = function(){
			// index !== id
			var index = randomQuestionIndex();
			// 显示题目
			showQuestion(index);
			// 从题库中删除该题
			questions.splice(index, 1);
		};

		return {
			init: init,
			randomQuestion: randomQuestion,
			showQuestion: showQuestion,
			questions: questions
		};
	})();

	// 答题结果
	HONOR.Result = (function(){
		
		var show = function(){

		};

		return {

		};
	})();

	// 启动飞船
	HONOR.Landing.init();

	// 测试
	HONOR.Exam.showQuestion(0);

})(jQuery, TweenLite, TweenMax, template);



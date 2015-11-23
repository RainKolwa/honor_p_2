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
			HONOR.Panel.setStatus();
			// 小物件css动画
			$('.radar-container .alert').addClass('anim-alert');
			$('.radar-container .lightning').addClass('anim-lightning');
			$('.astronaut-1').addClass('anim-rotate');
			$('.astronaut-5').addClass('anim-jump');
			$('.astronaut-5 .shadow').addClass('anim-shadow');
			
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
					HONOR.Exam.init();
					HONOR.Exam.randomQuestion();
					HONOR.Panel.setStatus();
				}else if($(this).hasClass('next')){
					HONOR.Exam.randomQuestion();
					HONOR.Panel.setStatus();
				}else if($(this).hasClass('submit')){
					HONOR.Exam.submitAnswers();
				}else{
					return;
				}
			});
		};

		var setStatus = function(){
			var answeredCount =HONOR.Exam.allTotal - HONOR.Exam.questions.length;

			switch (answeredCount){
				case 0:
					statusBox.find('.start').show().siblings().hide();
					break;
				case 1:
					statusBox.find('.next').show().siblings().hide();
					break;
				case 2:
					statusBox.find('.next').show().siblings().hide();
					break;
				case 3:
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
				id: 1,
				img: "images/star-1.png",
				desc: "她凭一己之力就能掀起一股文化现象。她是时尚界风生水起的新宠。无惧“玩过界”，勇敢做自己。",
				content: ["紫","韶","丁","玮","颖","林","弦","宇","邓","涵","当","蔡","李","靓","棋","张","范","春","琪","子","依"]
			},
			{
				id: 2,
				img: "images/star-2.png",
				desc: "她的名字很特别，她的形象古灵精怪。她的代表作非常接地气，传递出一股特别的文艺气息。她用一种肆意的态度“在这一刻绽放”。",
				content: ["千","肆","全","颂","敏","茜","郑","阿","智","晶","秀","贤","伊","宋","孝","莉","雪","乔","慧","张","拉"]
			},
			{
				id: 3,
				img: "images/star-3.png",
				desc: "以歌为媒，传递永不凋零的爱情主题。他还拥有一半艳阳一半大雪的诗人灵魂。他的世界，与别人有点不同。",
				content: ["张","谦","坤","杰","陈","歌","弦","宇","邓","涵","当","蔡","李","靓","棋","张","范","春","琪","子","依"]
			},
			{
				id: 4,
				img: "images/star-1.png",
				desc: "她凭一己之力就能掀起一股文化现象。她是时尚界风生水起的新宠。无惧“玩过界”，勇敢做自己。",
				content: ["紫","韶","丁","玮","颖","林","弦","宇","邓","涵","当","蔡","李","靓","棋","张","范","春","琪","子","依"]
			},
			{
				id: 5,
				img: "images/star-2.png",
				desc: "她的名字很特别，她的形象古灵精怪。她的代表作非常接地气，传递出一股特别的文艺气息。她用一种肆意的态度“在这一刻绽放”。",
				content: ["千","肆","全","颂","敏","茜","郑","阿","智","晶","秀","贤","伊","宋","孝","莉","雪","乔","慧","张","拉"]
			},
			{
				id: 6,
				img: "images/star-3.png",
				desc: "以歌为媒，传递永不凋零的爱情主题。他还拥有一半艳阳一半大雪的诗人灵魂。他的世界，与别人有点不同。",
				content: ["张","谦","坤","杰","陈","歌","弦","宇","邓","涵","当","蔡","李","靓","棋","张","范","春","琪","子","依"]
			},
			{
				id: 7,
				img: "images/star-1.png",
				desc: "她凭一己之力就能掀起一股文化现象。她是时尚界风生水起的新宠。无惧“玩过界”，勇敢做自己。",
				content: ["紫","韶","丁","玮","颖","林","弦","宇","邓","涵","当","蔡","李","靓","棋","张","范","春","琪","子","依"]
			},
			{
				id: 8,
				img: "images/star-2.png",
				desc: "她的名字很特别，她的形象古灵精怪。她的代表作非常接地气，传递出一股特别的文艺气息。她用一种肆意的态度“在这一刻绽放”。",
				content: ["千","肆","全","颂","敏","茜","郑","阿","智","晶","秀","贤","伊","宋","孝","莉","雪","乔","慧","张","拉"]
			}
		];

		var examTotal = 3; // 随机题数
		var allTotal = questions.length;
		var myAnswers;

		var examBox = $('.examBox');

		var init = function(){
			bindEvents();
		};

		var bindEvents = function(){
			examBox.on('click', '.paper a', function(){
				if($(this).hasClass('a1') || $(this).hasClass('a2') || $(this).hasClass('a3')) return;
				var select = $(this).text();
				if($('.paper a.a1').text() === ''){
					$('.paper a.a1').text(select)
				}else if($('.paper a.a2').text() === ''){
					$('.paper a.a2').text(select)
				}else if($('.paper a.a3').text() === ''){
					$('.paper a.a3').text(select)
				}else{
					alert('空格已填满！')
					return;
				}
			})
		};

		var randomQuestionIndex = function(){
			// 随机产生[0,questions.length]之间的整数
			return Math.floor(Math.random() * questions.length);
		};

		var showQuestion = function(index){
			// 显示第 index 条题目
			var html = template('examView', questions[index]);
			examBox.html(html);
			examBox.show();
			TL.from(examBox, 0.4, {scale: 1.2, opacity: 0})
		};

		var randomQuestion = function(){
			// index !== id
			var index = randomQuestionIndex();
			// 显示题目
			showQuestion(index);
			// 从题库中删除该题
			questions.splice(index, 1);
		};

		var submitAnswers = function(){
			// 提交答案（myAnswers）
		}

		return {
			init: init,
			randomQuestion: randomQuestion,
			showQuestion: showQuestion,
			submitAnswers: submitAnswers,
			questions: questions,
			allTotal: allTotal
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
	// HONOR.Exam.showQuestion(0);

})(jQuery, TweenLite, TweenMax, template);



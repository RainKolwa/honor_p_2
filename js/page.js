(function ($, imagesLoaded, TL, template, audiojs, cityJson, CountUp) {

	var isProduction = true;

	var HONOR = {};
	window.HONOR = HONOR;

	HONOR.Config = {
		baseUrl: isProduction ? "http://campaign.honor.cn/planet/star/pc" : "http://campaign.honor.cn/test/planet/star/pc",
		api: isProduction ? "http://campaign.honor.cn/awards-inform/star/src/save.php?action=" : "http://campaign.honor.cn/awards-inform/star/src/save2.php?action=",
		dataType: isProduction ? "json" : "jsonp",
		questions: [
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
				content: ["张","谦","坤","杰","陈","歌","小","春","之","胡","薛","尼","頔","东","迪","马","池","力","宋","野","云"]
			},
			{
				id: 4,
				img: "images/star-4.png",
				desc: "只要能开口唱歌，他就觉得很快乐。爱猫爱笑，爱到要把这些都唱进歌里。不被生活的阴霾遮住眼，才能笑到最后。",
				content: ["晨","雨","萧","井","王","天","胡","敬","陈","然","晓","彦","千","德","刘","翔","柏","斌","华","腾","博"]
			},
			{
				id: 5,
				img: "images/star-5.png",
				desc: "他的歌声令人过耳难忘。他用声音传递快乐，用声音表达自己。他与同龄人不同，用别样经历演绎什么叫“青春优等生”",
				content: ["举","荣","源","易","尔","伦","李","杰","峰","纲","浩","千","涛","黄","周","王","子","涛","清","白","张"]
			},
			{
				id: 6,
				img: "images/star-6.png",
				desc: "我行我素是他的标志。即使来自火星，也不怕不被了解。转换一个角度，独特的世界颠覆你的想象。",
				content: ["亦","贤","凯","王","伯","韬","友","白","晨","凡","吴","晗","边","俊","鹿","华","张","兴","宇","黄","子"]
			},
			{
				id: 7,
				img: "images/star-7.png",
				desc: "他靠张嘴吃饭，临场发挥一级棒。他的睿智来自深厚的文化涵养。“双眼看世界”，才能看得更多更远。",
				content: ["宁","少","赵","咏","孟","贝","涵","炅","乐","华","忠","非","撒","何","汪","嘉","祥","李","王","海","伟"]
			},
			{
				id: 8,
				img: "images/star-8.png",
				desc: "她的声音拥有触及灵魂的力量。她来自久负盛名的女子团体。她的舞台因为伙伴更精彩，未来更灿烂",
				content: ["彩","桦","思","任","宋","陈","甄","萱","茜","家","田","莉","雪","嘉","崔","馥","蜜","睛","晶","秀","斯"]
			}
		]
	};

	// 公用函数
	HONOR.Public = (function(){
		var isltIE8;
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
		(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
		(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

		if (Sys.ie){
		    isltIE8 = parseInt(Sys.ie) < 9 ? true : false;
		}

		var hasTriedToday = false;
		var isCamoaignOver = true;

		var init = function(){
			// transform examBox 876* 556
			var w_win = $(window).width();
			var scale = w_win/1920
			setTransform(scale);

			bindEvents();
		};
		var bindEvents = function(){
			$(document).on('click', '.alertBox .hideit', function(){
				$('.alertBox').fadeOut();
			})
			$(window).on('resize',function(){
				var w_win = $(window).width();
				var scale = w_win/1920;
				setTransform(scale);
			})
		};
		var alert = function(msg){
			$('.alertBox').find('p').text(msg);
			$('.alertBox').fadeIn();
		};
		var setTransform = function(val){
			$('.examBox,.result,.ctlpanel,.text-container').css({
				'-webkit-transform':'scale('+val+')',
				'-moz-transform':'scale('+val+')',
				'-ms-transform':'scale('+val+')',
				'transform':'scale('+val+')'
			});
		};
		
		return {
			init: init,
			isltIE8: isltIE8,
			alert: alert,
			hasTriedToday: hasTriedToday,
			isCamoaignOver: isCamoaignOver
		}
	})();

	// 入场动画
	HONOR.Landing = (function(){

		var text = "他们有着独特的个性、出众的外表，拥有荣耀星人的特质，他们是我们的明星战队！在荣耀2周年狂欢Party现场，你们可以见到他们本人哦！让我们一起来猜一下，分别都有谁？",
			delay = 0,
			currentChar = 1;


		var ship = $('.ctlpanel'),
			dialog = $('.text-container'),
			preloadBox = $('#preload'),
			percentBox = $("#percentage"),
			UFO = $('#ufo');

		var preloadData = {
			imgs:[
				"bg-origin.jpg",
				"astronaut-5th-shadow.png",
				"astronaut-5th.png",
				"astronaut-first.png",
				"astronaut-last-dialog.png",
				"astronaut-last.png",
				"bg.jpg",
				"box-exam.png",
				"box-result.png",
				"box-txt.png",
				"btn-wrap.png",
				"lightning.png",
				"line.png",
				"logo.png",
				"panel-status-default.png",
				"panel-status-progress.png",
				"planet-1.png",
				"planet-2.png",
				"planet-3.png",
				"planet-4.png",
				"planet-5.png",
				"radar-alert.png",
				"radar.png",
				"ship.png",
				"sqr-txt.png",
				"star-1.png",
				"star-2.png",
				"star-3.png",
				"star-4.png",
				"star-5.png",
				"star-6.png",
				"star-7.png",
				"star-8.png",
				"star-bg.png",
				"ufo.png",
				"wormhole.png"
			]
		};

		var init = function(){

			// UFO浪
			if(!HONOR.Public.isltIE8){
				randomUFO();
			}

			// 渲染加载模版
			var imgHTML = template("loadImgBox", preloadData);
			preloadBox.html(imgHTML);

			var imgs = preloadBox.find('img'),
				allimg_count = imgs.length,
				img_count = 0;

			imgs.each(function(){
				$(this).imagesLoaded(function(){
					img_count++;
					var percentage = Math.floor((img_count/allimg_count)*100);
					percentBox.html(percentage+"%");
					if(img_count == allimg_count){
						// UFO升顶
						completeLoadingHandler();
						// TL.to(UFO, 0.8, {left: "45%", top: "-10%", onComplete: completeLoadingHandler})
						if(HONOR.Public.isltIE8){
							$('.planets').hide();
						}

						if(window.location.href.indexOf('showResult') == -1 && window.location.href.indexOf('showUname') == -1){
							startTyping(text, 100, "test");
						}
					}
				});
			});

			
			// 初始化音频
			audiojs.events.ready(function() {
				audiojs.createAll({
					autoplay: true,
					loop: true
				});
			});

			// 码表
			if(!HONOR.Public.isltIE8){
				var options = {
				  useEasing : true, 
				  useGrouping : true, 
				  separator : ',', 
				  decimal : '.', 
				  prefix : '', 
				  suffix : '' 
				};
				var speed1 = new CountUp("speed1", 0, 520, 0, 5, options);
				speed1.start(stableSpeed(speed1, 520));
				var speed2 = new CountUp("speed2", 0, 98, 0, 5, options);
				speed2.start(stableSpeed(speed2, 93));
			}
			function stableSpeed(o, max){
				setInterval(function(){
					var someVal = Math.random() * 5 + max;
					o.update(someVal)
				},1000)
			}

			bindEvents();
		};

		var completeLoadingHandler = function(){

			// 显示飞船
			showShip();

			// 移除loading
			$('#loading').fadeOut(100,function(){
				$(this).remove();

				// 如是登录回调且已答过题
				if(window.location.href.indexOf('showResult') > -1){
					HONOR.Result.requestResult();
					showPlanet();
				}
				if(window.location.href.indexOf('showUname') > -1){
					HONOR.Api.isLogin(false, true, true);
					showPlanet();
				}
			});
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
					// 停顿1s执行
					setTimeout(function(){
						// 隐藏对话框
						TL.to(dialog, 0.8, {y: -100,alpha: 0})
						setTimeout(function(){
							// 显示星球
							showPlanet();
							// 移除对话框
							dialog.remove();
						},800)
					},1000)
					
				}
			}	
		};

		var startTyping = function(textParam, delayParam, destinationParam){
			dialog.show();
			text=textParam;
			delay=delayParam;
			currentChar=1;
			destination=destinationParam;
			type();
		};

		var showShip = function(){
			TL.from(ship, 2, {bottom: -383});
			setTimeout(function(){
				$('.line').fadeIn('fast').fadeOut('fast').fadeIn('fast');
			}, 2000)
		};

		var showPlanet = function(){
			// 星球动画
			var planet1 = $('.planet-1');
			var planet2 = $('.planet-2');
			var planet3 = $('.planet-3');
			var planet4 = $('.planet-4');
			var planet5 = $('.planet-5');
			if(!HONOR.Public.isltIE8){
				TL.to(planet1, 5, {left: '50%', top: '20%', scale: 1, ease: 'Linear', onComplete: completePlanetHandler});
				TL.to(planet2, 8, {left: '-3%', top: '10%', scale: 1, ease: 'Linear', delay: 0.5});
				TL.to(planet3, 10, {left: '20%', top: '-8%', scale: 1, ease: 'Linear', delay: 1.5});
				TL.to(planet4, 8, {left: '75%', top: '10%', scale: 1, ease: 'Linear', delay: 0.2});
				TL.to(planet5, 7, {left: '85%', top: '60%', scale: 1, ease: 'Linear', delay: 0.8});
				// 小物件css动画
				$('.radar-container .alert').addClass('anim-alert');
				$('.radar-container .lightning').addClass('anim-lightning');
				$('.astronaut-1').addClass('anim-rotate');
				$('.astronaut-5').addClass('anim-jump');
				setTimeout($('.astronaut-6').addClass('anim-jump'),500);
				$('.astronaut-5 .shadow').addClass('anim-shadow');
			}else{
				$('.planets').show();	
				planet1.css({left: '50%', top: '20%'});
				planet2.css({left: '-3%', top: '10%'});
				planet3.css({left: '20%', top: '-8%'});
				planet4.css({left: '75%', top: '10%'});
				planet5.css({left: '85%', top: '60%'});
				completePlanetHandler();
			}
		};

		var completePlanetHandler = function(){
			// 显示猜题入口
			HONOR.Panel.init();
			HONOR.Panel.setStatus();
		};

		var randomUFO = function(){
			var t = Math.random() * 768;
		    var l = Math.random() * 1280;
		    var time = Math.random() * 5000;

		    $('#ufo').animate({top: t + 'px', left: l + 'px'}, time, 'swing', randomUFO);
		};

		var bindEvents = function(){
			// 右侧菜单
			$('#toggle-sidebar').on('click', function () {
		        $('#sidebar').toggleClass('status-close');
		    });
		};
		
		return {
			init: init,
			startTyping: startTyping
		};
	})();

	// 控制面板
	HONOR.Panel = (function(){
		var panel = $('.ctlpanel'),
			statusBox = panel.find('.statusBox'),
			planets = $('.planets');

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
					if(!HONOR.Public.isltIE8){
						$('.examLight').show();
					}
					if($('.planets').length > 0){
						TL.to($('.planets'),0.8,{y:100,opacity:0});
						setTimeout(function(){
							// 隐藏星球
							TL.to(planets, 1, {opacity: 0});
						},500)
					}
					_paq.push(['trackLink','star_button_qucai','link','']);_tjc.push(['_trackEvent','index','star_button_qucai','','1','']);
				}else if($(this).hasClass('next')){
					if($('.a1').text() == '' || $('.a2').text() == ''){
						HONOR.Public.alert('请完善答案');
						return;
					}
					HONOR.Exam.randomQuestion();
					HONOR.Panel.setStatus();
					_paq.push(['trackLink','star_button_tijiao','link','']);_tjc.push(['_trackEvent','index','star_button_tijiao','','1','']);
				}else if($(this).hasClass('submit')){
					if($('.a1').text() == '' || $('.a2').text() == ''){
						HONOR.Public.alert('请完善答案');
						return;
					}
					HONOR.Exam.submitAnswers();
					$('.examLight').hide();
					_paq.push(['trackLink','star_button_tijiao','link','']);_tjc.push(['_trackEvent','index','star_button_tijiao','','1','']);
				}else{
					return;
				}
			});
		};

		var setStatus = function(answeredCount){
			// 设置状态栏状态
			var ascount;
			if(answeredCount === undefined){
				ascount = HONOR.Exam.allTotal - HONOR.Exam.questions.length;
			}else{
				ascount = answeredCount;
			}
			switch (ascount){
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
		var questions = HONOR.Config.questions.slice();

		var examTotal = 3; // 随机题数
		var allTotal = questions.length;
		var myAnswers;

		var examBox = $('.examBox');

		var init = function(){
			bindEvents();
		};

		var bindEvents = function(){
			examBox.on('click', '.paper a', function(e){
				e.preventDefault();
				if($(this).hasClass('a1') || $(this).hasClass('a2') || $(this).hasClass('a3')){
					// 删除
					if($(this).children('span').text() == ''){
						return;
					}else{
						var fromIndex = $(this).data('index');
						$(this).removeClass('filled').children('span').html('');
						$('.paper a').eq(fromIndex).removeClass('selected');
					}
				}else{
					// 选择
					var _text = $(this).children('span').text();
					var _index = $(this).index();
					if($(this).hasClass('selected')){
						return;
					}else{
						for(var o = 0;o < 3;o++){
							if($('.paper a').eq(o).children('span').text()==""){
								$('.paper a').eq(o).addClass('filled').data('index',_index).children('span').text(_text).append('<i></i>');
								$(this).addClass('selected');
								break;
							}
						}
					}

				}
				
			})
		};

		var randomQuestionIndex = function(){
			// 随机产生[0,questions.length]之间的整数
			return Math.floor(Math.random() * HONOR.Exam.questions.length);
		};

		var showQuestion = function(index){
			// 显示第 index 条题目
			var html = template('examView', HONOR.Exam.questions[index]);
			$('#examBox').html(html);
			examBox.show();
			if(!HONOR.Public.isltIE8){
				TL.from(examBox, 0.8, {y: -100, opacity: 0})
			}else{
				examBox.css('opacity', 1);
			}
			HONOR.Exam.init();
		};

		var randomQuestion = function(){
			// index !== id
			var index = randomQuestionIndex();
			// 显示题目
			showQuestion(index);
			// 从题库中删除该题
			HONOR.Exam.questions.splice(index, 1);
		};

		var submitAnswers = function(){
			// 隐藏题目
			TL.to(examBox, 0.8, {opacity: 0, onComplete: onQsCompleteHandle})
			
			function onQsCompleteHandle(){
				examBox.hide();
				examBox.css('opacity', 1)
			}
			
			HONOR.Panel.setStatus('default');

			// 提交答案（myAnswers）

			// success回调
			// setTimeout(function(){
			if(HONOR.Public.isCamoaignOver){
				HONOR.Result.displayResult('type-8');
			}else{
				if(HONOR.Api.hasLotteried || HONOR.Public.hasTriedToday){
					HONOR.Result.displayResult('type-3');
				}else{
					HONOR.Result.displayResult('type-2');//恭喜您！获得荣耀星球勋章一枚		
				}
			}
			// },1000)
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

		var resultBox = $('.result');
		var provinceBox = resultBox.find('.optionbox');
		var cityBox = resultBox.find('.suboption');
		var provinceSel = resultBox.find('.selectbox');
		var citySel = resultBox.find('.subselect');
		var planets = $('.planets');
		
		var init = function(){
			bindEvents();
		};

		var bindEvents = function(){
			// 打开抽奖
			resultBox.on('click', '.start', function(){
				HONOR.Api.isLogin(true, false, true);
				HONOR.Public.hasTriedToday = true;
			})
			resultBox.on('click', '.hideit', function(){
				hideResult();
				HONOR.Exam.questions = HONOR.Config.questions.slice();
				HONOR.Panel.setStatus();
				// 显示星球
				TL.to(planets, 1, {opacity: 1});
				// 追踪打开抽奖页面下的关闭按钮
				if(!$('.type-2').is('hidden')){
					_paq.push(['trackLink','star_button_dakaichoujiang_close','link','']);_tjc.push(['_trackEvent','index','star_button_dakaichoujiang_close','','1','']);
				}
			})
			resultBox.on('click', '.logout', function(){
				HONOR.Api.Logout();
				$('#nav .info .username').text('未登录');
			})

			// 
			provinceBox.on('click', 'li', function(){
				provinceSel.text($(this).text());
				var id = parseInt($(this).data('index'));
				renderCity(id);
				citySel.text('选择市');
				provinceBox.hide();
			})
			provinceSel.on('click', function(){
				provinceBox.stop().slideToggle();
			})

			// 
			cityBox.on('click', 'li', function(){
				citySel.text($(this).text());
				var id = parseInt($(this).data('index'));
				cityBox.hide();
			})
			citySel.on('click', function(){
				cityBox.stop().slideToggle();
			})

			// 提交
			resultBox.on('click', '.submit', function(){
				
				var form = $(this).parent().find('.form');
				var mobile = form.find('#mobile').val();
				var truename = form.find('#name').val();
				var province = form.find('.selectbox').text();
				var city = form.find('.subselect').text();
				var address = form.find('#addr').val();

				// validate
				if(mobile == '' || truename == '' || province == '' || province == '选择省' || city == '' || city == '选择市' || address == '' || address == '输入详细地址'){
					HONOR.Public.alert('请输入完整的信息！');
					return;
				}
				
				// submit
				$.ajax({
					url: HONOR.Config.api + 'upinfo',
					method: 'POST',
					dataType: HONOR.Config.dataType,
					data: {mobile: mobile,truename: truename,province: province,city: city,address: address},
					success: function(rs){
						HONOR.Public.alert('提交成功！');
						hideResult();
					}
				})
			})

			resultBox.on('click', '.save', function(){
				HONOR.Result.displayResult('type-7');
			})
		};

		var initAddress = function(){
			var province = '<ul>';
			cityJson.forEach(function(v, i){
				province += "<li data-index='"+i+"'>"+v.n+"</li>";
			})
			province += '</ul>';
			provinceBox.html(province);
		};

		var renderCity = function(id){
			var cities = cityJson[id].s;
			var city = '<ul>';
			cities.forEach(function(v, i){
				city += "<li data-index='"+i+"'>"+v.n+"</li>";
			})
			city += '</ul>';
			cityBox.html(city);
		};

		var displayResult = function(type, data){
			resultBox.show();
			var Type = '.' + type;
			if(type == 'type-4'){
				// 如是优购码，填充
				resultBox.find('.box-code span').text(data);
			}
			if(type == 'type-7'){
				// 个人中心
				// data.uname
				// data.prizeid
				if(data){
					var userbox = resultBox.find('.type-7');
					userbox.find('.hd span').text(data.uname);
					if(data.prizeid > 0){
						//中奖
						var prizename;
						if(data.types == 1){
							prizename = '荣耀7i手机一部';
						}
						if(data.types == 2){
							prizename = '荣耀7i手机优购码：<br>' + data.coupon;
						}
						var str = data.prizetime + '<br>荣耀明星集结号活动 您获得' + prizename;
						userbox.find('.bd p').html(str);
					}else{
						//未中奖
						userbox.find('.bd p').text('荣耀明星集结号活动 您暂时没有中奖信息哦！');
					}
				}
			}
			resultBox.find(Type).show().siblings('.type-box').hide();
			if(HONOR.Public.isltIE8){
				resultBox.css('opacity', 1);
			}else{
				TL.to(resultBox, 0.4, {opacity: 1})
			}
		};

		var requestResult = function(){
			$.ajax({
				url: HONOR.Config.api + 'lottery',
				method: 'GET',
				dataType: HONOR.Config.dataType,
				success: function(rs){
					// HONOR.Public.alert(JSON.stringify(rs));
					// 
					if(rs.code == 0){
						switch(rs.data.prize){
							case "1"://实物奖品
								displayResult('type-5');
								initAddress();
								break;
							case "2"://虚拟优购码
								displayResult('type-4',rs.data.coupon);
								break;
							default://未中奖
								displayResult('type-1');
						}
					}else if(rs.code == 1){
						// 今天已经抽过
						displayResult('type-3');
					}else if(rs.code == -1){
						// 未登录 (理论上不可能)
						window.location.href = rs.data.honor + "&reurl="+ encodeURIComponent(HONOR.Config.baseUrl);
					}
				}
			})
		};

		var hideResult = function(){
			if(HONOR.Public.isltIE8){
				resultBox.css('opacity', 0);
				resultBox.hide();
			}else{
				TL.to(resultBox, 0.4, {scale: 0.8, opacity: 0, onComplete: onHideCompleteHandle});	
			}
		};

		var onHideCompleteHandle = function(){
			resultBox.hide();
		};

		return {
			init: init,
			displayResult: displayResult,
			hideResult: hideResult,
			requestResult: requestResult,
			initAddress: initAddress
		};
	})();

	// 用户
	HONOR.User = (function(){
		var nav = $('#nav');
		var uname = nav.find('.username');
		var ucenter = nav.find('#user-center');
		var ruleAnchor = nav.find('.rule');
		var shareBtn = nav.find('.share');

		var init = function(){
			bindEvents();
		};
		var bindEvents = function(){
			ucenter.on('click', function(){
				HONOR.Api.isLogin(false, true, true);
				_paq.push(['trackLink','star_gerenzhongxin','link','']);_tjc.push(['_trackEvent','index','star_gerenzhongxin','','1','']);
			})
			uname.on('click', function(){
				HONOR.Api.isLogin(false, true, true);
				_paq.push(['trackLink','star_gerenzhongxin','link','']);_tjc.push(['_trackEvent','index','star_gerenzhongxin','','1','']);
			})
			ruleAnchor.on('click', function(){
				HONOR.Result.displayResult('type-6');
				_paq.push(['trackLink','star_huodongguize','link','']);_tjc.push(['_trackEvent','index','star_huodongguize','','1','']);
			})
			shareBtn.on('click', function(){
				var title = encodeURIComponent('这些明星都是sei？臣妾猜不出啊！'),
	            pic = encodeURIComponent('http://campaign.honor.cn/planet/star/pc/images/share.jpg'),
	            l = encodeURIComponent(location.href);
	        	openWin('http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + l + '&pic=' + pic, 'weibo', 900, 600);
	        	_paq.push(['trackLink','star_xinlangshare','link','']);_tjc.push(['_trackEvent','index','star_xinlangshare','','1','']);
			})
		};
		var openWin = function(url, name, width, height){
		    var top = (window.screen.availHeight - 30 - height) / 2;
		    var left = (window.screen.availWidth - 10 - width) / 2;
		    window.open(url, name, 'height=' + height + ',width=' + width + ',top=' + top + ',left=' + left + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
		};
		return {
			init: init
		};
	})();

	// 登录/注销
	HONOR.Api = (function(){
		// showResult -> 显示抽奖结果
		// showUserInfo -> 显示个人中心
		// jumpIfFalse -> 如果没登录跳转至登录页面
		var hasLotteried = false;
		var isLogin = function(showResult, showUserInfo, jumpIfFalse){
			$.ajax({
				url: HONOR.Config.api + 'islogin',
				method: 'GET',
				dataType: HONOR.Config.dataType,
				success: function(rs){
					if(rs.code == -1){
						// 未登录
						if(showResult){
							reurl = HONOR.Config.baseUrl + '?showResult=true';
						}else if(showUserInfo){
							reurl = HONOR.Config.baseUrl + '?showUname=true';
						}else{
							reurl = HONOR.Config.baseUrl;
						}
						if(jumpIfFalse){
							window.location.href = rs.data.honor + "&reurl="+ encodeURIComponent(reurl);
						}
					}else if(rs.code == 0){
						// 已登录
						$('#nav .info .username').text('您好，'+rs.data.uname);
						// rs.data.first_stage ->0(未参加),1(参加过)
						if(rs.data.first_stage){
							$('#sidebar .period-1').removeClass('canbeunlock');
							$('#sidebar .period-2').removeClass('canbeunlock');
						}
						if(rs.data.prize_count > 0){
							$('#sidebar .period-3').removeClass('canbeunlock');
						}
						if(showResult){
							HONOR.Result.requestResult();
						}
						if(showUserInfo){
							HONOR.Result.displayResult('type-7',rs.data);
						}
						if(rs.data.today){
							HONOR.Api.hasLotteried = true;
						}
					}
				}
			})
		};

		var Logout = function(){
			$.ajax({
				url: HONOR.Config.api + 'logout',
				method: 'GET',
				dataType: HONOR.Config.dataType,
				success: function(rs){
					HONOR.Public.alert("注销成功");
				}
			})
		};

		return {
			isLogin: isLogin,
			Logout: Logout,
			hasLotteried: hasLotteried
		};
	})();

	// 启动飞船
	HONOR.Landing.init();
	HONOR.Public.init();
	HONOR.User.init();
	HONOR.Result.init();
	HONOR.Api.isLogin(false, false, false);

	// 测试
	// HONOR.Exam.showQuestion(0);
	// HONOR.Result.init();
	// HONOR.Result.init()
	// HONOR.Result.initAddress()
	// HONOR.Result.displayResult('type-5');

})(jQuery, imagesLoaded, TweenLite, template, audiojs, cityJson, CountUp);



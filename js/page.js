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
		}
		
		return {
			init: init
		};
	})();

	// 控制面板
	HONOR.Panel = (function(){
		var init = function(){

		}

		return {
			init: init
		}
	})();

	// 启动飞船
	HONOR.Landing.init();

})(jQuery, TweenLite, TweenMax);





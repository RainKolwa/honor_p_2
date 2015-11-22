(function ($) {
	var HONOR = {};

	// 入场动画
	HONOR.Landing = (function(){

		var text = " 他们有着独特的个性、出众的外表，拥有荣耀星人的特质，他们是我们的明星战队！ \
		在荣耀2周年狂欢Party现场，你们可以见到他们本人哦！ \
		让我们一起来猜一下，分别都有谁？",
			delay = 0,
			currentChar = 1;

		var init = function(){
			startTyping(text, 50, "test");
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
		
		return {
			init: init
		};
	})();

	HONOR.Landing.init();

})(jQuery);





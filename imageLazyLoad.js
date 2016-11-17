/**
图片懒加载插件
*/
(function(factory){

	if(typeof define === 'function' && define.amd){

		define(['jquery'], factory);
	
	}else{

		factory(window.jQuery);
	}

})(function($){

	//主函数
	$.fn.lazyLoad = function(options){


		var defaultConfig = {

			attr : "data-url",
			container : window,
			callback : $.noop
		};

		var params = $.extend({}, defaultConfig, options || {});

		var $container = $(params.container);

		var cache = new Array();


		$(this).each(function(){

			var nodeName = this.nodeName.toLowerCase(),
				
				url = $(this).attr(params['attr']),

				data = {

					obj : $(this),
					
					tag : nodeName,
					
					url : url
				};

		 	cache.push(data);

		});


		var callback = function(obj){

			if($.isFunction(params.callback)){

				params.callback.call(obj);
			}
		};

		var loading = function(){

			var parentTop,

				parentLeft,

				parentHeight = $container.outerHeight(),

				parentWidth = $container.outerWidth();

			if($container.get(0) === window){

				parentTop = $(window).scrollTop();

				parentLeft = $(window).scrollLeft();

			}else{

				parentTop = $container.offset().top;

				parentLeft = $container.offset().left;

			}

			$.each(cache, function(i, item){

				var obj = item.obj,
					tag = item.tag,
					url = item.url,
					tFlag,
					bFlag,
					lFlag,
					rFlag;


				if(obj){

					tFlag = obj.offset().top - (parentTop + parentHeight);

					bFlag = obj.offset().top + obj.height() - parentTop;

					lFlag = obj.offset().left - (parentLeft + parentWidth);

					rFlag = obj.offset().left + obj.width() - parentLeft;

					if(obj.is(':visible') && (tFlag < 0 && bFlag > 0) && (lFlag < 0 && rFlag > 0)){

						if(url){

							if(tag === 'img'){

								callback(obj.attr('src', url));

							}

						}else{

							callback(obj);
						}

						item.obj = null;

					}
				}

				
			});

		};

		loading();

		$container.on("scroll", loading);
	};

});
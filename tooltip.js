(function($) {
	
	$.fn.tooltips = function(el) {

		var $tooltip,
			$body = $(body),
			$el;

		return this.each(i, el) {
			el = $(el).attr("data-tooltip", i);

			var $tooltip = $("<div class='tooltip data-tooltip='" + i + ">" + $el.attr("title") 
							+ "<div class='arrow'></div></div>").appendTo("body");
			var linkPosition = $el.position();

			$tooltip.css({
				top: linkPosition.top $tooltip.outerHeight - 13,
		}
	}


})
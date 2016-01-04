/*global jQuery*/
"use strict";
(function($) {
	var engine = new Engine();
	$.fn.extend({
		doodleInit: function() {
			engine.physics.jump(this);
		}
	});

	function Engine() {
		var state = this;
		state.physics = {};
		state.physics.jump = function(obj) {
			var bottomHeight = parseInt(obj.css('bottom')),
				jumpHeight = 200,
				speed = 500;
			console.log(speed / 1000);
			var timer = setInterval(function() {
				if (jumpHeight === bottomHeight) {

					obj.attr('style', 'transition: bottom ' + speed / 1000 + 's ease-in;');
					bottomHeight = 0;
				} else {
					obj.attr('style', 'transition: bottom ' + speed / 1000 + 's ease-out;');
					bottomHeight = jumpHeight;
				}
				obj.css('bottom', bottomHeight);
			}, speed * 1.04);
		};
	}
})(jQuery);
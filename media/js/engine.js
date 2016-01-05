/*global jQuery*/
"use strict";
(function ($) {
	var engine = new Engine();
	$.fn.extend({
		doodleInit: function () {
			engine.init(this);
		}
	});

	function Engine() {
		var state = this,
			doodle,
			speed = 500;
		state.init = function (obj) {
			doodle = obj;
			state.physics.jump(doodle);
			state.control.keyPressDetector();
		};
		state.physics = {
			jump: function (obj) {
				var bottomHeight = parseInt(obj.css('bottom')),
					jumpHeight = 200;
				var timer = setInterval(function () {
					if (jumpHeight === bottomHeight) {
						bottomHeight = 0;
						obj.animate({
							bottom: bottomHeight
						}, speed, "easeInQuad", function () {
						});
					} else {
						bottomHeight = jumpHeight;
						obj.animate({
							bottom: bottomHeight
						}, speed, "easeOutQuad", function () {
						});
					}
				}, speed);
			}
		};
		state.control = {
			keyPressDetector: function () {
				var control = this;
				$(window).on("keydown", function (event) {
					switch (event.keyCode) {
						//left
						case 37:
							control.keyLeft();
							break;
						//right
						case 39:
							control.keyRight();
							break;
						//up
						case 38:
							control.keyUp();
							break;
						default:
							break;
					}
				});
			},
			keyLeft: function () {
				doodle.css('left', parseInt(doodle.css('left')) - 100);
			},
			keyRight: function () {
				doodle.css('left', parseInt(doodle.css('left')) + 100);
			},
			keyUp: function () {

			}
		};
	}
})(jQuery);
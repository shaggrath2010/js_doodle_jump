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
			gameArea,
			speed = 500,
			jumpHeight = 400,
			controlStep = 100;
		state.init = function (obj) {
			doodle = obj;
			gameArea = doodle.parent();
			state.physics.jump(doodle);
			state.control.keyPressDetector();
		};
		state.physics = {
			jump: function (obj) {
				var bottomHeight = parseInt(obj.css('bottom'));
				var timer = setInterval(function () {
					if (jumpHeight === bottomHeight) {
						bottomHeight = 0;
						obj.animate({
							bottom: bottomHeight
						}, {
							duration: speed,
							easing: "easeInQuad",
							step: function (now, fx) {

							},
							done: function () {
							}
						});
					} else {
						bottomHeight = jumpHeight;
						obj.animate({
							bottom: bottomHeight
						}, {
							duration: speed,
							easing: "easeOutQuad",
							step: function (now, fx) {

							},
							done: function () {
							}
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
				var left = parseInt(doodle.css('left'));
				//must be refactoring
				doodle.css('left', left - controlStep);

				if (left < doodle.width()) {
					doodle.css('transition', 'none');
					doodle.css('left', gameArea.width() - (doodle.width() / 2));
					setTimeout(function () {
						doodle.css('transition', '');
					}, 100);
				}
			},
			keyRight: function () {
				var left = parseInt(doodle.css('left'));
				//must be refactoring
				doodle.css('left', left + controlStep);
				
				if (left > (gameArea.width() - doodle.width())) {
					doodle.css('transition', 'none');
					doodle.css('left', (doodle.width() / 2) * -1);
					setTimeout(function () {
						doodle.css('transition', '');
					}, 100);
				}
			},
			keyUp: function () {

			}
		};
	}
})(jQuery);
'use strict';

(function() {
		function Stopwatch(node) {
			this.laps = [];
			this.node = node;
			var _this = this;
			this.container = this.node.querySelector('.container');
			this.timeIndicatorNode = this.node.querySelector(".stopwatch-current");
			this.lapsListNode = this.node.querySelector(".stopwatch-laps");
			this.starStopButtonNode = this.node.querySelector(".btn-primary");
			this.lapButtonNode = this.node.querySelector(".btn-info");
			this.resetButtonNode = this.node.querySelector(".btn-danger.btn-sm");
			this.elapsedTime = 0;
			this.intervalID = null;
			this.pausedTime = 0;


			_this.starStopButtonNode.addEventListener('click', function(eventStarStop) {
				if (_this.intervalID) {
					_this.stop.call(_this);
				} else if (!_this.intervalID) {
					_this.start.call(_this);
				};
			}, false);


			_this.lapButtonNode.addEventListener('click', function(eventLap) {
				_this.lap.call(_this);
			}, false);


			_this.resetButtonNode.addEventListener('click', function(eventReset) {
				_this.reset.call(_this);
			}, false);
			

			this.node.addEventListener('mouseenter', function(){
				Stopwatch.lastActive = _this;
			}, false);

			document.addEventListener('keyup', function(event){
				if (Stopwatch.lastActive === _this){
					if (event.keyCode === 83) {
						if (_this.intervalID) {
							_this.stop.call(_this);
						} else if (!_this.intervalID) {
							_this.start.call(_this);
						};
					}
					if (event.keyCode === 76) {
						_this.lap.call(_this);
					};
					if (event.keyCode === 82) {
						_this.reset.call(_this);
					};
				}
			}, false);
	};



	Stopwatch.prototype.drawTime = function() {
		this.timeIndicatorNode.innerHTML = this.formatTime(this.elapsedTime);
	};



	Stopwatch.prototype.formatTime = function(timeMS) {
		var ms = timeMS % 1000;
		if (ms <= 9) {
			ms = '00' + ms;
		} else if (ms <= 99) {
			ms = '0' + ms;
		};
		var s = Math.floor(timeMS / 1000) % 60;
		if (s <= 9) {
			s = "0" + s;
		};
		var m = Math.floor(Math.floor(timeMS / 1000) / 60) % 60;
		if (m <= 9) {
			m = "0" + m;
		};
		var h = Math.floor((Math.floor(Math.floor(timeMS / 1000) / 60)) / 60);
		if (h <= 9) {
			h = "0" + h;
		};
		return h + ":" + m + ":" + s + ":" + ms;
	};



	Stopwatch.prototype.start = function() {
		if (this.intervalID) {
			return
		};
		var _this = this;
		var beginningTime = new Date().getTime();
		_this.intervalID = setInterval(function() {
			var nowTime = new Date().getTime();
			_this.elapsedTime = _this.pausedTime + nowTime - beginningTime;
			_this.drawTime();
		}, 16);
	};



	Stopwatch.prototype.stop = function() {
		clearInterval(this.intervalID);
		this.pausedTime = this.elapsedTime;
		this.intervalID = null;
	};



	Stopwatch.prototype.reset = function() {
		this.stop();
		this.elapsedTime = 0;
		this.drawTime();
		this.laps = [];
		this.drawLaps();
	};



	Stopwatch.prototype.drawLaps = function() {
		var _this = this;
		_this.lapsListNode.innerHTML = '';
		this.laps.forEach(function(lap, lapsIndex) {
			var lapBlock = document.createElement('div');
			lapBlock.className = ('alert alert-info');
			var closeLapNode = document.createElement('span');
			closeLapNode.className = ("label label-danger");
			lapBlock.appendChild(closeLapNode);
			closeLapNode.innerHTML = '×';
			var lapNode = document.createElement('span');
			closeLapNode.addEventListener('click', function() {
				_this.removeLap(lapsIndex);
			}, false);
			_this.lapsListNode.appendChild(lapBlock);
			lapBlock.appendChild(lapNode);
			lapNode.innerHTML = _this.formatTime(lap);
		});
	};



	Stopwatch.prototype.lap = function() {
		this.laps.unshift(this.elapsedTime);
		this.drawLaps();
	};



	Stopwatch.prototype.removeLap = function(index) {
		this.laps.splice(index, 1);
		this.drawLaps();
	};

	window.Stopwatch = Stopwatch;

	var watch = new Stopwatch(document.querySelector(".container")); window.watch = watch;

	var watch2 = new Stopwatch(document.querySelector(".container2")); window.watch2 = watch2;
}());
(function (angular) {
	'use strict';

<<<<<<< HEAD
<<<<<<< HEAD
	function ArtemisCtrl(
=======
	function MirrorCtrl(
>>>>>>> evancohen/master
=======
	function MirrorCtrl(
>>>>>>> evancohen/master
		Focus,
		SpeechService,
		AutoSleepService,
		LightService,
		$rootScope, $scope, $timeout, $interval, tmhDynamicLocale, $translate) {

		// Local Scope Vars
		var _this = this;
		$scope.listening = false;
		$scope.debug = false;
		$scope.commands = [];
		$scope.partialResult = $translate.instant('home.commands');
<<<<<<< HEAD
<<<<<<< HEAD
		$scope.layoutName = config.general.layout;
		console.log("The CSS Stylesheet being loaded is: " + config.general.layout + (".css"));
=======
		$scope.layoutName = 'main';
>>>>>>> evancohen/master
=======
		$scope.layoutName = 'main';
>>>>>>> evancohen/master
		$scope.config = config;

		// Set up our Focus
		$rootScope.$on('focus', function (targetScope, newFocus) {
			$scope.focus = newFocus;
		})

		Focus.change("default");

		//set lang
		if (config.general.language.substr(0, 2) == 'en') {
			moment.locale(config.general.language,
				{
					calendar: {
						lastWeek: '[Last] dddd',
						lastDay: '[Yesterday]',
						sameDay: '[Today]',
						nextDay: '[Tomorrow]',
						nextWeek: 'dddd',
						sameElse: 'L'
					}
				}
			)
		} else {
			moment.locale(config.general.language)
		}
		//Initialize the speech service

		var resetCommandTimeout;
		SpeechService.init({
			listening: function (listening) {
				$scope.listening = listening;
				if (listening && !AutoSleepService.woke) {
					AutoSleepService.wake()
					$scope.focus = AutoSleepService.scope;
				}
			},
			partialResult: function (result) {
				$scope.partialResult = result;
				$timeout.cancel(resetCommandTimeout);
			},
			finalResult: function (result) {
				if (typeof result !== 'undefined') {
					$scope.partialResult = result;
					resetCommandTimeout = $timeout(restCommand, 5000);
				}
			},
			error: function (error) {
				console.log(error);
				if (error.error == "network") {
					$scope.speechError = "Google Speech Recognizer: Network Error (Speech quota exceeded?)";
				}
			}
		});

		//Update the time
		function updateTime() {
			$scope.date = new moment();

			// Auto wake at a specific time
			if (typeof config.autoTimer !== 'undefined' && typeof config.autoTimer.autoWake !== 'undefined' && config.autoTimer.autoWake == moment().format('HH:mm:ss')) {
				console.debug('Auto-wake', config.autoTimer.autoWake);
				AutoSleepService.wake()
				$scope.focus = AutoSleepService.scope;
				AutoSleepService.startAutoSleepTimer();
			}
		}

		// Reset the command text
		var restCommand = function () {
			$translate('home.commands').then(function (translation) {
				$scope.partialResult = translation;
			});
		};

		_this.init = function () {
			AutoSleepService.startAutoSleepTimer();

			$interval(updateTime, 1000);
			updateTime();
			restCommand();

			var defaultView = function () {
				console.debug("Ok, going to default view...");
<<<<<<< HEAD
<<<<<<< HEAD
				//Adjust background color off app icons
				var non_active_app = angular.element(document.getElementsByClassName('app_icon'));
				non_active_app.removeClass('active_app');
=======
>>>>>>> evancohen/master
=======
>>>>>>> evancohen/master
				Focus.change("default");
			}
			// List commands
			SpeechService.addCommand('list', function () {
				console.debug("Here is a list of commands...");
				console.log(SpeechService.commands);
				$scope.commands.commandPage = []
				$scope.commands.commandPage = SpeechService.getCommands();
				$scope.commands.index = 0
				$scope.commands.totalPages = $scope.commands.commandPage.length
				Focus.change("commands");
			});

			SpeechService.addCommand('list-page', function (pageNum) {
				if (Focus.get() == 'commands') {
					$scope.commands.commandPage = []
					$scope.commands.commandPage = SpeechService.getCommands();
					$scope.commands.totalPages = $scope.commands.commandPage.length
					if (isNaN(pageNum)) {
						pageNum = $scope.units[pageNum]
					}
					if ( pageNum >= 1 && pageNum <= ($scope.commands.totalPages)) {
						$scope.commands.index = pageNum-1
					}
				}
			})

			// Next Page
			SpeechService.addCommand('list-next', function () {
				if (Focus.get() == 'commands') {
					$scope.commands.commandPage = []
					$scope.commands.commandPage = SpeechService.getCommands();
					$scope.commands.totalPages = $scope.commands.commandPage.length
					if ($scope.commands.index < ($scope.commands.totalPages - 1)) {
						$scope.commands.index++
					}
				}
			})

			// Prev Page
			SpeechService.addCommand('list-prev', function () {
				if (Focus.get() == 'commands') {
					$scope.commands.commandPage = []
					$scope.commands.commandPage = SpeechService.getCommands();
					$scope.commands.totalPages = $scope.commands.commandPage.length
					if ($scope.commands.index > 0) {
						$scope.commands.index--
					}
				}
			})

			// Go back to default view
			SpeechService.addCommand('home', defaultView);

			SpeechService.addCommand('debug', function () {
				console.debug("Boop Boop. Showing debug info...");
				$scope.debug = true;
			});

			// Check the time
			SpeechService.addCommand('time_show', function () {
				console.debug("It is", moment().format('h:mm:ss a'));
			});

			// Control light
			SpeechService.addCommand('light_action', function (state, action) {
				LightService.performUpdate(state + " " + action);
			});
		};

		_this.init();
	}

<<<<<<< HEAD
<<<<<<< HEAD
	angular.module('Artemis')
		.controller('ArtemisCtrl', ArtemisCtrl);

	function themeController($scope) {
		$scope.layoutName = (typeof config.general.layout !== 'undefined' && config.general.layout) ? config.general.layout : 'main';
	}

	angular.module('Artemis')
=======
=======
>>>>>>> evancohen/master
	angular.module('SmartMirror')
		.controller('MirrorCtrl', MirrorCtrl);

	function themeController($scope) {
		$scope.layoutName = (typeof config.layout !== 'undefined' && config.layout) ? config.layout : 'main';
	}

	angular.module('SmartMirror')
<<<<<<< HEAD
>>>>>>> evancohen/master
=======
>>>>>>> evancohen/master
		.controller('Theme', themeController);

} (window.angular));

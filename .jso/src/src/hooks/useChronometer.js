  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useChronometer = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNativeBackgroundTimer = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var useChronometer = exports.useChronometer = function useChronometer(_ref) {
    var _ref$initial = _ref.initial,
      initial = _ref$initial === undefined ? '00:00:00' : _ref$initial,
      _ref$countDown = _ref.countDown,
      countDown = _ref$countDown === undefined ? false : _ref$countDown;
    var _useState = (0, _react.useState)(initial),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      valueFormatted = _useState2[0],
      setValueFormatted = _useState2[1];
    var value = (0, _react.useRef)(initial);
    (0, _react.useEffect)(function () {
      value.current = initial;
    }, [initial]);
    var start = function start() {
      var seconds = convertHoursToSeconds(value.current);
      _reactNativeBackgroundTimer.default.runBackgroundTimer(function () {
        if (countDown) {
          seconds -= 1;
        } else {
          seconds += 1;
        }
        var formatted = convertSecondsToHours(seconds);
        setValueFormatted(formatted);
      }, 1000);
    };
    var stop = function stop() {
      _reactNativeBackgroundTimer.default.stopBackgroundTimer();
    };
    var reset = function reset() {
      stop();
      value.current = initial;
      start();
    };
    (0, _react.useEffect)(function () {
      _reactNativeBackgroundTimer.default.stopBackgroundTimer();
    }, []);
    return {
      currentValue: valueFormatted,
      start: start,
      stop: stop,
      reset: reset
    };
  };
  var convertHoursToSeconds = function convertHoursToSeconds() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '00:00:00';
    var _ref2 = (time == null ? undefined : time.split(':')) || [undefined, undefined, undefined],
      _ref3 = (0, _slicedToArray2.default)(_ref2, 3),
      horas = _ref3[0],
      minutos = _ref3[1],
      segundos = _ref3[2];
    horas = Number(horas);
    minutos = Number(minutos);
    segundos = Number(segundos);
    var horasEmSegundos = horas * 3600;
    var minutosEmSegundos = minutos * 60;
    return horasEmSegundos + minutosEmSegundos + segundos;
  };
  var convertSecondsToHours = function convertSecondsToHours() {
    var seconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (seconds <= 0) return '00:00:00';
    var horas = Math.trunc(seconds / 3600);
    var segundosRestantes = seconds - horas * 3600;
    var minutos = Math.trunc(segundosRestantes / 60);
    segundosRestantes -= minutos * 60;
    horas = horas < 10 ? `0${horas}` : horas;
    minutos = minutos < 10 ? `0${minutos}` : minutos;
    segundosRestantes = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
    return `${horas}:${minutos}:${segundosRestantes}`;
  };

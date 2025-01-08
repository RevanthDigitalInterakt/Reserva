  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useNewChronometer = useNewChronometer;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[2]);
  function useNewChronometer() {
    var _useState = (0, _react.useState)('08:00:01'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      time = _useState2[0],
      setTime = _useState2[1];
    var $timer = (0, _react.useRef)(null);
    (0, _react.useEffect)(function () {
      var tick = function tick() {
        var _time$split$map = time.split(':').map(Number),
          _time$split$map2 = (0, _slicedToArray2.default)(_time$split$map, 3),
          hours = _time$split$map2[0],
          minutes = _time$split$map2[1],
          seconds = _time$split$map2[2];
        if (!hours || !minutes || !seconds) {
          clearInterval($timer.current);
          return;
        }
        var h = hours;
        var m = minutes;
        var s = seconds - 1;
        if (s < 0) {
          s = 59;
          m -= 1;
          if (m < 0) {
            m = 59;
            h -= 1;
          }
        }
        if (h === 0 && m === 0 && s === 0) {
          clearInterval($timer.current);
          return;
        }
        setTime([h.toString().padStart(2, '0'), m.toString().padStart(2, '0'), s.toString().padStart(2, '0')].join(':'));
      };
      $timer.current = setInterval(tick, 1000);
      return function () {
        return clearInterval($timer.current);
      };
    }, [time]);
    return {
      time: time,
      setTime: setTime
    };
  }

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _RequiredParamChecker = _interopRequireDefault(require('./RequiredParamChecker'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description A class to handle pattern list as a list of object representing pattern
 * @author Christian Colonna
 * @date 11-11-2020
 * @export
 * @class PatternList
 */
var PatternList = /*#__PURE__*/function () {
    /**
   * Creates an instance of PatternList.
   * @author Christian Colonna
   * @date 11-11-2020
   * @param {Object[]} patternList a list of pattern object
   * @param {string} patternList.pattern pattern label
   * @param {string} patternList.occurences pattern occurences
   * @memberof PatternList
   */
    function PatternList(patternList) {
        _classCallCheck(this, PatternList);

        this.list = patternList;
    }
    /**
   * @description Returns occurences for given pattern
   * @author Christian Colonna
   * @date 11-11-2020
   * @param {string} pattern pattern uri
   * @returns {number} pattern occurences
   * @memberof PatternList
   */


    _createClass(PatternList, [{
        key: 'getOccurencesByPattern',
        value: function getOccurencesByPattern(pattern) {
            var occurences = this.list.find(function (patternMap) {
                return patternMap.pattern === pattern;
            });
            return occurences ? parseInt(occurences['occurences']) : 1;
        }
        /**
     * @description Returns of given pattern instance
     * @author Christian Colonna
     * @date 16-11-2020
     * @param {*} pattern pattern instance uri
     * @returns {number} count nodes belonging to given pattern instance
     * @memberof PatternList
     */

    }, {
        key: 'getDegreeByPattern',
        value: function getDegreeByPattern(pattern) {
            var degree = this.list.find(function (instanceMap) {
                return instanceMap.instance === pattern;
            });
            return degree ? parseInt(degree['count']) : 1;
        }
    }]);

    return PatternList;
}();

exports['default'] = PatternList;
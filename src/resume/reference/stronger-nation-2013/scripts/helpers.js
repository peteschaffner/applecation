/*global define*/
define([], function () {
  return {
    possessivize: function (str) {
      return str[str.length - 1] === 's' ? str + '\'' : str + '\'s';
    },
    titleCaseToUrl: function (str) {
      return str.replace(/\s/, '-').toLowerCase();
    },
    urlToTitleCase: function (str) {
      return str.replace('-', ' ')
            .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    toFixed: function (number, precision) {
      var multiplier = Math.pow(10, precision);
      return Math.round(number * multiplier) / multiplier;
    }
  };
});
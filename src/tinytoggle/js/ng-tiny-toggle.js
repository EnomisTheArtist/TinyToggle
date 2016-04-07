'use strict';

/**
 * Module to use TinyToggle as a directive for angular.
 */
angular.module('tinytoggle', [])
    .directive('tinyToggle', ['$timeout', function($timeout) {

        /**
         * Initializes the HTML element as a TinyToggle switch.
         *
         * @param scope
         * @param elem
         * @param attrs
         */
        function link(scope, elem, attrs, ngModel) {
            if(!ngModel) return false;
            var tt;
            var options = {
                onChange: onChange
            };
            
            if ( angular.isFunction(scope.onReady) ) { options.onReady = scope.onReady }
            if ( angular.isFunction(scope.onClick) ) { options.onClick = scope.onClick }            
            if ( angular.isFunction(scope.onCheck) ) { options.onCheck = scope.onCheck }
            if ( angular.isFunction(scope.onUncheck) ) { options.onUncheck = scope.onUncheck }
            if ( angular.isFunction(scope.onDisabled) ) { options.onDisabled = scope.onDisabled }
            if ( angular.isFunction(scope.onEnabled) ) { options.onEnabled = scope.onEnabled }
            
            function initialize() {
              $timeout(function() {
                tt = elem.tinyToggle(options);
                tt.checked = scope.value;
              }, 0);
            }
            
            scope.$watch('value', function(newValue, oldValue) {
              if ( !tt ) initialize();
              else {
                tt.tinyToggle('refresh'); 
                if ( angular.isFunction(scope.onChange) ) scope.onChange();               
              }
            });
            
            scope.$watch('enabled', function(newValue, oldValue) {
              if ( tt ) {
                if (newValue) tt.tinyToggle('enable');
                else tt.tinyToggle('disable');
              } 
            });
            
            function onChange(obj, value) {
              ngModel.$setViewValue(value);
            }
            
        }
        return {
            require: 'ngModel',
            restrict: 'AE',
            scope : {
              value:      '=ngModel',
              enabled:    '=ttNgActive',
              onReady:    '&ttNgReady',
              onClick:    '&ttNgClick',
              onChange:   '&ttNgChange',
              onCheck:    '&ttNgCheck',
              onUncheck:  '&ttNgUncheck',
              onDisabled: '&ttNgDisabled',
              onEnabled:  '&ttNgEnabled'
            },
            link: link
        }
    }]);
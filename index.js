"use strict";

var ack = require('ack-x/index-browser')
require('ng-fx')
require('angular-animate')

//version: 1.1.0
angular.module('ack-angular',['ngAnimate','ng-fx'])
.service('ack', function(){return ack})
.filter('ack', function(){
  return function(v,call0,call1,call2){
    var newkey, subargs, key, item, rtn = ack(v)

    //loop extra arguments as property collectors
    for(var x=1; x < arguments.length; ++x){
      key = arguments[x]
      subargs = []

      //array where 1st arg is method and subs are positional arguments
      if(key.constructor==Array){
        newkey = key.shift()
        subargs = key
        key = newkey
console.log('key', key, subargs)
      }

      item = rtn[key];

      if(item && item.constructor==Function){
        rtn = item.apply(rtn,subargs)
      }else{
        rtn = item
      }
    }

    return rtn
  }
})
.directive('whiteOutModal',function(){//white-out-modal
  return {
    restrict:'E'
    ,scope:{show:'=', size:'=?'}
    ,transclude:true
    ,template:require('./white-out-modal.jade')
    ,bindToController:true
    ,controllerAs:'wom'
    ,controller:function(){}
    ,link:function($scope, jElm, attrs){
      var handler = function(event){
        //already showing
        var jTar = jElm.children().eq(0)
        var eTar = event.srcElement || event.toElement || event.target
        if($scope.wom.show && eTar==jTar[0]){
          $scope.wom.show = null
          $scope.$apply()
          jTar.off('click', handler)
        }
      }

      var addHandler = function(){
        jElm.children().eq(0).on('click', handler)
      }

      $scope.$watch('wom.show',function(show){
        if(show){
          setTimeout(addHandler, 301)//delay needed to prevent immediate close
        }
      })
    }
  }
})
function sum() {
  var args = Array.prototype.slice.call(arguments, 0);
  var sum = 0;
  args.forEach(function(el) {
    sum += el;
  });
  return sum;
};

Function.prototype.myBind = function(newObject) {
  var bindArgs = Array.prototype.slice.call(arguments, 1);
  var that = this;
  return function () {
    var callArgs = Array.prototype.slice.call(arguments, 0);
    return that.call(newObject, bindArgs.concat(callArgs));
  };
}

var person = {name: "john"};

var greet = function() {
  console.log("My name is " + this.name);
  console.log("Extra arguments: " + Array.prototype.slice.call(arguments,0));
}

// greet.myBind(person, 1, 2)(3,4);

// greet(person, 1, 2);
// myBoundFunction();


function curriedSum(numArgs) {
  var numbers = [];

  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      var sum = 0;
      for(var i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      }
      return sum;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
};

// var sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1));

Function.prototype.curry = function(numArgs, newObject) {
  var that = this;

  var args = [];

  function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      that.apply(newObject, args);
    } else {
      return _curry;
    }
  }

  return _curry;
};


var fun = function() {
  console.log("My name is " + this.name);
  var args = Array.prototype.slice.call(arguments, 0);
  console.log(" these are args :" + args);
};

var jumpFour = fun.curry(4, person);
jumpFour(4)(5)(8)(9);

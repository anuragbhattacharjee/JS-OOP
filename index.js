/*
    1. Creating Objects
    2. Factories and Constructors
    3. Primitives and Reference Types
    4. Working with Properties
    5. Private Properties
    6. Getters/Setters
*/
console.log('Welcome to JS OOP Tutorial');

// Simple Object declaration with literal

const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    draw: function(){
        console.log("Circle");
    }
}

circle.draw();


// Object declaration using `factory` 
// FACTORY FUNCTION

/* 
    If an Object contains multiple methods, it is called the object has behaviour.
    Behaviour like human, they can do different functionality. 
    So it is difficult to copy objects with behaviours. 
    So, we will use factory to create and object.
*/

function createCircle(radius){
    return{
        radius: radius, // In ES6 if key and value are same, we can just write the key/value like 'radius'
        draw: function(){
            console.log("Draw");
        }
    }
}

const circle1 = createCircle(1);
circle1.draw();

// Object declaration using `constructor`
// CONSTRUCTOR FUNCTION

/**
 * We use Pascal case for JS constructor-based object declaration. Which looks like C#, JAVA Class.
 * But in JS there is no concept of class.
 * But insteade on returning we use `this`.
 * `this` is a reference to the object that is wxwcuting that piece of code.
 */

function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('Draw');
    }
}

const anotherCircle = new Circle(1);
/**
 * Here the `new` keywords points the `this` to the object.
 * If we don't use `new`, `this` will be pointing its default object.
 * Which is Window object for browser, global for node environment.
 * 
 * So, `new` does 3 things:
 * 1. creates an empty object
 * 2. Sets `this` to the object
 * 3. returns the object from `this`
 */

//------------- Built-in Constructors
console.log(circle1.constructor);
console.log(anotherCircle.constructor);

/**
 * So we can see, factory function cunstructor is a function type Object.
 * So, when we don't use `new`, JS Engine internally declares a new object.
 * There are also some othe built-in constructors:  
 */

 new String(); // '',"", ``
 new Boolean(); // true,false
 new Number(); // 1,2,3,....



 //------------- Object & Function

 /**
  * In JS everything is an object.
  * Even a function is an object created from built-in object `Function`.
  */

console.log(Circle);  
console.log(Circle.name); // name of the function. Here `name` is a property 
console.log(Circle.length); // number of arguments in the Circle object. 
console.log(Circle.constructor); // Function(){} 

// So, the `Circle` actullay looks like this internally :
// Function has to parameters: arguments, code 

const Circle1 = new Function('radius', `
this.radius = radius;
this.draw = function(){
    console.log('Draw');
}
`);

const circle2 = new Circle1(1);
console.log(circle2);

/**
 * As, we know now that, Circle has properties and methods, we can do the same thing as `new` using mthods of Circle
 * The first argument is the blank object that `this` points to. If we don't use new, it passes `window` object there. 
 */

 Circle.call({}, 1);

//------------- Value Vs Reference Type

/**
 * In JS there are primitives(value type) & Objects(Reference Types)
 * Primitives: Number, String, Boolean, Symbol, undefined, null
 * Objects: Object, Function, Array
 */

 let x = 10;
 let y = x;

 x = 20;
 console.log(x,y); //20,10

 let a = { value : 10};
 let b = a;

 a.value=20;
 console.log(a,b); //20,20 

 /**
  * So primitives are copied by value
  * Objects are copied by Reference. Which means they actually hold the address of the object in the memory. 
  * So any change will reflect in all the variables pointing the same object.
  */

let number = 10;

function increment(number){
    number++;
}

increment(10);
console.log(number); //10, because number is a premitive and specific to it's local scope.


let obj = { value: 10};

function increment(obj){
    obj.value++;
}

increment(obj);
console.log(obj.value); //11



//------------- Adding or Removing Properties

/**
 * Objects in JS are dynamic: after creating them we can add or remove properties
 * As JS don't have Class, we don't need to declare properties while declaring object.
 * This makes JS really powerful and easy.
 */

 // Adding to circle1

 console.log(circle1);
 circle1.location = { x: 1};
 console.log(circle1);

 // We can do the same by [] notation. But it's actually helpful for accessing dynamic properties
 let dynamicProperty = 'location';
 circle1[dynamicProperty] = {x : 1};

 // Deleting from circle1
 
 delete circle1.location;
 
 //------------- Enumerating Properties

 // using for-in loop
 for (key in circle1){
    if(typeof circle1[key] !== 'function')
        console.log(key, circle1[key]); 
 }

 // get all keys
 const keys = Object.keys(circle1);
 console.log(keys);

// check if object has a property
 if('radius' in circle1)
    console.log('Circle has radius');

//------------- Abstraction, Getters & Setters

/**
 * 1. Make Public Interface SImpler
 * 2. Expose only necessary properties
 */

 function AbstractionExample() {
    this.radius = 10;
    let hiddenVariable = 20;
    let hiddenMethod = function(){
        //.. Some Magic
    };
    this.draw = function(){
        console.log(hiddenVariable);
        console.log(this.radius);
    };

    this.getHiddenVariable = function(){
        return hiddenVariable;
    }; 
    // This is one way to get the hidden property. But the better way is: 
    Object.defineProperty(this, 'hiddenVariable', {
        get: function(){
            return hiddenVariable;
        },
        set: function(value){
            // we can use valifation before setting. This is the benefit of a setter.
            if(value<10)
                throw new Error('Invalid value')
            hiddenVariable = value;
        }
    }); 
 }

 /**
  * We can access local properties directly in the function of the Object. Because it's in the closure of the function
  * Closure: properties in the parent object
  * Scope: properties inside the function
  */
/**
 * So we use this getter so that noone can change the variable from the outside. As it may mess up with the use of this code.
 * ALso, it will make hte user interface simpler.
 * This is the concept of encapsulation & Abstraction.
 */



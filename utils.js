
Math.toCart = function( r , t , p ){

    var x = r *(Math.sin(t))*(Math.cos(p));
    var y = r *(Math.sin(t))*(Math.sin(p));
    var z = r * (Math.cos(t));
    return new THREE.Vector3(x,y,z);

}

Math.toPolar = function(x,y,z){

  var squared = (x*x)+(y*y)+(z*z);
  var radius = Math.pow(squared,.5);
  var theta = Math.acos(z/radius);
  var phi = Math.atan2(y,x);
  return new THREE.Vector3( radius , theta , phi )

}

Math.randomRad = function (){
  return Math.random() * Math.PI * 2
}
// centers the random across 0
Math.randomRange = function(size){
  return ( Math.random() - .5) * size
}

Math.randomRangePos = function(size){
  return Math.random() * size
}

Math.getRandomFromArray = function(array){

  var i = Math.floor( Math.random() * array.length );
  return array[i];

}




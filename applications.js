
var doubleFifths = { note:"audio/notes/halle2Note2.mp3",
importance:.6}
var holeInTheDark = { note:"audio/notes/halle2Note3.mp3",
importance:.6}
var vastaa = { note:"audio/notes/halle2Note9.mp3",
importance:.6}
var pno = { note:"audio/notes/halle2Note8.mp3",
importance:.6}

var wormholes = { 
   note:"audio/notes/halle2Note7.mp3",

  importance: .6,
  children:[ doubleFifths , holeInTheDark,vastaa, pno]
}

var comeBalloning = {  note:"audio/notes/halle2Note5.mp3",
importance: .6 }
var stellarNursery = { 
  note:"audio/notes/halle2Note4.mp3",
  title:"Stellar Nursery",
  url:"http://cabbibo.com/nebula/",
  importance: .6 }
var soundObjectProject = { 
  note:"audio/notes/halle2Note3.mp3",
  title:"Sound Object Project",
  url:"http://cabbibo.com/soundObjectProject",
  importance: .6 }
var fourElements = {  
  note:"audio/notes/halle2Note2.mp3",
  title:"Four Elements",
  url:"http://cabbibo.com/fourElements.html",
  importance: .6 
}

var sketches ={
  importance: .2,
  title:" Sketches",
  note:"audio/notes/halle2Note1.mp3",

  children:[ 
    comeBalloning , 
    stellarNursery ,
    wormholes,
    soundObjectProject,
    fourElements
  ]

};
     


var leapSerpinski = {


}
var leapSketches = {

  note:"audio/notes/halleNote5.mp3",
  title:"Leap Sketches",
  children:[ leapVisual1, leapVisual2, 

}
var leap = {
  note:"audio/notes/halleNote5.mp3",
  title:"Leap Motion",
  children:[leapDragon,  meshManipulation, meshGallery, circleOfAww, leapDragon, leapSketches
  importance: .5
}
     
var uOS = {
  importance: .8,
  title:"Universe Of Sound",
  url:"http://cabbibo.com/uOS/",
  note:"audio/notes/halleNote4.mp3",

}

var cabbiboSet= {
  note:"audio/notes/halleNote2.mp3",
  url:"http://cabbibo.com/cabbiboSet/",
  title:"Cabbibo Set",
  importance:.7 
}
var cathedralSet= { 
  title:"Cathedral Set",
  url:"http://cabbibo.com/cathedralSet/",
  note:"audio/notes/halleNote3.mp3",
  importance: .3,
    
}
var mandalas = {
  importance: .3,
  title:"Mandalas",
  note:"audio/notes/halle2Note1.mp3",
  children:[cabbiboSet , cathedralSet]
}


/*
  Recursion Children
*/
var jewel = {
  importance: .25,
  title:"Jewel",
  note:"audio/notes/numbNote4.mp3",
  url:"http://cabbibo.com/jewel/",
  info: "Learn about the spectaular properties of diamonds, rubies, precious opals and many more while building a song made from samples by James Blake, Teebs, Flying Lotus, Burial, and Four Tet)",
  url:"http://cabbibo.com/recursion/jewel"
}

var burial =  {
  importance: .25,
  title:"Burial",
  note:"audio/notes/numbNote3.mp3",
  url:"http://cabbibo.com/recursion/burial",
  info: "Learn about mausoleums, necropoli, cremations and much more while building a song made from samples by Austin Wintory, Geinoh Yamashirogumi, Pantha du Prince, Caribou, Bruno Coulais and Jeremy Soule",
  url:"http://cabbibo.com/recursion/burial"
}

var pattern = {
  importance: .25,
  title:"Pattern",
  note:"audio/notes/numbNote2.mp3",
  url:"http://cabbibo.com/recursion/pattern/",

  info: "Learn about marevelous patterns made by bubbles, hawks, leaves and many more while building a song made from samples by Austin Wintory, Geinoh Yamashirogumi, Pantha du Prince, Caribou, Bruno Coulais and Jeremy Soule",
  url:"http://cabbibo.com/recursion/pattern"
}

var journey = {
  importance: .25,
  title:"Journey",
  note:"audio/notes/numbNote1.mp3",
  url:"http://cabbibo.com/recursion/journey/",

  info: "Learn about the magnificant journeys of humans, animals, photons and many more while building a song made from samples by Mount Kimbie, Four Tet, DeadMau5, Gui Borrato, and Robert Babicz",
  url:"http://cabbibo.com/recursion/journey"
}

var recursion = {
  importance: .3,
  title:"Recursion",
  info:"Recursion EP is a four song Album/Game/Educational Experience. Every level of the game allows the user to learn about one of four different subjects: Jewels, Journeys, Patterns, and Burials. As the user learns about the different subjects, they also build a song. When the level is completed, the user can see the loops that make up the song, reconstruct the song using a different combination of loops, as well as read more about the facts that they learned during the level.",
  children:[jewel, burial , pattern , journey ],
}


var cabbiboParams = {
  importance: 1,
  title: "Cabbibo",
  note:"audio/notes/numbNote2.mp3",
  info: "What is left when all dicotomies have been destroyed? It is something chaotic yet tranquil. Intuitive and reasonable. Cerebral and physical. It is absolute pain and unforsakable love. It is yearning and contentment. It is beyond Good and Evil. It is nuanced and brute. It is as temporal as it is unyeilding. It is more and less than we can comprehend.",
  children:[sketches,uOS,recursion,mandalas, leap],
}


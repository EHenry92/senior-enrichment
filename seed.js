'use strict';
let db = require('./db');
let Student = require('./db/models/Student');
let Campus = require('./db/models/Campus');
var Promise = require('bluebird');


var Chance = require('chance');
var chance = new Chance();
const numStudents = 100;
const numCampuses = 5;


const schoolPhotos = [
    'http://cdn.bloody-disgusting.com/wp-content/uploads/2016/01/BD16_Asylum_9.jpg',
    'http://upload.wikimedia.org/wikipedia/commons/8/87/Loughboroughgrammarschooltowerblock.jpg',
    'http://weburbanist.com/wp-content/uploads/2010/05/stalkerschool.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDH25s1Rd1qFLwH9RkIZL8mVauG2cI_KqkRIwxQW9qp71vR5tl',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt4qmiyGDoQOi6eTTIzq0gWu0wGY-o9YDsB_5ko8HhTVR4eWvCvw'


]
const schoolNames = ['Asylum' ,'Grammer School','Stalker School',
  'The DayCare','Future Criminals','Haunted Hallways','Quiet School',
  'Handy Dandy School of Carpenters','Java Script Campus','School of Magic'
]
let chosenNames = [];

function randStudent()   {
  const middle = chance.bool();
  const aName = chance.name({middle: middle});
  const temp = aName.split('');
  return Student.build({
    campusId: chance.integer({min: 1, max: numCampuses}),
    name: aName,
    email: temp[0] + temp[temp.length - 1] + '@GrandCampusSchools.edu'
  });   
}
function generateStudents(times) {
    var students = [];
    for (var i = 0; i < times; i++)  {
      students.push(randStudent())
    }
    return students;
}


function randCampus() {
    const num1 = chance.integer({min: 0, max: schoolNames.length - 1}); 
    if (!chosenNames.includes(schoolNames[num1])) {
      chosenNames.push(schoolNames[num1]);
      return Campus.build({
          name: schoolNames[num1],
          image: schoolPhotos[chosenNames.length - 1]
      })
    }
    else {
      return randCampus();
    }
}


function generateCampuses(times) {
  var students = [];
  for (var i = 0; i < times; i++)  {
    students.push(randCampus())
  }
  return students;
}


//function to create campuses
function createCampuses ()   {
  return Promise.map(generateCampuses(numCampuses),function(camp){
    return camp.save()
  });
}

//function to create students
function createStudents ()  {
  return Promise.map(generateStudents(numStudents),function(stud){
    return stud.save()
  });

}


function seed () {
    return createCampuses()
    .then(function () {
      return createStudents();
    });
  }

  console.log('Loading Campuses and Students database');
  db.sync({force: true})
  .then(function () {
    console.log('Seeding database');
    return seed();
  })
  .then(function () {
    console.log('Seeding successful');
  }, function (err) {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(function () {
    db.close();
    return null;
  });
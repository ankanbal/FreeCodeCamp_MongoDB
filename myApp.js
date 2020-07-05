var mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(mongoose.connection.readyState);

var Schema = mongoose.Schema;
var personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model("Person", personSchema);

var createAndSavePerson = function(done) {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["vodka", "air"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

var arrayOfPeople = [
  {name: "Jane Fonda", age: 84, favoriteFoods: ["vodka", "air"]},
  {name: "John Fonda", age: 45, favoriteFoods: ["tequila", "water"]},
  {name: "Jim Fonda", age: 66, favoriteFoods: ["beer", "curry"]},
  {name: "James Fonda", age: 51, favoriteFoods: ["young", "women"]}
];

var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, function(err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
};

var personName = "Jim Fonda";
var findPeopleByName = function(personName, done) {
  Person.find({name: personName},function(err, data) {
      if (err) return console.log(err);
      done(null, data);
  });
};

var food = "women";
var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food },function(err, data) {
      if (err) return console.log(err);
      done(null, data);
  });
};

var findPersonById = function(personId, done) {
  Person.findById(personId,function(err, data) {
      if (err) return console.log(err);
      done(null, data);
  }); 
};

var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  Person.findById(personId, function(err, data) {
    if (err) return console.log(err);
    console.log(data);
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err, doc){
      if (err) {
        console.log("there's an error");
      }
      done(null, data);
    });
  }); 
};

var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {$set: {age: ageToSet}}, {new: true}, function(err, data){
    if (err) return done(err);
    done(null, data);
  });
};

var removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, function(err, data){
    if (err) return done(err);
    done(null, data);
  })
};

var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data){
    if (err) return done(err);
    done(null, data);
  })
};

var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age:0}).exec(function(err, data){
    if (err) return done(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

/** # Further Readings... #
/*  ======================= */
// If you are eager to learn and want to go deeper, You may look at :
// * Indexes ( very important for query efficiency ),
// * Pre/Post hooks,
// * Validation,
// * Schema Virtuals and  Model, Static, and Instance methods,
// * and much more in the [mongoose docs](http://mongoosejs.com/docs/)


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

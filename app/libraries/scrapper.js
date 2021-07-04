var request = require('request');
var cheerio = require('cheerio');

function buildDataPerson(users) {
  // Define Variable for Looping
  var persons = [];
  var iCheck = 2;
  var iNumber = 1;
  var iName = 2;
  var iMultiple = 4;

  for (var i = 0, len = users.length; i < len; i++) {
    var iCheck = iCheck + iMultiple;
    if (users[iCheck]) {
      var numberPerson = users[iNumber = iNumber + iMultiple];
      var namePerson = users[iName = iName + iMultiple];
      var person = {nim:numberPerson, name:namePerson};
      persons.push(person);
    }
  }
  return persons;
}

function getDataPerson() {
  var url = 'http://alumni.amikom.ac.id/index.php/alumni/page/180';
  // Get DOM element from url
  request(url, function(error, response, html) {
    if (!error) {
      // Create DOM Element from Website
      var $ = cheerio.load(html);
      var tableData = $('table#o').html();
      var tableData = '<table id="tableUser">'+tableData+'</table>';

      // Create Specific DOM Element
      var $ = cheerio.load(tableData);
      var rowCount = $('#tableUser>tr>td').get().length;

      // Push Element into array
      var users = [];
      for (i = 0; i < rowCount; i++)
        users.push($('#tableUser>tr>td').eq(i).text());

      users = buildDataPerson(users);

      return users;
    }
  });
}

module.exports = {
  getDataPerson: getDataPerson,
  buildDataPerson: buildDataPerson
}

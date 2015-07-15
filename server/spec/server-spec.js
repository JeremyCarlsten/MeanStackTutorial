var request = require('request');

it("should respond with 200", function(done){
   request('http://localhost:3030/', function(error, response, body){
      expect(response.status).toEqual(200);
       done();
   });
});
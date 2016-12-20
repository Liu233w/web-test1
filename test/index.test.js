var app = require("../index");
var request = require("supertest")(app);
var should = require("should");

function get_404(done){
    return function(err, res){
        should.not.exist(err);
        res.text.should.equal('404');
        done();
    }
}

describe('mysite', function() {
    describe('index', function(){
        it('should show index page correctly', function(done){
            request.get('/')
                .end(function(err, res){
                    should.not.exist(err);
                    should.exist(res.text);
                    done();
                })
        })
    })

    describe('txt', function(){
        it('should show a text if exist', function(done){
            request.post('/txt')
                .send({files: '1.txt'})
                .expect(200)
                .end(function(err, res){
                    should.not.exist(err);
                    res.text.should.not.equal('404');
                    done();
                })
        })
        it('should show 404 when file is not exist', function(done){
            request.post('/txt')
                .send({files: 'nothing.lol'})
                .expect(200)
                .end(get_404(done));
        })
    })

    describe('page not exist', function(){
        it('should show 404 page', function(done){
            request.get('/nothing-a-url')
                .expect(200)
                .end(get_404(done));
        })
    })
})

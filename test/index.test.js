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

describe('站点流程中，', function() {
    describe('主页', function(){
        it('应当可以正常显示', function(done){
            request.get('/')
                .end(function(err, res){
                    should.not.exist(err);
                    res.text.should.containEql('这是一个主页');
                    done();
                })
        })
    })

    describe('txt 页面', function(){
        it('如果存在对应的文本，应该显示出来', function(done){
            request.post('/txt')
                .send({files: '1.txt'})
                .expect(200)
                .end(function(err, res){
                    should.not.exist(err);
                    res.text.should.containEql('123');
                    done();
                })
        })
        it('如果文本不存在，应该显示 404 页面', function(done){
            request.post('/txt')
                .send({files: 'nothing.lol'})
                .expect(200)
                .end(get_404(done));
        })
    })

    describe('访问不存在的页面', function(){
        it('应当显示 404 页面', function(done){
            request.get('/nothing-a-url')
                .expect(200)
                .end(get_404(done));
        })
    })
})

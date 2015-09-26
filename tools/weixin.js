var crypto = require('crypto');
var https = require('https');
var TOKEN = 'lcya86';
var request = require('superagent');
var access_token = {
  token:'',
  timestamp:Date.now()
};
var jsapi_ticket = {
  ticket:'',
  timestamp:Date.now()
};
exports.checkSignature = function(signature,timestamp,nonce){
  var tmpArr = [TOKEN,timestamp,nonce];
  tmpArr.sort();
  var tmpStr = tmpArr.join('');
  var shasum = crypto.createHash('sha1');
  shasum.update(tmpStr);
  tmpStr = shasum.digest('hex');
  if(tmpStr == signature){
    return true;
  }else{
    return false;
  }
};

exports.login = function(fn){
  var wx_user = '***';
  var wx_pwd = '***';
  var shasum = crypto.createHash('md5');
  shasum.update(wx_pwd);
  var wx_pwd_md5 = shasum.digest('hex');
  request
    .post('http://mp.weixin.qq.com/cgi-bin/login?lang=zh_CN')
    .set('referer','https://mp.weixin.qq.com/')
    .type('form')
    .send({
      username: wx_user,
      pwd: wx_pwd_md5,
      imgcode : '',
      f : 'json',
      register : 0
    })
    .end(function(err,res){
      if(err){
        return console.error(err);
      }
      var cookie = '';
      var token = res.text.match(new RegExp("[\?\&]token=([^\&]+)\"","i"))[1];
      for(rs in res.header['set-cookie']){
        cookie += res.header['set-cookie'][rs].replace(/Path=\/;\sSecure;\sHttpOnly/g, '');
      }
      fn(token,cookie);
    });
};

exports.sender = function(options,fn){
  var postParams = {
    mask:false,
    tofakeid:options.fakeid,
    type:1,
    content:options.msg,
    //quickreplyid:200292542,
    token:options.token,
    lang:'zh_CN',
    //random:0.7469026290345937,
    f:'json',
    ajax:1,
    t:'ajax-response'
  }
  request
    .post('http://mp.weixin.qq.com/cgi-bin/singlesend?t=ajax-response&f=json')
    .set('referer','https://mp.weixin.qq.com/')
    .type('form')
    .send(postParams)
    .set('Cookie', options.cookie)
    .end(function(err,res){
      if(err){
        return console.error(err);
      }
      fn(JSON.parse(res.text));
    });
};

exports.getFirstFakeId = function(option,fn){
  var headers = {
    'Host': 'mp.weixin.qq.com',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    //'Accept-Encoding':'gzip, deflate',
    'Accept-Language':'zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3',
    'Cookie':option.cookie,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0'
  }

  var options = {
    hostname:'mp.weixin.qq.com',
    path:'/cgi-bin/message?t=message/list&count=1&day=7&token='+option.token+'&lang=zh_CN',
    method:'GET',
    headers:headers
  }
  var result = '';
  var req = https.request(options,function(res){
    res.setEncoding('utf8');
    res.on('data',function(chunk){
      if(chunk.search(/wx\.cgiData/)!=-1||chunk.search(/\);;/)!=-1){
        result += chunk;
      }
    });
    res.on('end',function(){
      var fakeid = result.match(/"fakeid":"(\d+)"/)[1];
      fn(fakeid);
    })
  }).on('error',function(e){
    console.error('weixin_error:'+e.message);
    this.destroy();
  });
  req.end();
};

function getAccessToken(fn){
  var differ = Date.now() - access_token.timestamp;
  if(access_token.token==''||differ>7195*1000){
    request
      .get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx56bfafa64e9dd642&secret=c448419059325fd33d0165e420d48cb2')
      .end(function(err,res){
        if(err){
          return console.error(err);
        }
        console.log(JSON.parse(res.text));
        access_token = {
          token:JSON.parse(res.text).access_token,
          timestamp:Date.now()
        };
        fn(access_token.token);
      });
  }else{
    fn(access_token.token);
  }
}
//getAccessToken();

exports.getJsapiTicket = function(fn){
  var differ = Date.now() - jsapi_ticket.timestamp;
  getAccessToken(function(access_token){
    if(jsapi_ticket.ticket==''||differ>7195*1000){
      request
        .get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access_token+'&type=jsapi')
        .end(function(err,res){
          if(err){
            return console.error(err);
          }
          console.log(JSON.parse(res.text));
          jsapi_ticket = {
            ticket:JSON.parse(res.text).ticket,
            timestamp:Date.now()
          };
          fn(jsapi_ticket.ticket);
        });
    }else{
      fn(jsapi_ticket.ticket);
    }
  });
};
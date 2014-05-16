var weixin = require('../tools/weixin');
var XMLWriter = require('xml-writer');
exports.index = function(req, res) {
	if (weixin.checkSignature(req.query.signature, req.query.timestamp, req.query.nonce)) {
		console.log(req.body);
		route(req,res);
	} else {
		return res.send(404);
	}
}

function route(req,res){
	if(req.body.xml.MsgType[0]=='event'){
		if(req.body.xml.Event[0]=='subscribe'){
			return replyText(req,res,'hi～我是刘春洋，“小玩意儿”是我平时瞎折腾的地方，我会不定时地做一些好玩儿的小玩意儿与大家分享，回复“捣鼓啥呢”可以看到我正在捣鼓神马。ps：<a href="http://lcy-blog.com">这是我的部落格，欢迎来访～</a>');
		}
	}else if(req.body.xml.MsgType[0]=='text'){
		if(req.body.xml.Content[0]=='捣鼓啥呢'){
			return replyText(req,res,'<a href="http://lcy-blog.com/project/doing">好玩儿的，点我就告诉你</a>');
		}else if(req.body.xml.MsgType[0]=='图文'){
			var articles = [];
			var firstarticle = {
				title:'Yesterday When I Was Young',
				description:"<p>Seems the love I've ever known</p>

						<p>看来，过去我所知道的爱情</p>

						<p>Has always been the most destructive kind</p>

						<p>似乎总是最具有毁灭性的那种</p>

						<p>Guess that's why now</p>

						<p>或许，那就是为什么</p>

						<p>I feel so old before my time</p>

						<p>如今我感觉如此的未老先衰</p>

						<p>Yesterday, when I was young,</p>

						<p>昨日，当我轻狂年少</p>

						<p>The taste of life was sweet as rain upon my tongue,</p>

						<p>生命的滋味甜美有如我舌尖上的雨水</p>

						<p>I teased at life as if it were a foolish game,</p>

						<p>我戏弄著生命，彷彿它只是一场愚蠢的游戏</p>

						<p>The way the evening breeze may tease a candle flame</p>

						<p>就好像夜晚的微风逗弄著一盏烛火那样</p>

						<p>The thousand dreams I dreamed, the splendid things I planned,</p>

						<p>成千个我所做过的梦，还有那些我所计画的大业</p>

						<p>I always built, alas, on weak and shifting sand,</p>

						<p>我总是建筑在，唉，松软的流沙上</p>

						<p>I lived by night and shunned the naked light of day,</p>

						<p>我夜夜笙歌，躲避著白昼赤裸的阳光</p>

						<p>And only now I see how the years ran away</p>

						<p>直到现在，我才惊觉岁月已经如何的消逝</p>

						<p>Yesterday, when I was young,</p>

						<p>昨日，当我轻狂年少</p>

						<p>So many happy songs were waiting to be sung,</p>

						<p>那么多快乐的歌曲等待我去唱</p>

						<p>So many wild pleasures lay in store for me,</p>

						<p>那么多狂野的乐趣等待我去享用</p>

						<p>And so much pain my dazzled eyes refused to see</p>

						<p>而那么多的痛苦，我昏花的双眼拒绝去看见</p>

						<p>I ran so fast that time and youth at last ran out,</p>

						<p>我奔跑得那么快，岁月与青春终于用罄</p>

						<p>I never stopped to think what life was all about,</p>

						<p>我从未停下来思考过生命究竟是什么</p>

						<p>And every conversation I can now recall,</p>

						<p>而如今我能够记得的所有对话</p>

						<p>Concerned itself with me, and nothing else at all</p>

						<p>都只跟我有关，其他的什么也没有</p>

						<p>Yesterday, the moon was blue,</p>

						<p>昨日，当月光依旧湛蓝</p>

						<p>And every crazy day brought something new to do,</p>

						<p>而每个疯狂的日子都带来一些新鲜的事情可作</p>

						<p>I used my magic age as if it were a wand,</p>

						<p>我滥用著我神奇的年纪，就像它是根魔法棒</p>

						<p>And never saw the waste and emptiness beyond</p>

						<p>从来没有看见背后的浪费与空虚</p>

						<p>The game of love I played with arrogance and pride,</p>

						<p>我用轻狂与自负的态度，玩著爱情的游戏</p>

						<p>And every flame I lit too quickly, quickly died,</p>

						<p>而我所点燃的所有焰火，都太快太快的熄灭</p>

						<p>The friends I made all seemed somehow to drift away,</p>

						<p>我所交的朋友，似乎都一一逐渐远去</p>

						<p>And only I am left on stage to end the play</p>

						<p>只有我被留在舞台上，独自去结束这场戏</p>

						<p>There are so many songs in me that won't be sung,</p>

						<p>我心中有太多的歌曲无法被唱出</p>

						<p>I feel the bitter taste of tears upon my tongue,</p>

						<p>我感觉到泪水苦涩的滋味滑落在我舌尖</p>

						<p>The time has come for me to pay,</p>

						<p>现在，付出代价的时间已经来到</p>

						<p>For yesterday, when I was young.</p>",
				picurl:"http://upload.ahwang.cn/2014/0516/1400223312243.jpg",
				url:'http://lcy-blog.com'
			}
			articles.push(firstarticle);
			return replyNews(req,res,articles);
		}
	}
	return res.send('');
}

function replyText(req,res,content){
	var reply = new XMLWriter;
	var date = new Date();
	reply.startElement('ToUserName');
	reply.writeCData(req.body.xml.FromUserName[0]);
	reply.endElement();
	reply.startElement('FromUserName');
	reply.writeCData(req.body.xml.ToUserName[0]);
	reply.endElement();
	reply.startElement('CreateTime').text(date.getTime()+'').endElement();
	reply.startElement('MsgType');
	reply.writeCData('text');
	reply.endElement();
	reply.startElement('Content').text(content).endElement();
	console.log('<xml>'+reply.toString()+'</xml>');
	return res.send('<xml>'+reply.toString()+'</xml>');
}

function replyNews(req,res,articles){
	var reply = new XMLWriter;
	var date = new Date();
	reply.startElement('ToUserName');
	reply.writeCData(req.body.xml.FromUserName[0]);
	reply.endElement();
	reply.startElement('FromUserName');
	reply.writeCData(req.body.xml.ToUserName[0]);
	reply.endElement();
	reply.startElement('CreateTime').text(date.getTime()+'').endElement();
	reply.startElement('MsgType');
	reply.writeCData('news');
	reply.endElement();
	reply.startElement('ArticleCount').text(2).endElement();
	reply.startElement('Articles');
	for(var i = 0;i<articles.length;i++){
		reply.startElement('item');
		reply.startElement('Title');
		reply.writeCData(articles[i]['title']);
		reply.endElement();
		reply.startElement('Description');
		reply.writeCData(articles[i]['description']);
		reply.endElement();
		reply.startElement('PicUrl');
		reply.writeCData(articles[i]['picurl']);
		reply.endElement();
		reply.startElement('Url');
		reply.writeCData(articles[i]['url']);
		reply.endElement();
		reply.endElement();
	}
	reply.endElement();
	console.log('<xml>'+reply.toString()+'</xml>');
	return res.send('<xml>'+reply.toString()+'</xml>');
}
exports.doing = function(req,res){
	return res.render('doing');
}


exports.getResponse = function(req,res){
  console.log(req.cookies.name);
  res.set('Access-Control-Allow-Origin','*');
  res.cookie('name', 'tobi', { domain: 'lcy-blog.com', path: '/test', secure: true });
  return res.send({data:'aaa'});
}

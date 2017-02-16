exports.doing = function(req,res){
	return res.render('doing');
}


exports.getResponse = function(req,res){
  res.append('Access-Control-Allow-Origin','*');
  res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
  return res.send({data:'aaa'});
}

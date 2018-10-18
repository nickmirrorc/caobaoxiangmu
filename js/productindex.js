$(".new_pro_hd ul li").mouseenter(function(){
	$(this).addClass("current").siblings().removeClass('current');
//	console.log($(this).index());
	$(".new_pro_list").eq($(this).index()).addClass("current").siblings().removeClass("current");
})


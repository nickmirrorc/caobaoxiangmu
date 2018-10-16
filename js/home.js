$(function(){
	//header 
	$(".select-city .change a").hover(
		function(){$(this).css({color:"#40bb8c"})},
		function(){$(this).css({color:"#666"})}
	);
	
	$(".header .header_select").hover(
		function(){
			$(".header .header_select>span").css({transform:"rotate(180deg)"}),
			$(".header .header_select>div").css({height:"80px"})			
		},
		function(){
			$(".header .header_select>span").css({transform:"rotate("+0+"deg)"}),
			$(".header .header_select>div").css({height:"0px"})
		}
	);
	
	$(".header_btm .header_select>div a").hover(
		function(){$(this).css({color:"#40bb8c"})},
		function(){$(this).css({color:"#777"})}
	);
	$(".header_btm ul li").hover(
		function(){$(this).find("a").css({color:"#40bb8c"})},
		function(){$(this).find("a").css({color:"#333"})}
	);
	$(".header_btm ul li.now").hover(
		function(){$(this).find("a").css({color:"#40bb8c"})},
		function(){$(this).find("a").css({color:"#009944"})}
	);
	//con 开始
	//1 service
	$(".service .slst").each(function(){
		$(this).hover(
		function(){
			$(this).find(".slst-l").css({backgroundColor:"#40bb8c"}),
			$(this).find(".extend").css({display:"block"}),
			$(this).find(".extend").fadeTo(200,1),
			$(this).find(".slst-l p").css({color:"#fff"}),
			$(this).find(".slst-l .tit-btm span a").css({color:"#fff"}),
			$(this).find(".slst-l span.r").css({backgroundPositionX:"-105px"})
		},
		function(){
			$(this).find(".slst-l").css({backgroundColor:"rgba(255,255,255,.5)"}),
			$(this).find(".extend").fadeTo(200,0.5),
			$(this).find(".extend").css({display:"none"}),
			$(this).find(".slst-l p").css({color:"#333"}),
			$(this).find(".slst-l .tit-btm span a").css({color:"#777"}),
			$(this).find(".slst-l span.r").css({backgroundPositionX:"-92px"})
		})
	});
	
	$(".service .extend .extend-b ol li p.right a,a.moremodel").hover(
		function(){$(this).css({color:"#40bb8c"})},
		function(){
			$(this).css({color:"#777"}),
			$("a.moremodel").css({color:"#ccc"})
		}
	);
	//单的banner的js文件
	
	//维修店
	$(".nav_bar").on("mouseenter","a",function(){
		var _this=$(this);
		var myindex = _this.index()-1;
		//console.log(myindex);
		_this.addClass('current').siblings().removeClass('current');
		$(".store_lst:eq("+myindex+")").addClass('current').siblings().removeClass('current');
}).on("click","#moreCity",function(){
	var _this=$(this);
	
	if(_this.text() =="更多" ){
		_this.siblings("dl").stop().animate({"height":"100%"},300);
		_this.html("收起<i class='icon-arrow'></i>").children("i").css({
//			"widht":"12px",
//			"height":"9px",
			"background-position":"-95px -514px"
		});
	}else if(_this.text() == "收起"){
		_this.siblings("dl").stop().animate({"height":"36px"},300);
		_this.html("更多<i class='icon-arrow'></i>").children("i").css({
			"background-position":"-109px -514px"
		})
	}
})
//商城
$(".store_goods_con").eq(0).show();
$(".store_tab span").click(function(){
	if($(this).text().indexOf('全选商品')>-1){
		return false;
	}
	$(this).addClass('active').siblings().removeClass('active');
	$('.store_goods_con').hide().eq($(this).index()).show();
});
//资讯中心
$(".news_con").eq(0).show();
$('.news_tab span').eq(0).addClass("active");
$('.news_tab span').click(function(){
	console.log($(this).index());
	$('.news_con').hide().eq($(this).index()).show();
	$(this).addClass('active').siblings().removeClass('active');
});
	//单独的侧边栏js文件
})

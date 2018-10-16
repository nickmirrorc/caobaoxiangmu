//退出登录
    $(".logout").click(function(){
        var txt=  "您确定要退出吗？";
        var option = {
            title: "提示",
            btn: parseInt("0011",2),
            onOk: function(){
                window.location.href = _APP_+"/users/logout.html";
            }
        }
        window.wxc.xcConfirm(txt, "custom", option);
    });
    


// 快捷栏目
var cur = 23;
$(".con").delegate('.Slst', 'mouseenter', function(event) {
	$(this)
		.children(".extend")
		.stop()
		.fadeIn(300)
		.css("z-index",cur++);
}).delegate('.service .Slst', 'mouseleave', function(event) {
	$(this).children(".extend").stop().fadeOut(300);
}).delegate('.map_icon', 'click', function(event) {// 打开店铺地图
	var _this = $(this);
	var xy = _this.attr('data-deg').split(",");
	shopPosition(xy[0], xy[1]);
	$(".dark").fadeTo(500,0.35);
	$('.bigbox').slideDown(250);
})
// Banner 幻灯片
jQuery(".slideBox").slide({mainCell:".bd ul",effect:"fold",autoPlay:true},3500);

// 消息列表
$(".news-links ul li").click(function(event) {
	var myindex = $(this).index();
	$(this).addClass('current').siblings().removeClass('current');
	$(".skillbd:eq("+myindex+")").addClass('current').siblings().removeClass('current');
});

// 商品切换
var num = 0;
var ani_left = $("#index_pro").width();
var hd_ul = $("#index_pro ul");
$(".store").delegate('span.right', 'click', function(event) {
	num++;
	if(num>3){
		num=1
		hd_ul.css("left",0)
	}
	hd_ul.stop().animate({"left":-ani_left*num},500)
}).delegate('span.left', 'click', function(event) {
	num--;
	if(num<0){
		num=2
		hd_ul.css("left",-ani_left*3)
	}
	hd_ul.stop().animate({"left":-ani_left*num},500)
})							
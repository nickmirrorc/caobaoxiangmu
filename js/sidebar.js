$(function(){
$(".cb_sidebar .scrollUp").click(function(event){
	console.log("置顶");
	$("html,body").animate({scrollTop:0},600);
});

$('.cb_sidebar li.weixin').hover(
	function(){
		$('.erweima').animate({"left":-150})
	},
	function(){
		$('.erweima').animate({"left":50})
	}
);
$('.cb_sidebar li.app').hover(
	function(){$('#APP_code').animate({"left":-340})},
	function(){$('#APP_code').animate({"left":50})}
);
smallScreen();
$(window).on("resize",function(){smallScreen()});

function smallScreen(){
	if($(window).width()<1350){
		smallHide()
		$('.cb_sidebar').hover(function(){
				bigShow()
		},function(){
				smallHide()
		});
	}else{
		bigShow()
		$(".cb_sidebar").hover(function(){
			bigShow()
		},function(){
			bigShow()
		});
	}
};
function smallHide(){
	$(".cb_sidebar_tabs ul li:not(.cart)").hide();
	$(".cb_sidebar_tabs ul li.cart").css({"border-bottom":"1px solid #eee","border-left-color":"#eee"});
	$(".cb_sidebar_bg").hide();
	$(".cb_sidebar").css("top","57px");
};
function bigShow(){
	$(".cb_sidebar_tabs ul li").show();
	$(".cb_sidebar_tabs ul li.cart").css({"border-bottom":"0 none","border-left-color":"#cdcdcd"});
	$(".cb_sidebar_bg").show();
	$(".cb_sidebar").css("top","0px");
};
	
})

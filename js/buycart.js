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

//cart部分的js
//复选框单选操作
$(".prod b.single").click(function(){
	var _this=$(this);
	_this.toggleClass("ok");
	var thisCartList=_this.parents(".cartList");
	//部分全选
	var blen = thisCartList.find('.b .coin').length;
	var oklen = thisCartList.find('.b .ok').length;
	if(blen==oklen){
		_this.parents("ul").siblings(".shop-tit").find('.single-all').addClass('ok');
	}else{
		_this.parents("ul").siblings('.shop-tit').find('.single-all').removeClass('ok');
	}
	//全选
	var allLen = $('.prod .shop-tit .coin').length;
	var allOkLen=$('.prod .shop-tit .ok').length;
	if(allLen==allOkLen){
		$("b.all").addClass('ok');
	}else{
		$("b.all").removeClass('ok');
	}
	countPrice();
});
//复选框全选操作
$(".prod b.all").click(function(){
	var _this=$(this);
	if(_this.hasClass('all')==true){
		_this.toggleClass('ok');
		if(_this.hasClass('ok')==true){
			$('.prod b.single').addClass('ok');
		}else{
			$('.prod b.single').removeClass('ok');
		}
	}else{
		_this.toggleClass('ok');
	}
	countPrice();
})
//复选框店铺操作
$('.shop-tit b.single-all').click(function(){
	var _this=$(this);
	if(_this.hasClass('ok')==true){
		console.log("ok");
		_this.parents(".shop-tit").siblings('ul').find("li b.single").addClass('ok');
	}else{
		_this.parents('.shop-tit').siblings('ul').find('li b.single').removeClass('ok')
	}
	countPrice();
})
//-+改变商品数量
$(".prod").delegate('.bns','click',function(){
	var _this=$(this);
	var num=$(this).siblings('input[name=number]').val();
	var price=$(this).parents('li').siblings('.price').find('p').text();
	if($(this).hasClass('.plus')==true){
		if(num>=999){
			num=999;
			$(this).addClass('disabled');
		}else{
			num++;
			$(this).removeClass('disabled');
		}
		$(this).siblings('b.minus').removeClass('disabled');
	}
	if($(this).hasClass('minus')==true){
		if(num<=1){
			num=1;
			$(this).addClass('disabled');
		}else{
			num--;
			$(this).removeClass('disabled')
		}
		$(this).siblings('b.minus').removeClass('disabled');
	}
	var id = $(this).parents('ul').attr('data-id');
	$.post('/buy/changeNumber',{'id':id,'num':num},function(d){
		var data=JSON.parse(d);
		console.log(data);
		if(data.status=='0'){
			var txt = '库存不足！';
			window.wxc.xcConfirm(txt,window.wxc.xcConfirm.typeEnum.warning);
		}
		//conuntPrice();
		$(_this).siblings('input[name=number]').val(data['num']);
		var money = parseFloat(data.num)*parseFloat(data.price);
		var singeMoney = parseFloat(data.price);
		$(_this).parents('li').siblings('.money').find('p').text(money.toFixed(2));
		$(_this).parents('li').siblings('.price').find('p').text(singleMoney.toFixed(2));
	})
});
	//手动输入数量
$('.prod .number').on('change','input',function(){
	var _this = $(this);
	var num=$(this).val();
	var price=$(this).val();
	if(num<=1){
		num=1;
		$(this).siblings('b.minus').addClass('disabled');
		$(this).siblings('b.plus').removeClass('disabled');
	}
	var id=$(this).parents('ul').attr('data-id');
	$.post('/buy/changeNumber',{'id':id,'num':num},function(d){
		var data = JSON.parse(d);
		if(data.status==0){
			var txt='库存不足！';
			window.wxc.xcConfirm(txt,window.wxc.xcConfirm.typeEnum.warning);
		}
		countPrice();
		_this.val(data['num']);
		var money=parseFloat(data['num'])*parseFloat(data['price']);
		_this.parents('li').siblings('.money').find('p').text(money.toFixed(2));
	})
});
//删除单个商品
//批量删除商品
function deleteBatchCat(){
	var txt="确认删除这些商品吗？"
	var okli=$('.prod .b .ok:not(.all)');
	var oklen=okli.length;
	var option={
		title:"提示",
		bin:parseInt('0011',2),
		onOk:funtion(){
			if(oklen==0){
				var txt="手下留情，在调戏，购物车就空了 ！";
				window.wxc.xcConfirm(txt,window.wxc.xcConfirm.typeEnum.info);
//				
			}
		}
	}
}
//计算总金额
function countPrice(){
	var ids=[];
	var ul=$('b.ok:not(".all")').parents('ul');
	for(var i=0;i<ul.length;i++){
		ids[i]=$(ul[i]).attr('data-id');
	}
	//console.log(ids);
	$.post('/buy/totalAmount',{'ids':ids},function(msg){
		if($('.prod b.ok').length==0){
			$('.options .order button').prop('disabled',true).addClass('disabled');
		}else{
			$('.options .order button').prop('disabled',false).removeClass('disabled');
		}
		$('.prod .allMoney span').text(parseFloat(msg).toFixed(2));
	})
}

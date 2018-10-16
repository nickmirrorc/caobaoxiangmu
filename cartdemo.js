  
	//页面加载时调用
	$(function () {
		$(".prod b.all").trigger("click");
		if($('.prod .b .ok:not(.all)').length == 0){
			$('.prod b.coin').removeClass('ok');      //复选框 取消 选中
			$('.prod .allMoney span').text("0.00");   //总金额清零
		}
		
		//去结算
		$("#pay").click(function(){
			//获取选中的商品ID去结算
			var ids;
			var checked = $('.prod b.ok:not(.all)').parents('dl');
			var ckdlen = checked.length;
			for(var a = 0;a < ckdlen;a++){
				if((a + 1) == ckdlen){
					if(ids == '' || ids == null){
						ids = $(checked[a]).attr('data-id');
					}else{
						ids = ids + $(checked[a]).attr('data-id');
					}
				}else{
					if(a==0){
						ids = $(checked[a]).attr('data-id')+",";
					}else{
						ids = ids + $(checked[a]).attr('data-id')+",";
					}
				}
			}
			if(ids){
				$("input[name=ids]").val(ids);
				$("form#collect").submit();
			}else{
				var txt=  "请选择要提交的商品！";
				window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.warning);
			}
		});
	});
	
	//复选框单选操作
    $('.prod b.single').click(function(){
		var _this = $(this);
		_this.toggleClass('ok');
		var thisCartList = _this.parents(".cartList");
		// 部分全选
		var blen = thisCartList.find('.b .coin').length;
		var oklen = thisCartList.find('.b .ok').length;
		if(blen == oklen){
			_this.parents("dl").siblings(".shop-tit").find(".single-all").addClass('ok');
		}else{
			_this.parents("dl").siblings(".shop-tit").find(".single-all").removeClass('ok');
		}
		// 全选
		var allLen = $('.prod .shop-tit .coin').length;
		var allOkLen = $('.prod .shop-tit .ok').length;
		if(allLen == allOkLen){
			$("b.all").addClass('ok');
		}else{
			$("b.all").removeClass('ok');
		}
		countPrice();
	}); 
	//复选框全选操作
	$(".prod b.all").click(function(){
		var _this = $(this);
		if(_this.hasClass('all') == true){
			_this.toggleClass('ok');
			if(_this.hasClass('ok') == true){
				$('.prod b.single').addClass('ok');
			}else{
				$('.prod b.single').removeClass('ok');
			}
		}else{
			_this.toggleClass('ok');
		}
		countPrice();
	});
	
	//复选框店铺操作
	$(".shop-tit b.single-all").click(function(){
		var _this = $(this);
		if(_this.hasClass('ok') == true){
			_this.addClass('ok');
			_this.parents(".shop-tit").siblings("dl").find("b.single").addClass('ok');
		}else{
			_this.removeClass('ok');
			_this.parents(".shop-tit").siblings("dl").find("b.single").removeClass('ok');
		}
		countPrice();
	});
	 
	//-+改变商品数量
	$('.prod').delegate('.bns','click',function(){
		var _this = $(this);
		var num = $(this).siblings('input[name=number]').val();
		var price = $(this).parents('dd').siblings('.price').find('p').text();
		if($(this).hasClass('plus') == true){
			if(num >= 999){
				num = 999;
				$(this).addClass('disabled');
			}else{
				num++;
				$(this).removeClass('disabled');
			}
			$(this).siblings('b.minus').removeClass('disabled');	
		}
		if($(this).hasClass('minus') == true){
			if(num <= 1){
				num = 1;
				$(this).addClass('disabled');
			}else{
				num --;
				$(this).removeClass('disabled');
			}
			$(this).siblings('b.minus').removeClass('disabled');	
		}
		var id = $(this).parents('dl').attr('data-id');
		$.post('/Buy/changeNumber', {'id': id,'num': num}, function (d) {
			var data = JSON.parse(d);
			console.log(data);
			if(data.status == '0'){
				var txt=  "库存不足！";
				window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.warning);
			}
			countPrice();
			$(_this).siblings('input[name=number]').val(data['num']);
			var money = parseFloat(data.num) * parseFloat(data.price);
			var singleMoney = parseFloat(data.price);
			$(_this).parents('dd').siblings('.money').find('p').text(money.toFixed(2));
			$(_this).parents('dd').siblings('.price').find('p').text(singleMoney.toFixed(2));
		});
	});
	
	//手动输入数量
	$('.prod .number').on('change','input',function(){
		var _this = $(this);
		var num = $(this).val();
		var price = $(this).parents('dd').siblings('.price').find('p').text();
		if(num <= 1){
			num = 1;
			$(this).siblings('b.minus').addClass('disabled');
			$(this).siblings('b.plus').removeClass('disabled');		
		}
		var id = $(this).parents('dl').attr('data-id');
		$.post('/Buy/changeNumber', {'id': id,'num': num}, function (d) {
			var data = JSON.parse(d);
			if(data.status == 0){
				var txt=  "库存不足！";
				window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.warning);
			}
			countPrice();
			$(_this).val(data['num']);
			var money = parseFloat(data['num']) * parseFloat(data['price']);
			$(_this).parents('dd').siblings('.money').find('p').text(money.toFixed(2));
		});
	});
	
	//删除单个商品
	$('.prod .option').on('click','.del span',function(){
		var txt=  "确定要删除该商品？";
		var _this = $(this);
		var id = _this.parents('dl').attr('data-id');
		var _thisCar = _this.parents(".cartList");
		var option = {
			title: "提示",
			btn: parseInt("0011",2),
			onOk: function(){
				$.post('/Buy/deleteCat', {'id': id}, function (a) {
					$('[data-id='+ id +']').remove();
					var dllen = $('.prod [data-id]').length;
					var PartAllLen = _thisCar.find("dl").length;
					countPrice();
					if(dllen == 0){
						$('.prod dl:not(.options)').remove();
						$('.prod .options').before('<div class="kong">购物车空了！去挑选点什么吧！<a href="https://www.caobao.com/product/">走起！</a></div>');
						$('.prod .b b.all').removeClass('ok');
						$('.prod .order button').prop('disabled',true).addClass('disabled');
					}
					if(PartAllLen == 0){
						_thisCar.find(".shop-tit").remove();
					}
					$('.prod .allMoney span').text('0.00');
				});
			}
		}
		window.wxc.xcConfirm(txt, "custom", option);
	});
	
	//批量删除商品
	function deleteBatchCat(){
		var txt=  "确认删除这些商品吗？";
		var okli = $('.prod .b .ok:not(.all)');
		var oklen = okli.length;
		var option = {
			title: "提示",
			btn: parseInt("0011",2),
			onOk: function(){
				if(oklen == 0){
					var txt = "手下留情，再调戏，购物车就空了！";
					window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
					$('.prod .b b.all').removeClass('ok');
					$('.prod .allMoney span').text('0.00');
					$('.options .order button').prop('disabled',true).addClass('disabled');
					return false;
				}
				var ids = new Array();
				for(var i = 0; i < oklen; i ++){
					ids[i] = $(okli[i]).parents('dl').attr('data-id');
				}
				$.post('/Buy/deleteBatchCat', {'ids': ids}, function (a) {
					$(okli).parents('dl').remove();
					var dllen = $('.prod [data-id]').length;
					countPrice();
					if(dllen == 0){
						$('.prod dl:not(.options)').remove();
						$('.prod .shop-tit').remove();
						$('.prod .options').before('<div class="kong">购物车空了！去挑选点什么吧！<a href="https://www.caobao.com/product/">走起！</a></div>');
						$('.prod .b b.all').removeClass('ok');
						$('.prod .order button').prop('disabled',true).addClass('disabled');
					}
					$('.prod .allMoney span').text('0.00');
				});
			}
		}
		window.wxc.xcConfirm(txt, "custom", option);
	}
	
	// 计算总金额
	function countPrice(){
		var ids = [];
		var dl = $('b.ok:not(".all")').parents('dl');
		for(var a = 0;a < dl.length;a++){
			ids[a] = $(dl[a]).attr('data-id');
		}
		// console.log(ids);
		$.post('/Buy/totalAmount',{'ids': ids},function(msg){
			if($('.prod b.ok').length == 0){
				$('.options .order button').prop('disabled',true).addClass('disabled');
			}else{
				$('.options .order button').prop('disabled',false).removeClass('disabled');
			}
			$('.prod .allMoney span').text(parseFloat(msg).toFixed(2));
		})
	}
    
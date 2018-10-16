	let timer=null;
	let cur = 0;
	function autoPlay(){
		timer=setInterval(function(){
			let out =cur;
			cur=++cur>2?0:cur;
			//console.log(cur);
			forImg(cur,out);
			forLi();
		},2000);
	}
	function forImg(inOrd,outOrd){
		//console.log("forImg");
		if(inOrd==outOrd){
			return;
		}
		//console.log($("img").eq(inOrd));
		$(".banner img").eq(inOrd).css({opacity:0});
		$(".banner img").eq(outOrd).css({opacity:1});
		$(".banner img").eq(outOrd).fadeTo(400,0);
		$(".banner img").eq(inOrd).fadeTo(400,1);
	}
	function forLi(){
		$(".hd li").each(function(){
			$(this).css({borderWidth:"1px"});
		});
		$(".hd li").eq(cur).css({borderWidth:"3px"});
	}
	function stop(){
		clearInterval(timer);
	}
	//点击li跳转到li对应的图片
	function onLi(target){
		let out=cur;
		cur = target;
		forImg(cur,out)
		forLi();
	}	




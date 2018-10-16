$(function(){//header
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
})	
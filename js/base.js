$(function(){
	
	window.setTimeout(function(){
		//设置心左右高度相等
		var lh = $("#left").height();
		var rh = $("#right").height();

		if(lh < rh){
			// $("#left").height(rh - 0);
		}else{
			$("#right").height(lh);		
		}
	},300);

	var sameH = function() {
		var h = 0;

		$('.sameH').each(function(i,e){
			if( $(e).height() > h )
				h = $(e).height();
		}).height(h);

	}

	sameH();


	// background-color-setter

	$('.loan-table-3 tr:even').css('background-color','#dbffd8');
	$('.loan-table-1 tr:even').css('background-color','#d2f1ff');


	// subMenu fold effect

	$('#subMenu li').click(function(e){

		if( $(this).children('ol').size() ) {

			var state = $(this).hasClass('open');

			if(state) {
				$(this).children('ol').slideUp();
			}

			else {
				$(this).children('ol').slideDown(function(){
					$(this).css('zoom',1);
				});
			}

			$(this).toggleClass('open');
		}
	})

	$('#subMenu li a').click(function(e){
		if($(this).siblings('ol').size()>=1) {
			e.preventDefault();
		}
	})

	//$('#subMenu ol').



	// 测试宽度
	$(document).ready(function(){
		if( $(window).width() < 1200 )
			$('body').width(1200);
	})

	// 调节浏览器 调整宽度
	$( window ).resize(function() {
	  if( $(window).width() < 1200 )
			$('body').width(1200);
	  else 
	  	$('body').width('');
	});

	// 菜单hover
	$('ul.nav li.sub').hover(function(){
		$(this).find('ul').css('display','block');
	},function(){
		$(this).find('ul').css('display','none');
	})

	var urlLocation = function(){
		var urlArray = location.href.split('/'),
			current = urlArray[urlArray.length-1],
			isFind = false;

		//current = current.replace('?', '\\u003F');

		if(current==''){
		     //空表示为主页，
		      $('ul.nav a:first').addClass('c900');
    	}else{   

			$('ul.nav, ul#subMenu, ul.left_ul').find('a').each(function(i,e){
				var url = $(e).attr('href').split('/'),
					c = url[url.length-1];
				
				if( c == current ) {
					$(e).addClass('c900');

					$(e).closest('li.sub').children('a').addClass('c900');
				}
			})

			$('ul#subMenu a.c900').closest('ol').css('display','block').parent('li').addClass('open');
		}
	}

	urlLocation();

	//滑动效果在显示和隐藏状态之间切换
	$("#subMenu li a").each(function(){
		$(this).click(function(){
			$(this).siblings("ol").slideDown();
		});
	});
	
	//选项卡切换jquery
	$(".tradetab li").each(function(index) {
		$(this).click(function(){
			$(".tradetab li.act").removeClass("act");
			$(this).addClass("act");
			$(".tradecon:eq("+ index +")").removeClass("hide").siblings(".tradecon").addClass("hide");	
		});
	});

	
	// 图片切换
	var numpic = $('#slides li').size()-1;
	var nownow = 0;
	var inout = 0;
	var TT = 0;
	var SPEED = 5000;

	function ADDLI(){
		//var lilicount = numpic + 1;
		for(var i = 0; i <= numpic; i++){
			ulcontent += '<li>' + '<a>' + (i+1) + '</a>' + '</li>';
		}
		
		$('#slides').after(ulstart + ulcontent + ulend);
	}
    
	$('#slides li').each(function() {
		var bgcolor = $(this).attr('bgcolor');
		$(this).css({'background-color':bgcolor});
	});

	$('#slides li').eq(0).siblings('li').css({'display':'none'});


	var ulstart = '<ul id="pagination">',
		ulcontent = '',
		ulend = '</ul>';

	ADDLI();

	var pagination = $('#pagination li');
	var paginationwidth = $('#pagination').width();
	//$('#pagination').css('margin-left',(470-paginationwidth))
	
	pagination.eq(0).addClass('current')

	pagination.on('click',DOTCHANGE)
	
	function DOTCHANGE(){
		
		var changenow = $(this).index();
		
		$('#slides li').eq(nownow).css('z-index','99');
		$('#slides li').eq(changenow).css({'z-index':'100'}).show();
		pagination.eq(changenow).addClass('current').siblings('li').removeClass('current');
		$('#slides li').eq(nownow).fadeOut(400,function(){$('#slides li').eq(changenow).fadeIn(500);});
		nownow = changenow;
	}
	
	pagination.mouseenter(function(){
		inout = 1;
	})
	
	pagination.mouseleave(function(){
		inout = 0;
	})
	
	function GOGO(){
		
		var NN = nownow+1;
		
		if( inout == 1 ){
			} else {
			if(nownow < numpic){
			$('#slides li').eq(nownow).css('z-index','99');
			$('#slides li').eq(NN).css({'z-index':'100'}).show();
			pagination.eq(NN).addClass('current').siblings('li').removeClass('current');
			$('#slides li').eq(nownow).fadeOut(400,function(){$('#slides li').eq(NN).fadeIn(500);});
			nownow += 1;

		}else{
			NN = 0;
			$('#slides li').eq(nownow).css('z-index','99');
			$('#slides li').eq(NN).stop(true,true).css({'z-index':'100'}).show();
			$('#slides li').eq(nownow).fadeOut(400,function(){$('#slides li').eq(0).fadeIn(500);});
			pagination.eq(NN).addClass('current').siblings('li').removeClass('current');

			nownow=0;

			}
		}
		TT = setTimeout(GOGO, SPEED);
	}
	
	TT = setTimeout(GOGO, SPEED); 






	// ----------------------------------------
	// ! file select
	// ----------------------------------------
	$('.file-upload').on('change', '#chooseFile', function () {
	  var filename = $(this).closest('.file-upload').find("#chooseFile").val();
	  if (/^\s*$/.test(filename)) {
	    $(this).closest('.file-upload').find(".file-upload").removeClass('active');
	    $(this).closest('.file-upload').find("#noFile").text("请点击上传文件..."); 
	  }
	  else {
	    $(this).closest('.file-upload').find(".file-upload").addClass('active');
	    $(this).closest('.file-upload').find("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
	  }
	});
})

/*--------------时钟---------------- */
function startTime() {
	var today = new Date()
	var h = today.getHours()
	var m = today.getMinutes()
	var s = today.getSeconds()
	// add a zero in front of numbers<10
	m = checkTime(m)
	s = checkTime(s)
	document.getElementById('time').innerHTML = h + ":" + m + ":" + s
	t = setTimeout('startTime()', 500)
}

function checkTime(i) {
	if(i < 10) {
		i = "0" + i
	}
	return i
}

//日历

var myCalendar = new SimpleCalendar('#calendar');
$(function() {
	var monthCH = $('.sc-select-month').text();
	$(".sc-mleft").click(function() {
		myCalendar.subMonth();
		var year = $('.sc-select-year').text();
		var monthCH = $('.sc-select-month').text();
		var month = SimpleCalendar.prototype.languageData.months_CH.indexOf(monthCH) + 1;
	})
	$(".sc-mright").click(function() {
		myCalendar.addMonth();
		var year = $('.sc-select-year').text();
		var monthCH = $('.sc-select-month').text();
		var month = SimpleCalendar.prototype.languageData.months_CH.indexOf(monthCH) + 1;
	})
});

//滑动切换
var myElement = document.getElementById('calendar');　　
var hammer = new Hammer(myElement);
hammer.on("swipeleft", function(ev) {
	myCalendar.addMonth();
	var monthCH = $('.sc-select-month').text();
	console.log(monthCH)
});
hammer.on("swiperight", function(ev) {
	myCalendar.subMonth();
});

//添加标记
var yc = {
	'2020-4-1': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}],

	'2020-4-10': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}],
	'2020-4-15': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}]
};
myCalendar._defaultOptions.yc = yc;

var zc = {
	'2020-4-2': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}],

	'2020-4-12': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}],
	'2020-4-13': [{
		title: '上班',
		startTime: '2018-2-30 6:00:00',
		title: '上班打卡'
	}, {
		title: '下班打卡',
		startTime: '2018-2-30 6:00:00'
	}]
};
myCalendar._defaultOptions.zc = zc;

myCalendar.update();

//显示当天的活动在初始化之后
//初始化今天的活动
announceList($('.sc-today'));

//有标记的日期点击事件
$('#calendar').on("click", '.sc-selected', function() {
	announceList($(this));

});

//显示选择日期当天的活动
function announceList(v) {
	console.log(v)
	if(v.children().hasClass('sc-mark-show')) {
		var year = $('.sc-select-year').text();
		var monthCH = $('.sc-select-month').text();
		var day = v.children()[1].innerText;
		var month = SimpleCalendar.prototype.languageData.months_CH.indexOf(monthCH) + 1;
		var date = year + '-' + month + '-' + day;
		var content = yc[date];
		var matterHtml = '';

		for(var i = 0; i < content.length; i++) {
			console.log(content.length)

			matterHtml += '<li class="announceItem"><div><div class="fl announceImg">' +
				'<img class=" " src="images/content.png"></div>' +
				'<p class="announceContent">' + content[i].title + '</p>' +
				'</div><div class="announceTime">' + content[i].startTime + '</div></li>';
		}
		$('.matter').html(matterHtml);
	} else if(v.children().hasClass('zc')) {
		var year = $('.sc-select-year').text();
		var monthCH = $('.sc-select-month').text();
		var day = v.children()[1].innerText;
		var month = SimpleCalendar.prototype.languageData.months_CH.indexOf(monthCH) + 1;
		var date = year + '-' + month + '-' + day;
		var zccontent = zc[date];
		var zcHtml = '';

		for(var j = 0; j < zccontent.length; j++) {
			console.log(zccontent.length)

			zcHtml += '<li class="announceItem"><div><div class="fl announceImg">' +
				'<img class=" " src="images/content.png"></div>' +
				'<p class="announceContent">' + zccontent[j].title + '</p>' +
				'</div><div class="announceTime">' + zccontent[j].startTime + '</div></li>';
		}
		$('.matter').html(zcHtml);
	} else {
		var matterHtml = ''
		matterHtml += '<li class="announceItem"><div><p class="announceContent">当前日期暂无打卡记录</p></div></li>';
		$('.matter').html(matterHtml);
	};

};

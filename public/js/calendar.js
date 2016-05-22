// var studios = [
// {
// 	"place": "渋谷店",
// 	"info": [
// 		{"id": "100", 
// 		 "name": "A101"},
// 		{"id": "200",
// 		"name": "A102"},
//     	{"id": "300",
//     	"name": "B101"}
// 	]
// },
// {
// 	"place": "恵比寿店",
// 	"info": [
// 		{"id": "400",
// 		"name": "1号室"},
//     	{"id": "500",
//     	"name": "2号室"}
// 	]
// }];


var studio = {
	"id": "100",
	"name": "A101",
	"place": "渋谷スタジオ", 
	"events": [
		{
			id: 100,
			title: '愛甲 準 様',
			start: '2016-05-20T16:00:00',
			end: '2016-05-20T18:00:00'
		},
		{
			id: 200,
			title: '愛甲 準 様',
			start: '2016-05-20T22:00:00',
			end: '2016-05-21T02:00:00',
			color: '#E57373',
			textColor: '#FFFFFF'
		},
		{
			id: 300,
			title: '張 巧実 様',
			start: '2016-05-22T16:00:00',
			end: '2016-05-22T18:00:00',
			url: 'https://www.facebook.com/yasai.juice111?fref=ts',
			color: '#81C784',     // an option!
			textColor: '#FFFFFF'  // an option!
		},
		{
			id: 400,
			title: 'よもさん 様',
			start: '2016-05-21T14:00:00',
			end: '2016-05-21T18:00:00',
			url: 'https://www.facebook.com/yasai.juice111?fref=ts',
			color: '#E57373',
			textColor: '#FFFFFF'
		},
		{
			id: 400,
			title: '予約可能',
			start: '2016-05-22T10:00:00',
			end: '2016-05-22T14:00:00',
			url: 'https://www.facebook.com/yasai.juice111?fref=ts',
			color: '#E57373',
			textColor: '#FFFFFF'
		}
	]
}

var week = [ "日", "月", "火", "水", "木", "金", "土"]

var defaultSettingHour = 2

$(document).ready(function() {
	$("#studioName").text(studio.place + " " + studio.name) ;

	// for(var i in studios){
 //    	$("#studioList ul").append("<li class='place'><strong>" + studios[i].place + "</strong></li>");
 //    	for(var j in studios[i].info){
 //        	$("#studioList ul").append("<li><a href='calendar.html?studio="+studios[i].info[j].id+"'>" + studios[i].info[j].name + "</a></li>");
 //    	}
	// }

	// 初期表示を現在時刻にカーソルさせる
	var current_day = new Date();
    var current_hours = current_day.getHours() + 5;
    var current_minutes = current_day.getMinutes();
    var first_scroll_time = current_hours + ":" + current_minutes + ":00"

	// カレンダー周りの設定
	$('#calendar').fullCalendar({
		height: 800,
		defaultView: 'agendaWeek',
		header: {
			left: 'prev, next',
			center: 'title',
			right: 'month agendaWeek agendaDay'
		},
		// ボタン文字列
		buttonText: {
		    prev:     '<',
		    next:     '>',
		    today:    '今日',
		    month:    '月',
		},
		// 月名称
		monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		// 月略称
		monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		// 曜日名称
		dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
		// 曜日略称
		dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
		// タイトルの書式
		titleFormat: {
		    month: 'YYYY年 M月'
		},
		// 列の書式
		columnFormat: {
		    month: 'ddd',
		    week: 'D（ddd）'
		},
		// 行の時間の書式
		axisFormat: 'H:mm',
		// 時間の書式
		timeFormat: 'H:mm',
		scrollTime: first_scroll_time,
		// 初期表示の日付
		//defaultDate: '2016-01-12',
		editable: false,
		eventLimit: true, // allow "more" link when too many events
		// APIのレスポンスは以下の形式で
		events: studio.events,
		// カレンダーのどこかをクリックしたらイベントを作る
        dayClick: function(date, allDay, jsEvent, view) {
            // $('#calendar').fullCalendar('addEventSource', [{
            //     title: '峰岸 啓人 様',
            //     start: '2016-05-10T11:00:00',
            //     end: '2016-05-10T13:00:00'
            // }]);
            $('[data-remodal-id=event]').remodal().open();
           	var selectedDate = new Date(date)
           	var year = selectedDate.getFullYear()
           	var month = selectedDate.getMonth() + 1
           	var day = selectedDate.getDate()
           	var youbi = week[selectedDate.getDay()]
            $("#eventDate").text(month + "月" + day + "日（" + youbi + "）");

            var fullMonthString = fullString(month);
            var fullDayString = fullString(day);
            var dateString = year + "-" + fullMonthString + "-" + fullDayString
            $("#eventStartDate").val(dateString)
            $("#eventEndDate").val(dateString)

            var hour = selectedDate.getHours() - 9 >= 0 ? selectedDate.getHours() - 9 : 24+(selectedDate.getHours() - 9) 
            console.log(hour)
            var minutes = selectedDate.getMinutes();
            $("#eventStartTime").val(fullString(hour) + ":" + fullString(minutes))
            
            if (hour + defaultSettingHour > 23) {
            	var overHour = fullString(hour + defaultSettingHour - 24)
            	$('#eventEndTime').val(overHour + ":" + minutes)
            	var fullDayString = fullString(day + 1);
            	var dateString = year + "-" + fullMonthString + "-" + fullDayString
            	$("#eventEndDate").val(dateString)
            } else {
            	$('#eventEndTime').val(fullString(hour + defaultSettingHour) + ":" + fullString(minutes))	
            }
            

        },
        // イベントをクリックしたらタイトルをhogeに変える
        eventClick: function(calEvent, jsEvent, view) {
            // calEvent.title = '峰岸 啓人 様';
            // calEvent.start = '2016-04-12T17:00:00'
            // calEvent.end = '2016-04-12T19:00:00'
            // $('#calendar').fullCalendar('updateEvent', calEvent);
            alert("ここでスケジュール更新用ポップアップを表示する")
        }
	});

	function fullString(defaultString) {
    	return (defaultString < 10 ? "0" : "")  + defaultString;
    }
});

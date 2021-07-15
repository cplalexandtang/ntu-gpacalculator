(function ($) {
	"use strict";
	$('.column100').on('mouseover',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).addClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).addClass('hov-column-head-'+ verTable);
	});

	$('.column100').on('mouseout',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).removeClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).removeClass('hov-column-head-'+ verTable);
	});

	// TODO START
	/* Only edit this part! */

	var addToPage = (data, ajax = false) => {
		$("div#all table tbody tr").remove()
		for (var _i = 0; _i < data.grades.length; _i++) {
			$("div#all table tbody").append(
				'<tr class="row100 body">'
				+'<td class="cell100 column0"><input type="checkbox" checked="true"/></td>'
				+'<td class="cell100 column1">' + data.grades[_i].Group + '</td>'
				+'<td class="cell100 column2">' + data.grades[_i].Year + '</td>'
				+'<td class="cell100 column3">' + data.grades[_i].Course + '</td>'
				+'<td class="cell100 column4">' + data.grades[_i].ClassNum + '</td>'
				+'<td class="cell100 column5">' + data.grades[_i].ID + '</td>'
				+'<td class="cell100 column6">' + data.grades[_i].Class + '</td>'
				+'<td class="cell100 column7">' + data.grades[_i].Credit + '</td>'
				+'<td class="cell100 column8">' + data.grades[_i].Grade + '</td>'
				+'<td class="cell100 column9">' + data.grades[_i].Score + '</td>'
				+'<td class="cell100 column10">' + data.grades[_i].Memo + '</td>'
				+'</tr>'
			)
		}
		
		var major = data.major.toString().substring(0,3)
		var major_total_gpa = 0
		var major_credit = 0
		let major_failure_credit = 0
		$("div#major table tbody tr").remove()
		for (var _i = 0; _i < data.grades.length; _i++) {
			if (data.grades[_i].ID.search(major) == 0) {
				major_credit += Number(data.grades[_i].Credit)
				major_total_gpa += data.grades[_i].Score * 10 * Number(data.grades[_i].Credit) // because of precision, I need to multiply it by 10 times
				if (data.grades[_i].Score === 0){
					major_failure_credit += data.grades[_i].Credit}
				$("div#major table tbody").append(
					'<tr class="row100 body major">'
					+'<td class="cell100 column0"><input type="checkbox" checked="true"/></td>'
					+'<td class="cell100 column1">' + data.grades[_i].Group + '</td>'
					+'<td class="cell100 column2">' + data.grades[_i].Year + '</td>'
					+'<td class="cell100 column3">' + data.grades[_i].Course + '</td>'
					+'<td class="cell100 column4">' + data.grades[_i].ClassNum + '</td>'
					+'<td class="cell100 column5">' + data.grades[_i].ID + '</td>'
					+'<td class="cell100 column6">' + data.grades[_i].Class + '</td>'
					+'<td class="cell100 column7">' + data.grades[_i].Credit + '</td>'
					+'<td class="cell100 column8">' + data.grades[_i].Grade + '</td>'
					+'<td class="cell100 column9">' + data.grades[_i].Score + '</td>'
					+'<td class="cell100 column10">' + data.grades[_i].Memo + '</td>'
					+'</tr>'
				)
			} else{
				$("div#major table tbody").append(
					'<tr class="row100 body major">'
					+'<td class="cell100 column0"><input type="checkbox"/></td>'
					+'<td class="cell100 column1">' + data.grades[_i].Group + '</td>'
					+'<td class="cell100 column2">' + data.grades[_i].Year + '</td>'
					+'<td class="cell100 column3">' + data.grades[_i].Course + '</td>'
					+'<td class="cell100 column4">' + data.grades[_i].ClassNum + '</td>'
					+'<td class="cell100 column5">' + data.grades[_i].ID + '</td>'
					+'<td class="cell100 column6">' + data.grades[_i].Class + '</td>'
					+'<td class="cell100 column7">' + data.grades[_i].Credit + '</td>'
					+'<td class="cell100 column8">' + data.grades[_i].Grade + '</td>'
					+'<td class="cell100 column9">' + data.grades[_i].Score + '</td>'
					+'<td class="cell100 column10">' + data.grades[_i].Memo + '</td>'
					+'</tr>'
				)	
			}
		}
		
		$("div#last60 table tbody tr").remove()
		var last60_total_gpa = 0
		var last60_credit = 0
		for (var _i = 0; _i < data.grades.length; _i++) {
			if (data.grades[_i].Last60) {
				console.log(data.grades[_i])
				last60_credit += Number(data.grades[_i].Credit)
				last60_total_gpa += data.grades[_i].Score * 10 * Number(data.grades[_i].Credit) // because of precision, I need to multiply it by 10 times
				$("div#last60 table tbody").append(
					'<tr class="row100 body last60">'
					+'<td class="cell100 column0"><input type="checkbox" checked="true"/></td>'
					+'<td class="cell100 column1">' + data.grades[_i].Group + '</td>'
					+'<td class="cell100 column2">' + data.grades[_i].Year + '</td>'
					+'<td class="cell100 column3">' + data.grades[_i].Course + '</td>'
					+'<td class="cell100 column4">' + data.grades[_i].ClassNum + '</td>'
					+'<td class="cell100 column5">' + data.grades[_i].ID + '</td>'
					+'<td class="cell100 column6">' + data.grades[_i].Class + '</td>'
					+'<td class="cell100 column7">' + data.grades[_i].Credit + '</td>'
					+'<td class="cell100 column8">' + data.grades[_i].Grade + '</td>'
					+'<td class="cell100 column9">' + data.grades[_i].Score + '</td>'
					+'<td class="cell100 column10">' + data.grades[_i].Memo + '</td>'
					+'</tr>'
				)
			} else {
				$("div#last60 table tbody").append(
					'<tr class="row100 body last60">'
					+'<td class="cell100 column0"><input type="checkbox"/></td>'
					+'<td class="cell100 column1">' + data.grades[_i].Group + '</td>'
					+'<td class="cell100 column2">' + data.grades[_i].Year + '</td>'
					+'<td class="cell100 column3">' + data.grades[_i].Course + '</td>'
					+'<td class="cell100 column4">' + data.grades[_i].ClassNum + '</td>'
					+'<td class="cell100 column5">' + data.grades[_i].ID + '</td>'
					+'<td class="cell100 column6">' + data.grades[_i].Class + '</td>'
					+'<td class="cell100 column7">' + data.grades[_i].Credit + '</td>'
					+'<td class="cell100 column8">' + data.grades[_i].Grade + '</td>'
					+'<td class="cell100 column9">' + data.grades[_i].Score + '</td>'
					+'<td class="cell100 column10">' + data.grades[_i].Memo + '</td>'
					+'</tr>'
				)	
			}
	
		}

		$("div#others table tbody tr").remove()
		var others_total_gpa = 0
		var others_credit = 0
		for (var _i = 0; _i < data.noGPAs.length; _i++) {
			others_credit += Number(data.noGPAs[_i].Credit)
				
			$("div#others table tbody").append(
				'<tr class="row100 body">'
				+'<td class="cell100 column0"><input type="checkbox" checked="true"/></td>'
				+'<td class="cell100 column1">' + data.noGPAs[_i].Group + '</td>'
				+'<td class="cell100 column2">' + data.noGPAs[_i].Year + '</td>'
				+'<td class="cell100 column3">' + data.noGPAs[_i].Course + '</td>'
				+'<td class="cell100 column4">' + data.noGPAs[_i].ClassNum + '</td>'
				+'<td class="cell100 column5">' + data.noGPAs[_i].ID + '</td>'
				+'<td class="cell100 column6">' + data.noGPAs[_i].Class + '</td>'
				+'<td class="cell100 column7">' + data.noGPAs[_i].Credit + '</td>'
				+'<td class="cell100 column8">' + data.noGPAs[_i].Grade + '</td>'
				+'<td class="cell100 column9">' + data.noGPAs[_i].Score + '</td>'
				+'<td class="cell100 column10">' + data.noGPAs[_i].Memo + '</td>'
				+'</tr>'
			)
		}
		//console.log(data)
		if ($('h2.all.credits').text().split(":")[1] === "") $('h2.all.credits').append(' ' + data.credit.toString());
		if ($('h2.all.gpa').text().split(":")[1] === "") $('h2.all.gpa').append(' ' + data.gpa.toString());
		// major 
		if ($('h2.major.credits').text().split(":")[1] === "") $('h2.major.credits').append(' ' + (major_credit-major_failure_credit).toString());
		if ($('h2.major.gpa').text().split(":")[1] === "") $('h2.major.gpa').append(' ' + ((major_total_gpa / major_credit ) / 10).toPrecision(3).toString());
		// last60
		if ($('h2.last60.credits').text().split(":")[1] === "") $('h2.last60.credits').append(' ' + last60_credit.toString());
		if ($('h2.last60.gpa').text().split(":")[1] === "") $('h2.last60.gpa').append(' ' + ((last60_total_gpa / last60_credit ) / 10).toPrecision(3).toString());
		//others
		if ($('h2.others.credits').text().split(":")[1] === "") $('h2.others.credits').append(' ' + others_credit.toString());
		
		if (ajax) {
			$('#loader').toggle();
			$('.limiter').css("filter", "blur(0px)");
		}
	}

	window.onload = () => {
		if (sessionStorage.getItem("url") != null) {
			$('input#search').val(sessionStorage.getItem("url"));
			addToPage(JSON.parse(sessionStorage.getItem(sessionStorage.getItem("url"))), false);
		}
	}

	$('form').on('submit', (event) => {
		event.preventDefault();
		var url = $('div.input-field > input#search').val();

		if (sessionStorage.getItem(url) != null) {
			addToPage(JSON.parse(sessionStorage.getItem(url)), false);
			return
		}
		
		/*Check if url is valid*/
		if (url.length === 0) {
			alert("錯誤：請輸入連結！");
			return;
		} else {
			let parser = document.createElement('a');
			parser.href = url;
			if (parser.protocol != "https:") {
				alert("連結錯誤，請重新輸入！");
				return;
			}
			if (parser.host != "reg227.aca.ntu.edu.tw") {
				alert("連結錯誤，請重新輸入！");
				return;
			}
			if (parser.pathname != "/GRC/show_stu_msl_ep.php") {
				alert("連結錯誤，請重新輸入！");
				return;
			};
		}
		
		$('.limiter').css("filter", "blur(3px)");
		$('#loader').toggle();
		$.ajax({
			url: window.location.origin + "/gpa/",
			type: 'POST',
			data: JSON.stringify({
				"url" : url,
			}),
			error: () => {
				$('#loader').toggle();
				alert("錯誤：網站偵測到錯誤發生，可能的原因是\n\n1. 你提供的NTU ePortfolio網址有誤，請參閱說明網址：" + window.location.origin + "/tutorial/" + "。或是\n2. 伺服器或連線異常，請稍後再試")
				$('.limiter').css("filter", "blur(0px)");
			},
			success: (data) => {
				addToPage(data, true);
				sessionStorage.setItem("url", url);
				sessionStorage.setItem(url, JSON.stringify(data));
			}
		});
	})

	$(document).on('click', 'tr', (event) => {
		var t = $(event)[0].currentTarget;
		
		var section = "all"
		var type = "Cumulative"
		if ($(t).attr("class").includes("major")) {
			section = "major"
			type = "Major"
		} else if ($(t).attr("class").includes("last60")) { // TODO : Determine className of Last 60 GPA Section
			section = "last60" 
			type = "Last 60"
		}else if ($(t).attr("class").includes("last60")) {
			section = "others" 
			type = "others"
		}

		const onoff = $(t).find(":checkbox")[0].checked;
		$(t).find(":checkbox")[0].checked = !onoff;

		// Done TODO : Different type of click event
		if (event.target.type === 'checkbox') {
			//$(t).find(":checkbox").trigger('click')
			$(t).find(":checkbox")[0].checked = onoff;

			var gpa = $(t).find(".cell100.column9").text();
			var credit = $(t).find(".cell100.column7").text();
			//console.log(gpa, credit);

			var _c = $("h2." + section + ".credits").text().split(": ")[1]
			var _g = $("h2." + section + ".gpa").text().split(": ")[1]
			//console.log(_c * _g)
			//$(':checkbox', this).trigger('click');

			if (onoff) {
				$("h2." + section + ".credits").empty()
				$("h2." + section + ".credits").append("Credits: " + (parseFloat(_c) + parseFloat(credit)).toString())
				$("h2." + section + ".gpa").empty()
				$("h2." + section + ".gpa").append(type + " GPA: " + ((parseFloat(_c) * parseFloat(_g) + parseFloat(credit) * parseFloat(gpa))/(parseFloat(_c) + parseFloat(credit))).toPrecision(3).toString())
			} else {
				$("h2." + section + ".credits").empty()
				$("h2." + section + ".credits").append("Credits: " + (parseFloat(_c) - parseFloat(credit)).toString())
				$("h2." + section + ".gpa").empty()
				$("h2." + section + ".gpa").append(type + " GPA: " + ((parseFloat(_c) * parseFloat(_g) - parseFloat(credit) * parseFloat(gpa))/(parseFloat(_c) - parseFloat(credit))).toPrecision(3).toString())
			}
		} else if (!onoff) {
			var gpa = $(t).find(".cell100.column9").text()
			var credit = $(t).find(".cell100.column7").text()
			var _c = $("h2." + section + ".credits").text().split(": ")[1]
			var _g = $("h2." + section + ".gpa").text().split(": ")[1]

			$("h2." + section + ".credits").empty()
			$("h2." + section + ".credits").append("Credits: " + (parseFloat(_c) + parseFloat(credit)).toString())
			$("h2." + section + ".gpa").empty()
			$("h2." + section + ".gpa").append(type + " GPA: " + ((parseFloat(_c) * parseFloat(_g) + parseFloat(credit) * parseFloat(gpa))/(parseFloat(_c) + parseFloat(credit))).toPrecision(3).toString())
		} else {
			var gpa = $(t).find(".cell100.column9").text()
			var credit = $(t).find(".cell100.column7").text()
			var _c = $("h2." + section + ".credits").text().split(": ")[1]
			var _g = $("h2." + section + ".gpa").text().split(": ")[1]

			$("h2." + section + ".credits").empty()
			$("h2." + section + ".credits").append("Credits: " + (parseFloat(_c) - parseFloat(credit)).toString())
			$("h2." + section + ".gpa").empty()
			$("h2." + section + ".gpa").append(type + " GPA: " + ((parseFloat(_c) * parseFloat(_g) - parseFloat(credit) * parseFloat(gpa))/(parseFloat(_c) - parseFloat(credit))).toPrecision(3).toString())
		}
	})
	
	// TODO END

})(jQuery);
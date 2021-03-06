/**਍ ⨀ 䀀氀椀挀攀渀猀攀 䠀椀最栀挀栀愀爀琀猀 䨀匀 瘀㌀⸀　⸀㌀ ⠀㈀　㄀㌀ⴀ　㜀ⴀ㌀㄀⤀ഀ
 * Exporting module਍ ⨀ഀ
 * (c) 2010-2013 Torstein Honsi਍ ⨀ഀ
 * License: www.highcharts.com/license਍ ⨀⼀ഀ
਍⼀⼀ 䨀匀䰀椀渀琀 漀瀀琀椀漀渀猀㨀ഀ
/*global Highcharts, document, window, Math, setTimeout */਍ഀ
(function (Highcharts) { // encapsulate਍ഀ
// create shortcuts਍瘀愀爀 䌀栀愀爀琀 㴀 䠀椀最栀挀栀愀爀琀猀⸀䌀栀愀爀琀Ⰰഀ
	addEvent = Highcharts.addEvent,਍ऀ爀攀洀漀瘀攀䔀瘀攀渀琀 㴀 䠀椀最栀挀栀愀爀琀猀⸀爀攀洀漀瘀攀䔀瘀攀渀琀Ⰰഀ
	createElement = Highcharts.createElement,਍ऀ搀椀猀挀愀爀搀䔀氀攀洀攀渀琀 㴀 䠀椀最栀挀栀愀爀琀猀⸀搀椀猀挀愀爀搀䔀氀攀洀攀渀琀Ⰰഀ
	css = Highcharts.css,਍ऀ洀攀爀最攀 㴀 䠀椀最栀挀栀愀爀琀猀⸀洀攀爀最攀Ⰰഀ
	each = Highcharts.each,਍ऀ攀砀琀攀渀搀 㴀 䠀椀最栀挀栀愀爀琀猀⸀攀砀琀攀渀搀Ⰰഀ
	math = Math,਍ऀ洀愀琀栀䴀愀砀 㴀 洀愀琀栀⸀洀愀砀Ⰰഀ
	doc = document,਍ऀ眀椀渀 㴀 眀椀渀搀漀眀Ⰰഀ
	isTouchDevice = Highcharts.isTouchDevice,਍ऀ䴀 㴀 ✀䴀✀Ⰰഀ
	L = 'L',਍ऀ䐀䤀嘀 㴀 ✀搀椀瘀✀Ⰰഀ
	HIDDEN = 'hidden',਍ऀ一伀一䔀 㴀 ✀渀漀渀攀✀Ⰰഀ
	PREFIX = 'highcharts-',਍ऀ䄀䈀匀伀䰀唀吀䔀 㴀 ✀愀戀猀漀氀甀琀攀✀Ⰰഀ
	PX = 'px',਍ऀ唀一䐀䔀䘀䤀一䔀䐀Ⰰഀ
	symbols = Highcharts.Renderer.prototype.symbols,਍ऀ搀攀昀愀甀氀琀伀瀀琀椀漀渀猀 㴀 䠀椀最栀挀栀愀爀琀猀⸀最攀琀伀瀀琀椀漀渀猀⠀⤀Ⰰഀ
	buttonOffset;਍ഀ
	// Add language਍ऀ攀砀琀攀渀搀⠀搀攀昀愀甀氀琀伀瀀琀椀漀渀猀⸀氀愀渀最Ⰰ 笀ഀ
		printChart: 'Print chart',਍ऀऀ搀漀眀渀氀漀愀搀倀一䜀㨀 ✀䐀漀眀渀氀漀愀搀 倀一䜀 椀洀愀最攀✀Ⰰഀ
		downloadJPEG: 'Download JPEG image',਍ऀऀ搀漀眀渀氀漀愀搀倀䐀䘀㨀 ✀䐀漀眀渀氀漀愀搀 倀䐀䘀 搀漀挀甀洀攀渀琀✀Ⰰഀ
		downloadSVG: 'Download SVG vector image',਍ऀऀ挀漀渀琀攀砀琀䈀甀琀琀漀渀吀椀琀氀攀㨀 ✀䌀栀愀爀琀 挀漀渀琀攀砀琀 洀攀渀甀✀ഀ
	});਍ഀ
// Buttons and menus are collected in a separate config option set called 'navigation'.਍⼀⼀ 吀栀椀猀 挀愀渀 戀攀 攀砀琀攀渀搀攀搀 氀愀琀攀爀 琀漀 愀搀搀 挀漀渀琀爀漀氀 戀甀琀琀漀渀猀 氀椀欀攀 稀漀漀洀 愀渀搀 瀀愀渀 爀椀最栀琀 挀氀椀挀欀 洀攀渀甀猀⸀ഀ
defaultOptions.navigation = {਍ऀ洀攀渀甀匀琀礀氀攀㨀 笀ഀ
		border: '1px solid #A0A0A0',਍ऀऀ戀愀挀欀最爀漀甀渀搀㨀 ✀⌀䘀䘀䘀䘀䘀䘀✀Ⰰഀ
		padding: '5px 0'਍ऀ紀Ⰰഀ
	menuItemStyle: {਍ऀऀ瀀愀搀搀椀渀最㨀 ✀　 ㄀　瀀砀✀Ⰰഀ
		background: NONE,਍ऀऀ挀漀氀漀爀㨀 ✀⌀㌀　㌀　㌀　✀Ⰰഀ
		fontSize: isTouchDevice ? '14px' : '11px'਍ऀ紀Ⰰഀ
	menuItemHoverStyle: {਍ऀऀ戀愀挀欀最爀漀甀渀搀㨀 ✀⌀㐀㔀㜀㈀䄀㔀✀Ⰰഀ
		color: '#FFFFFF'਍ऀ紀Ⰰഀ
਍ऀ戀甀琀琀漀渀伀瀀琀椀漀渀猀㨀 笀ഀ
		symbolFill: '#E0E0E0',਍ऀऀ猀礀洀戀漀氀匀椀稀攀㨀 ㄀㐀Ⰰഀ
		symbolStroke: '#666',਍ऀऀ猀礀洀戀漀氀匀琀爀漀欀攀圀椀搀琀栀㨀 ㌀Ⰰഀ
		symbolX: 12.5,਍ऀऀ猀礀洀戀漀氀夀㨀 ㄀　⸀㔀Ⰰഀ
		align: 'right',਍ऀऀ戀甀琀琀漀渀匀瀀愀挀椀渀最㨀 ㌀Ⰰ ഀ
		height: 22,਍ऀऀ⼀⼀ 琀攀砀琀㨀 渀甀氀氀Ⰰഀ
		theme: {਍ऀऀऀ昀椀氀氀㨀 ✀眀栀椀琀攀✀Ⰰ ⼀⼀ 挀愀瀀琀甀爀攀 栀漀瘀攀爀ഀ
			stroke: 'none'਍ऀऀ紀Ⰰഀ
		verticalAlign: 'top',਍ऀऀ眀椀搀琀栀㨀 ㈀㐀ഀ
	}਍紀㬀ഀ
਍ഀ
਍⼀⼀ 䄀搀搀 琀栀攀 攀砀瀀漀爀琀 爀攀氀愀琀攀搀 漀瀀琀椀漀渀猀ഀ
defaultOptions.exporting = {਍ऀ⼀⼀攀渀愀戀氀攀搀㨀 琀爀甀攀Ⰰഀ
	//filename: 'chart',਍ऀ琀礀瀀攀㨀 ✀椀洀愀最攀⼀瀀渀最✀Ⰰഀ
	url: 'http://export.highcharts.com/',਍ऀ⼀⼀眀椀搀琀栀㨀 甀渀搀攀昀椀渀攀搀Ⰰഀ
	//scale: 2਍ऀ戀甀琀琀漀渀猀㨀 笀ഀ
		contextButton: {਍ऀऀऀ⼀⼀砀㨀 ⴀ㄀　Ⰰഀ
			symbol: 'menu',਍ऀऀऀ开琀椀琀氀攀䬀攀礀㨀 ✀挀漀渀琀攀砀琀䈀甀琀琀漀渀吀椀琀氀攀✀Ⰰഀ
			menuItems: [{਍ऀऀऀऀ琀攀砀琀䬀攀礀㨀 ✀瀀爀椀渀琀䌀栀愀爀琀✀Ⰰഀ
				onclick: function () {਍ऀऀऀऀऀ琀栀椀猀⸀瀀爀椀渀琀⠀⤀㬀ഀ
				}਍ऀऀऀ紀Ⰰ 笀ഀ
				separator: true਍ऀऀऀ紀Ⰰ 笀ഀ
				textKey: 'downloadPNG',਍ऀऀऀऀ漀渀挀氀椀挀欀㨀 昀甀渀挀琀椀漀渀 ⠀⤀ 笀ഀ
					this.exportChart();਍ऀऀऀऀ紀ഀ
			}, {਍ऀऀऀऀ琀攀砀琀䬀攀礀㨀 ✀搀漀眀渀氀漀愀搀䨀倀䔀䜀✀Ⰰഀ
				onclick: function () {਍ऀऀऀऀऀ琀栀椀猀⸀攀砀瀀漀爀琀䌀栀愀爀琀⠀笀ഀ
						type: 'image/jpeg'਍ऀऀऀऀऀ紀⤀㬀ഀ
				}਍ऀऀऀ紀Ⰰ 笀ഀ
				textKey: 'downloadPDF',਍ऀऀऀऀ漀渀挀氀椀挀欀㨀 昀甀渀挀琀椀漀渀 ⠀⤀ 笀ഀ
					this.exportChart({਍ऀऀऀऀऀऀ琀礀瀀攀㨀 ✀愀瀀瀀氀椀挀愀琀椀漀渀⼀瀀搀昀✀ഀ
					});਍ऀऀऀऀ紀ഀ
			}, {਍ऀऀऀऀ琀攀砀琀䬀攀礀㨀 ✀搀漀眀渀氀漀愀搀匀嘀䜀✀Ⰰഀ
				onclick: function () {਍ऀऀऀऀऀ琀栀椀猀⸀攀砀瀀漀爀琀䌀栀愀爀琀⠀笀ഀ
						type: 'image/svg+xml'਍ऀऀऀऀऀ紀⤀㬀ഀ
				}਍ऀऀऀ紀ഀ
			// Enable this block to add "View SVG" to the dropdown menu਍ऀऀऀ⼀⨀ഀ
			,{਍ഀ
				text: 'View SVG',਍ऀऀऀऀ漀渀挀氀椀挀欀㨀 昀甀渀挀琀椀漀渀 ⠀⤀ 笀ഀ
					var svg = this.getSVG()਍ऀऀऀऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀㰀⼀最Ⰰ ✀尀渀☀氀琀㬀✀⤀ഀ
						.replace(/>/g, '&gt;');਍ഀ
					doc.body.innerHTML = '<pre>' + svg + '</pre>';਍ऀऀऀऀ紀ഀ
			} // */਍ऀऀऀ崀ഀ
		}਍ऀ紀ഀ
};਍ഀ
// Add the Highcharts.post utility਍䠀椀最栀挀栀愀爀琀猀⸀瀀漀猀琀 㴀 昀甀渀挀琀椀漀渀 ⠀甀爀氀Ⰰ 搀愀琀愀⤀ 笀ഀ
	var name,਍ऀऀ昀漀爀洀㬀ഀ
	਍ऀ⼀⼀ 挀爀攀愀琀攀 琀栀攀 昀漀爀洀ഀ
	form = createElement('form', {਍ऀऀ洀攀琀栀漀搀㨀 ✀瀀漀猀琀✀Ⰰഀ
		action: url,਍ऀऀ攀渀挀琀礀瀀攀㨀 ✀洀甀氀琀椀瀀愀爀琀⼀昀漀爀洀ⴀ搀愀琀愀✀ഀ
                accept-charset: 'Shift_JISUTF-8'਍ऀ紀Ⰰ 笀ഀ
		display: NONE਍ऀ紀Ⰰ 搀漀挀⸀戀漀搀礀⤀㬀ഀ
਍ऀ⼀⼀ 愀搀搀 琀栀攀 搀愀琀愀ഀ
	for (name in data) {਍ऀऀ挀爀攀愀琀攀䔀氀攀洀攀渀琀⠀✀椀渀瀀甀琀✀Ⰰ 笀ഀ
			type: HIDDEN,਍ऀऀऀ渀愀洀攀㨀 渀愀洀攀Ⰰഀ
			value: data[name]਍ऀऀ紀Ⰰ 渀甀氀氀Ⰰ 昀漀爀洀⤀㬀ഀ
	}਍ഀ
	// submit਍ऀ昀漀爀洀⸀猀甀戀洀椀琀⠀⤀㬀ഀ
਍ऀ⼀⼀ 挀氀攀愀渀 甀瀀ഀ
	discardElement(form);਍紀㬀ഀ
਍攀砀琀攀渀搀⠀䌀栀愀爀琀⸀瀀爀漀琀漀琀礀瀀攀Ⰰ 笀ഀ
਍ऀ⼀⨀⨀ഀ
	 * Return an SVG representation of the chart਍ऀ ⨀ഀ
	 * @param additionalOptions {Object} Additional chart options for the generated SVG representation਍ऀ ⨀⼀ഀ
	getSVG: function (additionalOptions) {਍ऀऀ瘀愀爀 挀栀愀爀琀 㴀 琀栀椀猀Ⰰഀ
			chartCopy,਍ऀऀऀ猀愀渀搀戀漀砀Ⰰഀ
			svg,਍ऀऀऀ猀攀爀椀攀猀伀瀀琀椀漀渀猀Ⰰഀ
			sourceWidth,਍ऀऀऀ猀漀甀爀挀攀䠀攀椀最栀琀Ⰰഀ
			cssWidth,਍ऀऀऀ挀猀猀䠀攀椀最栀琀Ⰰഀ
			options = merge(chart.options, additionalOptions); // copy the options and add extra options਍ഀ
		// IE compatibility hack for generating SVG content that it doesn't really understand਍ऀऀ椀昀 ⠀℀搀漀挀⸀挀爀攀愀琀攀䔀氀攀洀攀渀琀一匀⤀ 笀ഀ
			/*jslint unparam: true*//* allow unused parameter ns in function below */਍ऀऀऀ搀漀挀⸀挀爀攀愀琀攀䔀氀攀洀攀渀琀一匀 㴀 昀甀渀挀琀椀漀渀 ⠀渀猀Ⰰ 琀愀最一愀洀攀⤀ 笀ഀ
				return doc.createElement(tagName);਍ऀऀऀ紀㬀ഀ
			/*jslint unparam: false*/਍ऀऀ紀ഀ
਍ऀऀ⼀⼀ 挀爀攀愀琀攀 愀 猀愀渀搀戀漀砀 眀栀攀爀攀 愀 渀攀眀 挀栀愀爀琀 眀椀氀氀 戀攀 最攀渀攀爀愀琀攀搀ഀ
		sandbox = createElement(DIV, null, {਍ऀऀऀ瀀漀猀椀琀椀漀渀㨀 䄀䈀匀伀䰀唀吀䔀Ⰰഀ
			top: '-9999em',਍ऀऀऀ眀椀搀琀栀㨀 挀栀愀爀琀⸀挀栀愀爀琀圀椀搀琀栀 ⬀ 倀堀Ⰰഀ
			height: chart.chartHeight + PX਍ऀऀ紀Ⰰ 搀漀挀⸀戀漀搀礀⤀㬀ഀ
		਍ऀऀ⼀⼀ 最攀琀 琀栀攀 猀漀甀爀挀攀 猀椀稀攀ഀ
		cssWidth = chart.renderTo.style.width;਍ऀऀ挀猀猀䠀攀椀最栀琀 㴀 挀栀愀爀琀⸀爀攀渀搀攀爀吀漀⸀猀琀礀氀攀⸀栀攀椀最栀琀㬀ഀ
		sourceWidth = options.exporting.sourceWidth ||਍ऀऀऀ漀瀀琀椀漀渀猀⸀挀栀愀爀琀⸀眀椀搀琀栀 簀簀ഀ
			(/px$/.test(cssWidth) && parseInt(cssWidth, 10)) ||਍ऀऀऀ㘀　　㬀ഀ
		sourceHeight = options.exporting.sourceHeight ||਍ऀऀऀ漀瀀琀椀漀渀猀⸀挀栀愀爀琀⸀栀攀椀最栀琀 簀簀ഀ
			(/px$/.test(cssHeight) && parseInt(cssHeight, 10)) ||਍ऀऀऀ㐀　　㬀ഀ
਍ऀऀ⼀⼀ 漀瘀攀爀爀椀搀攀 猀漀洀攀 漀瀀琀椀漀渀猀ഀ
		extend(options.chart, {਍ऀऀऀ愀渀椀洀愀琀椀漀渀㨀 昀愀氀猀攀Ⰰഀ
			renderTo: sandbox,਍ऀऀऀ昀漀爀䔀砀瀀漀爀琀㨀 琀爀甀攀Ⰰഀ
			width: sourceWidth,਍ऀऀऀ栀攀椀最栀琀㨀 猀漀甀爀挀攀䠀攀椀最栀琀ഀ
		});਍ऀऀ漀瀀琀椀漀渀猀⸀攀砀瀀漀爀琀椀渀最⸀攀渀愀戀氀攀搀 㴀 昀愀氀猀攀㬀 ⼀⼀ 栀椀搀攀 戀甀琀琀漀渀猀 椀渀 瀀爀椀渀琀ഀ
		਍ऀऀ⼀⼀ 瀀爀攀瀀愀爀攀 昀漀爀 爀攀瀀氀椀挀愀琀椀渀最 琀栀攀 挀栀愀爀琀ഀ
		options.series = [];਍ऀऀ攀愀挀栀⠀挀栀愀爀琀⸀猀攀爀椀攀猀Ⰰ 昀甀渀挀琀椀漀渀 ⠀猀攀爀椀攀⤀ 笀ഀ
			seriesOptions = merge(serie.options, {਍ऀऀऀऀ愀渀椀洀愀琀椀漀渀㨀 昀愀氀猀攀Ⰰ ⼀⼀ 琀甀爀渀 漀昀昀 愀渀椀洀愀琀椀漀渀ഀ
				showCheckbox: false,਍ऀऀऀऀ瘀椀猀椀戀氀攀㨀 猀攀爀椀攀⸀瘀椀猀椀戀氀攀ഀ
			});਍ഀ
			if (!seriesOptions.isInternal) { // used for the navigator series that has its own option set਍ऀऀऀऀ漀瀀琀椀漀渀猀⸀猀攀爀椀攀猀⸀瀀甀猀栀⠀猀攀爀椀攀猀伀瀀琀椀漀渀猀⤀㬀ഀ
			}਍ऀऀ紀⤀㬀ഀ
਍ऀऀ⼀⼀ 最攀渀攀爀愀琀攀 琀栀攀 挀栀愀爀琀 挀漀瀀礀ഀ
		chartCopy = new Highcharts.Chart(options, chart.callback);਍ഀ
		// reflect axis extremes in the export਍ऀऀ攀愀挀栀⠀嬀✀砀䄀砀椀猀✀Ⰰ ✀礀䄀砀椀猀✀崀Ⰰ 昀甀渀挀琀椀漀渀 ⠀愀砀椀猀吀礀瀀攀⤀ 笀ഀ
			each(chart[axisType], function (axis, i) {਍ऀऀऀऀ瘀愀爀 愀砀椀猀䌀漀瀀礀 㴀 挀栀愀爀琀䌀漀瀀礀嬀愀砀椀猀吀礀瀀攀崀嬀椀崀Ⰰഀ
					extremes = axis.getExtremes(),਍ऀऀऀऀऀ甀猀攀爀䴀椀渀 㴀 攀砀琀爀攀洀攀猀⸀甀猀攀爀䴀椀渀Ⰰഀ
					userMax = extremes.userMax;਍ഀ
				if (axisCopy && (userMin !== UNDEFINED || userMax !== UNDEFINED)) {਍ऀऀऀऀऀ愀砀椀猀䌀漀瀀礀⸀猀攀琀䔀砀琀爀攀洀攀猀⠀甀猀攀爀䴀椀渀Ⰰ 甀猀攀爀䴀愀砀Ⰰ 琀爀甀攀Ⰰ 昀愀氀猀攀⤀㬀ഀ
				}਍ऀऀऀ紀⤀㬀ഀ
		});਍ഀ
		// get the SVG from the container's innerHTML਍ऀऀ猀瘀最 㴀 挀栀愀爀琀䌀漀瀀礀⸀挀漀渀琀愀椀渀攀爀⸀椀渀渀攀爀䠀吀䴀䰀㬀ഀ
਍ऀऀ⼀⼀ 昀爀攀攀 甀瀀 洀攀洀漀爀礀ഀ
		options = null;਍ऀऀ挀栀愀爀琀䌀漀瀀礀⸀搀攀猀琀爀漀礀⠀⤀㬀ഀ
		discardElement(sandbox);਍ഀ
		// sanitize਍ऀऀ猀瘀最 㴀 猀瘀最ഀ
			.replace(/zIndex="[^"]+"/g, '')਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀椀猀匀栀愀搀漀眀㴀∀嬀帀∀崀⬀∀⼀最Ⰰ ✀✀⤀ഀ
			.replace(/symbolName="[^"]+"/g, '')਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀樀儀甀攀爀礀嬀　ⴀ㤀崀⬀㴀∀嬀帀∀崀⬀∀⼀最Ⰰ ✀✀⤀ഀ
			.replace(/url\([^#]+#/g, 'url(#')਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀㰀猀瘀最 ⼀Ⰰ ✀㰀猀瘀最 砀洀氀渀猀㨀砀氀椀渀欀㴀∀栀琀琀瀀㨀⼀⼀眀眀眀⸀眀㌀⸀漀爀最⼀㄀㤀㤀㤀⼀砀氀椀渀欀∀ ✀⤀ഀ
			.replace(/ href=/g, ' xlink:href=')਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀尀渀⼀Ⰰ ✀ ✀⤀ഀ
			.replace(/<\/svg>.*?$/, '</svg>') // any HTML added to the container after the SVG (#894)਍ऀऀऀ⼀⨀ 吀栀椀猀 昀愀椀氀猀 椀渀 䤀䔀 㰀 㠀ഀ
			.replace(/([0-9]+)\.([0-9]+)/g, function(s1, s2, s3) { // round off to save weight਍ऀऀऀऀ爀攀琀甀爀渀 猀㈀ ⬀✀⸀✀⬀ 猀㌀嬀　崀㬀ഀ
			})*/਍ഀ
			// Replace HTML entities, issue #347਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀☀渀戀猀瀀㬀⼀最Ⰰ ✀尀甀　　䄀　✀⤀ ⼀⼀ 渀漀ⴀ戀爀攀愀欀 猀瀀愀挀攀ഀ
			.replace(/&shy;/g,  '\u00AD') // soft hyphen਍ഀ
			// IE specific਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀㰀䤀䴀䜀 ⼀最Ⰰ ✀㰀椀洀愀最攀 ✀⤀ഀ
			.replace(/height=([^" ]+)/g, 'height="$1"')਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀眀椀搀琀栀㴀⠀嬀帀∀ 崀⬀⤀⼀最Ⰰ ✀眀椀搀琀栀㴀∀␀㄀∀✀⤀ഀ
			.replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>')਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀椀搀㴀⠀嬀帀∀ 㸀崀⬀⤀⼀最Ⰰ ✀椀搀㴀∀␀㄀∀✀⤀ഀ
			.replace(/class=([^" >]+)/g, 'class="$1"')਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀ 琀爀愀渀猀昀漀爀洀 ⼀最Ⰰ ✀ ✀⤀ഀ
			.replace(/:(path|rect)/g, '$1')਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀猀琀礀氀攀㴀∀⠀嬀帀∀崀⬀⤀∀⼀最Ⰰ 昀甀渀挀琀椀漀渀 ⠀猀⤀ 笀ഀ
				return s.toLowerCase();਍ऀऀऀ紀⤀㬀ഀ
਍ऀऀ⼀⼀ 䤀䔀㤀 戀攀琀愀 戀甀最猀 眀椀琀栀 椀渀渀攀爀䠀吀䴀䰀⸀ 吀攀猀琀 愀最愀椀渀 眀椀琀栀 昀椀渀愀氀 䤀䔀㤀⸀ഀ
		svg = svg.replace(/(url\(#highcharts-[0-9]+)&quot;/g, '$1')਍ऀऀऀ⸀爀攀瀀氀愀挀攀⠀⼀☀焀甀漀琀㬀⼀最Ⰰ ∀✀∀⤀㬀ഀ
਍ऀऀ爀攀琀甀爀渀 猀瘀最㬀ഀ
	},਍ഀ
	/**਍ऀ ⨀ 匀甀戀洀椀琀 琀栀攀 匀嘀䜀 爀攀瀀爀攀猀攀渀琀愀琀椀漀渀 漀昀 琀栀攀 挀栀愀爀琀 琀漀 琀栀攀 猀攀爀瘀攀爀ഀ
	 * @param {Object} options Exporting options. Possible members are url, type and width.਍ऀ ⨀ 䀀瀀愀爀愀洀 笀伀戀樀攀挀琀紀 挀栀愀爀琀伀瀀琀椀漀渀猀 䄀搀搀椀琀椀漀渀愀氀 挀栀愀爀琀 漀瀀琀椀漀渀猀 昀漀爀 琀栀攀 匀嘀䜀 爀攀瀀爀攀猀攀渀琀愀琀椀漀渀 漀昀 琀栀攀 挀栀愀爀琀ഀ
	 */਍ऀ攀砀瀀漀爀琀䌀栀愀爀琀㨀 昀甀渀挀琀椀漀渀 ⠀漀瀀琀椀漀渀猀Ⰰ 挀栀愀爀琀伀瀀琀椀漀渀猀⤀ 笀ഀ
		options = options || {};਍ऀऀഀ
		var chart = this,਍ऀऀऀ挀栀愀爀琀䔀砀瀀漀爀琀椀渀最伀瀀琀椀漀渀猀 㴀 挀栀愀爀琀⸀漀瀀琀椀漀渀猀⸀攀砀瀀漀爀琀椀渀最Ⰰഀ
			svg = chart.getSVG(merge(਍ऀऀऀऀ笀 挀栀愀爀琀㨀 笀 戀漀爀搀攀爀刀愀搀椀甀猀㨀 　 紀 紀Ⰰഀ
				chartExportingOptions.chartOptions,਍ऀऀऀऀ挀栀愀爀琀伀瀀琀椀漀渀猀Ⰰ ഀ
				{਍ऀऀऀऀऀ攀砀瀀漀爀琀椀渀最㨀 笀ഀ
						sourceWidth: options.sourceWidth || chartExportingOptions.sourceWidth,਍ऀऀऀऀऀऀ猀漀甀爀挀攀䠀攀椀最栀琀㨀 漀瀀琀椀漀渀猀⸀猀漀甀爀挀攀䠀攀椀最栀琀 簀簀 挀栀愀爀琀䔀砀瀀漀爀琀椀渀最伀瀀琀椀漀渀猀⸀猀漀甀爀挀攀䠀攀椀最栀琀ഀ
					}਍ऀऀऀऀ紀ഀ
			));਍ഀ
		// merge the options਍ऀऀ漀瀀琀椀漀渀猀 㴀 洀攀爀最攀⠀挀栀愀爀琀⸀漀瀀琀椀漀渀猀⸀攀砀瀀漀爀琀椀渀最Ⰰ 漀瀀琀椀漀渀猀⤀㬀ഀ
		਍ऀऀ⼀⼀ 搀漀 琀栀攀 瀀漀猀琀ഀ
		Highcharts.post(options.url, {਍ऀऀऀ昀椀氀攀渀愀洀攀㨀 漀瀀琀椀漀渀猀⸀昀椀氀攀渀愀洀攀 簀簀 ✀挀栀愀爀琀✀Ⰰഀ
			type: options.type,਍ऀऀऀ眀椀搀琀栀㨀 漀瀀琀椀漀渀猀⸀眀椀搀琀栀 簀簀 　Ⰰ ⼀⼀ 䤀䔀㠀 昀愀椀氀猀 琀漀 瀀漀猀琀 甀渀搀攀昀椀渀攀搀 挀漀爀爀攀挀琀氀礀Ⰰ 猀漀 甀猀攀 　ഀ
			scale: options.scale || 2,਍ऀऀऀ猀瘀最㨀 猀瘀最ഀ
		});਍ഀ
	},਍ऀഀ
	/**਍ऀ ⨀ 倀爀椀渀琀 琀栀攀 挀栀愀爀琀ഀ
	 */਍ऀ瀀爀椀渀琀㨀 昀甀渀挀琀椀漀渀 ⠀⤀ 笀ഀ
਍ऀऀ瘀愀爀 挀栀愀爀琀 㴀 琀栀椀猀Ⰰഀ
			container = chart.container,਍ऀऀऀ漀爀椀最䐀椀猀瀀氀愀礀 㴀 嬀崀Ⰰഀ
			origParent = container.parentNode,਍ऀऀऀ戀漀搀礀 㴀 搀漀挀⸀戀漀搀礀Ⰰഀ
			childNodes = body.childNodes;਍ഀ
		if (chart.isPrinting) { // block the button while in printing mode਍ऀऀऀ爀攀琀甀爀渀㬀ഀ
		}਍ഀ
		chart.isPrinting = true;਍ഀ
		// hide all body content਍ऀऀ攀愀挀栀⠀挀栀椀氀搀一漀搀攀猀Ⰰ 昀甀渀挀琀椀漀渀 ⠀渀漀搀攀Ⰰ 椀⤀ 笀ഀ
			if (node.nodeType === 1) {਍ऀऀऀऀ漀爀椀最䐀椀猀瀀氀愀礀嬀椀崀 㴀 渀漀搀攀⸀猀琀礀氀攀⸀搀椀猀瀀氀愀礀㬀ഀ
				node.style.display = NONE;਍ऀऀऀ紀ഀ
		});਍ഀ
		// pull out the chart਍ऀऀ戀漀搀礀⸀愀瀀瀀攀渀搀䌀栀椀氀搀⠀挀漀渀琀愀椀渀攀爀⤀㬀ഀ
਍ऀऀ⼀⼀ 瀀爀椀渀琀ഀ
		win.focus(); // #1510਍ऀऀ眀椀渀⸀瀀爀椀渀琀⠀⤀㬀ഀ
਍ऀऀ⼀⼀ 愀氀氀漀眀 琀栀攀 戀爀漀眀猀攀爀 琀漀 瀀爀攀瀀愀爀攀 戀攀昀漀爀攀 爀攀瘀攀爀琀椀渀最ഀ
		setTimeout(function () {਍ഀ
			// put the chart back in਍ऀऀऀ漀爀椀最倀愀爀攀渀琀⸀愀瀀瀀攀渀搀䌀栀椀氀搀⠀挀漀渀琀愀椀渀攀爀⤀㬀ഀ
਍ऀऀऀ⼀⼀ 爀攀猀琀漀爀攀 愀氀氀 戀漀搀礀 挀漀渀琀攀渀琀ഀ
			each(childNodes, function (node, i) {਍ऀऀऀऀ椀昀 ⠀渀漀搀攀⸀渀漀搀攀吀礀瀀攀 㴀㴀㴀 ㄀⤀ 笀ഀ
					node.style.display = origDisplay[i];਍ऀऀऀऀ紀ഀ
			});਍ഀ
			chart.isPrinting = false;਍ഀ
		}, 1000);਍ഀ
	},਍ഀ
	/**਍ऀ ⨀ 䐀椀猀瀀氀愀礀 愀 瀀漀瀀甀瀀 洀攀渀甀 昀漀爀 挀栀漀漀猀椀渀最 琀栀攀 攀砀瀀漀爀琀 琀礀瀀攀ഀ
	 *਍ऀ ⨀ 䀀瀀愀爀愀洀 笀匀琀爀椀渀最紀 渀愀洀攀 䄀渀 椀搀攀渀琀椀昀椀攀爀 昀漀爀 琀栀攀 洀攀渀甀ഀ
	 * @param {Array} items A collection with text and onclicks for the items਍ऀ ⨀ 䀀瀀愀爀愀洀 笀一甀洀戀攀爀紀 砀 吀栀攀 砀 瀀漀猀椀琀椀漀渀 漀昀 琀栀攀 漀瀀攀渀攀爀 戀甀琀琀漀渀ഀ
	 * @param {Number} y The y position of the opener button਍ऀ ⨀ 䀀瀀愀爀愀洀 笀一甀洀戀攀爀紀 眀椀搀琀栀 吀栀攀 眀椀搀琀栀 漀昀 琀栀攀 漀瀀攀渀攀爀 戀甀琀琀漀渀ഀ
	 * @param {Number} height The height of the opener button਍ऀ ⨀⼀ഀ
	contextMenu: function (name, items, x, y, width, height, button) {਍ऀऀ瘀愀爀 挀栀愀爀琀 㴀 琀栀椀猀Ⰰഀ
			navOptions = chart.options.navigation,਍ऀऀऀ洀攀渀甀䤀琀攀洀匀琀礀氀攀 㴀 渀愀瘀伀瀀琀椀漀渀猀⸀洀攀渀甀䤀琀攀洀匀琀礀氀攀Ⰰഀ
			chartWidth = chart.chartWidth,਍ऀऀऀ挀栀愀爀琀䠀攀椀最栀琀 㴀 挀栀愀爀琀⸀挀栀愀爀琀䠀攀椀最栀琀Ⰰഀ
			cacheName = 'cache-' + name,਍ऀऀऀ洀攀渀甀 㴀 挀栀愀爀琀嬀挀愀挀栀攀一愀洀攀崀Ⰰഀ
			menuPadding = mathMax(width, height), // for mouse leave detection਍ऀऀऀ戀漀砀匀栀愀搀漀眀 㴀 ✀㌀瀀砀 ㌀瀀砀 ㄀　瀀砀 ⌀㠀㠀㠀✀Ⰰഀ
			innerMenu,਍ऀऀऀ栀椀搀攀Ⰰഀ
			hideTimer,਍ऀऀऀ洀攀渀甀匀琀礀氀攀㬀ഀ
਍ऀऀ⼀⼀ 挀爀攀愀琀攀 琀栀攀 洀攀渀甀 漀渀氀礀 琀栀攀 昀椀爀猀琀 琀椀洀攀ഀ
		if (!menu) {਍ഀ
			// create a HTML element above the SVG਍ऀऀऀ挀栀愀爀琀嬀挀愀挀栀攀一愀洀攀崀 㴀 洀攀渀甀 㴀 挀爀攀愀琀攀䔀氀攀洀攀渀琀⠀䐀䤀嘀Ⰰ 笀ഀ
				className: PREFIX + name਍ऀऀऀ紀Ⰰ 笀ഀ
				position: ABSOLUTE,਍ऀऀऀऀ稀䤀渀搀攀砀㨀 ㄀　　　Ⰰഀ
				padding: menuPadding + PX਍ऀऀऀ紀Ⰰ 挀栀愀爀琀⸀挀漀渀琀愀椀渀攀爀⤀㬀ഀ
਍ऀऀऀ椀渀渀攀爀䴀攀渀甀 㴀 挀爀攀愀琀攀䔀氀攀洀攀渀琀⠀䐀䤀嘀Ⰰ 渀甀氀氀Ⰰഀ
				extend({਍ऀऀऀऀऀ䴀漀稀䈀漀砀匀栀愀搀漀眀㨀 戀漀砀匀栀愀搀漀眀Ⰰഀ
					WebkitBoxShadow: boxShadow,਍ऀऀऀऀऀ戀漀砀匀栀愀搀漀眀㨀 戀漀砀匀栀愀搀漀眀ഀ
				}, navOptions.menuStyle), menu);਍ഀ
			// hide on mouse out਍ऀऀऀ栀椀搀攀 㴀 昀甀渀挀琀椀漀渀 ⠀⤀ 笀ഀ
				css(menu, { display: NONE });਍ऀऀऀऀ椀昀 ⠀戀甀琀琀漀渀⤀ 笀ഀ
					button.setState(0);਍ऀऀऀऀ紀ഀ
				chart.openMenu = false;਍ऀऀऀ紀㬀ഀ
਍ऀऀऀ⼀⼀ 䠀椀搀攀 琀栀攀 洀攀渀甀 猀漀洀攀 琀椀洀攀 愀昀琀攀爀 洀漀甀猀攀 氀攀愀瘀攀 ⠀⌀㄀㌀㔀㜀⤀ഀ
			addEvent(menu, 'mouseleave', function () {਍ऀऀऀऀ栀椀搀攀吀椀洀攀爀 㴀 猀攀琀吀椀洀攀漀甀琀⠀栀椀搀攀Ⰰ 㔀　　⤀㬀ഀ
			});਍ऀऀऀ愀搀搀䔀瘀攀渀琀⠀洀攀渀甀Ⰰ ✀洀漀甀猀攀攀渀琀攀爀✀Ⰰ 昀甀渀挀琀椀漀渀 ⠀⤀ 笀ഀ
				clearTimeout(hideTimer);਍ऀऀऀ紀⤀㬀ഀ
਍ഀ
			// create the items਍ऀऀऀ攀愀挀栀⠀椀琀攀洀猀Ⰰ 昀甀渀挀琀椀漀渀 ⠀椀琀攀洀⤀ 笀ഀ
				if (item) {਍ऀऀऀऀऀ瘀愀爀 攀氀攀洀攀渀琀 㴀 椀琀攀洀⸀猀攀瀀愀爀愀琀漀爀 㼀 ഀ
						createElement('hr', null, null, innerMenu) :਍ऀऀऀऀऀऀ挀爀攀愀琀攀䔀氀攀洀攀渀琀⠀䐀䤀嘀Ⰰ 笀ഀ
							onmouseover: function () {਍ऀऀऀऀऀऀऀऀ挀猀猀⠀琀栀椀猀Ⰰ 渀愀瘀伀瀀琀椀漀渀猀⸀洀攀渀甀䤀琀攀洀䠀漀瘀攀爀匀琀礀氀攀⤀㬀ഀ
							},਍ऀऀऀऀऀऀऀ漀渀洀漀甀猀攀漀甀琀㨀 昀甀渀挀琀椀漀渀 ⠀⤀ 笀ഀ
								css(this, menuItemStyle);਍ऀऀऀऀऀऀऀ紀Ⰰഀ
							onclick: function () {਍ऀऀऀऀऀऀऀऀ栀椀搀攀⠀⤀㬀ഀ
								item.onclick.apply(chart, arguments);਍ऀऀऀऀऀऀऀ紀Ⰰഀ
							innerHTML: item.text || chart.options.lang[item.textKey]਍ऀऀऀऀऀऀ紀Ⰰ 攀砀琀攀渀搀⠀笀ഀ
							cursor: 'pointer'਍ऀऀऀऀऀऀ紀Ⰰ 洀攀渀甀䤀琀攀洀匀琀礀氀攀⤀Ⰰ 椀渀渀攀爀䴀攀渀甀⤀㬀ഀ
਍ഀ
					// Keep references to menu divs to be able to destroy them਍ऀऀऀऀऀ挀栀愀爀琀⸀攀砀瀀漀爀琀䐀椀瘀䔀氀攀洀攀渀琀猀⸀瀀甀猀栀⠀攀氀攀洀攀渀琀⤀㬀ഀ
				}਍ऀऀऀ紀⤀㬀ഀ
਍ऀऀऀ⼀⼀ 䬀攀攀瀀 爀攀昀攀爀攀渀挀攀猀 琀漀 洀攀渀甀 愀渀搀 椀渀渀攀爀䴀攀渀甀 搀椀瘀 琀漀 戀攀 愀戀氀攀 琀漀 搀攀猀琀爀漀礀 琀栀攀洀ഀ
			chart.exportDivElements.push(innerMenu, menu);਍ഀ
			chart.exportMenuWidth = menu.offsetWidth;਍ऀऀऀ挀栀愀爀琀⸀攀砀瀀漀爀琀䴀攀渀甀䠀攀椀最栀琀 㴀 洀攀渀甀⸀漀昀昀猀攀琀䠀攀椀最栀琀㬀ഀ
		}਍ഀ
		menuStyle = { display: 'block' };਍ഀ
		// if outside right, right align it਍ऀऀ椀昀 ⠀砀 ⬀ 挀栀愀爀琀⸀攀砀瀀漀爀琀䴀攀渀甀圀椀搀琀栀 㸀 挀栀愀爀琀圀椀搀琀栀⤀ 笀ഀ
			menuStyle.right = (chartWidth - x - width - menuPadding) + PX;਍ऀऀ紀 攀氀猀攀 笀ഀ
			menuStyle.left = (x - menuPadding) + PX;਍ऀऀ紀ഀ
		// if outside bottom, bottom align it਍ऀऀ椀昀 ⠀礀 ⬀ 栀攀椀最栀琀 ⬀ 挀栀愀爀琀⸀攀砀瀀漀爀琀䴀攀渀甀䠀攀椀最栀琀 㸀 挀栀愀爀琀䠀攀椀最栀琀 ☀☀ 戀甀琀琀漀渀⸀愀氀椀最渀伀瀀琀椀漀渀猀⸀瘀攀爀琀椀挀愀氀䄀氀椀最渀 ℀㴀㴀 ✀琀漀瀀✀⤀ 笀ഀ
			menuStyle.bottom = (chartHeight - y - menuPadding)  + PX;਍ऀऀ紀 攀氀猀攀 笀ഀ
			menuStyle.top = (y + height - menuPadding) + PX;਍ऀऀ紀ഀ
਍ऀऀ挀猀猀⠀洀攀渀甀Ⰰ 洀攀渀甀匀琀礀氀攀⤀㬀ഀ
		chart.openMenu = true;਍ऀ紀Ⰰഀ
਍ऀ⼀⨀⨀ഀ
	 * Add the export button to the chart਍ऀ ⨀⼀ഀ
	addButton: function (options) {਍ऀऀ瘀愀爀 挀栀愀爀琀 㴀 琀栀椀猀Ⰰഀ
			renderer = chart.renderer,਍ऀऀऀ戀琀渀伀瀀琀椀漀渀猀 㴀 洀攀爀最攀⠀挀栀愀爀琀⸀漀瀀琀椀漀渀猀⸀渀愀瘀椀最愀琀椀漀渀⸀戀甀琀琀漀渀伀瀀琀椀漀渀猀Ⰰ 漀瀀琀椀漀渀猀⤀Ⰰഀ
			onclick = btnOptions.onclick,਍ऀऀऀ洀攀渀甀䤀琀攀洀猀 㴀 戀琀渀伀瀀琀椀漀渀猀⸀洀攀渀甀䤀琀攀洀猀Ⰰഀ
			symbol,਍ऀऀऀ戀甀琀琀漀渀Ⰰഀ
			symbolAttr = {਍ऀऀऀऀ猀琀爀漀欀攀㨀 戀琀渀伀瀀琀椀漀渀猀⸀猀礀洀戀漀氀匀琀爀漀欀攀Ⰰഀ
				fill: btnOptions.symbolFill਍ऀऀऀ紀Ⰰഀ
			symbolSize = btnOptions.symbolSize || 12,਍ऀऀऀ洀攀渀甀䬀攀礀㬀ഀ
਍ऀऀ椀昀 ⠀℀挀栀愀爀琀⸀戀琀渀䌀漀甀渀琀⤀ 笀ഀ
			chart.btnCount = 0;਍ऀऀ紀ഀ
		menuKey = chart.btnCount++;਍ഀ
		// Keeps references to the button elements਍ऀऀ椀昀 ⠀℀挀栀愀爀琀⸀攀砀瀀漀爀琀䐀椀瘀䔀氀攀洀攀渀琀猀⤀ 笀ഀ
			chart.exportDivElements = [];਍ऀऀऀ挀栀愀爀琀⸀攀砀瀀漀爀琀匀嘀䜀䔀氀攀洀攀渀琀猀 㴀 嬀崀㬀ഀ
		}਍ഀ
		if (btnOptions.enabled === false) {਍ऀऀऀ爀攀琀甀爀渀㬀ഀ
		}਍ഀ
਍ऀऀ瘀愀爀 愀琀琀爀 㴀 戀琀渀伀瀀琀椀漀渀猀⸀琀栀攀洀攀Ⰰഀ
			states = attr.states,਍ऀऀऀ栀漀瘀攀爀 㴀 猀琀愀琀攀猀 ☀☀ 猀琀愀琀攀猀⸀栀漀瘀攀爀Ⰰഀ
			select = states && states.select,਍ऀऀऀ挀愀氀氀戀愀挀欀㬀ഀ
਍ऀऀ搀攀氀攀琀攀 愀琀琀爀⸀猀琀愀琀攀猀㬀ഀ
਍ऀऀ椀昀 ⠀漀渀挀氀椀挀欀⤀ 笀ഀ
			callback = function () {਍ऀऀऀऀ漀渀挀氀椀挀欀⸀愀瀀瀀氀礀⠀挀栀愀爀琀Ⰰ 愀爀最甀洀攀渀琀猀⤀㬀ഀ
			};਍ഀ
		} else if (menuItems) {਍ऀऀऀ挀愀氀氀戀愀挀欀 㴀 昀甀渀挀琀椀漀渀 ⠀⤀ 笀ഀ
				chart.contextMenu(਍ऀऀऀऀऀ✀挀漀渀琀攀砀琀洀攀渀甀✀Ⰰ ഀ
					menuItems, ਍ऀऀऀऀऀ戀甀琀琀漀渀⸀琀爀愀渀猀氀愀琀攀堀Ⰰ ഀ
					button.translateY, ਍ऀऀऀऀऀ戀甀琀琀漀渀⸀眀椀搀琀栀Ⰰ ഀ
					button.height,਍ऀऀऀऀऀ戀甀琀琀漀渀ഀ
				);਍ऀऀऀऀ戀甀琀琀漀渀⸀猀攀琀匀琀愀琀攀⠀㈀⤀㬀ഀ
			};਍ऀऀ紀ഀ
਍ഀ
		if (btnOptions.text && btnOptions.symbol) {਍ऀऀऀ愀琀琀爀⸀瀀愀搀搀椀渀最䰀攀昀琀 㴀 䠀椀最栀挀栀愀爀琀猀⸀瀀椀挀欀⠀愀琀琀爀⸀瀀愀搀搀椀渀最䰀攀昀琀Ⰰ ㈀㔀⤀㬀ഀ
		਍ऀऀ紀 攀氀猀攀 椀昀 ⠀℀戀琀渀伀瀀琀椀漀渀猀⸀琀攀砀琀⤀ 笀ഀ
			extend(attr, {਍ऀऀऀऀ眀椀搀琀栀㨀 戀琀渀伀瀀琀椀漀渀猀⸀眀椀搀琀栀Ⰰഀ
				height: btnOptions.height,਍ऀऀऀऀ瀀愀搀搀椀渀最㨀 　ഀ
			});਍ऀऀ紀ഀ
਍ऀऀ戀甀琀琀漀渀 㴀 爀攀渀搀攀爀攀爀⸀戀甀琀琀漀渀⠀戀琀渀伀瀀琀椀漀渀猀⸀琀攀砀琀Ⰰ 　Ⰰ 　Ⰰ 挀愀氀氀戀愀挀欀Ⰰ 愀琀琀爀Ⰰ 栀漀瘀攀爀Ⰰ 猀攀氀攀挀琀⤀ഀ
			.attr({਍ऀऀऀऀ琀椀琀氀攀㨀 挀栀愀爀琀⸀漀瀀琀椀漀渀猀⸀氀愀渀最嬀戀琀渀伀瀀琀椀漀渀猀⸀开琀椀琀氀攀䬀攀礀崀Ⰰഀ
				'stroke-linecap': 'round'਍ऀऀऀ紀⤀㬀ഀ
਍ऀऀ椀昀 ⠀戀琀渀伀瀀琀椀漀渀猀⸀猀礀洀戀漀氀⤀ 笀ഀ
			symbol = renderer.symbol(਍ऀऀऀऀऀ戀琀渀伀瀀琀椀漀渀猀⸀猀礀洀戀漀氀Ⰰഀ
					btnOptions.symbolX - (symbolSize / 2),਍ऀऀऀऀऀ戀琀渀伀瀀琀椀漀渀猀⸀猀礀洀戀漀氀夀 ⴀ ⠀猀礀洀戀漀氀匀椀稀攀 ⼀ ㈀⤀Ⰰഀ
					symbolSize,				਍ऀऀऀऀऀ猀礀洀戀漀氀匀椀稀攀ഀ
				)਍ऀऀऀऀ⸀愀琀琀爀⠀攀砀琀攀渀搀⠀猀礀洀戀漀氀䄀琀琀爀Ⰰ 笀ഀ
					'stroke-width': btnOptions.symbolStrokeWidth || 1,਍ऀऀऀऀऀ稀䤀渀搀攀砀㨀 ㄀ഀ
				})).add(button);਍ऀऀ紀ഀ
਍ऀऀ戀甀琀琀漀渀⸀愀搀搀⠀⤀ഀ
			.align(extend(btnOptions, {਍ऀऀऀऀ眀椀搀琀栀㨀 戀甀琀琀漀渀⸀眀椀搀琀栀Ⰰഀ
				x: Highcharts.pick(btnOptions.x, buttonOffset) // #1654਍ऀऀऀ紀⤀Ⰰ 琀爀甀攀Ⰰ ✀猀瀀愀挀椀渀最䈀漀砀✀⤀㬀ഀ
਍ऀऀ戀甀琀琀漀渀伀昀昀猀攀琀 ⬀㴀 ⠀戀甀琀琀漀渀⸀眀椀搀琀栀 ⬀ 戀琀渀伀瀀琀椀漀渀猀⸀戀甀琀琀漀渀匀瀀愀挀椀渀最⤀ ⨀ ⠀戀琀渀伀瀀琀椀漀渀猀⸀愀氀椀最渀 㴀㴀㴀 ✀爀椀最栀琀✀ 㼀 ⴀ㄀ 㨀 ㄀⤀㬀ഀ
਍ऀऀ挀栀愀爀琀⸀攀砀瀀漀爀琀匀嘀䜀䔀氀攀洀攀渀琀猀⸀瀀甀猀栀⠀戀甀琀琀漀渀Ⰰ 猀礀洀戀漀氀⤀㬀ഀ
਍ऀ紀Ⰰഀ
਍ऀ⼀⨀⨀ഀ
	 * Destroy the buttons.਍ऀ ⨀⼀ഀ
	destroyExport: function (e) {਍ऀऀ瘀愀爀 挀栀愀爀琀 㴀 攀⸀琀愀爀最攀琀Ⰰഀ
			i,਍ऀऀऀ攀氀攀洀㬀ഀ
਍ऀऀ⼀⼀ 䐀攀猀琀爀漀礀 琀栀攀 攀砀琀爀愀 戀甀琀琀漀渀猀 愀搀搀攀搀ഀ
		for (i = 0; i < chart.exportSVGElements.length; i++) {਍ऀऀऀ攀氀攀洀 㴀 挀栀愀爀琀⸀攀砀瀀漀爀琀匀嘀䜀䔀氀攀洀攀渀琀猀嬀椀崀㬀ഀ
			਍ऀऀऀ⼀⼀ 䐀攀猀琀爀漀礀 愀渀搀 渀甀氀氀 琀栀攀 猀瘀最⼀瘀洀氀 攀氀攀洀攀渀琀猀ഀ
			if (elem) { // #1822਍ऀऀऀऀ攀氀攀洀⸀漀渀挀氀椀挀欀 㴀 攀氀攀洀⸀漀渀琀漀甀挀栀猀琀愀爀琀 㴀 渀甀氀氀㬀ഀ
				chart.exportSVGElements[i] = elem.destroy();਍ऀऀऀ紀ഀ
		}਍ഀ
		// Destroy the divs for the menu਍ऀऀ昀漀爀 ⠀椀 㴀 　㬀 椀 㰀 挀栀愀爀琀⸀攀砀瀀漀爀琀䐀椀瘀䔀氀攀洀攀渀琀猀⸀氀攀渀最琀栀㬀 椀⬀⬀⤀ 笀ഀ
			elem = chart.exportDivElements[i];਍ഀ
			// Remove the event handler਍ऀऀऀ爀攀洀漀瘀攀䔀瘀攀渀琀⠀攀氀攀洀Ⰰ ✀洀漀甀猀攀氀攀愀瘀攀✀⤀㬀ഀ
਍ऀऀऀ⼀⼀ 刀攀洀漀瘀攀 椀渀氀椀渀攀 攀瘀攀渀琀猀ഀ
			chart.exportDivElements[i] = elem.onmouseout = elem.onmouseover = elem.ontouchstart = elem.onclick = null;਍ഀ
			// Destroy the div by moving to garbage bin਍ऀऀऀ搀椀猀挀愀爀搀䔀氀攀洀攀渀琀⠀攀氀攀洀⤀㬀ഀ
		}਍ऀ紀ഀ
});਍ഀ
਍猀礀洀戀漀氀猀⸀洀攀渀甀 㴀 昀甀渀挀琀椀漀渀 ⠀砀Ⰰ 礀Ⰰ 眀椀搀琀栀Ⰰ 栀攀椀最栀琀⤀ 笀ഀ
	var arr = [਍ऀऀ䴀Ⰰ 砀Ⰰ 礀 ⬀ ㈀⸀㔀Ⰰഀ
		L, x + width, y + 2.5,਍ऀऀ䴀Ⰰ 砀Ⰰ 礀 ⬀ 栀攀椀最栀琀 ⼀ ㈀ ⬀ 　⸀㔀Ⰰഀ
		L, x + width, y + height / 2 + 0.5,਍ऀऀ䴀Ⰰ 砀Ⰰ 礀 ⬀ 栀攀椀最栀琀 ⴀ ㄀⸀㔀Ⰰഀ
		L, x + width, y + height - 1.5਍ऀ崀㬀ഀ
	return arr;਍紀㬀ഀ
਍⼀⼀ 䄀搀搀 琀栀攀 戀甀琀琀漀渀猀 漀渀 挀栀愀爀琀 氀漀愀搀ഀ
Chart.prototype.callbacks.push(function (chart) {਍ऀ瘀愀爀 渀Ⰰഀ
		exportingOptions = chart.options.exporting,਍ऀऀ戀甀琀琀漀渀猀 㴀 攀砀瀀漀爀琀椀渀最伀瀀琀椀漀渀猀⸀戀甀琀琀漀渀猀㬀ഀ
਍ऀ戀甀琀琀漀渀伀昀昀猀攀琀 㴀 　㬀ഀ
਍ऀ椀昀 ⠀攀砀瀀漀爀琀椀渀最伀瀀琀椀漀渀猀⸀攀渀愀戀氀攀搀 ℀㴀㴀 昀愀氀猀攀⤀ 笀ഀ
਍ऀऀ昀漀爀 ⠀渀 椀渀 戀甀琀琀漀渀猀⤀ 笀ഀ
			chart.addButton(buttons[n]);਍ऀऀ紀ഀ
਍ऀऀ⼀⼀ 䐀攀猀琀爀漀礀 琀栀攀 攀砀瀀漀爀琀 攀氀攀洀攀渀琀猀 愀琀 挀栀愀爀琀 搀攀猀琀爀漀礀ഀ
		addEvent(chart, 'destroy', chart.destroyExport);਍ऀ紀ഀ
਍紀⤀㬀ഀ
਍ഀ
}(Highcharts));਍�
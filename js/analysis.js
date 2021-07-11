
 //グローバル変数;  
   var map; 

   // var wk_size; 

   var code; 
   var code2 = new String; 

   var lod_text; 
   var bigcity_text; 

   var array_str = new Array();
   var array_lod = new Array();
   var array_bigcity = new Array();

function scatter_func(){

 //  alert("test"); 

   document.getElementById('loading').style.display = 'inline';

   document.getElementById('container').style.display = 'none';


   code = document.myform.index1.value;

   code2 = document.myform.index2.value;
 
   code2 = code2.replace(/(^\s+)|(\s+$)/g, "");

 
//   lod_text = $("myform").options[$("index1").selectedIndex].text;

  var myselect = document.myform.index1.selectedIndex ;

  lod_text = document.myform.index1.options[myselect].text; 

  var myselect = document.myform.index2.selectedIndex ;

  bigcity_text = document.myform.index2.options[myselect].text; 

   var query = 'PREFIX g00200502-dimension:<http://data.e-stat.go.jp/lod/ontology/g00200502/dimension/>\n' +  
               'PREFIX g00200502-code:<http://data.e-stat.go.jp/lod/ontology/g00200502/code/>\n' + 
               'PREFIX cd-dimension:<http://data.e-stat.go.jp/lod/ontology/crossDomain/dimension/>\n' + 
               'PREFIX sdmx-measure:<http://purl.org/linked-data/sdmx/2009/measure#>\n' + 
               'PREFIX sdmx-dimension:<http://purl.org/linked-data/sdmx/2009/dimension#>\n' + 
               'PREFIX sacs:<http://data.e-stat.go.jp/lod/terms/sacs#>\n' + 
               'PREFIX ic:<http://imi.ipa.go.jp/ns/core/rdf#>\n' + 
               'select  ?city  ?year  ?observation\n' + 
               'where {\n' +  
               '?s  g00200502-dimension:indicator  g00200502-code:indicator-' + code + ' ;\n' + 
               'cd-dimension:timePeriod  ?year ;\n' +
               'sdmx-measure:obsValue  ?observation ;\n' +
               'sdmx-dimension:refArea  ?areacode .\n' +
               '?areacode  sacs:administrativeClass  sacs:DesignatedCity ;\n' +
               'ic:表記  ?city ;\n' +           
               '} ORDER BY DESC(?year) DESC(?observation)\n' + 
               'limit 20'; 

     var url = 'http://data.e-stat.go.jp/lod/sparql/alldata/query';

      $.ajax({
            method: 'POST',
            dataType: 'json',
            url: url,
            data: {query: query},
            success: function(data) {
 //               alert('city: ' + data.results.bindings[0].city.value);
 //              alert('observation: ' + data.results.bindings[0].observation.value);
 
       array_lod = []; // 配列の初期化
                for (var i=0; i<20; i++) {    

                     array_data = new Array(data.results.bindings[i].city.value,data.results.bindings[i].observation.value);
                     array_lod.push(array_data);

                  } 

      var  wk_url = "https://data.city.kyoto.lg.jp/API/action/datastore/search.jsonp?resource_id=e1492a04-497f-4e02-a89b-dee9ee1d5148"; 
           wk_url += "&fields=" + code2 + ",city";

                $.ajax({
                  method: 'POST',
                  url: wk_url,
                  dataType: "jsonp",
                  jsonpCallback: "logResults"
                });
             }
         });

 } 

function logResults(jsonp){

   array_bigcity = []; // 配列の初期化

   result = jsonp.result.records;
   var len = result.length;

       for (var i=0; i<21; i++) {    

            if(result[i].city != "東京都区部"){
               var array_data = new Array(jsonp["result"]["records"][i]["city"],parseFloat(jsonp["result"]["records"][i][code2]));
               array_bigcity.push(array_data);
 //              alert(array_data[0]); 
 //              alert(array_data[1]);
            } 

          } 

   var array_bigcity2 = new Array;

     for (var i=0; i<20; i++) {    

        for (var m=0; m<20; m++) {       
    
            if (array_lod[i][0] == array_bigcity[m][0]){ 

                if  (!array_bigcity[m][1]){ 
                      array_bigcity[m][1] = 0; 
                } 

                array_bigcity2[i] = parseFloat(array_bigcity[m][1]); 


                break; 
              } 
         } 
 
      } 

 var wk_name = [];
 var wk_x = [];
 var wk_y = [];
 var wk_color = [];


 wk_name[0] = '京都市'; 
 wk_name[1] = '大阪市'; 
 wk_name[2] = '札幌市'; 
 wk_name[3] = '新潟市'; 
 wk_name[4] = '広島市'; 

    for (var i=0; i<20; i++) {    

         wk_name[i] = array_lod[i][0]; 
         wk_y[i] = parseFloat(array_bigcity2[i]); 
         wk_x[i] = parseFloat(array_lod[i][1]); 
 //        wk_color[i] = 'rgba(119, 152, 191, .5)'; 
     wk_color[i] = 'rgba(119, 152, 191, .5)'; 


       if(wk_name[i] ==  '京都市'){
           wk_color[i] = 'rgba(229,38,205,1)'; 
         }

   } 

 var  wk_size = 15;

   document.getElementById('container').style.width = '800px';
   document.getElementById('container').style.height = '500px';


  if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1)
    || navigator.userAgent.indexOf('iPod') > 0 
    || navigator.userAgent.indexOf('Android') > 0) {

    wk_size = 10;
   document.getElementById('container').style.width = '100%';
   document.getElementById('container').style.height = '450px';


  }


  $('#container').highcharts({

    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: '大都市主要指標の相関分析'
    },
    subtitle: {
        text: 'Source: 政府統計LOD & 京都市オープンデータポータル'
    },
    xAxis: {
        title: {
            enabled: true,
            text: lod_text
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: bigcity_text
        }
    },

    plotOptions: {

  style: {
     fontSize: '8px' // サブタイトルの文字サイズ
   },
        scatter: {

            marker: {
                radius: wk_size,
                states: {
                    hover: {
                        enabled: true,
                        lineColor:  '{point.color}'
                    }
                }
            },

            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {

//               headerFormat: '{series.name}',
                pointFormat: '{point.name} , {point.x} , {point.y}'

 //         pointFormat:

//              headerFormat: '{series.name}',

//             <span style="color:{point.color}">\u25CF</span> {series.name}:

 //             '{point.x} , {point.y} '
            

            }
        },

  style: {
     fontSize: '8px' // サブタイトルの文字サイズ
   },

       series: {
            name: '政令指定都市', 
            dataLabels: {
                enabled: true,
//   　     color: [wk_color[0],wk_color[1],wk_color[2],wk_color[3],wk_color[4],wk_color[5],wk_color[6],wk_color[7],wk_color[8],wk_color[9],
//                  wk_color[10],wk_color[11],wk_color[12],wk_color[13],wk_color[14],wk_color[15],wk_color[16],wk_color[17],wk_color[18],wk_color[19]],   
                format: '{point.name}'

            }
        }
    },

    series: [{
//   　     color: [wk_color[0],wk_color[1],wk_color[2],wk_color[3],wk_color[4],wk_color[5],wk_color[6],wk_color[7],wk_color[8],wk_color[9],
//                  wk_color[10],wk_color[11],wk_color[12],wk_color[13],wk_color[14],wk_color[15],wk_color[16],wk_color[17],wk_color[18],wk_color[19]],    
   　     color: 'rgba(119, 152, 191, .5)',
//          data:  [{ x: 174.0, y: 65.6, name: wk_name[0]}, {x: 175.3, y: 71.8, name: wk_name[1]}, {x: 193.5, y: 80.7, name: wk_name[2]}]
          data:  [{ x: wk_x[0], y: wk_y[0], name: wk_name[0], color: wk_color[0],marker:{ fillColor: wk_color[0]}}, {x: wk_x[1], y: wk_y[1], name: wk_name[1], color: wk_color[1],marker:{ fillColor: wk_color[1]}}, {x: wk_x[2], y: wk_y[2], name: wk_name[2], color: wk_color[2],marker:{ fillColor: wk_color[2]}},
                  { x: wk_x[3], y: wk_y[3], name: wk_name[3], color: wk_color[3],marker:{ fillColor: wk_color[3]}}, {x: wk_x[4], y: wk_y[4], name: wk_name[4], color: wk_color[4],marker:{ fillColor: wk_color[4]}}, {x: wk_x[5], y: wk_y[5], name: wk_name[5], color: wk_color[5],marker:{ fillColor: wk_color[5]}},
                  { x: wk_x[6], y: wk_y[6], name: wk_name[6], color: wk_color[6],marker:{ fillColor: wk_color[6]}}, {x: wk_x[7], y: wk_y[7], name: wk_name[7], color: wk_color[7],marker:{ fillColor: wk_color[7]}}, {x: wk_x[8], y: wk_y[8], name: wk_name[8], color: wk_color[8],marker:{ fillColor: wk_color[8]}},
                  { x: wk_x[9], y: wk_y[9], name: wk_name[9], color: wk_color[9],marker:{ fillColor: wk_color[9]}}, {x: wk_x[10], y: wk_y[10], name: wk_name[10], color: wk_color[10],marker:{ fillColor: wk_color[10]}}, {x: wk_x[11], y: wk_y[11], name: wk_name[11], color: wk_color[11],marker:{ fillColor: wk_color[11]}},
                  { x: wk_x[12], y: wk_y[12], name: wk_name[12], color: wk_color[12],marker:{ fillColor: wk_color[12]}}, {x: wk_x[13], y: wk_y[13], name: wk_name[13], color: wk_color[13],marker:{ fillColor: wk_color[13]}}, {x: wk_x[14], y: wk_y[14], name: wk_name[14], color: wk_color[14],marker:{ fillColor: wk_color[14]}},
                  { x: wk_x[15], y: wk_y[15], name: wk_name[15], color: wk_color[15],marker:{ fillColor: wk_color[15]}}, {x: wk_x[16], y: wk_y[16], name: wk_name[16], color: wk_color[16],marker:{ fillColor: wk_color[16]}}, {x: wk_x[17], y: wk_y[17], name: wk_name[17], color: wk_color[17],marker:{ fillColor: wk_color[17]}},
                  { x: wk_x[18], y: wk_y[18], name: wk_name[18], color: wk_color[18],marker:{ fillColor: wk_color[18]}}, {x: wk_x[19], y: wk_y[19], name: wk_name[19], color: wk_color[19],marker:{ fillColor: wk_color[19]}}]
    }

]
  });

 //   document.getElementById("container").style.height = '600px';
 //  document.getElementById('container').style.width = '100%';

   document.getElementById('container').style.display = 'inline-block';

   document.getElementById('loading').style.display = 'none';

}


jQuery(document).ready(function () {
  jQuery('header nav').meanmenu({

    meanMenuClose: "x", // クローズボタン
    meanMenuCloseSize: "18px", // クローズボタンのフォントサイズ
    meanMenuOpen: "<span /><span /><span />", // 通常ボタン
    meanRevealPosition: "right", // 表示位置
    meanRevealColour: "#111", // 背景色
    meanScreenWidth: "680", // 表示させるウィンドウサイズ(ブレイクポイント)

  });
});

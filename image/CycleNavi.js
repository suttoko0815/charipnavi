
 //グローバル変数;  
   var map; 

   // var wk_size; 

   var str_lat = [];
   var str_long = [];
   var str_name = []; 
   var str_content = []; 

function open_close(eid,eid2,eid3,eid4,idImage){

  var taisyou = document.getElementById(eid);
  if (taisyou.style.display == 'none') {
     taisyou.style.display = 'block';
 
     document.getElementById(eid3).style.display = 'block';
     document.getElementById(eid4).style.display = 'block';

     document.getElementById(idImage).src = "image/" +  "mainas.jpg";

  } else {
     taisyou.style.display = 'none';

     document.getElementById(eid3).style.display = 'none';
     document.getElementById(eid4).style.display = 'none';

     document.getElementById(idImage).src = "image/" +  "pulas.jpg";

  }
}

var currentWindow = null;

//目的地の位置情報
var mokuteki_latlng = [
  [35.011939,135.759274],//マンガミュージアム周辺
  [34.994812,135.784965],//清水寺周辺
  [35.003152,135.768211],//四条河原町周辺
  [34.985849,135.758767],//京都駅周辺
  [35.003947,135.772873],//祇園周辺
  [35.03937 ,135.729243],//金閣寺周辺
  [35.031401,135.735122],//北野天満宮周辺
  [34.966779,135.770834],//伏見稲荷周辺
  [34.986966,135.742843],//鉄道博物館周辺
  [35.016471,135.708677] //太秦映画村周辺
];

//区役所の位置情報
var kuyakusho_latlng = [
  [35.04097 ,135.753991],//北区
  [35.029049,135.757033],//上京区
  [35.048633,135.778478],//左京区
  [35.010561,135.751467],//中京区
  [34.997088,135.776312],//東山区
  [34.972317,135.813644],//山科区
  [34.988102,135.757606],//下京区
  [34.976748,135.746448],//南区
  [35.010197,135.716098],//右京区
  [34.985174,135.693334],//西京区
  [34.935949,135.761357] //伏見区
];


//選択した目的地を地図上の中心に表示する。
function mokuteki(){

  var target = document.getElementById("myform3");
  var check  = document.getElementById("myform3").keyword3.value;

  var wk_lat = mokuteki_latlng[check - 1][0];
  var wk_lng = mokuteki_latlng[check - 1][1];

  map.panTo(new google.maps.LatLng(wk_lat,wk_lng));
}

//選択した行政区（中心は区役所）を地図上の中心に表示する。
function ku(){

  var target = document.getElementById("myform5");
  var ku_cnt = document.getElementById("myform5").keyword5.value;

  var wk_lat = kuyakusho_latlng[ku_cnt - 1][0];
  var wk_lng = kuyakusho_latlng[ku_cnt - 1][1];

  map.panTo(new google.maps.LatLng(wk_lat,wk_lng));
}




function getLatLng(place) {

  // ジオコーダのコンストラクタ
  var geocoder = new google.maps.Geocoder();

  // geocodeリクエストを実行。
  // 第１引数はGeocoderRequest。住所⇒緯度経度座標の変換時はaddressプロパティを入れればOK。
  // 第２引数はコールバック関数。
  geocoder.geocode({
    address: place
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      // 結果の表示範囲。結果が１つとは限らないので、LatLngBoundsで用意。
      var bounds = new google.maps.LatLngBounds();

      for (var i in results) {
        if (results[i].geometry) {

          // 緯度経度を取得
          var latlng = results[i].geometry.location;

          var wk_lat = results[i].geometry.location.lat;
         var wk_lng = results[i].geometry.location.lng;


          // 住所を取得(日本の場合だけ「日本, 」を削除)
          var address = results[i].formatted_address.replace(/^日本, /, '');

 
          // 検索結果地が含まれるように範囲を拡大
          bounds.extend(latlng);

          // あとはご自由に・・・。
          new google.maps.InfoWindow({
            content: address + "<br>(Lat, Lng) = " + latlng.toString()
          }).open(map, new google.maps.Marker({
            position: latlng,
            map: map
          }));
        }
      }


      // 範囲を移動
      map.fitBounds(bounds);

      //検索結果がひとつだけなら元のズームレベルに

     if ( i == 0){ 

        map.setZoom(wk_size);

      } 

    } else if (status == google.maps.GeocoderStatus.ERROR) {
      alert("サーバとの通信時に何らかのエラーが発生！");
    } else if (status == google.maps.GeocoderStatus.INVALID_REQUEST) {
      alert("リクエストに問題アリ！geocode()に渡すGeocoderRequestを確認せよ！！");
    } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
      alert("短時間にクエリを送りすぎ！落ち着いて！！");
    } else if (status == google.maps.GeocoderStatus.REQUEST_DENIED) {
      alert("このページではジオコーダの利用が許可されていない！・・・なぜ！？");
    } else if (status == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
      alert("サーバ側でなんらかのトラブルが発生した模様。再挑戦されたし。");
    } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
      alert("見つかりません");
    } else {
      alert("えぇ～っと・・、バージョンアップ？");
    }
  });
}







// Google Mapsに書き出し
function createMap(lat,lng){

  document.getElementById('loading').style.display = 'block';

 // var wk_size;

 // wk_size = 17;

//  if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1)
//    || navigator.userAgent.indexOf('iPod') > 0 
//    || navigator.userAgent.indexOf('Android') > 0) {

//    wk_size = 18;
//  }

  myOptions = {
    zoom: wk_size,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    gestureHandling: 'greedy'
  };

  // Google Mapsに書き出し
  map = new google.maps.Map(document.getElementById("map_canvas"));

  map.setOptions(myOptions);

  document.getElementById('loading').style.display = 'none';

}


//設備のアイコンを地図上に表示する。
function facilities_mapping(obj){
  var markers = [];

  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json', // コレを忘れてた！！
    url: obj.url,

    success: function(json){

      jsonData = json[obj.type];
      var len = jsonData.length;

      for(var i=0; i < len; i++){
        var name= obj.name;
        if (obj.name == "いしぶみ") { 
           name = "いしぶみ" + "<br />" + jsonData[i].name + "<br />" + jsonData[i].address;
          } 
        if (obj.name == "宿泊施設") { 
           name = "宿泊施設" + "<br />" + jsonData[i].施設名称１ + "<br />" + jsonData[i].旅館業の種別;
          } 


        var latlng = new google.maps.LatLng(jsonData[i].latitude,jsonData[i].longitude);
        var icons = obj.icons;
        markers[i] = new google.maps.Marker({position: latlng,icon:icons,map: map});
        markerInfo(markers[i], name);
      }
    },
    error:function(){
      console.log('Miss..');
    }
  });

}


//自転車のアイコンを地図上に表示する。
function cycle_mapping(filter){
  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json', // コレを忘れてた！！
    url: 'json/cycle.json',

    success: function(json){

      cycle = json.cycle;
      var len = cycle.length;

      for(var i=0; i < len; i++){

        if (filter == 1) {
          //無料期間がない駐輪場は表示しない
          if (cycle[i].freetime == ""){
            continue;
          }
        }

        var name = cycle[i].shisetsu;
        var latlng = new google.maps.LatLng(cycle[i].latitude,cycle[i].longitude);
        var icons = 'image/icon_cycle.png';
        createMarker(name,latlng,icons,map);
      }
    },

    error:function(){
      console.log('Miss..');
    }
  });

}


//オンロード時に地図を表示します
function initmap(){

  if (window.isSecureContext) {
    console.log("安全なコンテキストです。");
  } else {
    console.log("安全でないコンテキストです。");
  }

 
  wk_size = 17;

  if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1)
    || navigator.userAgent.indexOf('iPod') > 0 
    || navigator.userAgent.indexOf('Android') > 0) {

    wk_size = 18;
  }


  // 対応している場合
  if( navigator.geolocation ){
  
    // 現在地を取得
    navigator.geolocation.getCurrentPosition(

      // [第1引数] 取得に成功した場合の関数
      function( position ){

        // 取得したデータの整理
        var data = position.coords;

        // データの整理
        var lat       = data.latitude ;
        var lng       = data.longitude ;
        var alt       = data.altitude ;
        var accLatlng = data.accuracy ;
        var accAlt    = data.altitudeAccuracy ;
        var heading   = data.heading ;      //0=北,90=東,180=南,270=西
        var speed     = data.speed ;

        // アラート表示
        // alert( "あなたの現在位置は、\n[" + lat + "," + lng + "]\nです。" ) ;

        // HTMLへの書き出し
        document.getElementById( 'result' ).innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd><dt>高度</dt><dd>' + alt + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng + '</dd><dt>高度の精度</dt><dd>' + accAlt + '</dd><dt>方角</dt><dd>' + heading + '</dd><dt>速度</dt><dd>' + speed + '</dd></dl>' ;

        // 位置情報
        var latlng = new google.maps.LatLng( lat , lng );

 //       wk_size = 17;

        //スマホは１８スタート
 //        if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1)
 //          || navigator.userAgent.indexOf('iPod') > 0 
 //             || navigator.userAgent.indexOf('Android') > 0) {
 //                    wk_size = 18;
 //               }

        // Google Mapsに書き出し
        createMap(lat,lng);

        //現在地のアイコンを追加
        var name = "現在地";
        var icons = 'image/genzai.png';

//        createMarker(name,latlng,icons,map)

        var marker = new google.maps.Marker({position: latlng,icon:icons,map: map});
        markerInfo(marker, name);

        //自転車のアイコンを表示
        cycle_mapping(0);

      },

      // [第2引数] 取得に失敗した場合の関数
      function( error ){
        // エラーコード(error.code)の番号
        // 0:UNKNOWN_ERROR        原因不明のエラー
        // 1:PERMISSION_DENIED      利用者が位置情報の取得を許可しなかった
        // 2:POSITION_UNAVAILABLE    電波状況などで位置情報が取得できなかった
        // 3:TIMEOUT          位置情報の取得に時間がかかり過ぎた…

        // エラー番号に対応したメッセージ
        var errorInfo = [
          "原因不明のエラーが発生しました…。" ,
          "位置情報の取得が許可されませんでした…。" ,
          "電波状況などで位置情報が取得できませんでした…。" ,
          "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
        ];

        var errmessage = "京都市役所前を中心に地図を表示します。"; 

        // エラー番号
        var errorNo = error.code ;

        // エラーメッセージ
        var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] + errmessage ;

        // アラート表示
        alert( errorMessage ) ;

        // HTMLに書き出し
        document.getElementById("result").innerHTML = errorMessage;

        // 位置情報
        var latlng = new google.maps.LatLng( 35.011619, 135.768167 ) ;

        // Google Mapsに書き出し
        createMap(35.011619,135.768167);

        //現在地のアイコンを追加
        var name = "現在地";
        var icons = 'image/genzai.png';
        createMarker(name,latlng,icons,map);

        //自転車のアイコンを表示
        cycle_mapping(0);

      } ,

      // [第3引数] オプション
      {
        "enableHighAccuracy": false,
        "timeout": 8000,
        "maximumAge": 2000,
      }

    );

// 対応していない場合
  }　else　{

    // エラーメッセージ
    var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ;

    // アラート表示
    alert( errorMessage ) ;

    // HTMLに書き出し
    document.getElementById( 'result' ).innerHTML = errorMessage ;
  }

//funciotn終了
}

function siborikomi(index){ 

  wk_size = map.getZoom(); 
  var latlng = map.getCenter();

  var lat = latlng.lat();
  var lng = latlng.lng();


  // Google Mapsに書き出し
  createMap(lat,lng);

  //var wk_index = document.myform.keyword.selectedIndex;
  //var filter   = document.myform.keyword.options[index].value;

  cycle_mapping(index);

} 

function createMarker(name,latlng,icons,map){

  var wk_link = "<br><a href=\"#modal-p01\">詳細はこちら</a>"; 
  var wk_name =  "<div id='infoWindow'>" + name + wk_link +"</div>";

  var infoWindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({position: latlng,icon:icons,map: map});
  google.maps.event.addListener(marker, 'click', function() {
    if (currentWindow) {
      currentWindow.close();
    }
    infoWindow.setContent(wk_name);
    infoWindow.open(map,marker);
    currentWindow = infoWindow;

    // 右側に駐輪場のいろいろな情報を表示！
    cicle_detail(name,map);

  });
} 

// 駐輪場の情報を表示する関数です！
function cicle_detail(name,map){

  var strHtml = "<div class=\"modal-inner\">";

  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json', // コレを忘れてた！！
    url: 'json/cycle.json',

    success: function(json){

      cycle = json.cycle;
      var len = cycle.length;

      for(var i=0; i < len; i++){
        var wk_name = cycle[i].shisetsu;
        if ( name == wk_name) {

          strHtml += "<table class=\"type6\"><caption>" + name + "（クリックした駐輪場の詳細な情報です)";
          strHtml += "<tr class=\"kbn\"><td colspan=\"4\">名称</td></tr>" 
          strHtml += "<tr><td colspan=\"4\">" + cycle[i].shisetsu + "</td></tr>";


          strHtml += "<tr class=\"kbn\"><td>民営種別</td><td>最寄り沿線</td><td colspan=\"2\">最寄り駅</td></tr>" 
          strHtml += "<tr><td>" + cycle[i].kouei + "</td><td>" + cycle[i].koukyou + "</td><td colspan=\"2\">" + cycle[i].moyori + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td>連絡先</td><td colspan=\"3\">住所</td></tr>" 
          strHtml += "<tr><td>" + cycle[i].tel + "</td><td colspan=\"3\">" + cycle[i].address + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td>駐輪台数（自転車）</td><td>駐輪台数（バイク）</td><td>駐輪台数（原付）</td><td>駐輪台数（二輪）</td></tr>" 
          strHtml += "<tr><td>" + cycle[i].chari + "</td><td>" + cycle[i].bile + "</td><td>" + cycle[i].gentuki + "</td><td>" + cycle[i].nirin + "</td></tr>";


          strHtml += "<tr class=\"kbn\"><td>料金（自転車）</td><td>料金（バイク）</td><td>料金（原付）</td><td>料金（二輪）</td></tr>" 
          strHtml += "<tr><td>" + cycle[i].charirate + "</td><td>" + cycle[i].bikerate + "</td><td>" + cycle[i].nirinrate + "</td><td>" + cycle[i].jidourate + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td colspan=\"4\">料金の詳細説明</td></tr>" 
          strHtml += "<tr><td colspan=\"4\">" + cycle[i].setumei + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td colspan=\"3\">無料時間</td><td>月極めの有無</td></tr>" 
          strHtml += "<tr><td colspan=\"3\">" + cycle[i].freetime + "</td><td>" + cycle[i].tukigime + "</td></tr>";


          strHtml += "<tr class=\"kbn\"><td colspan=\"2\">営業開始</td><td colspan=\"2\">営業終了</td></tr>" 
          strHtml += "<tr><td colspan=\"2\">" + cycle[i].kaisi + "</td><td colspan=\"2\">" + cycle[i].end + "</td></tr>";

          strHtml += "</table>";   
          strHtml += "</div>";   

          strHtml += "<a href=\"#!\" class=\"modal-close\">閉じる</a>";


          document.getElementById("modal-p01").style.display = 'block';
          document.getElementById("modal-p01").style.width = '70%';
          document.getElementById("modal-p01").innerHTML = strHtml;
        }
      }
    },
    error:function(){
      console.log('Miss..');
    }
  });
}

google.maps.event.addDomListener(window, 'load', initmap);

function recomend(){

  wk_size = map.getZoom();
  var latlng = map.getCenter();

  var lat = latlng.lat();
  var lng = latlng.lng();

  var myOptions = {
    zoom: wk_size,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    gestureHandling: 'greedy'
  };

  // map = new google.maps.Map(document.getElementById("map_canvas"));
  // map.setOptions(myOptions);

  // Google Mapsに書き出し
  createMap(lat,lng);

  recomendMarker(); 
}

//観光地のアイコンを地図に追加します。
function recomendMarker(){

  check1 = document.myform2.check1.checked;
  check2 = document.myform2.check2.checked;
  check3 = document.myform2.check3.checked;
  check4 = document.myform2.check4.checked;
  check5 = document.myform2.check5.checked;
  check6 = document.myform2.check6.checked;

  var markers = [];


  //最初に自転車のアイコンを表示
  cycle_mapping(0);


  if ( check1 == true){
    
    facilities_mapping(
      Obj = {
        type  : 'toilet',
        name  : "公衆トイレ",
        url   : 'json/toilet.json',
        icons : 'image/toilet.png'
      }
    );

  }
  if ( check2 == true){

    facilities_mapping(
      Obj = {
        type  : 'bus',
        name  : "バス停",
        url   : 'json/bus.json',
        icons : 'image/bus.png'
      }
    );

  }
  if ( check3 == true){

    facilities_mapping(
      Obj = {
        type  : 'restaurant',
        name  : "レストラン",
        url   : 'json/restaurant.json',
        icons : 'image/restaurant.png'
      }
    );

  }
  if ( check4 == true){

    facilities_mapping(
      Obj = {
        type  : 'ishibumi',
        name  : "いしぶみ",
        url   : 'json/ishibumi.json',
        icons : 'image/isibumi.png'
      }
    );
 
  }
  if ( check5 == true){

    var endpoint = "https://sparql.city.kyoto.lg.jp/sparql/";
    var method = "POST";

    var query = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n' +  
    'PREFIX dc: <http://purl.org/dc/terms/>\n' + 'PREFIX ic: <http://imi.go.jp/ns/core/rdf#>\n' +  
    'select ?s ?name ?lat ?long ?bikou ?syubetucd\n' + 'where {\n' +  
    '?s dc:source <https://data.city.kyoto.lg.jp/node/14189>;\n' +  
    '  rdfs:label  ?name;\n' + '   ic:地理座標 / ic:緯度 ?lat;\n'  +  
    '   ic:地理座標 / ic:経度 ?long;\n' + '   ic:備考 ?bikou;\n' + '   ic:種別コード ?syubetucd.\n' +  
    '} ORDER BY ASC (?syubetucd)'; 

  //  alert(query); 
    sparqlQuery(query, endpoint, method, myCallback);

  }
  if ( check6 == true){

    facilities_mapping(
      Obj = {
        type  : 'accommodation',
        name  : "宿泊施設",
        url   : 'json/accommodation.json',
        icons : 'image/hotel.jpg'
      }
    );
 
  }

//funciotn終了
}

function sparqlQuery(queryStr, endpoint, method, callback) {
  var querypart = "query=" + encodeURIComponent(queryStr);

  // xmlhttpの生成
  var xmlhttp = null;
  if(window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else if(window.ActiveXObject) {
    // IE6以前への対応
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    alert('Perhaps your browser does not support XMLHttpRequests?');
  }

  // GETメソッドへの対応
  if (method == "GET") {
    endpoint += "?" + querypart;
    querypart = null;
  }

  // xmlhttpの設定
  xmlhttp.open(method, endpoint, true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");

  // レスポンスの処理をセット
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4) {
      if(xmlhttp.status == 200) {
        onSuccessQuery(xmlhttp.responseText, callback);
      } else {
        alert("Sparql query error: " + xmlhttp.status + " "
          + xmlhttp.responseText);
      }
    }
  }

  // リクエストの送信
  xmlhttp.send(querypart);
}

// ライブラリの補助関数（結果を配列に変換）
function onSuccessQuery(text, callback) {
  var jsonObj = eval('(' + text + ')');
  var head, rows;
  if (jsonObj.responseJSON) {
    head = jsonObj.responseJSON.head.vars;
    rows = jsonObj.responseJSON.results.bindings;
  } else {
    head = jsonObj.head.vars;
    rows = jsonObj.results.bindings;
  }
  if (rows.length === 0) {
    alert("Sparql query: No result");
    return;
  }
  callback(head, rows);
}


// 結果の出力
function myCallback(head, rows) {

  var markers = [];
  var latlng = map.getCenter();

  for (var i=0; i<rows.length; i++) {
  
    str_name[i] = "京都市施設" + "<br />";
    str_content[i] = rows[i].name.value + "<br />" + rows[i].bikou.value;
         
    str_lat[i] = parseFloat(rows[i].lat.value);
    str_long[i] = parseFloat(rows[i].long.value);

    var name = str_name[i]; 
    var content = str_content[i]; 
    var latlng = new google.maps.LatLng(str_lat[i],str_long[i]);
    var icons = 'image/sisetu.jpg';

    markers[i] = new google.maps.Marker({position: latlng,icon:icons,map: map});


    markerInfo2(markers[i], name,content);

  }


document.getElementById('loading').style.display = 'none';

}

function markerInfo(marker, name,map) {

  google.maps.event.addListener(marker, 'click', function (event) {
    new google.maps.InfoWindow({
      content: name
    }).open(marker.getMap(), marker);
  });
}

function markerInfo2(marker, name,content,map) {
  google.maps.event.addListener(marker, 'click', function (event) {
    new google.maps.InfoWindow({
      content: name + content 
    }).open(marker.getMap(), marker);
  });
}

function zoomIn() {
  var level = map.getZoom();
  level ++;
  map.setZoom(level);
}

function zoomOut() {
  var level = map.getZoom();
  if (level != 0){
    level --;
  }
  map.setZoom(level);
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

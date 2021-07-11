//グローバル変数
  var map;

  var str_lat = [];
  var str_long = [];
  var str_name = [];
  var str_content = [];

  var now_lat;
  var now_lng;

  var now_marker;
  var cycle_marker = [];
  var rental_marker = [];

  var mokuteki_marker;
  var station_name;

  var rental_cnt;
  var cycle_cnt;
  var localize_sign;

  var origin1;
  var destinationB;

  var currentWindow = null;

//オンロード時に地図を表示します
google.maps.event.addDomListener(window, 'load', initmap);
function initmap(){

  wk_size = 17;

  if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1)
    || navigator.userAgent.indexOf('iPod') > 0 
    || navigator.userAgent.indexOf('Android') > 0) {
    wk_size = 17;
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

       //現在地をストア
        now_lat       = data.latitude ;
        now_lng       = data.longitude ;

        var wmeshcd = cal_meshcode6(now_lat,now_lng);

        landmark_said(
          Obj = {
            type  : 'landmark',
            name  : "ランドマーク",
            url   : 'json/landmark.json',
            icons : 'image/toilet.png',
            cd    : wmeshcd
          }
        );

        // 位置情報
        var latlng = new google.maps.LatLng( lat , lng );

        // Google Mapsに書き出し
        createMap(lat,lng);

        //現在地のアイコンを追加
        var name = "現在地";
        var icons = 'image/genzai.png';

        now_marker = new google.maps.Marker({position: latlng,icon:icons,map: map});
        markerInfo(now_marker, name);

        //自転車のアイコンを表示
        cycle_mapping();

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
          "原因不明のエラーが発生しました。" ,
          "位置情報の取得が許可されませんでした。" ,
          "電波状況などで位置情報が取得できませんでした。" ,
          "位置情報の取得に時間がかかり過ぎてタイムアウトしました。"
        ];

        var errmessage = "京都市役所前を中心に地図を表示します。"; 

        // エラー番号
        var errorNo = error.code ;

        // エラーメッセージ
        var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] + errmessage ;

        // アラート表示
        alert( errorMessage ) ;

        // HTMLに書き出し
        // document.getElementById("result").innerHTML = errorMessage;

        // 位置情報
        var latlng = new google.maps.LatLng( 35.011619, 135.768167 ) ;

        // Google Mapsに書き出し
        createMap(35.011619,135.768167);

        now_lat       = 35.011619;
        now_lng       = 135.768167;

        //現在地のアイコンを追加
        var name = "現在地";
        var icons = 'image/genzai.png';

        now_marker = new google.maps.Marker({position: latlng,icon:icons,map: map});
        markerInfo(now_marker, name);

        //自転車のアイコンを表示
        cycle_mapping();

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
    // document.getElementById( 'result' ).innerHTML = errorMessage ;
  }

//funciotn終了
}



// //施設のチェックボックスの表示・非表示を切り替える
// function open_close(idImage){

//   var taisyou = document.getElementById('facility8');
//   if (taisyou.style.display == 'none') {

//     for(var i=1; i < 8; i++){
//       document.getElementById('facility' + i).style.display = 'none';
//     }
//     for(var i=8; i < 13; i++){
//       document.getElementById('facility' + i).style.display = 'inline-block';
//     }

//     document.getElementById(idImage).src = "image/" +  "pre.jpg";

//   } else {

//     for(var i=1; i < 8; i++){
//       document.getElementById('facility' + i).style.display = 'inline-block';
//     }
//     for(var i=8; i < 13; i++){
//       document.getElementById('facility' + i).style.display = 'none';
//     }

//     document.getElementById(idImage).src = "image/" +  "next.jpg";

//   }
// }

//現在地で探すボタンをクリックしたときのイベント
function reload(){

  document.getElementById('loading').style.display = 'block';

  // 対応している場合
  if( navigator.geolocation ){
  
    // 現在地を取得
    navigator.geolocation.getCurrentPosition(

      // [第1引数] 取得に成功した場合の関数
      function( position ){

        //元のアイコンを削除
        now_marker.setMap(null);

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

       //現在地をストア
        now_lat       = data.latitude ;
        now_lng       = data.longitude ;

        var wmeshcd = cal_meshcode6(now_lat,now_lng);

        landmark_said(
          Obj = {
            type  : 'landmark',
            name  : "ランドマーク",
            url   : 'json/landmark.json',
            icons : 'image/toilet.png',
            cd    : wmeshcd
          }
        );

        //現在地のアイコンを追加
        var name = "現在地";
        var icons = 'image/genzai.png';

        // 位置情報
        var latlng = new google.maps.LatLng( now_lat , now_lng );

        now_marker = new google.maps.Marker({position: latlng,icon:icons,map: map});
        markerInfo(now_marker, name);

        document.getElementById('loading').style.display = 'none';
        map.panTo(new google.maps.LatLng(now_lat,now_lng));

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

        now_lat       = 35.011619;
        now_lng       = 135.768167;

        //現在地のアイコンを追加
        var name = "現在地";
        var icons = 'image/genzai.png';

        var wmeshcd = cal_meshcode6(now_lat,now_lng);

        landmark_said(
          Obj = {
            type  : 'landmark',
            name  : "ランドマーク",
            url   : 'json/landmark.json',
            icons : 'image/toilet.png',
            cd    : wmeshcd
          }
        );

        // 位置情報
        var latlng = new google.maps.LatLng( now_lat , now_lng );

        now_marker = new google.maps.Marker({position: latlng,icon:icons,map: map});
        markerInfo(now_marker, name);

        document.getElementById('loading').style.display = 'none';
        map.panTo(new google.maps.LatLng(now_lat,now_lng));

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
    // document.getElementById( 'result' ).innerHTML = errorMessage ;

    now_lat       = 35.011619;
    now_lng       = 135.768167;

    //現在地のアイコンを追加
    var name = "現在地";
    var icons = 'image/genzai.png';

    // 位置情報
    var latlng = new google.maps.LatLng( now_lat , now_lng );

    now_marker = new google.maps.Marker({position: latlng,icon:icons,map: map});
    markerInfo(now_marker, name);

    document.getElementById('loading').style.display = 'none';
    map.panTo(new google.maps.LatLng(now_lat,now_lng));

  }

}


//クリックしたランドマーク目的地を地図上の中心に表示する。
function imgClick(wk_lat,wk_lng){
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

          var wk_lat = results[i].geometry.location.lat();
          var wk_lng = results[i].geometry.location.lng();

          // 住所を取得(日本の場合だけ「日本, 」を削除)
          var address = results[i].formatted_address.replace(/^日本, /, '');

          // 検索結果地が含まれるように範囲を拡大
          bounds.extend(latlng);

          origin1 = {lat: now_lat, lng: now_lng};
          destinationB = latlng;

        //目的地のアイコンを追加
          var name = "目的地<br>" + address;

          name += "<br><br><a href=\"javascript:void(0):\" id=\"root\" onClick=\"root();return false;\">現在地からのルート(徒歩)表示</a>";

          var icons = 'image/mokuteki.png';

          mokuteki_marker = new google.maps.Marker({position: latlng,icon:icons,map: map});
          markerInfo(mokuteki_marker, name);

        }
      }


      // 範囲を移動
      map.fitBounds(bounds);

      var wmeshcd = cal_meshcode6(wk_lat,wk_lng);

      landmark_said(
        Obj = {
          type  : 'landmark',
          name  : "ランドマーク",
          url   : 'json/landmark.json',
          icons : 'image/toilet.png',
          cd    : wmeshcd
        }
      );

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

  myOptions = {
    zoom: wk_size,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    gestureHandling: 'greedy',
    mapTypeControl: false,
    zoomControl: true,
    // zoomControl: false,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT
    },
    fullscreenControl:true,
    fullscreenControlOptions: { 
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    zoomControlOptions: { 
      position: google.maps.ControlPosition.TOP_RIGHT,
    }
  }; 

// Google Mapsに書き出し
  map = new google.maps.Map(document.getElementById("map_canvas"));

  map.setOptions(myOptions);

  document.getElementById('loading').style.display = 'none';

}


// //クリックした地下鉄の時刻表を表示する。
// function station(param,name){


//   $.ajax({
//     type: "GET",
//     scriptCharset: 'utf-8',
//     dataType:'json',
//     url: 'json/subway_karasuma_nobori.json',

//     success: function(json){


//       jsonData = json.subway_karasuma_nobori;
//       var len = jsonData.length;
 

//   var strHtml = "<div class=\"modal-inner2\" class=\"small\">";

//       strHtml += "<a href=\"#!\" class=\"modal-close\">閉じる</a>";

//       for(var i=0; i < len; i++){
//         var wk_name = jsonData[i].name;

//         if ( name == wk_name) {

  
//            strHtml +=  jsonData[i].時刻1 + "," + jsonData[i].時刻2 + "," + jsonData[i].時刻3 + "," + jsonData[i].時刻4 + "," + jsonData[i].時刻5 + ","; 
//            strHtml +=  jsonData[i].時刻6 + "," + jsonData[i].時刻7 + "," + jsonData[i].時刻8 + "," + jsonData[i].時刻9 + "," + jsonData[i].時刻10 + ","; 
//            strHtml +=  jsonData[i].時刻11 + "," + jsonData[i].時刻12 + "," + jsonData[i].時刻13 + "," + jsonData[i].時刻14 + "," + jsonData[i].時刻15 + ","; 
//            strHtml +=  jsonData[i].時刻16 + "," + jsonData[i].時刻17 + "," + jsonData[i].時刻18 + "," + jsonData[i].時刻19 + "," + jsonData[i].時刻20 + ","; 
//            strHtml +=  jsonData[i].時刻21 + "," + jsonData[i].時刻22 + "," + jsonData[i].時刻23 + "," + jsonData[i].時刻24 + "," + jsonData[i].時刻25 + ",";         
//            strHtml +=  jsonData[i].時刻26 + "," + jsonData[i].時刻27 + "," + jsonData[i].時刻28 + "," + jsonData[i].時刻29 + "," + jsonData[i].時刻30 + ",";  
//            strHtml +=  jsonData[i].時刻31 + "," + jsonData[i].時刻32 + "," + jsonData[i].時刻33 + "," + jsonData[i].時刻34 + "," + jsonData[i].時刻35 + ",";  
//            strHtml +=  jsonData[i].時刻36 + "," + jsonData[i].時刻37 + "," + jsonData[i].時刻38 + "," + jsonData[i].時刻39 + "," + jsonData[i].時刻40 + ",";  
//            strHtml +=  jsonData[i].時刻41 + "," + jsonData[i].時刻42 + "," + jsonData[i].時刻43 + "," + jsonData[i].時刻44 + "," + jsonData[i].時刻45 + ",";  
//            strHtml +=  jsonData[i].時刻46 + "," + jsonData[i].時刻47 + "," + jsonData[i].時刻48 + "," + jsonData[i].時刻49 + "," + jsonData[i].時刻50 + ",";  
//            strHtml +=  jsonData[i].時刻51 + "," + jsonData[i].時刻52 + "," + jsonData[i].時刻53 + "," + jsonData[i].時刻54 + "," + jsonData[i].時刻55 + ",";  
//            strHtml +=  jsonData[i].時刻56 + "," + jsonData[i].時刻57 + "," + jsonData[i].時刻58 + "," + jsonData[i].時刻59 + "," + jsonData[i].時刻60 + ",";  
//            strHtml +=  jsonData[i].時刻61 + "," + jsonData[i].時刻62 + "," + jsonData[i].時刻63 + "," + jsonData[i].時刻64 + "," + jsonData[i].時刻65 + ",";  
//            strHtml +=  jsonData[i].時刻66 + "," + jsonData[i].時刻67 + "," + jsonData[i].時刻68 + "," + jsonData[i].時刻69 + "," + jsonData[i].時刻70 + ",";  
//            strHtml +=  jsonData[i].時刻71 + "," + jsonData[i].時刻72 + "," + jsonData[i].時刻73 + "," + jsonData[i].時刻74 + "," + jsonData[i].時刻75 + ","; 
//            strHtml +=  jsonData[i].時刻76 + "," + jsonData[i].時刻77 + "," + jsonData[i].時刻78 + "," + jsonData[i].時刻79 + "," + jsonData[i].時刻80 + ","; 
//            strHtml +=  jsonData[i].時刻81 + "," + jsonData[i].時刻82 + "," + jsonData[i].時刻83 + "," + jsonData[i].時刻84 + "," + jsonData[i].時刻85 + ",";         
//            strHtml +=  jsonData[i].時刻86 + "," + jsonData[i].時刻87 + "," + jsonData[i].時刻88 + "," + jsonData[i].時刻89 + "," + jsonData[i].時刻90 + ",";  
//            strHtml +=  jsonData[i].時刻91 + "," + jsonData[i].時刻92 + "," + jsonData[i].時刻93 + "," + jsonData[i].時刻94 + "," + jsonData[i].時刻95 + ",";  
//            strHtml +=  jsonData[i].時刻96 + "," + jsonData[i].時刻97 + "," + jsonData[i].時刻98 + "," + jsonData[i].時刻99 + "," + jsonData[i].時刻100 + ",";  
//            strHtml +=  jsonData[i].時刻101 + "," + jsonData[i].時刻102 + "," + jsonData[i].時刻103 + "," + jsonData[i].時刻104 + "," + jsonData[i].時刻105 + ","; 
//            strHtml +=  jsonData[i].時刻106 + "," + jsonData[i].時刻107 + "," + jsonData[i].時刻108 + "," + jsonData[i].時刻109 + "," + jsonData[i].時刻110 + ","; 
//            strHtml +=  jsonData[i].時刻111 + "," + jsonData[i].時刻112 + "," + jsonData[i].時刻113 + "," + jsonData[i].時刻114 + "," + jsonData[i].時刻115 + ","; 
//            strHtml +=  jsonData[i].時刻116 + "," + jsonData[i].時刻117 + "," + jsonData[i].時刻118 + "," + jsonData[i].時刻119 + "," + jsonData[i].時刻120 + ","; 
//            strHtml +=  jsonData[i].時刻121 + "," + jsonData[i].時刻122 + "," + jsonData[i].時刻123 + "," + jsonData[i].時刻124 + "," + jsonData[i].時刻125 + ",";         
//            strHtml +=  jsonData[i].時刻126 + "," + jsonData[i].時刻127 + "," + jsonData[i].時刻128 + "," + jsonData[i].時刻129 + "," + jsonData[i].時刻130 + ",";  
//            strHtml +=  jsonData[i].時刻131 + "," + jsonData[i].時刻132 + "," + jsonData[i].時刻133 + "," + jsonData[i].時刻134 + "," + jsonData[i].時刻135 + ",";  
//            strHtml +=  jsonData[i].時刻136 + "," + jsonData[i].時刻137 + "," + jsonData[i].時刻138 + "," + jsonData[i].時刻139 + "," + jsonData[i].時刻140 + ",";  
//            strHtml +=  jsonData[i].時刻141 + "," + jsonData[i].時刻142 + "," + jsonData[i].時刻143 + "," + jsonData[i].時刻144 + "," + jsonData[i].時刻145 + ",";  
//            strHtml +=  jsonData[i].時刻146 + "," + jsonData[i].時刻147 + "," + jsonData[i].時刻148 + "," + jsonData[i].時刻149 + "," + jsonData[i].時刻150 + ",";  
//            strHtml +=  jsonData[i].時刻151 + "," + jsonData[i].時刻152 + "," + jsonData[i].時刻153 + "," + jsonData[i].時刻154 + "," + jsonData[i].時刻155 + ",";  
//            strHtml +=  jsonData[i].時刻156 + "," + jsonData[i].時刻157 + "," + jsonData[i].時刻158 + "," + jsonData[i].時刻159 + "," + jsonData[i].時刻160 + ",";  
//            strHtml +=  jsonData[i].時刻161 + "," + jsonData[i].時刻162 + "," + jsonData[i].時刻163 + "," + jsonData[i].時刻164;  
             

//           strHtml += "</div>";   

//           document.getElementById("modal-p02").style.display = 'inline-block';
//           document.getElementById("modal-p02").style.width = '70%';
//           document.getElementById("modal-p02").innerHTML = strHtml;


//         }
//       }
//     },
//     error:function(){
//       console.log('Miss..');
//     }
//   });

// }



//設備のアイコンを地図上に表示する。
function facilities_mapping(obj){
  var markers = [];

  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json',
    url: obj.url,

    success: function(json){

      jsonData = json[obj.type];
      var len = jsonData.length;


      for(var i=0; i < len; i++){
        var name= obj.name;
        // if (obj.name == "いしぶみ") { 
        //    name = "いしぶみ" + "<br />" + jsonData[i].name + "<br />" + jsonData[i].address;
        //   } 
        if (obj.name == "宿泊施設") { 
          name = "宿泊施設" + "<br />" + jsonData[i].施設名称１ + "<br />" + jsonData[i].旅館業の種別;
        } 
        if (obj.name == "観光情報") { 
          var tell_number = jsonData[i].電話番号１   || '';
          name = jsonData[i].名勝名 + "<br />" + jsonData[i].みもの説明 + "<br />" + tell_number;
           // name = "観光見もの情報" + "<br />" + jsonData[i].名勝名 + "<br />" + jsonData[i].みもの説明 + "<br />" + jsonData[i].電話番号１;
        } 
        if (obj.name == "AED") { 
          name = "AED" + "<br />" + jsonData[i].name + "<br />" + jsonData[i].establishment + "<br />" + jsonData[i].setsumei + "<br />";
          name += jsonData[i].holiday + "<br />" + "website：<a href=\"" + jsonData[i].url + "\" target=_blank>" +  jsonData[i].url + "</a>";
        } 
        if (obj.name == "自転車ショップ") { 
          name = "自転車ショップ" + "<br />" + jsonData[i].店名 + "<br />" + jsonData[i].住所 + "<br />" + jsonData[i].電話;
        }
        // if (obj.name == "地下鉄") { 
        //   name = "地下鉄" + jsonData[i].line + "<br />" + jsonData[i].name;

        //   station_name = jsonData[i].name;
        //   if (jsonData[i].line == "烏丸線") { 
        //     name += "<br><a href=\"#modal-p02\">(烏丸線（上り）時刻表表示)</a>"; 
        //   }
        // } 
        var latlng = new google.maps.LatLng(jsonData[i].latitude,jsonData[i].longitude);
        var icons = obj.icons;
        markers[i] = new google.maps.Marker({position: latlng,icon:icons,map: map});

        if (obj.name != "地下鉄") {
          markerInfo(markers[i], name);
        }
        // else {
        //   markerInfo3(markers[i], name,station_name);
        // }
      }
    },
    error:function(){
      console.log('Miss..');
    }
  });

}

//ランドマークの画像をweb上に表示する。
function landmark_said(obj){
  var markers = [];

  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json',
    url: obj.url,

    success: function(json){

      jsonData = json[obj.type];
      var len = jsonData.length;

      for(var i=1; i < 5; i++){
        document.getElementById('landmark' + i).style.display = 'none';
      }

      var cnt = 1;

      for(var i=0; i < len; i++){
        var name= obj.name;

        if (jsonData[i].worldmeshcd == obj.cd) {

          if (cnt < 5) {

            var wk_text = "<a href=\"#\" onclick=\"imgClick(" + jsonData[i].latitude + "," +  jsonData[i].longitude + ");\">"
            wk_text += wk_text + jsonData[i].name + "</a>"; 

            document.getElementById('landmarkname' + cnt).innerHTML = wk_text;
            document.getElementById('landmarkname' + cnt).style.display = 'inline';

            document.getElementById('landmark' + cnt).src = "image/landmark/" + jsonData[i].imgsrc;
            document.getElementById('landmark' + cnt).style.display = 'inline-block';

            cnt ++;
          }
        }
      }

      for( i=cnt; i < 5; i++){
        document.getElementById('landmarkname' + i).style.display = 'none';
      }

    },
    error:function(){
      console.log('Miss..');
    }

  });

}


//徒歩ルートを地図に表示
function root(){ 

  /* ルート検索を行う */
  var directionsService = new google.maps.DirectionsService();

  /* ルート検索の結果を表示するためのオブジェクトを生成 */
  var directionsRenderer = new google.maps.DirectionsRenderer(); 

  /* mapObj を DirectionsRendererオブジェクトのsetMap()を使って関連付け */
  directionsRenderer.setMap(map);

  /* 開始地点と目的地点、ルーティングの種類を設定  */
  var request = {
      origin: origin1,
      destination: destinationB,
      travelMode: google.maps.TravelMode.WALKING
    };

  directionsService.route(request, function(result, status) {

    /* ルート検索に成功したら以下の処理 */
    if (status == google.maps.DirectionsStatus.OK) {

      /* ルートをマップ上に表示 */
      directionsRenderer.setDirections(result);
    }
  });

/* function終了 */
}

// 駐輪場とレンタサイクルの表示・非表示を切り替える
function siborikomi(filter){

 if (localize_sign == '中国語'){
    var filter_name = {
      0: '全部表示' ,
      1: '只?空??停车位' ,
      2: '仅限停车位',
      3: '自行车出租'
    };
  } 
 else if (localize_sign == '英語'){
    var filter_name = {
      0: 'Show All' ,
      1: 'Display of parking lot for free time' ,
      2: 'Display of parking lot',
      3: 'View Rental Cycles only'
    };
  } 
 else  { 
    var filter_name = {
      0: 'すべて表示' ,
      1: '無料時間がある駐輪場の表示' ,
      2: '駐輪場のみの表示',
      3: 'レンタサイクルのみの表示'
    };
  } 


  if(filter > 0){
    for(var i=1; i < 4; i++){
      document.getElementById('hihyouji' + i).style.display = 'none';
    }
    document.getElementById('hihyouji4').innerHTML = filter_name[filter];
    document.getElementById('hihyouji4').style.display = 'inline-block';
    document.getElementById('hihyouji5').style.display = 'inline-block';

  }else{
    for(var i=1; i < 4; i++){
        document.getElementById('hihyouji' + i).style.display = 'inline-block';
    }
    document.getElementById('hihyouji4').style.display = 'none';
    document.getElementById('hihyouji5').style.display = 'none';
  }

  // 無料時間がある駐輪場の表示
  if(filter == 1){
    //
    for(var i=0; i < cycle_cnt; i++){
      if (cycle[i].freetime == ""){
        cycle_marker[i].setVisible(false); //無料時間のない駐輪場は非表示
      }
    }
    for(var i=0; i < rental_cnt; i++){
       rental_marker[i].setVisible(false); // レンタサイクルは非表示
    }

  // 駐輪場のみの表示
  }else if(filter == 2){
    for(var i=0; i < rental_cnt; i++){
       rental_marker[i].setVisible(false); // レンタサイクルは非表示
    }

  // レンタサイクルのみの表示
  }else if(filter == 3){
    for(var i=0; i < cycle_cnt; i++){
      cycle_marker[i].setVisible(false); // 駐輪場は非表示
    }

  // すべて表示
  }else{
    for(var i=0; i < cycle_cnt; i++){
        cycle_marker[i].setVisible(true); // 駐輪場を表示
    }
    for(var i=0; i < rental_cnt; i++){
      rental_marker[i].setVisible(true);  // レンタサイクルを表示
    }
  }
}



//自転車のアイコンを作成し、地図上に表示する。
function cycle_mapping(){

  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json',
    url: 'json/cycle.json',

    success: function(json){

      cycle = json.cycle;
      var len = cycle.length;
      cycle_cnt = len; 

      for(var i=0; i < len; i++){

        var name = cycle[i].shisetsu;
        var latlng = new google.maps.LatLng(cycle[i].latitude,cycle[i].longitude);
        var icons = 'image/icon_cycle.png';
        createMarker(name,latlng,icons,map,i);
      }
    },

    error:function(){
      console.log('Miss..');
    }
  });


  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json',
    url: 'json/rentalshop.json',

    success: function(json){

      rentalshop = json.rentalshop;
      var len = rentalshop.length;
      rental_cnt = len; 

      for(var i=0; i < len; i++){

        var name = rentalshop[i].name + "<br>定休日：" + rentalshop[i].holiday + "<br>営業時間：" + rentalshop[i].setsumei + "<br>website：<a href=\"" + rentalshop[i].website;
        name += "\" target=_blank>" +  rentalshop[i].website + "</a>"; 
        var latlng = new google.maps.LatLng(rentalshop[i].latitude,rentalshop[i].longitude);
        var icons = 'image/rentalshop.png';
        createMarker2(name,latlng,icons,map,i);

      }
    },

    error:function(){
      console.log('Miss..');
    }
  });

}

function createMarker(name,latlng,icons,map,i){

  var wk_link = "<a href=\"#modal-p01\">(詳細はこちら)</a>"; 
  var wk_name =  "<div id='infoWindow'>" + name + wk_link +"</div>";

  var infoWindow = new google.maps.InfoWindow( {
  	position: map.getCenter() ,
          maxWidth: 200
  } ) ;


  cycle_marker[i] = new google.maps.Marker({position: latlng,icon:icons,map: map});
  google.maps.event.addListener(cycle_marker[i], 'click', function() {

    //他の吹き出しを閉じる
    now_infowindow.close();
    document.getElementById('loading').style.display = 'block';

    origin1 = {lat: now_lat, lng: now_lng};
    destinationB = latlng;

    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
      origins: [origin1],
      destinations: [destinationB],
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function(response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;

        var wk_distance = parseFloat(response.rows[0].elements[0].distance.value);
        var wk_minute = Math.ceil(wk_distance / 200);

        var append_message = "<br>現在地から" + wk_distance + "m。<br>自転車で約" + wk_minute + "分です!"

        var  wk_root = "<br><br><a href=\"javascript:void(0):\" id=\"root\" onClick=\"root();return false;\">現在地からのルート(徒歩)表示</a>";
        wk_name =  "<div id='infoWindow'><a href=\"#modal-p01\"><u>" + name  + "</u></a>" + append_message + wk_root + "</div>";
        // wk_name =  "<div id='infoWindow'>" + name  + wk_link + append_message + wk_root + "</div>";

        if (currentWindow) {
          currentWindow.close();
        }
        infoWindow.setContent(wk_name);
        infoWindow.open(map,cycle_marker[i]);
        currentWindow = infoWindow;

        document.getElementById('loading').style.display = 'none';

        // 右側に駐輪場のいろいろな情報を表示
        cicle_detail(name,map);

      }
    });
  });
}

function createMarker2(name,latlng,icons,map,i){

  name = "レンタサイクルショップ<br>" + name; 
  var wk_name =  "<div id='infoWindow'>" + name + "</div>";

var infoWindow = new google.maps.InfoWindow( {
	position: map.getCenter() ,
        maxWidth: 200
} ) ;


  rental_marker[i]= new google.maps.Marker({position: latlng,icon:icons,map: map});
  google.maps.event.addListener(rental_marker[i], 'click', function() {

    document.getElementById('loading').style.display = 'block';

    origin1 = {lat: now_lat, lng: now_lng};
    destinationB = latlng;

    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
      origins: [origin1],
      destinations: [destinationB],
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function(response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;

        var wk_distance = parseFloat(response.rows[0].elements[0].distance.value);
        var wk_minute = Math.ceil(wk_distance / 200);

        var append_message = "<br>現在地から" + wk_distance + "m。";
            append_message += "<br>自転車で約" + wk_minute + "分です!";
            append_message += "<br><a href=\"javascript:void(0):\" id=\"root\" onClick=\"root();return false;\">(ルート(徒歩)表示)</a>";

        wk_name =  "<div id='infoWindow'>" + name + append_message + "</div>"; 

        if (currentWindow) {
          currentWindow.close();
        }
        infoWindow.setContent(wk_name);
        infoWindow.open(map,rental_marker[i]);
        currentWindow = infoWindow;

        document.getElementById('loading').style.display = 'none';

      }
    });
  });
}

// 駐輪場の情報を表示する関数です！
function cicle_detail(name,map){

  var strHtml = "<div class=\"modal-inner\">";

      strHtml += "<a href=\"#!\" class=\"modal-close\">閉じる</a>";
  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json',
    url: 'json/cycle.json',

    success: function(json){

      cycle = json.cycle;
      var len = cycle.length;

      for(var i=0; i < len; i++){
        var wk_name = cycle[i].shisetsu;

        if ( name == wk_name) {

          //nullが設定されている場合は、「情報なし」と表示する。
          cycle[i].gentuki   = cycle[i].gentuki   || '情報なし';
          cycle[i].chari     = cycle[i].chari     || '情報なし';
          cycle[i].bike      = cycle[i].bike      || '情報なし';
          cycle[i].nirin     = cycle[i].nirin     || '情報なし';
          cycle[i].charirate = cycle[i].charirate || '情報なし';
          cycle[i].bikerate  = cycle[i].bikerate  || '情報なし';
          cycle[i].gentuki   = cycle[i].gentuki   || '情報なし';
          cycle[i].nirinrate = cycle[i].nirinrate || '情報なし';
          cycle[i].jidourate = cycle[i].jidourate || '情報なし';

          strHtml += "<table class=\"type6\"><caption>";  
          strHtml += "<tr class=\"kbn\"><td colspan=\"4\">名称</td></tr>" 
          strHtml += "<tr><td colspan=\"4\">" + cycle[i].shisetsu + "</td></tr>";


          // strHtml += "<tr class=\"kbn\"><td>民営種別</td><td>最寄り沿線</td><td colspan=\"2\">最寄り駅</td></tr>" 
          // strHtml += "<tr><td>" + cycle[i].kouei + "</td><td>" + cycle[i].koukyou + "</td><td colspan=\"2\">" + cycle[i].moyori + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td>連絡先</td><td colspan=\"3\">住所</td></tr>" 
          strHtml += "<tr><td>" + cycle[i].tel + "</td><td colspan=\"3\">" + cycle[i].address + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td colspan=\"4\">駐輪台数</td></tr>" 
          strHtml += "<tr class=\"kbn\"><td>自転車</td><td>バイク</td><td>原付</td><td>二輪</td></tr>" 
          strHtml += "<tr><td>" + cycle[i].chari + "</td><td>" + cycle[i].bike + "</td><td>" + cycle[i].gentuki + "</td><td>" + cycle[i].nirin + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td colspan=\"4\">料金</td></tr>" 
          strHtml += "<tr class=\"kbn\"><td>自転車</td><td>バイク</td><td>原付</td><td>二輪</td></tr>" 
          strHtml += "<tr><td>" + cycle[i].charirate + "</td><td>" + cycle[i].bikerate + "</td><td>" + cycle[i].nirinrate + "</td><td>" + cycle[i].jidourate + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td colspan=\"4\">料金の詳細説明</td></tr>" 
          strHtml += "<tr><td colspan=\"4\">" + cycle[i].setumei + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td colspan=\"3\">無料時間</td><td>月極めの有無</td></tr>" 
          strHtml += "<tr><td colspan=\"3\">" + cycle[i].freetime + "</td><td>" + cycle[i].tukigime + "</td></tr>";


          strHtml += "<tr class=\"kbn\"><td colspan=\"2\">営業開始</td><td colspan=\"2\">営業終了</td></tr>" 
          strHtml += "<tr><td colspan=\"2\">" + cycle[i].kaisi + "</td><td colspan=\"2\">" + cycle[i].end + "</td></tr>";

          strHtml += "</table>";   
          strHtml += "</div>";   


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


function recomend(){

  wk_size = map.getZoom();
  var latlng = map.getCenter();

  var lat = latlng.lat();
  var lng = latlng.lng();

  var myOptions = {
    zoom: wk_size,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    gestureHandling: 'greedy',
    mapTypeControl: false,
    // zoomControl: false
    zoomControl: true
  };

  // Google Mapsに書き出し
  createMap(lat,lng);


    //現在地のアイコンを追加
    var name = "現在地";
    var icons = 'image/genzai.png';

    // 位置情報
    var latlng = new google.maps.LatLng( now_lat , now_lng );

    now_marker = new google.maps.Marker({position: latlng,icon:icons,map: map});
    markerInfo(now_marker, name);


  recomendMarker(); 
}


//観光地のアイコンを地図に追加します。
function recomendMarker(){

  check1 = document.Option.check1.checked;
  check2 = document.Option.check2.checked;
  check3 = document.Option.check3.checked;
  check4 = document.Option.check4.checked;
  check5 = document.Option.check5.checked;
  check6 = document.Option.check6.checked;
  check7 = document.Option.check7.checked;
  check8 = document.Option.check8.checked; 

  var markers = [];

  //最初に自転車のアイコンを表示
  cycle_mapping();


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
        type  : 'mimono',
        name  : "観光情報",
        url   : 'json/mimono.json',
        icons : 'image/mimono.png'
      }
    );

  }
  if ( check3 == true){

    facilities_mapping(
      Obj = {
        type  : 'bus',
        name  : "バス停",
        url   : 'json/bus.json',
        icons : 'image/bus.png'
      }
    );

  }
  if ( check4 == true){

    var endpoint = "https://sparql.city.kyoto.lg.jp/sparql/";
    var method = "POST";

    var query = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n' +  
    'PREFIX dc: <http://purl.org/dc/terms/>\n' + 'PREFIX ic: <http://imi.go.jp/ns/core/rdf#>\n' +  
    'select ?s ?name ?lat ?long ?bikou ?syubetucd\n' + 'where {\n' +  
    '?s dc:source <https://data.city.kyoto.lg.jp/node/14189>;\n' +  
    '  rdfs:label  ?name;\n' + '   ic:地理座標 / ic:緯度 ?lat;\n'  +  
    '   ic:地理座標 / ic:経度 ?long;\n' + '   ic:備考 ?bikou;\n' + '   ic:種別コード ?syubetucd.\n' +  
    '} ORDER BY ASC (?syubetucd)'; 

    sparqlQuery(query, endpoint, method, myCallback);

  }
  if ( check5 == true){

    facilities_mapping(
      Obj = {
        type  : 'bicycleshop',
        name  : "自転車ショップ",
        url   : 'json/bicycle.json',
        icons : 'image/bicycle_shop.png'
      }
    );
 
  }
  if ( check6 == true){

    facilities_mapping(
      Obj = {
        type  : 'subway',
        name  : "地下鉄",
        url   : 'json/subway.json',
        icons : 'image/subway.jpg'
      }
    );
 
  }
  if ( check7 == true){

    facilities_mapping(
      Obj = {
        type  : 'accommodation',
        name  : "宿泊施設",
        url   : 'json/accommodation.json',
        icons : 'image/hotel.png'
      }
    );
 
  }
  if ( check8 == true){

    facilities_mapping(
      Obj = {
        type  : 'aed',
        name  : "AED",
        url   : 'json/aed.json',
        icons : 'image/aed.jpg'
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
    var icons = 'image/sisetu.png';

    markers[i] = new google.maps.Marker({position: latlng,icon:icons,map: map});


    markerInfo2(markers[i], name,content);

  }


document.getElementById('loading').style.display = 'none';

}

var now_infowindow = new google.maps.InfoWindow({maxWidth: 200});

function markerInfo(marker, name,map) {
  google.maps.event.addListener(marker, 'click', function (event) {
    currentWindow.close();
    now_infowindow.close();
    now_infowindow.setContent(name);
    now_infowindow.open(marker.getMap(), marker);
  });
}

function markerInfo2(marker, name,content,map) {
  google.maps.event.addListener(marker, 'click', function (event) {
    new google.maps.InfoWindow({
      content: name + content,
     maxWidth: 200 
    }).open(marker.getMap(), marker);
  });
}


function markerInfo3(marker, name,station_name) {
  google.maps.event.addListener(marker, 'click', function (event) {

     station(1,station_name); 

    new google.maps.InfoWindow({
      content: name,
     maxWidth: 200
    }).open(marker.getMap(), marker);
  });
}



// function zoomIn(level) {
//   map.setZoom(level);
// }

// function zoomOut() {
//   var level = map.getZoom();
//   if (level != 0){
//     level --;
//   }
//   map.setZoom(level);
// }


function cal_meshcode6(latitude, longitude){

    var mesh;
    if(latitude < 0){
          o = 4;
    }
    else{
          o = 0;
    }
    if(longitude < 0){
          o = o + 2;
    }
    if(Math.abs(longitude) >= 100) o = o + 1;
    z = o % 2;
    y = ((o-z)/2) % 2;
    x = (o - 2*y - z)/4;
    o = o + 1;
    latitude = (1-2*x)*latitude;
    longitude = (1-2*y)*longitude;
    p = Math.floor(latitude*60/40);
    a = (latitude*60/40-p)*40;
    q = Math.floor(a/5);
    b = (a/5-q)*5;
    r = Math.floor(b*60/30);
    c = (b*60/30-r)*30;
    s2u = Math.floor(c/15);
    d = (c/15-s2u)*15;
    s4u = Math.floor(d/7.5);
    e = (d/7.5-s4u)*7.5;
    s8u = Math.floor(e/3.75);
    u = Math.floor(longitude-100*z);
    f = longitude-100*z-u;
    v = Math.floor(f*60/7.5);
    g = (f*60/7.5-v)*7.5;
    w = Math.floor(g*60/45);
    h = (g*60/45-w)*45;
    s2l = Math.floor(h/22.5);
    i = (h/22.5-s2l)*22.5;
    s4l = Math.floor(i/11.25);
    j = (i/11.25-s4l)*11.25;
    s8l = Math.floor(j/5.625);
    s2 = s2u*2+s2l+1;
    s4 = s4u*2+s4l+1;
    s8 = s8u*2+s8l+1;
    if(u < 10){
       if(p < 10){
           mesh = String(o)+'00'+String(p)+'0'+String(u)+String(q)+String(v)+String(r)+String(w)+String(s2)+String(s4)+String(s8);
       }else{
           if(p < 100){
               mesh = String(o)+'0'+String(p)+'0'+String(u)+String(q)+String(v)+String(r)+String(w)+String(s2)+String(s4)+String(s8);
           }
           else{
               mesh = String(o)+String(p)+'0'+String(u)+String(q)+String(v)+String(r)+String(w)+String(s2)+String(s4)+String(s8);
           }
       }
    }else{
       if(p < 10){
            mesh = String(o)+'00'+String(p)+String(u)+String(q)+String(v)+String(r)+String(w)+String(s2)+String(s4)+String(s8);
       }else{
           if(p < 100){
                mesh = String(o)+'0'+String(p)+String(u)+String(q)+String(v)+String(r)+String(w)+String(s2)+String(s4)+String(s8);
           }else{
                mesh = String(o)+String(p)+String(u)+String(q)+String(v)+String(r)+String(w)+String(s2)+String(s4)+String(s8);
           }
       }
    }

    return(mesh.substr(0,10));

}

//多言語対応
window.onload = function set_language(){
 
  // ブラウザの言語を取得する
  var lang = (navigator.language) ? navigator.language : navigator.userLanguage;
  // ただし、どちらのプロパティにも対応していないブラウザではundefinedになる

  if(lang === undefined)
    lang = "ja"; // 不明のときは日本語と見なす

  if(lang.toLowerCase().indexOf("ja") !== -1){
    localize('日本語');
    // 日本語のときの処理
  }
  else{
    // 日本語以外のときの処理
    localize('英語');
  }
}

function localize(arg_language){

  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json',
    url: 'json/localize.json',

    success: function(json){

      jsonData = json.localize;
      var len = jsonData.length;

      var language  = arg_language;
      localize_sign = arg_language;

  　　  document.getElementById('address').placeholder = jsonData[0][language];
  　　  document.getElementById('btn1').value = jsonData[1][language];
  　　  document.getElementById('localize1').innerText = jsonData[2][language];
  　　  document.getElementById('localize2').innerText = jsonData[3][language];
  　　  document.getElementById('localize3').innerText = jsonData[4][language];
  　　  document.getElementById('localize4').innerText = jsonData[5][language];

  　　  document.getElementById('localize5').innerText = jsonData[6][language];
  　　  document.getElementById('localize6').innerText = jsonData[7][language];
  　　  document.getElementById('localize7').innerText = jsonData[8][language];
  　　  document.getElementById('localize8').innerText = jsonData[9][language];
  　　  document.getElementById('localize9').innerText = jsonData[10][language];
  　　  document.getElementById('localize10').innerText = jsonData[11][language];
  // 　　  document.getElementById('localize11').innerText = jsonData[12][language];
  　　  document.getElementById('localize12').innerText = jsonData[13][language];
  　　  document.getElementById('localize13').innerText = jsonData[14][language];
  // 　　  document.getElementById('localize14').innerText = jsonData[15][language];
  // 　　  document.getElementById('localize15').innerText = jsonData[16][language];
  // 　　  document.getElementById('localize16').innerText = jsonData[17][language];


  // 　　  document.getElementById('localize17').innerText = jsonData[18][language];
  　　  document.getElementById('localize18').innerText = jsonData[19][language];
  　　  document.getElementById('localize19').innerText = jsonData[20][language];
  // 　　  document.getElementById('navbarDropdown').innerText = jsonData[21][language];
  // 　　  document.getElementById('localize21').innerText = jsonData[22][language];
  // 　　  document.getElementById('localize22').innerText = jsonData[23][language];

  　　  document.getElementById('localize23').value = jsonData[24][language];
  // 　　  document.getElementById('localize24').innerText = jsonData[25][language];
      document.getElementById('localize31').innerText = jsonData[32][language];
     // }

    },
    error:function(){
      console.log('Miss..');
    }
  });

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

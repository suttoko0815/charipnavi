
 //グローバル変数;  
   var map; 

   // var wk_size; 

   var str_lat = [];
   var str_long = [];
   var str_name = []; 
   var str_content = []; 

   var now_lat; 
   var now_lng; 

   var now_marker; 
   var cycle_marker = [];
   var rental_marker = [];
   
   var rental_cnt; 
   var cycle_cnt;  

   var origin1;
   var destinationB;


function open_close(idImage){

  var taisyou = document.getElementById('facility8');
  if (taisyou.style.display == 'none') {
     taisyou.style.display = 'inline-block';

     for(var i=1; i < 8; i++){

            document.getElementById('facility' + i).style.display = 'none';
     //         document.getElementById('landmarkname' + cnt).style.display = 'none';

       }         

     document.getElementById(idImage).src = "image/" +  "pre.jpg";

  } else {
     taisyou.style.display = 'none';

//     document.getElementById(eid3).style.display = 'none';
//     document.getElementById(eid4).style.display = 'none';

     for(var i=1; i < 8; i++){

            document.getElementById('facility' + i).style.display = 'inline-block';
     //         document.getElementById('landmarkname' + cnt).style.display = 'none';

       }         

     document.getElementById(idImage).src = "image/" +  "next.jpg";

  }
}

//現在地で探すボタンをクリックしたときのイベント
function reload(){
//  location.reload();

  document.getElementById('loading').style.display = 'block';

 // 対応している場合
  if( navigator.geolocation ){
  
    // 現在地を取得
    navigator.geolocation.getCurrentPosition(

      // [第1引数] 取得に成功した場合の関数
      function( position ){

       //元のアイコン削除

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

     var wmeshcd = meshkeisan(now_lat,now_lng);  
  
    landmark_said(
      Obj = {
        type  : 'landmark',
        name  : "ランドマーク",
        url   : 'json/landmark.json',
        icons : 'image/toilet.png',
        cd    : wmeshcd
      }
    );

        // アラート表示
        // alert( "あなたの現在位置は、\n[" + lat + "," + lng + "]\nです。" ) ;

        // HTMLへの書き出し
        document.getElementById( 'result' ).innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd><dt>高度</dt><dd>' + alt + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng + '</dd><dt>高度の精度</dt><dd>' + accAlt + '</dd><dt>方角</dt><dd>' + heading + '</dd><dt>速度</dt><dd>' + speed + '</dd></dl>' ;


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

        // HTMLに書き出し
        document.getElementById("result").innerHTML = errorMessage;

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

var currentWindow = null;

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

          // あとはご自由に・・・。
          new google.maps.InfoWindow({
            content: address
          }).open(map, new google.maps.Marker({
            position: latlng,
            map: map
          }));
        }
      }


      // 範囲を移動
      map.fitBounds(bounds);

    var wmeshcd = meshkeisan( wk_lat, wk_lng );  

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
    gestureHandling: 'greedy',
    mapTypeControl: false,
    zoomControl: false,
//    zoomControl:true,
//    zoomControlOptions: {
//      style:google.maps.ZoomControlStyle.LARGE,
//      position: google.maps.ControlPosition.TOP_RIGHT
//    },
    fullscreenControl:true,
    fullscreenControlOptions: { 
      position: google.maps.ControlPosition.RIGHT_BOTTOM  
    } 

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
        if (obj.name == "観光見もの情報") { 
           name = "観光見もの情報" + "<br />" + jsonData[i].名勝名 + "<br />" + jsonData[i].みもの説明 + "<br />" + jsonData[i].電話番号１;
          } 
        if (obj.name == "AED") { 
           name = "AED" + "<br />" + jsonData[i].name + "<br />" + jsonData[i].establishment + "<br />" + jsonData[i].setsumei + "<br />";
           name += jsonData[i].holiday + "<br />" + "website：<a href=\"" + jsonData[i].url + "\" target=_blank>" +  jsonData[i].url + "</a>";
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

//ランドマークの画像をweb上に表示する。
function landmark_said(obj){
  var markers = [];


  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json', // コレを忘れてた！！
    url: obj.url,

    success: function(json){

      jsonData = json[obj.type];
      var len = jsonData.length;

     for(var i=1; i < 5; i++){

            document.getElementById('landmark' + i).style.display = 'none';
     //         document.getElementById('landmarkname' + cnt).style.display = 'none';

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

//オンロード時に地図を表示します
function initmap(){

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

       //現在地をストア
        now_lat       = data.latitude ;
        now_lng       = data.longitude ;

     var wmeshcd = meshkeisan(now_lat,now_lng);  
  
    landmark_said(
      Obj = {
        type  : 'landmark',
        name  : "ランドマーク",
        url   : 'json/landmark.json',
        icons : 'image/toilet.png',
        cd    : wmeshcd
      }
    );

        // アラート表示
        // alert( "あなたの現在位置は、\n[" + lat + "," + lng + "]\nです。" ) ;

        // HTMLへの書き出し
        document.getElementById( 'result' ).innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd><dt>高度</dt><dd>' + alt + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng + '</dd><dt>高度の精度</dt><dd>' + accAlt + '</dd><dt>方角</dt><dd>' + heading + '</dd><dt>速度</dt><dd>' + speed + '</dd></dl>' ;

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

        now_lat       = 35.011619;
        now_lng       = 135.768167;

        //現在地のアイコンを追加
        var name = "現在地";
        var icons = 'image/genzai.png';

        now_marker = new google.maps.Marker({position: latlng,icon:icons,map: map});
        markerInfo(now_marker, name);

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

//徒歩ルートを地図に表示
function root(){ 
     
  alert("root");

  alert(origin1);

  alert(destinationB);

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

function siborikomi(index){ 

  wk_size = map.getZoom(); 
  var latlng = map.getCenter();

  var lat = latlng.lat();
  var lng = latlng.lng();


  // Google Mapsに書き出し
 // createMap(lat,lng);

  //var wk_index = document.myform.keyword.selectedIndex;
  //var filter   = document.myform.keyword.options[index].value;

  cycle_mapping(index);

} 



//自転車のアイコンを地図上に表示する。
function cycle_mapping(filter){


      if (filter == 1) {
          //レンタサイクルは表示

          for(var i=1; i < 4; i++){

              document.getElementById('hihyouji' + i).style.display = 'none';

            }         

          document.getElementById('hihyouji4').innerHTML = "無料時間がある駐輪場の表示";
          document.getElementById('hihyouji4').style.display = 'inline-block';
          document.getElementById('hihyouji5').style.display = 'inline-block';

       }

      if (filter == 3) {
          //レンタサイクルは表示

          for(var i=1; i < 4; i++){

              document.getElementById('hihyouji' + i).style.display = 'none';

            }         

          document.getElementById('hihyouji4').innerHTML = "レンタサイクルのみの表示";
          document.getElementById('hihyouji4').style.display = 'inline-block';
          document.getElementById('hihyouji5').style.display = 'inline-block';

       } 

      if (filter == 2) {
          //レンタサイクルは表示

          for(var i=1; i < 4; i++){

              document.getElementById('hihyouji' + i).style.display = 'none';

            }         

          document.getElementById('hihyouji4').innerHTML = "駐輪場のみの表示";
          document.getElementById('hihyouji4').style.display = 'inline-block';
          document.getElementById('hihyouji5').style.display = 'inline-block';

       } 


      if (filter == 4) {
          //レンタサイクルは表示

          for(var i=1; i < 4; i++){

              document.getElementById('hihyouji' + i).style.display = 'inline-block';

            }         

          document.getElementById('hihyouji4').style.display = 'none';
          document.getElementById('hihyouji5').style.display = 'none';

       } 


  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json', // コレを忘れてた！！
    url: 'json/cycle.json',

    success: function(json){

      cycle = json.cycle;
      var len = cycle.length;
      cycle_cnt = len; 

      if (filter == 3 || filter == 4) {
          //レンタサイクルは表示

              for(var i=0; i < rental_cnt; i++){
                  rental_marker[i].setVisible(true); // Marker を表示にする
              } 

      } 

      if (filter == 1 || filter == 2 || filter == 4) {
          //駐輪場は表示

              for(var i=0; i < cycle_cnt; i++){
                  cycle_marker[i].setVisible(true); // Marker を表示にする
              } 

      } 

      for(var i=0; i < len; i++){

        if (filter == 3) {

          //レンタサイクルの場合は表示しない
           cycle_marker[i].setVisible(false); // Marker を非表示にする

        }

        if (filter == 1) {
          //無料期間がない駐輪場は表示しない
          if (cycle[i].freetime == ""){

              cycle_marker[i].setVisible(false); // Marker を非表示にする
           
          }
        }

       if  (filter == 0) {
          var name = cycle[i].shisetsu;
          var latlng = new google.maps.LatLng(cycle[i].latitude,cycle[i].longitude);
          var icons = 'image/icon_cycle.png';
          createMarker(name,latlng,icons,map,i);
        }
      }
    },

    error:function(){
      console.log('Miss..');
    }
  });


  $.ajax({
    type: "GET",
    scriptCharset: 'utf-8',
    dataType:'json', // コレを忘れてた！！
    url: 'json/rentalshop.json',

    success: function(json){

      rentalshop = json.rentalshop;
      var len = rentalshop.length;
      rental_cnt = len; 

      for(var i=0; i < len; i++){

        if (filter == 1 || filter == 2) {

          //レンタサイクル以外の場合は表示しない
           rental_marker[i].setVisible(false); // Marker を非表示にする
       
        }

       if  (filter == 0) {
          var name = rentalshop[i].name + "<br>定休日：" + rentalshop[i].holiday + "<br>営業時間：" + rentalshop[i].setsumei + "<br>website：<a href=\"" + rentalshop[i].website;
          name += "\" target=_blank>" +  rentalshop[i].website + "</a>"; 
          var latlng = new google.maps.LatLng(rentalshop[i].latitude,rentalshop[i].longitude);
          var icons = 'image/rentalshop.jpg';
          createMarker2(name,latlng,icons,map,i);
        }

      }
    },

    error:function(){
      console.log('Miss..');
    }
  });

}

function createMarker(name,latlng,icons,map,i){

  var wk_link = "<br><a href=\"#modal-p01\">詳細はこちら</a>"; 
 
  var wk_name =  "<div id='infoWindow'>" + name + wk_link +"</div>";

  var infoWindow = new google.maps.InfoWindow();
  cycle_marker[i] = new google.maps.Marker({position: latlng,icon:icons,map: map});
  google.maps.event.addListener(cycle_marker[i], 'click', function() {

  document.getElementById('loading').style.display = 'block';

  origin1 = {lat: now_lat, lng: now_lng};
  destinationB = latlng;

  var  wk_root = "<br><a href=\"javascript:void(0):\" id=\"root\" onClick=\"root();return false;\">現在地からのルート（徒歩）を表示</a>";

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
 var wk_minute = wk_distance / 200 ; 

  var append_message = "<br>現在地からのルート距離は" + wk_distance + "メートル。<br>自転車での到達時間（200メートル／分）は" + wk_minute + "分です!" 

  wk_name =  "<div id='infoWindow'>" + name + append_message + wk_link + wk_root + "</div>"; 

    if (currentWindow) {
      currentWindow.close();
    }
    infoWindow.setContent(wk_name);
    infoWindow.open(map,cycle_marker[i]);
    currentWindow = infoWindow;

    document.getElementById('loading').style.display = 'none';

    // 右側に駐輪場のいろいろな情報を表示！
    cicle_detail(name,map);

 }
 });


  });
} 


function createMarker2(name,latlng,icons,map,i){

  //var wk_link = "<br><a href=\"#modal-p01\">詳細はこちら</a>"; 

  name = "レンタサイクルショップ<br>" + name; 
  var wk_name =  "<div id='infoWindow'>" + name + "</div>";

  var infoWindow = new google.maps.InfoWindow();
  rental_marker[i]= new google.maps.Marker({position: latlng,icon:icons,map: map});
  google.maps.event.addListener(rental_marker[i], 'click', function() {

  document.getElementById('loading').style.display = 'block';
  var origin1 = {lat: now_lat, lng: now_lng};
  
  var destinationB = latlng;

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
 var wk_minute = wk_distance / 200 ; 

  var append_message = "<br>現在地からのルート距離は" + wk_distance + "メートル。<br>自転車での到達時間（200メートル／分）は" + wk_minute + "分です!" 

  wk_name =  "<div id='infoWindow'>" + name + append_message  + "</div>"; 

    if (currentWindow) {
      currentWindow.close();
    }
    infoWindow.setContent(wk_name);
    infoWindow.open(map,rental_marker[i]);
    currentWindow = infoWindow;

    document.getElementById('loading').style.display = 'none';

    // 右側に駐輪場のいろいろな情報を表示！
//    cicle_detail(name,map);

 
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
    dataType:'json', // コレを忘れてた！！
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

          strHtml += "<table class=\"type6\"><caption>" + name + "（クリックした駐輪場の詳細な情報です)";
          strHtml += "<tr class=\"kbn\"><td colspan=\"4\">名称</td></tr>" 
          strHtml += "<tr><td colspan=\"4\">" + cycle[i].shisetsu + "</td></tr>";


          strHtml += "<tr class=\"kbn\"><td>民営種別</td><td>最寄り沿線</td><td colspan=\"2\">最寄り駅</td></tr>" 
          strHtml += "<tr><td>" + cycle[i].kouei + "</td><td>" + cycle[i].koukyou + "</td><td colspan=\"2\">" + cycle[i].moyori + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td>連絡先</td><td colspan=\"3\">住所</td></tr>" 
          strHtml += "<tr><td>" + cycle[i].tel + "</td><td colspan=\"3\">" + cycle[i].address + "</td></tr>";

          strHtml += "<tr class=\"kbn\"><td>駐輪台数（自転車）</td><td>駐輪台数（バイク）</td><td>駐輪台数（原付）</td><td>駐輪台数（二輪）</td></tr>" 
          strHtml += "<tr><td>" + cycle[i].chari + "</td><td>" + cycle[i].bike + "</td><td>" + cycle[i].gentuki + "</td><td>" + cycle[i].nirin + "</td></tr>";


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
    gestureHandling: 'greedy',
    mapTypeControl: false,
    zoomControl: false
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
  check7 = document.myform2.check7.checked;
  check8 = document.myform2.check8.checked;


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
        icons : 'image/isibumi.jpg'
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
  if ( check7 == true){

    facilities_mapping(
      Obj = {
        type  : 'mimono',
        name  : "観光見もの情報",
        url   : 'json/mimono.json',
        icons : 'image/mimono.jpg'
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

function zoomIn(level) {
//  var level = map.getZoom();
//  level ++;
  map.setZoom(level);
}

function zoomOut() {
  var level = map.getZoom();
  if (level != 0){
    level --;
  }
  map.setZoom(level);
}




function meshkeisan(mylat,mylng)
{

 var wk_10sinido = parseFloat(mylat); 

  //ｐの算出

 var wk_p = Math.floor(wk_10sinido * 60 / 40);

  //ａの算出

 var wk_a = wk_10sinido * 60 % 40; 

  //ｑの算出

 var wk_q = Math.floor(wk_a / 5);

  //ｂの算出

 var wk_b = wk_a % 5;

  //ｒの算出

 var wk_r = Math.floor(wk_b * 60 / 30);

  //ｃの算出

 var wk_c = wk_b * 60 % 30; 

  //ｓの算出

 var wk_s = Math.floor(wk_c / 15);

  //ｄの算出

 var wk_d = wk_c % 15; 

  //ｔの算出

 var wk_t = Math.floor(wk_d / 7.5);

  //経度を１０進数に変換


 var wk_10sinkeido = parseFloat(mylng); 

  //ｕの算出

 var wk_u = Math.floor(wk_10sinkeido - 100);

  //ｆの算出

 var wk_f = wk_10sinkeido - 100 - wk_u;

  //ｖの算出

 var wk_v = Math.floor(wk_f * 60 / 7.5);

  //ｇの算出

 var wk_g = wk_f * 60 % 7.5; 

  //ｗの算出


 var wk_w = Math.floor(wk_g * 60 / 45);

  //ｈの算出

 var wk_h = wk_g * 60 % 45; 

  //ｘの算出

 var wk_x = Math.floor(wk_h / 22.5);

  //ｉの算出

 var wk_i = wk_h % 22.5; 

  //ｙの算出

 var wk_y = Math.floor(wk_i / 11.25);

  //ｍの算出

 var wk_m = ( wk_s * 2 ) + ( wk_x + 1 );

  //ｎの算出

 var wk_n = ( wk_t * 2 ) + ( wk_y + 1 );

  //基準メッシュコードの算出

 var wmeshcd = "" + "20" + wk_p + wk_u + wk_q + wk_v+ wk_r + wk_w; 

 var wk_500mesh = "" + wk_p + wk_u + "  " + wk_q + wk_v+ "  " + wk_r + wk_w + "  " + wk_m; 

 var wk_250mesh = "" + wk_p + wk_u + "  " + wk_q + wk_v+ "  " + wk_r + wk_w + "  " + wk_m + "  " + wk_n; 


   return wmeshcd;

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

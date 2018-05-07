/* =========================== 
   概要：google map用 初期化関数
       ：
       ：呼び出しはgoogle map apiの
       ：callback パラメータ
       ：
       ：
   =========================== */
function googlemapinit() {
    
    // キャンパスの要素を取得する
    var canvas = document.getElementById( 'map-canvas' ) ;

    // 中心の位置座標を指定する
    var latlng = new google.maps.LatLng( 35.691665, 139.715272 );

    // 地図のオプションを設定する
    var mapOptions = {
            zoom: 17 ,	// ズーム値
            center: latlng,	// 中心座標 [latlng]
            mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // [canvas]に、[mapOptions]の内容の、地図のインスタンス([map])を作成する
    var map = new google.maps.Map( canvas, mapOptions ) ;
    
    // マーカーのインスタンスを作成する
    var marker = new google.maps.Marker( {
            map: map ,	// 地図
            position: new google.maps.LatLng( 35.691665, 139.715272 ),	// 位置座標
            title: '株式会社グロウエスアイシー'
    } ) ;
    
    var contentString="<p><strong>株式会社グロウエスアイシー</strong></p><div><img id='mappic' class='pull-left' src='img/pic/index/googlemapinfoviewpic.jpg'/>〒162-0067 東京都新宿区富久町11-5 シャトレ市ヶ谷901号<a href='https://goo.gl/maps/ZxPnMTfRCi52' target='_blank' class='btn btn-theme'>Google Mapで開く</a></div>";
    
    //吹き出し
    var infowindow = new google.maps.InfoWindow({
            content: contentString
            ,maxWidth:300
    });

    infowindow.open(map, marker);

    // 吹き出しが閉じられたら、マーカークリックで再び開くようにしておく
    google.maps.event.addListener(infowindow, "closeclick", function() {
            google.maps.event.addListenerOnce(marker, "click", function(e) {
                    infowindow.open(map, marker);
            });
    });

    google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, this);
    });
    
    return true;
}
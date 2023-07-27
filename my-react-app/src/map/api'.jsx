import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// 定義地圖容器的樣式
const containerStyle = {
  width: '100%',
  height: '400px'
};

// 定義地圖中心的經緯度
const center = {
  lat: 24.069638442904477,
  lng:  120.7029248514377,
};

// 建立 Map 函式組件
function Map() {
  // 使用 useJsApiLoader 鉤子（hook）載入 Google 地圖 API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script', // 地圖 API 載入的 ID
    googleMapsApiKey: "AIzaSyArXKnMsVhjwCE2QUr3aZDl7Dtx5C-j0oI" // 請確保將 YOUR_API_KEY 替換為您自己的 Google Maps API 金鑰
  });

  // 宣告一個狀態變數 map 和設定 map 的函式 setMap，用於儲存地圖實例
  const [map, setMap] = React.useState(null);

  // 定義 onLoad 函式，當地圖載入時會執行此函式
  const onLoad = React.useCallback(function callback(map) {
    // 建立一個 LatLngBounds 物件，用於設定地圖顯示的範圍
    const bounds = new window.google.maps.LatLngBounds(center);
    // 將地圖調整到符合 LatLngBounds 的範圍
    map.fitBounds(bounds);
    // 將地圖實例儲存到 map 狀態變數中
    setMap(map);
  }, []);

  // 定義 onUnmount 函式，當地圖被卸載時會執行此函式
  const onUnmount = React.useCallback(function callback(map) {
    // 將 map 狀態變數設為 null，表示地圖已被卸載
    setMap(null);
  }, []);

  // 如果載入地圖時發生錯誤，顯示錯誤訊息
  if (loadError) {
    return <div>Error loading Google Maps API.</div>;
  }

  // 如果地圖 API 已載入完成
  return isLoaded ? (
    // 渲染 GoogleMap 元件，並設定相關屬性
    <GoogleMap
      mapContainerStyle={containerStyle} // 地圖容器的樣式
      center={center} // 地圖的中心位置
      zoom={10} // 地圖的縮放級別
      onLoad={onLoad} // 當地圖載入時執行的函式
      onUnmount={onUnmount} // 當地圖被卸載時執行的函式
    >
      {/* 子組件，例如標記點、訊息視窗等，這裡沒有特別指定 */}
    </GoogleMap>
    
  ) : (
    // 地圖 API 還在載入中，顯示 Loading... 字樣
    <div>Loading...</div>
  );
}

// 使用 React.memo 進行函式組件的記憶化（Memoization），以優化性能
export default React.memo(Map);

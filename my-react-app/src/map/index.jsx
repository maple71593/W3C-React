import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import './index.css'

// 自定義的地標元件，顯示地標上的文字
const AnyReactComponent = ({ text }) => (
  <div className="maker">
    {text}
  </div>
);

// Map 元件
export default function Map(){
  // 使用 useState 鉤子來管理地標的經緯度
  const [maker, setMaker] = useState({
    lat: 24.069638442904477,
    lng: 120.7029248514377,
  });

  // 預設地圖中心點和縮放級別
  const defaultProps = {
    center: {
      lat: 24.069638442904477,
      lng: 120.7029248514377,
    },
    zoom: 15
  };

  // 使用 useState 鉤子來管理 Google 地圖 API 的載入狀態和相關對象
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);

  // 當 Google 地圖 API 載入完成時觸發的函式
  const handleApiLoaded = (map, maps) => {
    console.log(map);
    console.log(maps);
    setMapInstance(map); // 設定地圖實例
    setMapApi(maps); // 設定地圖 API 對象
    setMapApiLoaded(true); // 設定地圖 API 載入狀態為 true
  };
  const handleCenterChange = () => {
    if(mapApiLoaded) {
      setMaker({
        // center.lat() 與 center.lng() 會回傳正中心的經緯度
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng()
      })
    }
  }

  return (
    // Important! Always set the container height explicitly
    // 地圖容器，設定高度為 100vh 表示佔滿整個螢幕高度
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        // 使用 process.env.REACT_APP_GOOGLE_MAPS_API_KEY 來取得 Google 地圖 API 金鑰
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        // 預設地圖中心點和縮放級別
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onBoundsChange={handleCenterChange}
        // 設定為 true 表示要使用 Google 地圖 API 的內部功能
        yesIWantToUseGoogleMapApiInternals={true}
        // 當 Google 地圖 API 載入完成時觸發的函式
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {/* 在地圖上顯示自定義的地標元件 */}
        <AnyReactComponent
          lat={maker.lat}
          lng={maker.lng}
          text="我在這裡"
        />
      </GoogleMapReact>
    </div>
  );
}

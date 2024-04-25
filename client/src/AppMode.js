// AppMode: Enumarated type

const AppMode = {
  WEATHER: "WeatherMode",
  //LOGIN: "LoginMode",
  SITEMAP: "SiteMode",
  SPACE: "SpaceMode",
  SPACEURLS: "SpaceUrls",
  GIF: "CreateGIF",
  OTHERSITE: "OtherSiteMode",
  CONTACTME: "contactMe",
};

Object.freeze(AppMode);  // Ensuring the object is immutable

export default AppMode;
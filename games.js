const names = [
  "PUBG",
  "CS:GO",
  "Siege",
  "Rocket League",
  "The Forest",
  "Diablo III",
  "Rust",
  "0AD",
  "Overwatch",
  "Dota 2",
  "Alien Swarm",
  "Path Of Exile",
  "BF3",
  "BF4",
  "BF1",
  "GOI",
  "TrackMania Nations Forever",
  "Golf it",
  "Fortnite",
  "SC2",
  "C&C Tiberian Sun",
];

const urls = [
  "https://i.ytimg.com/vi/srv91jZAUpM/maxresdefault.jpg", //PUBG
  "http://s1.dmcdn.net/S6S25/1280x720-esi.jpg", //CS GO
  "http://www.dailyfailcenter.com:8080/sites/default/files/styles/fail/public/fail/aOd1B4M_700b.jpg?itok=92cfELc4", //siege
  "https://www.bleedingcool.com/wp-content/uploads/2017/06/Rocket-League-action.jpg", //RL
  "http://imag.malavida.com/mvimgbig/download-fs/the-forest-18375-11.jpg", //forest
  "https://www.instant-gaming.com/images/products/1795/screenshot/1795-1.jpg", //Diablo 3
  "https://i.kinja-img.com/gawker-media/image/upload/s--aXJrMhZI--/c_scale,fl_progressive,q_80,w_800/xkmuo3a6dry3a94b4jjw.jpg", //Rust
  "https://images.sftcdn.net/images/t_optimized,f_auto/p/6251a00a-9b28-11e6-a4c6-00163ed833e7/3859603439/0-a-d-screenshot.jpg", //0AD
  "http://cdn3.twinfinite.net/wp-content/uploads/2017/01/overwatch-ed.jpg", //Overwatch
  "http://cdn.dota2.com/apps/dota2/images/blog/play/screenshot_05.jpg", //DOta2
  "http://cdn.edgecast.steamstatic.com/steam/apps/563560/ss_129844b0747cc362a15efad8451588bdcb06c99f.1920x1080.jpg?t=1504098285", //alien swarm
  "https://s3.amazonaws.com/cgmagazine/2016/03/path-of-exile-assendancy-pc-review-2.jpg", //POE
  "https://images-na.ssl-images-amazon.com/images/G/01/videogames/detail-page/bf3.01a.lg.jpg",//BF3
  "https://i.ytimg.com/vi/fNKJbM60K_M/maxresdefault.jpg", //BF4
  "https://i.ytimg.com/vi/Nl9Bkj9w_Kg/maxresdefault.jpg", //BF1
  "https://images.g2a.com/images/1024x768/1x1x0/c6b0edfd35f6/5910c034ae653a117d67e472", //GOI
  "http://www.friday-night-gaming.com/images/trackmanianations/trackmanianations1.jpg", //TM
  "https://i.ytimg.com/vi/IIPCWLF4omI/maxresdefault.jpg", //Golf it
  "https://cdn2.unrealengine.com/Fortnite%2Fhome%2Ffn_battle_royale-1268x717-cf9fa8a783c249aa8d6929126e29f5f190620357.jpg", //Fortnite
  "https://edge.alluremedia.com.au/m/k/2015/10/s00041.jpg", //sc2
  "https://vignette.wikia.nocookie.net/cnc/images/2/24/Tiberian_Sun_Beta_Picture_3.jpg/revision/latest?cb=20120612135306", //cc tiberian sun
];

module.exports = names.map((g, i) => ({
  name: g,
  id: i + 1,
  url: urls[i],
}));
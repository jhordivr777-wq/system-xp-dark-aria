const CACHE='system-xp-v4';
const ASSETS=[
  './','./index.html','./manifest.json',
  './audio/system_theme.wav','./audio/boss_theme.wav',
  './audio/mission_complete.wav','./audio/level_up.wav','./audio/rank_up.wav',
  './avatars/avatar_1.png','./avatars/avatar_5.png','./avatars/avatar_10.png',
  './avatars/avatar_25.png','./avatars/avatar_50.png','./avatars/avatar_75.png',
  './avatars/avatar_100.png','./avatars/avatar_150.png','./avatars/avatar_200.png','./avatars/avatar_infinity.png'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET') return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match('./index.html'))))});

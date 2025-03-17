const fs = require('fs');
const path = require('path');

const beatsDirectory = path.join(__dirname, '../../../../public/assets/newbeats');
const imgsDir = path.join(beatsDirectory, 'img');
const defaultAlbumImg  = '/assets/img-beats/purple.png';

function formatFileName(fileName) {
  return fileName.replace(/\s+/g, '').toLowerCase(); // Remove espaços e deixa em minúsculas
}

function getBeats() {
  const files = fs.readdirSync(beatsDirectory).filter(file => file.endsWith('.mp3'));
  
  const beats = files.map((file, index) => {
  const match = file.match(/^(.+)\((\d+)bpm\)/);
  if (!match) return null;

  const name = match[1].trim();
  const bpm = parseInt(match[2]);

  const formattedName = formatFileName(name);

  const imgFiles = fs.readdirSync(imgsDir);
    const albumImg = imgFiles.find(img => formatFileName(img).startsWith(formattedName)) 
      ? `/assets/newbeats/img/${imgFiles.find(img => formatFileName(img).startsWith(formattedName))}`
      : defaultAlbumImg;
      
  const audio = `/assets/newbeats/${file}`;

  return {
    id: (index + 1).toString(),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      album_img: albumImg,
      audio,
      dataLnc: new Date().toISOString().split('T')[0],
  };
  }).filter(Boolean);

  return beats.sort((a, b) => parseInt(a.id) - parseInt(b.id));
}

const beatsArray = getBeats();
console.log(`export const beats = ${JSON.stringify(beatsArray, null, 2)};`);
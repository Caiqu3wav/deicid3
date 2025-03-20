const fs = require('fs');
const path = require('path');

const beatsDirectory = path.join(__dirname, '../../../../public/assets/newbeats');
const imgsDir = path.join(beatsDirectory, 'img');
const defaultAlbumImg  = '/assets/img-beats/purple.png';

function formatFileName(fileName) {
  return fileName.replace(/\s+/g, '').toLowerCase(); // Remove espaços e deixa em minúsculas
}

function formatDate(date) {
  const options = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return new Date(date).toLocaleDateString('pt-BR', options);
}

function getBeats() {
  const files = fs.readdirSync(beatsDirectory).filter(file => file.endsWith('.mp3'));
  
  const beats = files.map((file) => {
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
  const filePath = path.join(beatsDirectory, file);
  const fileStats = fs.statSync(filePath);
  const modifiedDate = fileStats.mtime;
  return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      album_img: albumImg,
      audio,
      dataLnc: formatDate(modifiedDate),
  };
  }).filter(Boolean);

  const sortedBeats = beats.sort((a, b) => a.modifiedDate - b.modifiedDate);

  return sortedBeats.map((beat, index) => ({
    id: (index + 1).toString(),
    ...beat
  }));
}

const beatsArray = getBeats();
console.log(`export const beats = ${JSON.stringify(beatsArray, null, 2)};`);
const printMap = (map) => {
  let output = '';

  for(let i = 0; i < map.values.length; i += map.w) {
    output += `${map.values.slice(i, i + map.w).join('')}\n`;
  }

  console.log(output);
};

module.exports = printMap;

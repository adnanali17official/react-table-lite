function convertJSONToCSV(jsonData, csvKeys=null) {
  if(csvKeys){
    jsonData = jsonData?.map(item => {
      const newItem = {};
      csvKeys?.forEach(key => {
        newItem[key] = item[key]
      });
      return newItem;
    })
  }
  const header = Object.keys(jsonData[0]).join(',');
  const rows = jsonData.map(obj => Object.values(obj).join(','));
  return header + '\n' + rows.join('\n');
};

function downloadCSV(csvData, fileName) {
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function export_table_to_csv(data, filename = 'data.csv', csvKeys) {
  const csvData = convertJSONToCSV(data, csvKeys);
  downloadCSV(csvData, filename);
};




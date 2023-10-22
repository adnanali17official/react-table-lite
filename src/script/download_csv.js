function convertJSONToCSV(jsonData, csvKeys = null, customHeaders={}) {
  // cases handled while creating csv
  // if the value in json starts with a numeric digit, add a \` before it to avoid csv formatting the value as integer
  // if the value is some object or other data type which can't be parsed into a String, then return empty string '' in csv
  if (csvKeys) {
    jsonData = jsonData?.map(item => {
      const newItem = {};
      csvKeys?.forEach(key => {
        try {
          if (item[key] && !isNaN(item[key][0]))
            newItem[key] = `\`${item[key].toString()?.replaceAll(',', ' ')}`;
          else
            newItem[key] = `${item[key].toString()?.replaceAll(',', ' ')}`;
        }
        catch (err) {
          console.error(err);
          newItem[key] = '';
        }
      });
      return newItem;
    })
  }
  const header = Object.keys(jsonData[0])?.map(key => customHeaders[key] || key).join(',');
  const rows = jsonData.map(obj => Object.values(obj)
    ?.map(value => {
      try {
        if (value && !isNaN(value?.toString()[0]))
          return `\`${value}`?.toString()?.replaceAll(',', ' ') || '';
        else
          return `${value}`?.toString()?.replaceAll(',', ' ') || '';
      }
      catch (err) {
        console.error(err);
        return '';
      }
    })
    ?.join(','));
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

export default function export_table_to_csv(data, filename = 'data.csv', csvKeys, customHeaders) {
  const csvData = convertJSONToCSV(data, csvKeys, customHeaders);
  downloadCSV(csvData, filename);
};




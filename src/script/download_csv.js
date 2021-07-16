
function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
}

export function export_table_to_csv(html, filename, multiselect) {  
    var csv = [];
    var rows = html;
    rows = rows.querySelectorAll("tr");    
    // var rows = document.querySelectorAll("#rtl-table-table-lite tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++){
            cols[j].innerText = cols[j].innerText.replace(','," ")
            if (cols[j].innerText === "Actions") {
              continue;
            }
            if (multiselect) {
              let checkInput = cols[0].firstChild;
              if (checkInput !== null) {
                if (i === 0 || checkInput.checked)
                  row.push(cols[j].innerText.replace("▲", "").replace("▼", ""));
              } else
                row.push(cols[j].innerText.replace("▲", "").replace("▼", ""));
            } else
              row.push(cols[j].innerText.replace("▲", "").replace("▼", ""));
        }
        csv.push(row.join(","));
      }
      csv = csv.filter(row=>row !== "");
    // Download CSV
    download_csv(csv.join("\n"), filename);
}




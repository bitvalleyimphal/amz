
var links = new Array();
var xhr = new XMLHttpRequest();
            xhr.open("GET", "test.xlsx", true);
            xhr.responseType = "blob";
            xhr.onload = function (e) {
                var file = this.response;
                var reader = new FileReader();
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(file);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(file);
                }
            };
            xhr.send();
        
        function ProcessExcel(data) {
            
            //Read the Excel File data.
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
 
            //Fetch the name of First Sheet.
            var firstSheet = workbook.SheetNames[0];
 
            //Read all rows from First Sheet into an JSON array.
            var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
 
            //Create a HTML Table element.
            var table = document.createElement("table");
            table.border = "1";
 
            //Add the header row.
            var row = table.insertRow(-1);
 
            //Add the header cells.
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = "class_name";
            row.appendChild(headerCell);
 
            headerCell = document.createElement("TH");
            headerCell.innerHTML = "link";
            row.appendChild(headerCell);
 
      
 
            //Add the data rows from Excel file.
            for (var i = 0; i < excelRows.length; i++) {
                //Add the data row.
                var row = table.insertRow(-1);
 
                //Add the data cells.
                var cell = row.insertCell(-1);
                cell.innerHTML = excelRows[i].class_name;
                links[excelRows[i].class_name] = excelRows[i].link;
 
                cell = row.insertCell(-1);
                cell.innerHTML = excelRows[i].link;
 
            
            }
            
            var dvExcel = document.getElementById("dvExcel");
            dvExcel.innerHTML = "";
            //dvExcel.appendChild(table);
        };
$(document).ready(function() {
$('#submit').click(function() {
    var keyword = $('#keyword').val();
 console.log(links);
 if(links[keyword]) {
    window.open(links[keyword], '_blank');
 }
   
})
});          

        
        	
            
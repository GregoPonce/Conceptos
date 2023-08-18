const ministerioList = document.getElementById("ministerio-list");

// Datos simulados de ministerios (serán reemplazados por datos del Excel)
let ministerios = [];

function displayMinisterios(ministerios) {
  ministerioList.innerHTML = ""; // Limpia la lista antes de mostrar los nuevos ministerios
  ministerios.forEach((ministerio) => {
    const ministerioLink = document.createElement("a");
    ministerioLink.classList.add("card");
    ministerioLink.textContent = ministerio;
    ministerioLink.href = `../pages/alternativa.html?ministerio=${encodeURIComponent(ministerio)}`;
    ministerioLink.onclick = function (event) {
      console.log("Hiciste clic en el enlace de", ministerio);
      // Aquí puedes agregar la lógica para mostrar los conceptos del ministerio seleccionado
    };
    ministerioList.appendChild(ministerioLink);
  });
}

// Cargar datos de ministerios desde una URL de archivo Excel
function loadMinisteriosFromURL(url) {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(
        workbook.Sheets[firstSheetName]
      );
      ministerios = sheetData.map((row) => row.JURISDICCION); // Extrae los nombres de los ministerios
      displayMinisterios(ministerios);
    })
    .catch((error) => {
      console.error("Error al cargar los ministerios:", error);
    });
}

// Cambiar la URL de ejemplo por la URL de tu archivo Excel
const excelURL = "../tablas/Ministerios.xls";
loadMinisteriosFromURL(excelURL);

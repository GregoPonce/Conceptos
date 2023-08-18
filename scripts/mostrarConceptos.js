const listaConceptos = document.getElementById("lista-conceptos");

let conceptos = [];

function displayConceptos(conceptos) {
  listaConceptos.innerHTML = ""; 
  conceptos.forEach((concepto) => {
    const conceptoLink = document.createElement("div");
    conceptoLink.classList.add("card");
    conceptoLink.textContent = concepto.Concepto;
    conceptoLink.href = "../pages/alternativa.html"; // Acceder a alternativa.html en la carpeta "pages"
    conceptoLink.onclick = function (event) {
      console.log("Hiciste clic en el enlace de", concepto.Concepto);
    };

    // Agregar detalles al conceptoLink (Puedes personalizar cómo se muestran los detalles)
    const detalles = document.createElement("div");
    detalles.classList.add("detalles");
    detalles.innerHTML = `
      <p><strong>Formula:</strong> ${concepto.Formula}</p>
      <p><strong>Ministerio:</strong> ${concepto.Ministerio}</p>
      <p><strong>Ley:</strong> ${concepto.Ley}</p>
      <p><strong>Tablas:</strong> ${concepto.Tablas}</p>
    `;

    conceptoLink.appendChild(detalles);

    // Agregar el conceptoLink a la listaConceptos
    listaConceptos.appendChild(conceptoLink);
  });
}

// Cargar datos de conceptos desde una URL de archivo Excel
function cargarConceptos(url) {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(
        workbook.Sheets[firstSheetName]
      );
      conceptos = sheetData.map((row) => ({
        Concepto: row.Concepto,
        Formula: row.Formula,
        Ministerio: row.Ministerio,
        Ley: row.Ley,
        Tablas: row.Tablas
      })); 
      displayConceptos(conceptos);
    })
    .catch((error) => {
      console.error("Error al cargar los conceptos:", error);
    });
}

// Cambiar la URL de ejemplo por la URL de tu archivo Excel
const excelURL = "../tablas/Conceptos.xlsx";
cargarConceptos(excelURL);

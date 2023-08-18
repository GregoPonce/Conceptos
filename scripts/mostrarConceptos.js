const listaConceptos = document.getElementById("lista-conceptos");

let conceptos = [];
let ministerioSeleccionado = "";
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

const params = new URLSearchParams(window.location.search);
ministerioSeleccionado = params.get("ministerio");

// Cargar datos de conceptos desde una URL de archivo Excel
function cargarConceptos(url, ministerio) {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(
        workbook.Sheets[firstSheetName]
      );
      conceptos = sheetData
        .filter((row) => row.Ministerio === ministerio) // Filtrar por el ministerio seleccionado
        .map((row) => ({
          Concepto: row.Concepto,
          Formula: row.Formula,
          Ministerio: row.Ministerio,
          Ley: row.Ley,
          Tablas: row.Tablas
        })); 
        if (conceptos.length !== 0) {
          displayConceptos(conceptos);
        } else {
          const error = document.createElement("div");
          error.classList.add("card");
          error.textContent = "No se encontraron conceptos para el ministerio elegido";
          const linkError = document.createElement("a");
          linkError.textContent = "Regrese al Inicio apretando este texto";
          linkError.href = "../index.html"; // Acceder a alternativa.html en la carpeta "pages"
          error.appendChild(linkError);
          listaConceptos.appendChild(error); // Agregar el mensaje de error a la listaConceptos
        }        
    })
    .catch((error) => {
      console.error("Error al cargar los conceptos:", error);
    });
}

// Cargar y mostrar conceptos filtrados por el ministerio seleccionado
const excelURL = "../tablas/Conceptos.xlsx";
cargarConceptos(excelURL, ministerioSeleccionado);

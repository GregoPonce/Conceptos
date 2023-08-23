const listaConceptos = document.getElementById("lista-conceptos");

let conceptos = [];
let ministerioSeleccionado = "";
function displayConceptos(conceptos) {
  listaConceptos.innerHTML = "";
  conceptos.forEach((concepto) => {
    const conceptoLink = document.createElement("div");
    conceptoLink.classList.add("card");
    conceptoLink.textContent = concepto.Concepto;
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
    const elementoDestino = document.getElementById("lista-conceptos");
    elementoDestino.scrollIntoView({
      behavior: "smooth", // Hace el scroll de manera suave
    });
  });
}

// Cargar datos de conceptos desde una URL de archivo Excel
function cargarConceptos(url, parametro) {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(
        workbook.Sheets[firstSheetName]
      );
      const agrupacionRadio = document.getElementById("agrupacionRadio");
      const ministeriosRadio = document.getElementById("ministeriosRadio");
      if(ministeriosRadio.checked){
        conceptos = sheetData
        .filter((row) => row.Ministerio === parametro) // Filtrar por el ministerio seleccionado
        .map((row) => ({
          Concepto: row.Concepto,
          Formula: row.Formula,
          Ministerio: row.Ministerio,
          Ley: row.Ley,
          Tablas: row.Tablas,
        }));
      }
      else{
        if(agrupacionRadio.checked){
          conceptos = sheetData
          .filter((row) => row.Ley === parametro) // Filtrar por el ministerio seleccionado
          .map((row) => ({
            Concepto: row.Concepto,
            Formula: row.Formula,
            Ministerio: row.Ministerio,
            Ley: row.Ley,
            Tablas: row.Tablas,
          }));
        }
      }
      const miElemento = document.querySelector(".error");
      const lista= document.querySelector(".conceptos");
      if (conceptos.length !== 0) {
        displayConceptos(conceptos);
        lista.style.display="flex";
        miElemento.style.display = "none";
      } else {
        // Modifica el estilo del element
        lista.style.display="none";
        miElemento.style.display = "flex";
        listaConceptos.scrollIntoView({
          behavior: "smooth", // Hace el scroll de manera suave
        });
      }
    })
    .catch((error) => {
      console.error("Error al cargar los conceptos:", error);
    });
}

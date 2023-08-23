const agrupacionSelect = document.getElementById("agrupacionSelect");

agrupacionSelect.addEventListener("change", function() {
  const seleccion = agrupacionSelect.value; // Valor seleccionado del select
  if (seleccion !== "") {
    console.log(seleccion);
    // Ejecutar la función mostrarConceptos con el valor seleccionado
    const excelURL2 = "informacion/Conceptos.xlsx";
    cargarConceptos(excelURL2, seleccion);
  }
});

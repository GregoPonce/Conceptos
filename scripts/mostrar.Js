document.addEventListener("DOMContentLoaded", function() {

    const ministeriosRadio = document.getElementById("ministeriosRadio");
    const ministerioList = document.getElementById("ministerio-list");
    const agrupacionSelect = document.getElementById("agrupacionSelect");
    const agrupacionRadio = document.getElementById("agrupacionRadio");

    ministeriosRadio.addEventListener("change", () => {
      if (ministeriosRadio.checked) {
        ministerioList.style.display = "flex";
      } else {
        ministerioList.style.display = "none";
      }
    });
    agrupacionRadio.addEventListener("change", () => {
        ministerioList.style.display = "none";
      });
    agrupacionRadio.addEventListener("change", function() {
        // Habilita o deshabilita el select según si está seleccionado "Agrupación" o no
        agrupacionSelect.disabled = !agrupacionRadio.checked;
    });
  });

// C:/static/script.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, script running");
  const depTimeInput = document.getElementById("dep_time");
  const arrTimeInput = document.getElementById("arrival_time");
  const durationDisplay = document.getElementById("duration_display");
  const durationInput = document.getElementById("id_duration");
  const form = document.querySelector("form");

  if (!depTimeInput || !arrTimeInput || !durationInput || !durationDisplay) {
    console.error("One or more elements not found:", {
      depTimeInput,
      arrTimeInput,
      durationInput,
      durationDisplay,
    });
    return;
  }

  function calculateDuration() {
    const depTime = depTimeInput.value;
    const arrTime = arrTimeInput.value;
    console.log("Calculating duration:", { depTime, arrTime });

    if (depTime && arrTime) {
      const [depHours, depMinutes] = depTime.split(":").map(Number);
      const [arrHours, arrMinutes] = arrTime.split(":").map(Number);

      let depTotalMinutes = depHours * 60 + depMinutes;
      let arrTotalMinutes = arrHours * 60 + arrMinutes;

      if (arrTotalMinutes < depTotalMinutes) {
        arrTotalMinutes += 24 * 60;
      }

      const durationMinutes = arrTotalMinutes - depTotalMinutes;
      const durationHours = (durationMinutes / 60).toFixed(2);

      console.log("Duration calculated:", { durationMinutes, durationHours });
      durationDisplay.textContent = durationHours;
      durationInput.value = durationMinutes;
    } else {
      console.log("Missing time input, resetting duration");
      durationDisplay.textContent = "0";
      durationInput.value = "";
    }
  }

  depTimeInput.addEventListener("change", calculateDuration);
  arrTimeInput.addEventListener("change", calculateDuration);

  form.addEventListener("submit", function (event) {
    console.log("Form submitting");
    calculateDuration();
    if (!durationInput.value) {
      console.error("Duration not set, preventing submission");
      event.preventDefault();
      alert("Please ensure Departure Time and Arrival Time are valid!");
    }
  });
});

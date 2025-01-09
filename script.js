document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded");

    function toggleSection(checkboxId, sectionId) {
        document.getElementById(checkboxId).addEventListener("change", function () {
            let section = document.getElementById(sectionId);
            section.style.display = this.checked ? "block" : "none";
        });
    }

    // Attach toggle functionality
    toggleSection("toggleBathroom", "bathroomSection");
    toggleSection("toggleKitchen", "kitchenSection");
    toggleSection("toggleFlooring", "flooringSection");
    toggleSection("toggleBasement", "basementSection");

    function getCheckboxValue(id) {
        let element = document.getElementById(id);
        return element && element.checked ? 20 : 0;
    }

    function calculateSubtotal(numRooms, sqFt, checkboxes) {
        let totalCheckboxValue = checkboxes.reduce((sum, id) => sum + getCheckboxValue(id), 0);
        return numRooms * sqFt * totalCheckboxValue;
    }

    function updateEstimates() {
        console.log("Updating estimates...");

        let numBathrooms = Number(document.getElementById("numBathrooms").value) || 0;
        let bathroomSqFt = Number(document.getElementById("bathroomSqFt").value) || 0;
        let bathroomSubtotal = calculateSubtotal(numBathrooms, bathroomSqFt, [
            "vinylFloorBathroom", "tileFloorBathroom", "shower",
            "bathtub", "doubleSinkVanity", "renovationBathroom"
        ]);

        let numKitchens = Number(document.getElementById("numKitchens").value) || 0;
        let kitchenSqFt = Number(document.getElementById("kitchenSqFt").value) || 0;
        let kitchenSubtotal = calculateSubtotal(numKitchens, kitchenSqFt, [
            "tileFloorKitchen", "cabinets", "countertop", "lightingKitchen"
        ]);

        let flooringSqFt = Number(document.getElementById("flooringSqFt").value) || 0;
        let flooringSubtotal = calculateSubtotal(1, flooringSqFt, [
            "vinylFloorFlooring", "tileFloorFlooring", "renovationFlooring"
        ]);

        let numBasements = Number(document.getElementById("numBasements").value) || 0;
        let basementSqFt = Number(document.getElementById("basementSqFt").value) || 0;
        let basementSubtotal = calculateSubtotal(numBasements, basementSqFt, [
            "vinylFloorBasement", "tileFloorBasement", "renovationBasement", "lightingBasement"
        ]);

        document.getElementById("bathroomSubtotal").value = bathroomSubtotal.toFixed(2);
        document.getElementById("kitchenSubtotal").value = kitchenSubtotal.toFixed(2);
        document.getElementById("flooringSubtotal").value = flooringSubtotal.toFixed(2);
        document.getElementById("basementSubtotal").value = basementSubtotal.toFixed(2);

        let projectTotal = bathroomSubtotal + kitchenSubtotal + flooringSubtotal + basementSubtotal;
        document.getElementById("projectTotal").value = projectTotal.toFixed(2);
    }

    // Attach event listeners
    const inputFields = [
        "numBathrooms", "bathroomSqFt", "numKitchens", "kitchenSqFt",
        "flooringSqFt", "numBasements", "basementSqFt"
    ];
    const checkboxes = [
        "vinylFloorBathroom", "tileFloorBathroom", "shower", "bathtub", "doubleSinkVanity", "renovationBathroom",
        "tileFloorKitchen", "cabinets", "countertop", "lightingKitchen",
        "vinylFloorFlooring", "tileFloorFlooring", "renovationFlooring",
        "vinylFloorBasement", "tileFloorBasement", "renovationBasement", "lightingBasement"
    ];

    inputFields.forEach(id => document.getElementById(id).addEventListener("input", updateEstimates));
    checkboxes.forEach(id => document.getElementById(id).addEventListener("change", updateEstimates));
});

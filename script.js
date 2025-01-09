document.addEventListener("DOMContentLoaded", function () {
   

    function getCheckboxValue(id) {
        let element = document.getElementById(id);
        return element && element.checked ? 20 : 0;
    }

    function calculateSubtotal(numRooms, sqFt, checkboxes) {
        let totalCheckboxValue = checkboxes.reduce((sum, id) => sum + getCheckboxValue(id), 0);
        return numRooms * sqFt * totalCheckboxValue;
    }

    function updateEstimates() {
       

        // Get Bathroom values
        let numBathrooms = Number(document.getElementById("numBathrooms").value) || 0;
        let bathroomSqFt = Number(document.getElementById("bathroomSqFt").value) || 0;
        let bathroomSubtotal = calculateSubtotal(numBathrooms, bathroomSqFt, [
            "vinylFloorBathroom",
            "tileFloorBathroom",
            "shower",
            "bathtub",
            "doubleSinkVanity",
            "renovationBathroom"
        ]);

        // Get Kitchen values
        let numKitchens = Number(document.getElementById("numKitchens").value) || 0;
        let kitchenSqFt = Number(document.getElementById("kitchenSqFt").value) || 0;
        let kitchenSubtotal = calculateSubtotal(numKitchens, kitchenSqFt, [
            "tileFloorKitchen",
            "cabinets",
            "countertop",
            "lightingKitchen"
        ]);

        // Get Flooring values
        let flooringSqFt = Number(document.getElementById("flooringSqFt").value) || 0;
        let flooringSubtotal = calculateSubtotal(1, flooringSqFt, [
            "vinylFloorFlooring",
            "tileFloorFlooring",
            "renovationFlooring"
        ]);

        // Get Basement values
        let numBasements = Number(document.getElementById("numBasements").value) || 0;
        let basementSqFt = Number(document.getElementById("basementSqFt").value) || 0;
        let basementSubtotal = calculateSubtotal(numBasements, basementSqFt, [
            "vinylFloorBasement",
            "tileFloorBasement",
            "renovationBasement",
            "lightingBasement"
        ]);

        // Update the HTML fields
        document.getElementById("bathroomSubtotal").value = bathroomSubtotal.toFixed(2);
        document.getElementById("kitchenSubtotal").value = kitchenSubtotal.toFixed(2);
        document.getElementById("flooringSubtotal").value = flooringSubtotal.toFixed(2);
        document.getElementById("basementSubtotal").value = basementSubtotal.toFixed(2);

        // Calculate total cost
        let projectTotal = bathroomSubtotal + kitchenSubtotal + flooringSubtotal + basementSubtotal;
        document.getElementById("projectTotal").value = projectTotal.toFixed(2);

    
    }

    // Attach event listeners to all relevant input fields
    const inputFields = [
        "numBathrooms", "bathroomSqFt",
        "numKitchens", "kitchenSqFt",
        "flooringSqFt",
        "numBasements", "basementSqFt"
    ];

    const checkboxes = [
        "vinylFloorBathroom", "tileFloorBathroom", "shower", "bathtub", "doubleSinkVanity", "renovationBathroom",
        "tileFloorKitchen", "cabinets", "countertop", "lightingKitchen",
        "vinylFloorFlooring", "tileFloorFlooring", "renovationFlooring",
        "vinylFloorBasement", "tileFloorBasement", "renovationBasement", "lightingBasement"
    ];

    // Listen for input changes
    inputFields.forEach(id => {
        document.getElementById(id).addEventListener("input", updateEstimates);
    });

    // Listen for checkbox changes
    checkboxes.forEach(id => {
        document.getElementById(id).addEventListener("change", updateEstimates);
    });

    
});

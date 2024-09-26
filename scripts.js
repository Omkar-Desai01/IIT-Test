const data = [
  {
    id: 1,
    chemicalName: "Ammonium Persulfate",
    vendor: "Omkar",
    density: 3525.92,
    viscosity: 60.63,
    packaging: "Bag",
    packSize: 100,
    unit: "kg",
    quantity: 6495.18,
  },
  {
    id: 2,
    chemicalName: "Caustic Potash",
    vendor: "Thor",
    density: 3172.15,
    viscosity: 48.22,
    packaging: "Bag",
    packSize: 100,
    unit: "kg",
    quantity: 8751.9,
  },
  {
    id: 3,
    chemicalName: "Dimethylaminopropylamino",
    vendor: "Omkar",
    density: 8435.37,
    viscosity: 12.62,
    packaging: "Barrel",
    packSize: 75,
    unit: "L",
    quantity: 5964.61,
  },
  {
    id: 4,
    chemicalName: "Mono Ammonium Phosphate",
    vendor: "Sinopec",
    density: 1597.65,
    viscosity: 76.51,
    packaging: "Bag",
    packSize: 105,
    unit: "kg",
    quantity: 8183.73,
  },
  {
    id: 5,
    chemicalName: "Ferric Nitrate",
    vendor: "DowDuPont",
    density: 364.04,
    viscosity: 14.9,
    packaging: "Bag",
    packSize: 105,
    unit: "kg",
    quantity: 4154.33,
  },
  {
    id: 6,
    chemicalName: "n-Pentane",
    vendor: "Sinopec",
    density: 4535.26,
    viscosity: 66.76,
    packaging: "N/A",
    packSize: "N/A",
    unit: "t",
    quantity: 6272.34,
  },
  {
    id: 7,
    chemicalName: "Glycol Ether PM",
    vendor: "Omkar",
    density: 6495.18,
    viscosity: 72.12,
    packaging: "Bag",
    packSize: 250,
    unit: "kg",
    quantity: 8749.54,
  },
  {
    id: 9,
    chemicalName: "Nitric Acid",
    vendor: "SABIC",
    density: 1412.0,
    viscosity: 1.44,
    packaging: "Drum",
    packSize: 200,
    unit: "L",
    quantity: 9550.75,
  },
  {
    id: 10,
    chemicalName: "Sodium Hydroxide",
    vendor: "Dow Chemicals",
    density: 2122.0,
    viscosity: 48.5,
    packaging: "Bag",
    packSize: 110,
    unit: "kg",
    quantity: 5500.0,
  },
  {
    id: 11,
    chemicalName: "Potassium Nitrate",
    vendor: "Yara",
    density: 2254.0,
    viscosity: 34.1,
    packaging: "Bag",
    packSize: 125,
    unit: "kg",
    quantity: 7300.3,
  },
  {
    id: 12,
    chemicalName: "Hydrochloric Acid",
    vendor: "Thor",
    density: 1190.0,
    viscosity: 2.9,
    packaging: "Drum",
    packSize: 150,
    unit: "L",
    quantity: 8100.65,
  },
  {
    id: 13,
    chemicalName: "Acetone",
    vendor: "Omkar",
    density: 791.0,
    viscosity: 0.32,
    packaging: "Barrel",
    packSize: 200,
    unit: "L",
    quantity: 6300.44,
  },
  {
    id: 14,
    chemicalName: "Ethanol",
    vendor: "Sinopec",
    density: 789.0,
    viscosity: 1.2,
    packaging: "Barrel",
    packSize: 220,
    unit: "L",
    quantity: 5400.22,
  },
  {
    id: 15,
    chemicalName: "Xylene",
    vendor: "SABIC",
    density: 861.0,
    viscosity: 0.6,
    packaging: "Drum",
    packSize: 200,
    unit: "L",
    quantity: 9050.19,
  },
];

const tableBody = document.querySelector("#chemical-table tbody");

function populateTable(data) {
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td contenteditable="true">${item.chemicalName}</td>
      <td contenteditable="true">${item.vendor}</td>
      <td contenteditable="true">${item.density}</td>
      <td contenteditable="true">${item.viscosity}</td>
      <td contenteditable="true">${item.packaging}</td>
      <td contenteditable="true">${item.packSize}</td>
      <td contenteditable="true">${item.unit}</td>
      <td contenteditable="true">${item.quantity}</td>
    `;
    tableBody.appendChild(row);
  });
}

populateTable(data);

document.querySelectorAll("#chemical-table th").forEach((header) => {
  header.addEventListener("click", () => {
    const column = header.innerText.toLowerCase().replace(" ", "");
    const isAscending = header.classList.toggle("ascending");
    header.classList.toggle("descending", !isAscending);

    const sortedData = [...data].sort((a, b) => {
      return isAscending ? a[column] - b[column] : b[column] - a[column];
    });

    populateTable(sortedData);
  });
});

document.getElementById("add-row").addEventListener("click", () => {
  const newRow = {
    id: data.length + 1,
    chemicalName: "New Chemical",
    vendor: "New Vendor",
    density: 0,
    viscosity: 0,
    packaging: "N/A",
    packSize: 0,
    unit: "N/A",
    quantity: 0,
  };
  data.push(newRow);
  populateTable(data);
});

document.getElementById("delete-row").addEventListener("click", () => {
  const rowIndex = tableBody.rows.length - 1;
  if (rowIndex >= 0) {
    data.pop();
    populateTable(data);
  }
});

document.getElementById("move-up").addEventListener("click", () => {
  const selectedRow = tableBody.querySelector("tr.selected");
  if (selectedRow && selectedRow.previousElementSibling) {
    tableBody.insertBefore(selectedRow, selectedRow.previousElementSibling);
  }
});

document.getElementById("move-down").addEventListener("click", () => {
  const selectedRow = tableBody.querySelector("tr.selected");
  if (selectedRow && selectedRow.nextElementSibling) {
    tableBody.insertBefore(selectedRow.nextElementSibling, selectedRow);
  }
});

tableBody.addEventListener("click", (event) => {
  const row = event.target.parentNode;
  tableBody
    .querySelectorAll("tr")
    .forEach((r) => r.classList.remove("selected"));
  row.classList.add("selected");
});

document.getElementById("refresh-data").addEventListener("click", () => {
  populateTable(data);
});

document.getElementById("save-data").addEventListener("click", () => {
  alert("Data saved!");
});

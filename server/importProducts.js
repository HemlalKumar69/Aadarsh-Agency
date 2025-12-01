// require("dotenv").config();
// const mongoose = require("mongoose");
// const XLSX = require("xlsx");
// const path = require("path");
// const fs = require("fs");
// const Product = require("./Models/ProductModel.js");

// (async () => {
//     const filePath = path.resolve(__dirname, "datafile.xlsx");
//     console.log("File exists:", fs.existsSync(filePath));

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const ws = workbook.Sheets[sheetName];
//     // Read as 2D array to detect the actual header row
//     const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

//     if (!rows.length) {
//         console.error("❌ Excel sheet is empty or unreadable");
//         process.exit(1);
//     }

//     const norm = (v) => String(v || "").trim().toLowerCase().replace(/\s+/g, " ");

//     // Find header row index by matching expected column names
//     let headerIndex = -1;
//     for (let i = 0; i < Math.min(rows.length, 30); i++) {
//         const r = rows[i].map(norm);
//         const hasDescription = r.some((c) => c.includes("description"));
//         const hasUnit = r.some((c) => c === "unit");
//         const hasHSN = r.some((c) => c === "hsn" || c === "hsnc" || c.includes("hsn"));
//         const hasQty = r.some((c) => c.includes("qty") || c.includes("total stock"));
//         if (hasDescription && (hasUnit || hasHSN) && hasQty) {
//             headerIndex = i;
//             break;
//         }
//     }

//     if (headerIndex === -1) {
//         console.error("❌ Could not detect header row. Please ensure the sheet has 'Description', 'Unit', 'HSN/HSNC', and 'Total Stock/QTY' columns.");
//         console.log("First 3 rows snapshot:", rows.slice(0, 3));
//         process.exit(1);
//     }

//     const headerRow = rows[headerIndex];
//     console.log("Detected header row at index:", headerIndex, headerRow);

//     // Build column index map
//     const colIndex = {};
//     headerRow.forEach((h, idx) => {
//         const n = norm(h);
//         if (n.includes("description") || n.includes("item name") || n.includes("product name")) colIndex.productName = idx;
//         if (n === "unit") colIndex.unit = idx;
//         if (n === "hsn" || n === "hsnc" || n.includes("hsn")) colIndex.hsnCode = idx;
//         if (n.includes("gst")) colIndex.gstPercent = idx;
//         if (n === "mrp") colIndex.mrp = idx;
//         if (n === "rate" || n.includes("sales rate")) colIndex.salesRate = idx;
//         if (n.includes("qty") || n.includes("total stock")) colIndex.availableQty = idx;
//     });

//     // Log which columns were mapped
//     console.log("Column index map:", colIndex);

//     await mongoose.connect(process.env.dbUrl);
//     console.log("✅ MongoDB Connected");

//     const companyId = "69159ae1cece153333b18186"; // TODO: replace with actual companyId or lookup by name
//     const products = [];
//     let skipped = 0;

//     for (let i = headerIndex + 1; i < rows.length; i++) {
//         const row = rows[i];
//         if (!row || row.length === 0) continue;

//         const get = (key) => {
//             const idx = colIndex[key];
//             return idx != null ? row[idx] : "";
//         };

//         const nameRaw = get("productName");
//         const productName = String(nameRaw || "").trim();
//         if (!productName || productName.toLowerCase() === "s.no.") {
//             skipped++;
//             continue;
//         }

//         const unit = String(get("unit") || "").toUpperCase() || "PCS";
//         const hsnCode = String(get("hsnCode") || "").toString().trim();

//         const parseNum = (v) => {
//             if (v == null) return 0;
//             const s = String(v).toString();
//             const cleaned = s.replace(/[^0-9.\-]/g, "");
//             const num = parseFloat(cleaned);
//             return isNaN(num) ? 0 : num;
//         };

//         const parseIntNum = (v) => {
//             const n = parseNum(v);
//             return Number.isFinite(n) ? Math.trunc(n) : 0;
//         };

//         const gstPercent = parseNum(get("gstPercent"));
//         const mrp = parseNum(get("mrp"));
//         const salesRate = parseNum(get("salesRate"));
//         const availableQty = parseIntNum(get("availableQty"));

//         products.push({
//             companyId,
//             productName,
//             unit,
//             hsnCode,
//             gstPercent,
//             mrp,
//             salesRate,
//             availableQty,
//             lastUpdated: new Date(),
//         });
//     }

//     console.log(`Prepared ${products.length} products. Skipped ${skipped}.`);

//     try {
//         await Product.insertMany(products);
//         console.log("✅ Data inserted successfully!");
//     } catch (err) {
//         console.error("❌ Insert error:", err.message);
//     }

//     await mongoose.disconnect();
// })();

//// CSV Import Version

require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const Product = require("./Models/ProductModel.js");

(async () => {
  try {
    const filePath = path.resolve(__dirname, "aadarsh.csv");

    if (!fs.existsSync(filePath)) {
      console.log("❌ CSV file not found:", filePath);
      return;
    }

    console.log("📄 CSV File found:", filePath);

    await mongoose.connect(process.env.dbUrl);
    console.log("✅ MongoDB Connected");

    const companyId = "69159ae1cece153333b18186"; // change if dynamic
    const products = [];

    fs.createReadStream(filePath)
      .pipe(csv({ mapHeaders: ({ header }) => header.trim().toLowerCase() }))
      .on("data", (row) => {
        const productName =
          row["description"] || row["product name"] || row["item name"];

        if (!productName) return;

        const cleanNum = (v) => {
          if (!v) return 0;
          const clean = String(v).replace(/[^0-9.\-]/g, "");
          return parseFloat(clean) || 0;
        };

        products.push({
          companyId,
          productName: productName.trim(),
          unit: row["unit"] || "PCS",
          hsnCode: row["hsn"] || row["hsnc"] || "",
          gstPercent: cleanNum(row["gst"]),
          mrp: cleanNum(row["mrp"]),
          salesRate: cleanNum(row["rate"]),
          availableQty: parseInt(cleanNum(row["qty"] || row["total stock"])),
          lastUpdated: new Date(),
        });
      })
      .on("end", async () => {
        console.log(`📦 Total Products Found: ${products.length}`);

        try {
          await Product.insertMany(products);
          console.log("🎉 Data inserted successfully!");
        } catch (err) {
          console.error("❌ Insert Error:", err);
        } finally {
          await mongoose.disconnect();
          console.log("🔌 MongoDB Disconnected");
        }
      });
  } catch (error) {
    console.error("❌ Error:", error);
  }
})();

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },

  productName: { type: String },
  productImg: {
    type: String,
  },
  primaryUnit: String,
  secondaryUnit: String,
  primaryPrice: {
    type: Number,
    set: (v) => (v == null ? v : Math.round(v * 100) / 100),
  },
  secondaryPrice: {
    type: Number,
    set: (v) => (v == null ? v : Math.round(v * 100) / 100),
  },
  unit: { type: String }, // New field for Unit dropdown
  mrp: {
    type: Number,
    set: (v) => (v == null ? v : Math.round(v * 100) / 100),
  }, // New MRP field
  salesRate: {
    type: Number,
    set: (v) => (v == null ? v : Math.round(v * 100) / 100),
  }, // New Sales Rate field
  purchaseRate: {
    type: Number,
    set: (v) => (v == null ? v : Math.round(v * 100) / 100),
  }, // New Purchase Rate field

  availableQty: {
    type: Number,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: "availableQty must be an integer",
    },
    immutable: function () {
      return this.isNew;
    },
  }, // can't edit

  hsnCode: { type: String },
  gstPercent: { type: Number, default: 0 },

  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);

// categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
// subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
// primaryUnit: String,
// primaryQty: Number,
// secondaryUnit: String,
// secondaryQty: Number,
// primaryPrice: Number,
// secondaryPrice: Number,

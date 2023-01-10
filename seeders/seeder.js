var seeder = require("mongoose-seed");
var mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect(
  "mongodb+srv://restoorder:restoorder@resto-order.dbq1wwd.mongodb.net/?retryWrites=true&w=majority",
  function () {
    // Load Mongoose models
    seeder.loadModels([
      "./models/Category.model",
      "./models/Cart.model",
      "./models/Order.model",
      "./models/Product.model",
      "./models/Image.model",
    ]);

    // Clear specified collections
    seeder.clearModels(
      ["Category", "Cart", "Order", "Product", "Image"],
      function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
          seeder.disconnect();
        });
      }
    );
  }
);

var data = [
  // start category
  {
    model: "Category",
    documents: [
      {
        _id: mongoose.Types.ObjectId("63b93af0ccd9794fe2c2003e"),
        name: "Ayam",
        productId: [
          { _id: mongoose.Types.ObjectId("63b93b3cccd9794fe2c2004e") },
          { _id: mongoose.Types.ObjectId("63b93b55ccd9794fe2c2005a") },
          { _id: mongoose.Types.ObjectId("63b93b75ccd9794fe2c20066") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93af6ccd9794fe2c20041"),
        name: "Sapi",
        productId: [
          { _id: mongoose.Types.ObjectId("63b93bdeccd9794fe2c2008a") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93b04ccd9794fe2c20047"),
        name: "Sate",
        productId: [
          { _id: mongoose.Types.ObjectId("63b93b8cccd9794fe2c20072") },
          { _id: mongoose.Types.ObjectId("63b93badccd9794fe2c2007e") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93c70ccd9794fe2c200bb"),
        name: "Ikan",
        productId: [
          { _id: mongoose.Types.ObjectId("63b93c16ccd9794fe2c20096") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93cd2ccd9794fe2c200e4"),
        name: "Tambahan",
        productId: [
          { _id: mongoose.Types.ObjectId("63b93c2cccd9794fe2c200a2") },
        ],
      },
    ],
  },
  // end category
  // start Product
  {
    model: "Product",
    documents: [
      {
        _id: mongoose.Types.ObjectId("63b93b3cccd9794fe2c2004e"),
        name: "Ayam Goreng",
        price: 20000,
        categoryId: "63b93af0ccd9794fe2c2003e",
        isReady: true,
        totalOrder: 0,
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("63b93b3cccd9794fe2c20051") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93b55ccd9794fe2c2005a"),
        name: "Ayam Bakar",
        price: 30000,
        categoryId: "63b93af0ccd9794fe2c2003e",
        isReady: true,
        totalOrder: 0,
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("63b93b55ccd9794fe2c2005d") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93b75ccd9794fe2c20066"),
        name: "Ayam Gulai",
        price: 25000,
        categoryId: "63b93af0ccd9794fe2c2003e",
        isReady: true,
        totalOrder: 0,
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("63b93b75ccd9794fe2c20069") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93b8cccd9794fe2c20072"),
        name: "Sate Ayam Madura",
        price: 15000,
        categoryId: "63b93b04ccd9794fe2c20047",
        isReady: true,
        totalOrder: 0,
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("63b93b8cccd9794fe2c20075") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93badccd9794fe2c2007e"),
        name: "Sate Taichan",
        price: 25000,
        categoryId: "63b93b04ccd9794fe2c20047",
        isReady: true,
        totalOrder: 0,
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("63b93badccd9794fe2c20081") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93bdeccd9794fe2c2008a"),
        name: "Bakso Sapi",
        price: 20000,
        categoryId: "63b93af6ccd9794fe2c20041",
        isReady: true,
        totalOrder: 0,
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("63b93bdfccd9794fe2c2008d") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93c16ccd9794fe2c20096"),
        name: "Otak otak ikan",
        price: 10000,
        categoryId: "63b93c70ccd9794fe2c200bb",
        isReady: true,
        totalOrder: 0,
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("63b93c16ccd9794fe2c20099") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("63b93c2cccd9794fe2c200a2"),
        name: "French Fries",
        price: 15000,
        categoryId: "63b93cd2ccd9794fe2c200e4",
        isReady: true,
        totalOrder: 0,
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("63b93c2cccd9794fe2c200a5") },
        ],
      },
    ],
  },
  // start image
  {
    model: "Image",
    documents: [
      {
        _id: mongoose.Types.ObjectId("63b93b55ccd9794fe2c2005d"),
        imageUrl: "images/1673083733306.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("63b93b75ccd9794fe2c20069"),
        imageUrl: "images/1673083765300.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("63b93b8cccd9794fe2c20075"),
        imageUrl: "images/1673083788852.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("63b93badccd9794fe2c20081"),
        imageUrl: "images/1673083821555.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("63b93bdfccd9794fe2c2008d"),
        imageUrl: "images/1673083870918.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("63b93c16ccd9794fe2c20099"),
        imageUrl: "images/1673083926705.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("63b93c2cccd9794fe2c200a5"),
        imageUrl: "images/1673083948728.jpg",
      },
    ],
  },
  // end image
];

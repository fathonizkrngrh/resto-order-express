var seeder = require("mongoose-seed");
var mongoose = require("mongoose");
require('dotenv').config();


// Connect to MongoDB via Mongoose
seeder.connect(
  process.env.DB_URL,
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
        _id: mongoose.Types.ObjectId("652cebf91bebc3001853e9a0"),
        name: "Nasi Goreng",
        productId: [
          { _id: mongoose.Types.ObjectId("652cec141bebc3001853e9aa") },
          { _id: mongoose.Types.ObjectId("652cfc5fb96d6c0018cb94bf") },
          { _id: mongoose.Types.ObjectId("652d059ab96d6c0018cb9671") },
          { _id: mongoose.Types.ObjectId("652d05d4b96d6c0018cb967d") }
        ],
        __v: 5
      },
      {
        _id: mongoose.Types.ObjectId("652cff11b96d6c0018cb9555"),
        name: "Mie",
        productId: [
          { _id: mongoose.Types.ObjectId("652d014db96d6c0018cb95a4") },
          { _id: mongoose.Types.ObjectId("652d017fb96d6c0018cb95b0") },
          { _id: mongoose.Types.ObjectId("652d01b7b96d6c0018cb95bc") },
          { _id: mongoose.Types.ObjectId("652d01deb96d6c0018cb95d4") }
        ],
        __v: 4
      },
      {
        _id: mongoose.Types.ObjectId("652d0214b96d6c0018cb95ef"),
        name: "Bihun",
        productId: [
          { _id: mongoose.Types.ObjectId("652d0363b96d6c0018cb95f8") },
          { _id: mongoose.Types.ObjectId("652d037cb96d6c0018cb9604") },
          { _id: mongoose.Types.ObjectId("652d03acb96d6c0018cb9610") },
          { _id: mongoose.Types.ObjectId("652d03c7b96d6c0018cb961c") }
        ],
        __v: 4
      },
      {
        _id: mongoose.Types.ObjectId("652d03f2b96d6c0018cb9638"),
        name: "Kwetiau",
        productId: [
          { _id: mongoose.Types.ObjectId("652d04e3b96d6c0018cb9641") },
          { _id: mongoose.Types.ObjectId("652d04fcb96d6c0018cb964d") },
          { _id: mongoose.Types.ObjectId("652d0525b96d6c0018cb9659") },
          { _id: mongoose.Types.ObjectId("652d0547b96d6c0018cb9665") }
        ],
        __v: 4
      },
      {
        _id: mongoose.Types.ObjectId("652d0688b96d6c0018cb96d7"),
        name: "Menu Spesial",
        productId: [
          { _id: mongoose.Types.ObjectId("652d0746b96d6c0018cb96e0") },
          { __id: mongoose.Types.ObjectId("652d0767b96d6c0018cb96ec") },
          { _id: mongoose.Types.ObjectId("652d0789b96d6c0018cb96f8") },
          { _id: mongoose.Types.ObjectId("652d07a5b96d6c0018cb9704") },
          { _id: mongoose.Types.ObjectId("652d08afb96d6c0018cb9710") },
          { _id: mongoose.Types.ObjectId("652d08cbb96d6c0018cb971c") },
          { _id: mongoose.Types.ObjectId("652d08e7b96d6c0018cb9728") },
          { _id: mongoose.Types.ObjectId("652d08ffb96d6c0018cb9734") }
        ],
        __v: 8
      },
      {
        _id: mongoose.Types.ObjectId("652d094eb96d6c0018cb9760"),
        name: "Menu Paket",
        productId: [
          { _id: mongoose.Types.ObjectId("652d0abfb96d6c0018cb9769") },
          { _id: mongoose.Types.ObjectId("652d0ae7b96d6c0018cb9775") },
          { _id: mongoose.Types.ObjectId("652d0b0ab96d6c0018cb9781") },
          { _id: mongoose.Types.ObjectId("652d0b76b96d6c0018cb9799") },
          { _id: mongoose.Types.ObjectId("652d0ba4b96d6c0018cb97a5") },
          { _id: mongoose.Types.ObjectId("652d0bc4b96d6c0018cb97b1") },
          { _id: mongoose.Types.ObjectId("652d0c20b96d6c0018cb97bd") },
          { _id: mongoose.Types.ObjectId("652d0b50b96d6c0018cb978d") }
        ],
        __v: 9
      },
      {
        _id: mongoose.Types.ObjectId("652d0cbcb96d6c0018cb9805"),
        name: "Snack",
        productId: [
          { _id: mongoose.Types.ObjectId("652d0d41b96d6c0018cb980e") },
          { __id: mongoose.Types.ObjectId("652d0d5bb96d6c0018cb981a") },
          { _id: mongoose.Types.ObjectId("652d0d72b96d6c0018cb9826") },
          { _id: mongoose.Types.ObjectId("652d0d89b96d6c0018cb9832") }
        ],
        __v: 4
      },
      {
        _id: mongoose.Types.ObjectId("652d0dd3b96d6c0018cb98de"),
        name: "Minuman",
        productId: [
          { _id: mongoose.Types.ObjectId("652d1003b96d6c0018cb98fa") },
          { _id: mongoose.Types.ObjectId("652d1019b96d6c0018cb9906") },
          { _id: mongoose.Types.ObjectId("652d103db96d6c0018cb9912") },
          { _id: mongoose.Types.ObjectId("652d1178b96d6c0018cb9924") },
          { _id: mongoose.Types.ObjectId("652d120fb96d6c0018cb9930") },
          { _id: mongoose.Types.ObjectId("652d1226b96d6c0018cb993c") },
          { _id: mongoose.Types.ObjectId("652d123db96d6c0018cb9948") },
          { _id: mongoose.Types.ObjectId("652d125fb96d6c0018cb9954") },
          { _id: mongoose.Types.ObjectId("652d1334b96d6c0018cb9960") },
          { _id: mongoose.Types.ObjectId("652d1348b96d6c0018cb996c") },
          { _id: mongoose.Types.ObjectId("652d1360b96d6c0018cb9978") },
          { _id: mongoose.Types.ObjectId("652d137cb96d6c0018cb9984") }
        ],
        __v: 12
      }
    ]
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
        _id: mongoose.Types.ObjectId("63b93b3cccd9794fe2c20051"),
        imageUrl: "images/1672737402302.jpg",
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

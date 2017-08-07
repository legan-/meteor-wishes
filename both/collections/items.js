Items = new Mongo.Collection('items');

ItemsSchema = new SimpleSchema({
  'name': {
    type: String,
    label: 'Item Name'
  },
  'description': {
    type: String,
    label: 'Item Description'
  },
  'location': {
    type: String,
    label: 'Item Location',
    optional: true
  },
  'userId': {
    type: String,
    label: 'User added the Item' 
  },
  'private': {
    type: Boolean,
    label: 'Item Permission'
  },
  'createdAt': {
    type: Date,
    label: 'Date the Item Added to System',
    denyUpdate: true,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
});

Items.attachSchema(ItemsSchema);

// Factory.define('item', Items, {
//   name: Fake.word(),
//   description: Fake.sentence(10),
//   location: Fake.sentence(14),
//   userId: 't3ggh34gegh45',
//   private: true
// });

// const item = Factory.create('item')
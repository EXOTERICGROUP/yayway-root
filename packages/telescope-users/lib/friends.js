Users.requestsRef = new Mongo.Collection("requests");
Users.friendsRef = new Mongo.Collection("friends");

Users.friendsRef.schema = new SimpleSchema({
  _id: {
    type: String,
    optional:true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  requesterId: {
    type:String
  },
  followingId: {
    type: String
  }
});
//
var allowOnlyOwner = function(userId, doc){
  if (userId && (doc.requesterId == userId) )
    return true;
  else
    return false;
}

Users.friendsRef.allow({
  insert: function(userId, doc){
    return allowOnlyOwner(userId, doc)
  },
  update: function(userId, doc, fields, modifier){
    return allowOnlyOwner(userId, doc)
  },
  remove: function(userId, doc){
    return allowOnlyOwner(userId, doc)
  }
});

Template.welcomeToYayWay.onCreated(function () {
  var template = this;
  template.subscribe('all-follow-users');
  template.subscribe('allFriends');
});

Template.welcomeToYayWay.helpers({
  getAllUsers:function () {
    return Meteor.users.find({}).fetch();
  },
  isUserMyFriend : function (followingId) {
    var rows = Users.friendsRef.find({ "requesterId" : Meteor.userId(), "followingId" : followingId }).count();
    return rows;
  },
  areWeGood : function () {
    // alert(Users.friendsRef.find({ "requesterId" : Meteor.userId()}).count());
    if(Users.friendsRef.find({ "requesterId" : Meteor.userId()}).count() > 2)
      return true;
    return false;
  },
  counter : function () {
    return Users.friendsRef.find({ "requesterId" : Meteor.userId()}).count();
  }
});

Template.welcomeToYayWay.events({
  'click .btnRemoveFriendRequest':function () {
    removeFriendShip(Meteor.userId(), this._id );
    this.counter--;
  },
  'click .btnSendFriendRequest':function () {
    acceptFriendRequest(Meteor.userId(), this._id );
    this.counter++;
  }
});

acceptFriendRequest = function (requesterId, followingId) {
  Users.friendsRef.insert({ "requesterId" : requesterId, "followingId" : followingId });
}

removeFriendShip = function (requesterId, followingId ) {
  var result = Users.friendsRef.find({ "followingId" : followingId, "requesterId": requesterId }).fetch();

  for (friendship of result) {
      Users.friendsRef.remove( {"_id": friendship._id} );
  }

  var result = Users.friendsRef.find({ "followingId" : requesterId , "requesterId": followingId }).fetch();
  for (friendship of result) {
      Users.friendsRef.remove( {"_id": friendship._id} );
  }
  return;
}

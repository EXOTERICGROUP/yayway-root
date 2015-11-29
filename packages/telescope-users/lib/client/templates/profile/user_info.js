Template.user_info.helpers({
  canEditProfile: function() {
    var currentUser = Meteor.user();
    return currentUser && (this._id === currentUser._id || Users.is.admin(currentUser));
  },
  getUrlStyle : function (label){

    if(label == "Name" ){
      return "font-size: x-large; font-weight: bold;";
    }
    else {
      return "";
    }
  },
  getProfileImage : function (){

    if(Meteor.user().profile.image != null){
      return Meteor.user().profile.image;
    }
  },
  createdAtFormatted: function() {
    return this.createdAt;
  },
  canInvite: function() {
    // if the user is logged in, the target user hasn't been invited yet, invites are enabled, and user is not viewing their own profile
    return Meteor.user() && Meteor.user()._id !== this._id && !Users.is.invited(this) && Telescope.utils.invitesEnabled() && Users.can.invite(Meteor.user());
  },
  inviteCount: function() {
    return Meteor.user().telescope.inviteCount;
  },
  getTwitterName: function () {
    return Users.getTwitterName(this);
  },
  getGitHubName: function () {
    return Users.getGitHubName(this);
  },
  publicProfileFields: function () {
    var user = this;
    var schema = Users.simpleSchema();
    var publicData = _.compact(_.map(schema.getProfileFields(), function (fieldName) {
      if (Telescope.getNestedProperty(user, fieldName)) {
        var field = schema._schema[fieldName];
        var item = {
          label: !!field.label ? field.label: i18n.t(fieldName.replace("telescope.", "")),
          value: Telescope.getNestedProperty(user, fieldName)
        };
        if (!!field.template) {
          item.template = field.template;
        }
        return item;
      }
    }));
    return publicData;
  },
  isUsingPassword: function  () {
    return !!this.services.password
  },
  currentUserProfileId: function  () {
    return this._id;
  },
  isMyProfile: function () {
      if(Meteor.userId() !== this._id){
        return false;
      }
      return true;
  },
  isNotMyProfile: function () {
      if(Meteor.userId() !== this._id)
        return true;
      return false;
  },
  getUsernameById : function (_id) {
    var users = Meteor.users.find({"_id":_id}).fetch();
    for (u of users) {
      return u.username;
    }
  },
  getMyFriendsList : function (currentUserId ) {
    var result = Users.friendsRef.find({ "followingId" : currentUserId });
    return result;
  },
  isUserMyFriend : function (followingId) {
    var rows = Users.friendsRef.find({ "requesterId" : Meteor.userId(), "followingId" : followingId }).count();
    return rows;
  }
});

Template.user_info.events({
  'click .invite-link': function(e, instance){
    var user = this;
    Meteor.call('inviteUser', {userId: user._id}, function(error, success){
      if (error) {
        Messages.flash(error, "error");
        Messages.clearSeen();
      } else {
        Messages.flash('Thanks, user has been invited.', "success");
        Messages.clearSeen();
      }
    });
  },
  'click #btnSendFriendRequest': function(event, template){
      acceptFriendRequest(Meteor.userId(), this._id );
  },
  'click #btnRemoveFriendRequest': function (event, template){
    if(typeof this.requesterId === "undefined" && typeof this.followingId === "undefined")
      removeFriendShip(Meteor.userId(), this._id );
    removeFriendShip(this.requesterId, this.followingId);
  },
  'click #btnAcceptFriendRequest': function (event, template) {
    acceptFriendRequest(this.requesterId, Meteor.userId());
  },
  'click #btnDenyFriendRequest': function (event, template){
    denyFriendShip(this.requesterId, this.followingId);
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

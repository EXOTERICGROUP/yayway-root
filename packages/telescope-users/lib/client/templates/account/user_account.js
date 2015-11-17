Template.user_account.helpers({
  user: function  () {
    return this;
  },
  userFields: function () {
    var fields = Meteor.users.simpleSchema().getEditableFields(Meteor.user());
    return fields;
  },
  isUsingPassword: function  () {
    return this.services && !!this.services.password;
  },
  getProfileImage : function (){
    if(Meteor.user().profile.image != null)
      return this.profile.image;
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
  }
});

Template.user_account.events({
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
    if(!IsRequestExists()){
      insertIntoRequests(Meteor.userId(), this._id );
    }
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

AutoForm.hooks({
  editUserForm: {
    onSuccess: function(operation, result) {
      this.template.$('button[type=submit]').removeClass('loading');
      Messages.flash(i18n.t("user_profile_saved"), 'success');
      Messages.clearSeen();
    },
    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      Messages.flash(error.message.split('|')[0], 'error'); // workaround because error.details returns undefined
      Messages.clearSeen();
    }
  }
});

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
    // $('#editYourAvatarModal .error').attr('class', 'col-md-9');

    if(Meteor.user().profile.image != null)
      return this.profile.image;
  },
  getMyFriendRequests : function () {
    console.log("here");
    var result = requestsRef.find({ "followingId" : Meteor.userId() });
    console.log(result.fetch());
    return result;
  },
  getUsernameById : function (_id) {
    var users = Meteor.users.find({"_id":_id}).fetch();
    for (u of users) {
      console.log(u.username);
      return u.username;
    }
  },
  getMyFriendsList : function (currentUserId ) {
    console.log("getting friends list");
    console.log(currentUserId);
    var result = friendsRef.find({ "followingId" : currentUserId });
    console.log(result);
    console.log("----end of result----");
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
    // console.log("requesterId"+ this.requesterId + " followingId" + this.followingId);
    // console.log("a: " + template.requesterId + " b:"+ template.followingId);
    if(typeof this.requesterId === "undefined" && typeof this.followingId === "undefined")
      removeFriendShip(Meteor.userId(), this._id );
    removeFriendShip(this.requesterId, this.followingId);
  },
  'click #btnAcceptFriendRequest': function (event, template) {
    acceptFriendRequest(this.requesterId, Meteor.userId());
  },
  'click #btnDenyFriendRequest': function (event, template){
    // console.log("requesterId"+ this.requesterId + " followingId" + this.followingId);
    denyFriendShip(this.requesterId, this.followingId);
  }
});

IsRequestExists = function (requesterId, followingId) {
  var rows = requestsRef.find({ "requesterId" : requesterId, "followingId" : followingId }).count();
  console.log("rows found" + rows);
  return rows;
}

insertIntoRequests = function (requesterId, followingId) {
  requestsRef.insert({ "requesterId" : requesterId, "followingId" : followingId });
  console.log("Friend request sent to: " + followingId);
}

denyFriendShip = function (requesterId, followingId) {
  var result = requestsRef.find({ "followingId" : followingId, "requesterId": requesterId }).fetch();

  for (req of result) {
      console.log("requestId:" + req._id);
      console.log("requesterId:"+ req.requesterId );
      console.log("followingId:" + req.followingId);
      var tempId = req._id;
      requestsRef.remove( {"_id": req._id} );
      console.log("Denied friendship:" +tempId);
  }
  return;
}

acceptFriendRequest = function (requesterId, followingId) {
  friendsRef.insert({ "requesterId" : requesterId, "followingId" : followingId });
  friendsRef.insert({ "requesterId" : followingId, "followingId" : requesterId });
  console.log("friendship started");
  var requestCollection =  requestsRef.find({ "requesterId" : requesterId, "followingId" : followingId }).fetch();
  console.log("requesterId:" + requesterId +" followingId:" + followingId);
  for (req of requestCollection) {
      console.log(req._id);
      requestsRef.remove({ "_id" : req._id});
  }

  requestCollection =  requestsRef.find({ "requesterId" : followingId, "followingId" : requesterId }).fetch();
  console.log("requesterId:" + followingId +" followingId:" + requesterId);
  for (req of requestCollection) {
      console.log(req._id);
      requestsRef.remove({ "_id" : req._id});
  }

  console.log("----request cleaned up!----");
}

removeFriendShip = function (requesterId, followingId ) {
  var result = friendsRef.find({ "followingId" : followingId, "requesterId": requesterId }).fetch();

  for (friendship of result) {
      console.log("friendshipId:" + friendship._id);
      console.log("requesterId:"+ friendship.requesterId );
      console.log("followingId:" + friendship.followingId);
      friendsRef.remove( {"_id": friendship._id} );
      console.log("Removed friendship:" + friendship._id);
  }

  var result = friendsRef.find({ "followingId" : requesterId , "requesterId": followingId }).fetch();
  for (friendship of result) {
      console.log("----------Next friendship----------");
      console.log("friendshipId:" + friendship._id);
      console.log("requesterId:"+ friendship.requesterId );
      console.log("followingId:" + friendship.followingId);
      friendsRef.remove( {"_id": friendship._id} );
      console.log("Removed friendship:" + friendship._id);
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

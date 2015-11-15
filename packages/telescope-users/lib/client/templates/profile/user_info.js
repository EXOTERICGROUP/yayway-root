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
      // console.log('image found!');
      return Meteor.user().profile.image;
    }
    // else {
    //   // console.log('image not found!');
    //   var AVATAR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSgBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAIAAgAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APZ6ACgAoAKACgAoAKAIbi6t7Zc3M8UI9ZHC/wA6AK8GradPKI4b61eQ9FWVST9OaAL1ABQAUAFABQAUAFABQAUAFABQAUANkdIo2kkZURRlmY4AHqaAPPvEXjOaZ3g0gmKEcGcj5m+noP1+lAHHyyPNI0krtJI3JZjkn8aAGUAb9h4t1azRU89Z0XoJl3H8+v60Adn4c8V2+rSC3nT7Pdn7q5yr/Q+vt/OgDpKACgAoAKACgAoAKACgAoAKAOE+I2rOrR6ZA2FIEk2O/wDdX+v5UAcJQAUAFABQA5HaN1dGKupBVgcEEdxQB7RpF0b3S7S5b70sSs31xz+tAFygAoAKACgAoAKACgAoAKAPHvFMzT+ItQdjnEpQfRflH8qAMqgAoAKACgAoA9e8IHPhrT/+ueP1NAGxQAUAFABQAUAFABQAUAFAHi+uHOt6gf8Ap5k/9CNAFGgAoAKACgAoA9T8BXS3Hh2KMAhrdmibPfndx+DCgDo6ACgAoAKACgAoAKACgAoA8a8RRtFr+oq4IPnu2D6E5H6EUAZ1ABQAUAFABQB6p4EszaeHombIa4YzEHsDwP0AP40AdFQAUAFABQAUAFABQAUAFAHF/EPRzNCupW6AvENs2OpXsfw/kfagDz2gAoAKACgDX8LaUNX1eOCQkQoPMkx3UY4/EkCgD15VCqFUAKBgAdhQAtABQAUAFABQAUAFABQAUARzxJPBJFIMpIpRh6gjBoA8SuYJLa4lgmG2SNijD3BxQBFQAUAFAHonw2sRFp896335n2L7Kv8AiSfyoA7KgAoAKACgAoAKACgAoAKACgBCQASSAB1JoA8l8Zy28/iK6ktHWRDtyyHILBQDg0AYlABQAUAeo/D+5jm8PRwoR5kDMrr35JIP6/pQB0tABQAUAFABQAUAFABQAUAU9R1Kz06Pfe3EcQ7An5m+g6mgDzfxR4mm1dzDb7obEfwd5Pdv8KAOdoAKACgAoAnsruexuVntJWilXoVPX2PqPagD1fw3rkOs2YYFUuUH72LPIPqPagDYoAKACgAoAKAMDVPFmmafLJCzyTTISGSJc4Ppk4FAHP3nj6ZlxZ2SIf70rlv0GP50AYl74p1e7yDdtCv92EbP16/rQBiuzOxZ2LMeSSck0ANoAKACgAoAKACgB0bvG6vGzI68hlOCPxoA6HTfGGqWZCyyC6jzyJvvY9m6/nmgDrNM8Z6bd7VuN9pIe0nK/wDfQ/rigDpIZY54lkhkSSNuQyHIP40APoApazefYNKurrvFGSv+90H64oA8XJJOSSSepPegBKACgAoAKACgAoAKACgAoAKACgAoA0dG1e70i4ElrIdhPzxE/K49x/WgD13T7uO+sYLqHPlyqGAPb2oA574i3Jh0FYVIzPKqkewy38wKAPMqACgAoAKACgAoAKACgAoAKACgAoAKACgD074e3y3Oh/ZuBJasVI9VYkg/qR+FAGD8SrnzNUtrcHIii3EehY/4AUAcfQAUAFABQAUAFABQAUAFABQAUAFABQAUAdV8ObnytdeE9J4iPxGD/LNAGZ4tuRd+I76Rfuh/LH/AQF/pQBkUAFABQAUAFABQAUAFABQAUAFABQAUAFAGv4Tn+z+I7B/WTy/++gV/rQBlyuZJXdurMWP40AMoAKACgAoAKACgAoAKACgAoAKACgAoAKAJ7GXyL23m/wCeciv+RBoA/wD/2Q==";
    //   return AVATAR;
    // }
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
    console.log(Meteor.userId());
    return this._id;
  },
  isMyProfile: function () {
      if(Meteor.userId() !== this._id){
        console.log("not my profile!");
        return false;
      }
      return true;
  },
  isNotMyProfile: function () {
      if(Meteor.userId() !== this._id)
        return true;
      return false;
  },
  getMyFriendRequests : function () {
    console.log("here");
    var result = requestsRef.find({ "followingId" : Meteor.userId() });
    console.log(result.fetch());
    return result;
  },
  isRequestExists : function ( followingId) {
    var rows = requestsRef.find({ "requesterId" : Meteor.userId(), "followingId" : followingId }).count();
    console.log("rows found" + rows);
    console.log("requesterId:" + Meteor.userId(), "followingId:" + followingId );
    return rows;
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
  },
  isUserMyFriend : function (followingId) {
    var rows = friendsRef.find({ "requesterId" : Meteor.userId(), "followingId" : followingId }).count();
    console.log("rows found" + rows);
    console.log("requesterId:" + Meteor.userId(), "followingId:" + followingId );
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

requestsRef = new Mongo.Collection("requests");
friendsRef = new Mongo.Collection("friends");

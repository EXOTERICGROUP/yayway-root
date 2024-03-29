// accept either an ID or a slug
Meteor.publish('singleUser', function(idOrSlug) {
  var findById = Meteor.users.findOne(idOrSlug);
  var findBySlug = Meteor.users.findOne({"telescope.slug": idOrSlug});
  var user = typeof findById !== 'undefined' ? findById : findBySlug;
  var options = Users.is.adminById(this.userId) ? {} : {fields: Users.pubsub.publicProperties};
  if (user) {
    return Meteor.users.find({_id: user._id}, options);
  }
  return [];
});

Meteor.publish('userPosts', function(terms) {

  terms.userId = this.userId; // add userId to terms

  var parameters = Posts.parameters.get(terms);
  var posts = Posts.find(parameters.find, parameters.options);
  return posts;
});

Meteor.publish('userUpvotedPosts', function(terms) {

  terms.userId = this.userId; // add userId to terms

  var parameters = Posts.parameters.get(terms);
  var posts = Posts.find(parameters.find, parameters.options);
  return posts;
});

Meteor.publish('userDownvotedPosts', function(terms) {

  terms.userId = this.userId; // add userId to terms

  var parameters = Posts.parameters.get(terms);
  var posts = Posts.find(parameters.find, parameters.options);
  return posts;
});

// Publish the current user

Meteor.publish('currentUser', function() {
  var user = Meteor.users.find({_id: this.userId}, {fields: Users.pubsub.hiddenProperties});
  return user;
});

// publish all users for admins to make autocomplete work
// TODO: find a better way

Meteor.publish('allUsersAdmin', function() {
  var selector = Settings.get('requirePostInvite') ? {isInvited: true} : {}; // only users that can post
  if (Users.is.adminById(this.userId)) {
    return Meteor.users.find(selector, {fields: Users.pubsub.avatarProperties});
  }
  return [];
});

Meteor.publish('allFriends', function () {
  return Users.friendsRef.find();
});

Meteor.publish('all-follow-users', function () {
  return Users.find({},{"username" : 1, "profile" : 1, "_id": 1});
});

// Publish all users to reactive-table (if admin)
// Limit, filter, and sort handled by reactive-table.
// https://github.com/aslagle/reactive-table#server-side-pagination-and-filtering-beta

ReactiveTable.publish("all-users", function() {
  if(Users.is.adminById(this.userId)){
    return Meteor.users;
  } else {
    return [];
  }
});

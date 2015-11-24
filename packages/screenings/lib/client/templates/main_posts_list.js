Template.main_posts_list.onCreated(function () {
  var template = this;
  template.subscribe('allFriends');
});

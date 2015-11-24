Template.user_controller.onCreated(function () {
  var template = this;
  template.subscribe('singleUser', FlowRouter.getParam("_idOrSlug"));
  template.subscribe('allFriends');
});

Template.user_controller.helpers({
  data: function () {

    var idOrSlug = FlowRouter.getParam("_idOrSlug");
    var findById = Meteor.users.findOne(idOrSlug);
    console.log("Id:"+findById);
    var findBySlug = Meteor.users.findOne({"telescope.slug": idOrSlug});
    console.log(findBySlug);
    return {user: findById || findBySlug};

  }
});

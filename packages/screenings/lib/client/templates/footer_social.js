Template.zah_footer_social.replaces("footer_social");
Template.zah_footer_social.helpers({
  getLoggedInUser: function(){
    return Meteor.user()
  }
})

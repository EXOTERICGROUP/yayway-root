Template.zah_footer_social.replaces("footer_social");
Template.footer_social.helpers({
  getUseraProfile: function(){
    return Meteor.user().profile.image
  },
  getProfileUrl: function(){
    return Users.getProfileUrl(Meteor.user());
  }
})

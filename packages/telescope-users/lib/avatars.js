Avatar.setOptions({
  // fallbackType: 'initials',
  emailHashProperty: 'telescope.emailHash',
  customImageProperty: function() {
    // var user = this;
    // return user.profile.image
    return this.profile.image;
  }

});

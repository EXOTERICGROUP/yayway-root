Avatar.setOptions({
  // fallbackType: 'initials',
  emailHashProperty: 'telescope.emailHash',
  customImageProperty: function() {
    if ( this.profile && this.profile.image)
      return this.profile.image;
    else
      return ""
  }

});

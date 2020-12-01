
loginWithGoogle: function () {
    let self = this;
    const PreGoogleProvider = api.firebase().auth;
    const GoogleProvider = new PreGoogleProvider.GoogleAuthProvider();

    api.firebase().auth().signInWithPopup(GoogleProvider)
        .then(function () {
            api.firebase().auth().onAuthStateChanged(function (user) {
                if (user) {
                    self.$router.push("/");
                }
            });
        })
        .catch(error => {
            console.log(error)
        })
}

async showFolderContent(id) {
    let response

    if (!id) {
        response = await api.object().get()
    } else {
        response = await api.object().get(this.currentParentID)
    }
    this.responseLoaded = true
    this.response = response.listing

}

async deleteEntry() {
    const self = this

    api.object().remove(this.selectedFile.id)
        .then(function() {
            self.showFolderContent(self.currentParentID);
            self.fileDialog = false;
        })
        .catch(err => console.log(err))

}

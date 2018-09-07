



const logins = new Vue({
  el: '#login',
  data: {
    users: [],
    passwords: [],
    newUser: null,
    newPassword : null,
    newConfirmPassword : null,
    User : null,
    Password : null,
    connectedUser : null,
    errors : null,
    comments: [{
      title: "Great article!",
      author: "Avenflar"
    }],
    comment :"",
    errorsComments : ""
  },
  mounted() {
    if (localStorage.getItem('passwords')) {
      try {
        this.passwords = JSON.parse(localStorage.getItem('passwords'));
      } catch(e) {
        localStorage.removeItem('passwords');
      }
    }
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
    if (localStorage.getItem('comments')) {
      try {
        this.comments = JSON.parse(localStorage.getItem('comments'));
      } catch(e) {
        localStorage.removeItem('comments');
      }
    }
  },
  methods: {
    addSomeone:function(e) {
      e.preventDefault();
      this.errors=null;
      if (!this.newUser) {
        this.errors = "The user must be filled in";
      }
      if (!this.newPassword) {
        this.errors = "The password must be filled in";
        
      }
      if(!this.newConfirmPassword){
        this.errors = "The password must be confirmed";
        
      }
      if(this.newConfirmPassword != this.newPassword){
        this.errors = "Passwords do not match";
        
      }
      if(this.errors==null){
      this.users.push(this.newUser);
      this.newUser = '';
      this.passwords.push(this.newPassword);
      this.newPassword = '';
      this.newConfirmPassword = '';
      this.saveSomeone();
        
      }
    },
    checkInfos:function(e){
      
      var count = 0;
      e.preventDefault();
      while(count <= this.users.length) {
        if(this.User == this.users[count] && this.Password == this.passwords[count]){
            this.connectedUser = this.User;
            return true;
          }
        count++;
      }
      
  
    },
    removeSomeone(x) {
      this.users.splice(x, 1);
      this.passwords.splice(x,1)
      this.saveSomeone();
    },
    saveSomeone() {
      let parsed = JSON.stringify(this.users);
      localStorage.setItem('users', parsed);
      let parsed2 = JSON.stringify(this.passwords);
      localStorage.setItem('passwords', parsed2);
    },
    postComment: function() {
      this.errorsComments="";
      if(this.connectedUser != null){
        this.comments.push({
          title: this.comment,
          votes: 0,
          author: this.connectedUser
        })
        this.comment = "";
        this.saveComment();
      }
      else {
        this.errorsComments="You must be log in to post a comment";
      }
    },
    removeComment(x) {
      this.errorsComments="";
      if(this.connectedUser == this.comments[x].author)
      {
        this.comments.splice(x,1)
        this.saveComment();
      }
      else {
        this.errorsComments="This must be your comment in order to be able to delete it";
      }
      
    },
    editComment(x) {
      this.errorsComments="";
      if(this.connectedUser == this.comments[x].author)
      {
        this.comments[x].title = prompt("Edit your comment",this.comments[x].title);
        this.saveComment();
      }
      else {
        this.errorsComments="This must be your comment in order to edit it";
      }
    },
    saveComment(){
      let parsed = JSON.stringify(this.comments);
      localStorage.setItem('comments', parsed);
    }
  }
})



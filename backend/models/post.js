const db=require('../util/database');
module.exports=class Post{
    constructor(title,body,user){
        this.title=title;
        this.body=body;
        this.user=user;

    }
   static fetchAll(){
    return db.execute('SELECT * FROM posts');

   }

    static save(post){
        return db.execute(
           ' insert into posts(title,body,user) values(? ,? , ?)',[post.title,post.body,post.user]
        );
    }

    static delete(id){
        return db.execute('DELETE FROM posts WHERE id = ?',[id]);
    }
};
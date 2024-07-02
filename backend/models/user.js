const db=require('../util/database');
module.exports=class User{
    constructor(name,email,password){
        this.name=name;
        this.email=email;
        this.password=password;
    }
    static find(email){
        return db.execute(
            'select * from users where email= ?',[email]
        );
    }
    static save(user){
        return db.execute(
           ' insert into users(name,email,password) values(? ,? , ?)',[user.name,user.email,user.password]
        );
    }
};
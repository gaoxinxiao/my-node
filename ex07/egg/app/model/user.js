module.exports = app => {
    const { STRING } = app.Sequelize;
    const User = app.model.define(
        "user",
        { name: STRING(30) },
        { timestamps: false }
    );
    // 每次启动的时候都强制 数据库同步 （真正开发的时候不要加）
    User.sync({ force: true })
    return User;
};
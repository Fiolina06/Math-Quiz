module.exports = (sequelize, Sequelize) => {
    const Kategori = sequelize.define('kategori', { //pendeklarasian kolom
        kategori : {
            type: Sequelize.STRING,
        },

    });
    return Kategori;

}
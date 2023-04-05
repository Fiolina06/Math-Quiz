module.exports = (sequelize, Sequelize) => {
    const Materi = sequelize.define('materi', { //pendeklarasian kolom
        materi : {
            type: Sequelize.STRING,
        },

        point_materi : {
            type: Sequelize.STRING,
        },

        kategoriID : {
            type: Sequelize.INTEGER,
        },

        image: {
            type: Sequelize.STRING,
        },
   
    });
    return Materi;

}
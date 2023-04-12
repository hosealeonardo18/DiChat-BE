const Pool = require('../config/db');

const getContactUser = (id) => {
    return Pool.query(`SELECT contacts.*, users.fullname AS fullname, users.email AS email, users.no_telp AS no_telp, users.image AS image 
    FROM contacts 
    INNER JOIN users ON users.id = contacts.id_people
    WHERE id_user='${id}'`)
}

const createContactUser = (data) => {
    const { id, id_user, id_people } = data
    return Pool.query(`INSERT INTO contacts(id, id_user, id_people)
    VALUES ('${id}','${id_user}', '${id_people}')`);
}

const deleteContact = (id) => {
    return Pool.query(`DELETE FROM contacts WHERE id='${id}'`)
}

const findIdContact = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id FROM contacts WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const findIdUserContact = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id_user FROM contacts WHERE id_user='${id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const findId = (idUser, id_people) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id_people FROM contacts WHERE id_user='${idUser}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const findIdUser = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id FROM users WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

module.exports = {
    getContactUser,
    createContactUser,
    deleteContact,
    findIdContact,
    findId,
    findIdUser,
    findIdUserContact
}
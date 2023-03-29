const Pool = require('../config/db');

const getMessage = (idSender, idReceiver) => {
    return Pool.query(`SELECT * FROM messages where (id_sender = '${idSender}' AND id_receiver = '${idReceiver}') OR (id_sender = '${idSender}' AND id_receiver = '${idReceiver}') ORDER BY created_at ASC`)
}

const addMessage = (data) => {
    const { id, id_sender, id_receiver, message, created_at } = data

    return Pool.query(`INSERT INTO messages(id, id_sender, id_receiver,  message, created_at)
    VALUES ('${id}','${id_sender}', '${id_receiver}', '${message}', '${created_at}')`);
}

const deleteMessage = (id) => {
    return Pool.query(`DELETE FROM messages WHERE id='${id}'`)
}

const findId = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id FROM messages WHERE id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};


module.exports = {
    getMessage,
    addMessage,
    deleteMessage,
    findId

}
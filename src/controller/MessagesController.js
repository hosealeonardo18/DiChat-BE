const MessagesModel = require('../model/MessagesModel')
const helperResponse = require('../helper/common');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment'); // require
moment().format();

const MessagesController = {
	getMessages: async (req, res) => {
		const idReceiver = req.params.id;
		const idSender = req.payload.id

		return MessagesModel.getMessage(idSender, idReceiver).then(result => {
			helperResponse.response(res, result.rows, 200, 'Get Data Success!');
		}).catch(error => {
			res.send(error);
		})
	},

	CreateMessage: async (req, res) => {
		try {
			const idReceiver = req.params.id;
			const idSender = req.payload.id
			const { message } = req.body

			const id = uuidv4();
			const data = {
				id,
				id_sender: idSender,
				id_receiver: idReceiver,
				message,
				created_at: moment(Date.now()).format("HH:mm")
			}

			return MessagesModel.addMessage(data).then(result => {
				helperResponse.response(res, result.rows, 201, "Message Created!");
			})
				.catch(error => {
					res.status(500).send(error)
				})
		} catch (error) {
			console.log(error);
		}
	},

	deleteMessage: async (req, res) => {
		const id = req.params.id;

		const { rowCount } = await MessagesModel.findId(id);
		if (!rowCount) return res.json({ message: `Message Not Found!` })

		return MessagesModel.deleteMessage(id).then(result => {
			helperResponse.response(res, result.rows, 200, "Message Deleted!")
		}).catch(error => {
			res.send(error)
		})
	},

}

module.exports = MessagesController;
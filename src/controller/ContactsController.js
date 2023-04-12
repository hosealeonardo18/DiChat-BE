const ContactsModel = require('../model/ContactsModel')
const helperResponse = require('../helper/common');
const { v4: uuidv4 } = require('uuid');

const ContactsController = {
	getContactUser: async (req, res) => {
		const id = req.payload.id;

		return ContactsModel.getContactUser(id).then(result => {
			helperResponse.response(res, result.rows, 200, 'Get Data Success!');
		}).catch(error => {
			res.send(error);
		})
	},

	CreateContact: async (req, res) => {
		try {
			const { id_people } = req.body
			const idUser = req.payload.id

			// cek id user in table users
			const rowCountUser = await ContactsModel.findIdUser(id_people)
			if (!rowCountUser.rowCount) return res.json({ message: `User Not Found!` })

			// cek id user in table contact
			// const { rowCount } = await ContactsModel.findId(idUser, id_people)
			// if (rowCount) return res.json({ message: `Users have been added!` })

			const id = uuidv4();
			const data = {
				id,
				id_user: idUser,
				id_people
			}

			return ContactsModel.createContactUser(data).then(result => {
				helperResponse.response(res, result.rows, 201, "Contact Added!");
			})
				.catch(error => {
					res.status(500).send(error)
				})
		} catch (error) {
			console.log(error);
		}
	},

	deleteContact: async (req, res) => {
		const id = req.params.id;

		const { rowCount } = await ContactsModel.findIdContact(id);
		if (!rowCount) return res.json({ message: `Contact Not Found!` })

		return ContactsModel.deleteContact(id).then(result => {
			helperResponse.response(res, result.rows, 200, "Contact Deleted!")
		}).catch(error => {
			res.send(error)
		})
	},

}

module.exports = ContactsController;
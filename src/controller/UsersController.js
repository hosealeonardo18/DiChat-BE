const UsersModel = require('../model/UsersModel')
const ContactModel = require('../model/ContactsModel')
const helperResponse = require('../helper/common');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const authHelper = require('../helper/AuthHelper');
const jwt = require('jsonwebtoken');
const { uploadPhotoCloudinary } = require('../../cloudinary')
const { deletePhotoCloudinary } = require('../../cloudinary')

const usersController = {
	getAllUsers: async (req, res) => {
		try {
			const page = Number(req.query.page) || 1;
			const limit = Number(req.query.limit) || 5;
			const offset = (page - 1) * limit;
			let searchParams = req.query.search || "";
			let sortBy = req.query.sortBy || "fullname";
			let sort = req.query.sort || "ASC";

			const result = await UsersModel.getAllUsers(searchParams, sortBy, sort, limit, offset)
			const { rows: [data] } = result;

			delete data.password;

			const { rows: [count] } = await UsersModel.countData();

			const totalData = parseInt(count.count);
			const totalPage = Math.ceil(totalData / limit);
			const pagination = {
				currentPage: page,
				limit: limit,
				totalData: totalData,
				totalPage: totalPage
			}

			return helperResponse.response(res, result.rows, 200, "Get Data users Success!", pagination);
		} catch (error) {
			console.log(error);
		}
	},

	getDetailUsers: async (req, res) => {
		try {
			const id = req.params.id;

			// validation id
			const { rowCount } = await UsersModel.getDetailUsers(id);
			if (!rowCount) return res.json({ message: 'User Not Found!' });

			// get data user by id
			const { rows: [data] } = await UsersModel.getDetailUsers(id);

			// get data contacts by id
			const { rows } = await ContactModel.getContactUser(id)
			for (let i = 0; i < rows.length; i++) {
				delete rows[i].id_user
			}

			// add contact to render data
			data.contacts = rows

			return helperResponse.response(res, data, 200, 'Get Data Success!');
		} catch (error) {
			console.log(err);
		}
	},

	updateUsers: async (req, res) => {
		const image = req.file.filename;
		const id = req.params.id;
		const { fullname, email, no_telp, description, password } = req.body

		// cek user
		const { rowCount } = await UsersModel.getDetailUsers(id);
		if (!rowCount) return res.json({ message: 'User Not Found!' });

		// get Detail users
		const { rows: [oldUser] } = await UsersModel.getDetailUsers(id);
		const split = oldUser.image.split("/")

		// verif token
		const idToken = req.payload.id;
		if (idToken !== id) return res.json({ messagWe: 'Sorry, this is not your account!' });

		const data = {
			id,
			fullname,
			email,
			password,
			no_telp,
			description,
			image
		};

		// cek input password
		if (!password) {
			data.password = oldUser.password
		} else {
			const salt = bcrypt.genSaltSync(10);
			const passHash = bcrypt.hashSync(password, salt);
			data.password = passHash
		}

		if (!oldUser.image) {
			const upload = await uploadPhotoCloudinary(req.file.path);
			data.image = upload.secure_url
		} else {
			try {
				const upload = await uploadPhotoCloudinary(req.file.path);
				await deletePhotoCloudinary(split[7])
				data.image = upload.secure_url
			} catch (error) {
				console.log(error);
			}
		}

		return UsersModel.updateUsers(data).then((result) => {
			helperResponse.response(res, result.rows, 201, `Users Updated!`);
		}).catch((error) => { res.send(error); });
	},

	deleteUsers: async (req, res) => {
		const id = req.params.id;
		const { rowCount } = await UsersModel.findId(id);
		if (!rowCount) return res.json({ message: `User id: ${id} Not Found!` })

		// const idToken = req.payload.id;
		// if (idToken !== id) return res.status(403).json({ messagWe: 'Sorry, this is not your account!' });

		return UsersModel.deleteUsers(id).then(result => {
			helperResponse.response(res, result.rows, 200, "User Deleted!")
		}).catch(error => {
			res.send(error)
		})
	},

	registerUsers: async (req, res) => {
		try {
			const { fullname, email, password, no_telp } = req.body

			// cek email
			const { rowCount } = await UsersModel.findEmail(email);
			if (rowCount) return res.json({ message: "Email already use!" })
			if (password.length < 8) return res.json({ message: "Password Must 8 Character!" })

			// encrypt password
			const salt = bcrypt.genSaltSync(10);
			const passHash = bcrypt.hashSync(password, salt);

			const id = uuidv4();

			const data = {
				id,
				fullname,
				email,
				password: passHash,
				no_telp,
				image: 'https://res.cloudinary.com/dklpoff31/image/upload/v1680077751/default_p3c9hg.jpg'
			}

			return UsersModel.registerUsers(data).then(result => {
				helperResponse.response(res, result.rows, 201, "Register Users Success!");
			}).catch(error => {
				res.status(500).send(error)
			})

		} catch (error) {
			console.log(error);
		}
	},

	loginUsers: async (req, res) => {
		try {
			const { email, password } = req.body;
			const { rows: [cek] } = await UsersModel.findEmail(email);

			// cek email
			if (!cek) return res.json({ message: "Email Not Register!" });

			// cek password
			const validatePassword = bcrypt.compareSync(password, cek.password);
			if (!validatePassword) return res.json({ message: "Password Incorect" });

			// delete password for send data
			delete cek.password;

			// payload token
			let payload = {
				id: cek.id,
				email: cek.email,
			}

			// generate token
			cek.token = authHelper.generateToken(payload);
			cek.refreshToken = authHelper.generateRefreshToken(payload)

			return helperResponse.response(res, cek, 201, "Login Successfull")
		} catch (error) {
			console.log(error);
		}
	},

	refreshTokenUsers: (req, res) => {
		try {
			const { refreshToken } = req.body;

			// decrypt token jwt
			let decode = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);

			const payload = {
				id: decode.id,
				email: decode.email
			}

			const result = {
				token: authHelper.generateToken(payload),
				refreshToken: authHelper.generateRefreshToken(payload)
			}

			return helperResponse.response(res, result, 200, "Refresh Token Success")
		} catch (error) {
			console.log(error);
		}
	},
}

module.exports = usersController;
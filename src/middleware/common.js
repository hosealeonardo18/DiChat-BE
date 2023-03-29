/* eslint-disable no-undef */
const validate = (req, res, next) => {
    const {
        fullname,
        email,
        password,
    } = req.body
    try {
        if (fullname === '' || email === '' || password === '') throw new Error('kosong')
        if (!isNaN(fullname)) throw new Error('input bukan text')
    } catch (error) {
        return res.send(`${error}`)
    }
    next()
}

const myCors = (req, res, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    response.setHeader('Access-Control-Headers', 'Content-Type');
    next();
}

module.exports = {
    validate,
    myCors
}
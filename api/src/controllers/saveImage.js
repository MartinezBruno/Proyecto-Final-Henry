const  {mv}  = require('express-fileupload')

const saveImage = (req, res) => {
  let { code } = req.params
  let File = req.files.file
  File.mv(`./profiles/${code}`, (err) => {
    if (err) return res.status(500).send({ message: err })

    return res.status(200).send({ message: 'File upload' })
  })
}

module.exports = {
  saveImage,
}

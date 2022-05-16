const saveImage = (req, res) => {
  let File = req.files.file
  File.mv(`./profiles/${File.name}`, (err) => {
    if (err) return res.status(500).send({ message: err })

    return res.status(200).send({ message: 'File upload' })
  })
}

module.exports = {
  saveImage,
}

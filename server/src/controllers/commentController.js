const { Comment } = require('../models')

exports.create = async (req, res) => {
    const {
        content,
        user,
        prevID,
        product
    } = req.body
    try {
        const newComment = await new Comment({
            content: content,
            user: user,
            prevID: prevID,
            product: product
        })
        await newComment.save();
        res.status(200).json({
            newComment
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.update = async (req, res) => {
    try {
        const updateComment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateComment)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Comment.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

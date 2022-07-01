
const itemIdMiddleware = async (req, res, next) => {
    const { itemId } = req.params
    if (!itemId) return res.sendStatus(422);
    
    res.locals.itemId = itemId;

    next();
}

export {
    itemIdMiddleware
}
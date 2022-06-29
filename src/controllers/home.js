

import { db } from "../database/mongo.js"

const homeGet = async (req, res) => {
    console.log('home here')
    res.send('ok')
}

export {
    homeGet
}
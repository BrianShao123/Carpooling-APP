const Top5List = require('../models/top5list-model');
const CommunityList = require('../models/communitylist-model');
const jwt = require("jsonwebtoken");

createTop5List = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }
    const top5List = new Top5List(body);
    console.log("creating top5List: " + JSON.stringify(top5List));
    if (!top5List) {
        return res.status(400).json({ success: false, error: err })
    }
    top5List
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                top5List: top5List,
                message: 'Top 5 List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Top 5 List Not Created!'
            })
        })
}

createCommunityList = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false, 
            error: 'You must provide a Community List',
        })
    }
    const communityList = new CommunityList(body);
    console.log("creating Community List: " + JSON.stringify(communityList));
    if (!communityList) {
        return res.status(400).json({ success: false, error: err })
    }
    communityList
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                communityList: communityList,
                message: 'Community List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Community List Not Created!'
            })
        })
}

updateTop5List = async (req, res) => {
    const body = req.body
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }

        top5List.name = body.name
        top5List.items = body.items
        top5List.likes = body.likes
        top5List.dislikes = body.dislikes
        top5List.numViews = body.numViews
        top5List.isPublished = body.isPublished
        top5List.comments = body.comments
        top5List.datePublished = body.datePublished
        top5List.time = body.time
        top5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

updateCommunityList = async (req, res) => {
    const body = req.body
    console.log("updateCommunityList: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    CommunityList.findOne({ _id: req.params.id }, (err, communityList) => {
        console.log("community list found: " + JSON.stringify(communityList));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Community List not found!',
            })
        }
        communityList.name = body.name
        communityList.items = body.items
        communityList.likes = body.likes
        communityList.dislikes = body.dislikes
        communityList.numViews = body.numViews
        communityList.comments = body.comments
        communityList.lastUpdateTime = body.lastUpdateTime
        communityList.lastUpdate = body.lastUpdate
        communityList.datePublished = body.datePublished
        communityList
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: communityList._id,
                    message: 'Community List updated!'
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Community List not updated!'
                })
            })
    })
}

deleteTop5List = async (req, res) => {
    let decodedToken = jwt.decode(req.cookies.token);
    let email = decodedToken.user.email;
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        if (top5List.ownerEmail != email) {
            return res.status(400).json({ success: false, error: `Invalid user`})
        }
        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
    })
}

getTop5ListById = async (req, res) => {
    let decodedToken = jwt.decode(req.cookies.token);
    let email = decodedToken.user.email;
    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (list.ownerEmail != email) {
            return res.status(400).json({ success: false, error: `Invalid user`})
        }
        return res.status(200).json({ success: true, top5List: list })
    }).catch(err => console.log(err))
}

/* Gets all lists that have been published. */
getTop5Lists = async (req, res) => {
    await Top5List.find({ isPublished: true }, (err, lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, lists: lists })
    }).catch(err => console.log(err))
}

/* Gets a user's lists for when the home button is selected. */
getLists = async (req, res) => {
    let decodedToken = jwt.decode(req.cookies.token);
    let email = decodedToken.user.email;
    await Top5List.find({ ownerEmail: email }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            let lists = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                lists.push(list);
            }
            return res.status(200).json({ success: true, lists: lists })
        }
    }).catch(err => console.log(err))
}

getCommunityLists = async (req, res) => {
    await CommunityList.find( {}, (err, communityLists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!communityLists) {
            return res
                .status(404)
                .json({ success: false, error: 'Community Lists not found'})
        }
        else {
            let lists = [];
            for (let key in communityLists) {
                let list = communityLists[key];
                lists.push(list);
            }
            return res.status(200).json({ sucess: true, lists: lists })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createTop5List,
    updateTop5List,
    deleteTop5List,
    getTop5Lists,
    getLists,
    getTop5ListById,
    createCommunityList,
    getCommunityLists,
    updateCommunityList
}
const auth = require('../auth')
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

router.post('/top5list', auth.verify, Top5ListController.createTop5List)
router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
router.delete('/top5list/:id', auth.verify, Top5ListController.deleteTop5List)
router.get('/top5list/:id', auth.verify, Top5ListController.getTop5ListById)
router.get('/top5lists', auth.verify, Top5ListController.getTop5Lists)
router.get('/lists', auth.verify, Top5ListController.getLists)
router.get(`/guesttop5lists/`, Top5ListController.getTop5Lists)
router.post(`/communitylist/`, Top5ListController.createCommunityList)
router.get('/communitylists', Top5ListController.getCommunityLists)
router.put('/communitylist/:id', auth.verify, Top5ListController.updateCommunityList)

router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.post('/login', UserController.login)
router.get('/logout', UserController.logout)

module.exports = router
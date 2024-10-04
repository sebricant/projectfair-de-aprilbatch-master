// 1) import express
const express = require("express")
// 2) router library is inside express, so import that
const router = new express.Router()
const userController = require("../Controllers/userController")
const projectController = require("../Controllers/projectController")
const jwtMiddleware = require("../Middlewares/jwtMiddleware")
const multerConfig = require('../Middlewares/multerMiddleware')
// 3) different paths for resolving requests
router.post("/user/register", userController.register)
router.post("/user/login", userController.login)
router.post("/project/addproject", jwtMiddleware, multerConfig.single("projectImage"),projectController.addProject)
router.get("/projects/homeproject",projectController.getHomeProject)
router.get("/projects/allproject",jwtMiddleware,projectController.getAllProject)
router.get("/projects/userproject",jwtMiddleware,projectController.getUserProject)
router.put("/projects/editproject/:id",jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)
router.delete('/projects/deleteproject/:id',jwtMiddleware,projectController.deleteUserProject)
// 4) Export router
module.exports = router

const app = require('../../express');
var pageModel = require('../model/page/page.model.server');

app.post("/api/assignment/website/:websiteId/page", createPage);
app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/assignment/page/:pageId", findPageById);
app.delete("/api/assignment/website/:websiteId/page/:pageId", deletePage);
app.put("/api/assignment/page/:pageId", updatePage);

function findAllPagesForWebsite(req, res) {
    pageModel
        .findAllPagesForWebsite(req.params.websiteId)
        .then(function (pages) {
            res.json(pages);
        });
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
   pageModel
       .findPageById(pageId)
       .then(function (page) {
           res.json(page);
       });
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;
    pageModel
        .deletePage(websiteId, pageId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params.pageId;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.sendStatus(200);
        });
}

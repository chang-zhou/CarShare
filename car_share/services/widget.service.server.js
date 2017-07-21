const app = require('../../express');
var widgetModel = require('../model/widget/widget.model.server');

app.post("/api/assignment/page/:pageId/widget/:widgetType", createWidget);
app.get("/api/assignment/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/assignment/widget/:widgetId", findWidgetById);
app.delete("/api/assignment/page/:pageId/widget/:widgetId", deleteWidget);
app.put("/api/assignment/widget/:widgetId", updateWidget);
app.put("/page/:pageId/widget", updateWidgetOrder);

function findAllWidgetsForPage(req, res) {
    widgetModel
        .findAllWidgetsForPage(req.params.pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
}

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    var widgetType = req.params.widgetType;
    widgetModel
        .createWidget(pageId, widget, widgetType)
        .then(function (widget) {
            res.json(widget);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;
    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updateWidgetOrder(req, res) {
    var start = req.query['start'];
    var end = req.query['end'];
    var pageId = req.params.pageId;
    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function (status) {
            res.sendStatus(200);
        });
}

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var widgetId      = req.body.widgetId;
    var myFile        = req.file;
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var url = '/uploads/'+filename;
    var callbackUrl   = "/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
    if(widgetId === 'default'){
        var newWidget = {
            url: url,
            type: 'IMAGE'
        };
        widgetModel
            .createWidget(pageId, newWidget, newWidget.type)
            .then(function (widget) {
                res.redirect(callbackUrl);
            });
    }
    else{
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = url;
                widgetModel.updateWidget(widget._id, widget)
                    .then(function (status) {
                        res.redirect(callbackUrl);
                    });
            })
    }
}




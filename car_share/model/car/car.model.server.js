var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

// api
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.deleteWidget = deleteWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget, widgetType) {
    widget._page = pageId;
    widget.type = widgetType;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel
                .addWidget(pageId, widget._id);
        })
}

function findAllWidgetsForPage(pageId) {
    return pageModel
        .findById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page) {
            return page.widgets;
        });
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function reorderWidget(pageId, start, end) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            var widget = widgets[start];
            widgets.splice(start, 1);
            widgets.splice(end, 0, widget);
            return page.save();
        });
}
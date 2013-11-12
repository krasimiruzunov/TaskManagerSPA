window.viewsFactory = (function () {
    var rootUrl = "Scripts/partials/";

    var templates = {};

    function getTemplate(name) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            if (templates[name]) {
                resolve(templates[name])
            }
            else {
                $.ajax({
                    url: rootUrl + name + ".html",
                    type: "GET",
                    success: function (templateHtml) {
                        templates[name] = templateHtml;
                        resolve(templateHtml);
                    },
                    error: function (err) {
                        reject(err)
                    }
                });
            }
        });
        return promise;
    }

    function getLoginView() {
        return getTemplate("login-form");
    }

    function getCreateAppointmentView() {
        return getTemplate("create-appointment");
    }

    function getAllAppointmentsView() {
        return getTemplate("all-appointments");
    }

    function getCommingAppointmentsView() {
        return getTemplate("comming-appointments");
    }

    function getByDateAppointmentsView() {
        return getTemplate("date-appointments");
    }

    function getTodayAppointmentsView() {
        return getTemplate("today-appointments");
    }

    function getCurrentAppointmentsView() {
        return getTemplate("current-appointments");
    }

    function getCreateListView() {
        return getTemplate("create-list");
    }

    function getAllListsView() {
        return getTemplate("all-lists");
    }

    function getSingleListView() {
        return getTemplate("single-list");
    }

    function getChangeTodoStatusView() {
        return getTemplate("change-todo.status");
    }

    function getCreateTodoView() {
        return getTemplate("create-todo");
    }

    return {
        getLoginView: getLoginView,
        getCreateAppointmentView: getCreateAppointmentView,
        getAllAppointmentsView: getAllAppointmentsView,
        getCommingAppointmentsView: getCommingAppointmentsView,
        getByDateAppointmentsView: getByDateAppointmentsView,
        getTodayAppointmentsView: getTodayAppointmentsView,
        getCurrentAppointmentsView: getCurrentAppointmentsView,
        getCreateListView: getCreateListView,
        getAllListsView: getAllListsView,
        getSingleListView: getSingleListView,
        getChangeTodoStatusView: getChangeTodoStatusView,
        getCreateTodoView: getCreateTodoView
    };
}());
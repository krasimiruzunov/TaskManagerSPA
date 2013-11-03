/// <reference path="app/view-models.js" />
/// <reference path="app/views.js" />


var application = (function () {
    var appLayout = new kendo.Layout('<div id="main-content"></div>');
    var data = persisters.get("http://localhost:16183/api/");
    vmFactory.setPersister(data);

    var router = new kendo.Router();

    router.route("/", function () {
        if (data.users.currentUser()) {
            router.navigate("/appointments/all");
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
                .then(function (loginViewHtml) {
                    var loginVm = vmFactory.getLoginVM(
                        function () {
                            router.navigate("/login");
                        });
                    var view = new kendo.View(loginViewHtml,
                        { model: loginVm });
                    appLayout.showIn("#main-content", view);
                });
        }
    });

    router.route("/register", function () {
        if (data.users.currentUser()) {
            router.navigate("/login");
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/login", function () {
        if (data.users.currentUser()) {
            console.log(data.users.currentUser());
            router.navigate("/appointments/all");
        }
        else {
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/appointments/all");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/appointments/create", function () {
        if (data.users.currentUser()) {
            viewsFactory.getCreateAppointmentView()
            .then(function (createAppointmentView) {
                var CreateAppointmentVM = vmFactory.getCreateAppointmentVM();
                var view = new kendo.View(createAppointmentView,
                    { model: CreateAppointmentVM });
                appLayout.showIn("#main-content", view);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/appointments/all", function () {
        if (data.users.currentUser()) {
            viewsFactory.getAllAppointmentsView()
            .then(function (allAppointmentView) {
                vmFactory.getAllAppointmentsVM()
                .then(function (vm) {
                    var view = new kendo.View(allAppointmentView,
                        { model: vm });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    console.log(err);
                });
            });
        }
        else {
            console.log(data.users.currentUser());
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/appointments/comming", function () {
        if (data.users.currentUser()) {
            viewsFactory.getCommingAppointmentsView()
            .then(function (commingAppointmentView) {
                vmFactory.getCommingAppointmentsVM()
                .then(function (vm) {
                    var view = new kendo.View(commingAppointmentView,
                        { model: vm });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    console.log(err);
                });
            });
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/appointments?date=:date", function (date) {
        if (data.users.currentUser()) {
            viewsFactory.getByDateAppointmentsView()
            .then(function (byDateAppointmentsView) {
                vmFactory.getByDateAppointmentsVM(date)
                .then(function (vm) {
                    var view = new kendo.View(byDateAppointmentsView,
                        { model: vm });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    console.log(err);
                });
            });
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/appointments/today", function () {
        if (data.users.currentUser()) {
            viewsFactory.getTodayAppointmentsView()
            .then(function (todayAppointmentsView) {
                vmFactory.getTodayAppointmentsVM()
                .then(function (vm) {
                    var view = new kendo.View(todayAppointmentsView,
                        { model: vm });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    console.log(err);
                });
            });
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/appointments/current", function () {
        if (data.users.currentUser()) {
            viewsFactory.getCurrentAppointmentsView()
            .then(function (currentAppointmentsView) {
                vmFactory.getCurrentAppointmentsVM()
                .then(function (vm) {
                    var view = new kendo.View(currentAppointmentsView,
                        { model: vm });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    console.log(err);
                });
            });
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/lists/create", function () {
        if (data.users.currentUser()) {
            viewsFactory.getCreateListView()
            .then(function (createListView) {
                var createListVM = vmFactory.getCreateListVM();
                var view = new kendo.View(createListView,
                        { model: createListVM });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    console.log(err);
            });
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/lists/all", function () {
        if (data.users.currentUser()) {
            viewsFactory.getAllListsView()
            .then(function (allListsView) {
                vmFactory.getAllListsVM()
                .then(function (vm) {
                    var view = new kendo.View(allListsView,
                        { model: vm });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    console.log(err);
                });
            });
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/lists/:id", function (id) {
        if (data.users.currentUser()) {
            viewsFactory.getSingleListView()
            .then(function (singleListView) {
                vmFactory.getSingleListVM(id)
                .then(function (vm) {
                    var view = new kendo.View(singleListView,
                        { model: vm });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    console.log(err);
                });
            });
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/lists/:id/todos/create", function (id) {
        if (data.users.currentUser()) {
            viewsFactory.getCreateTodoView()
            .then(function (createTodoView) {
                var CreateTodoVM = vmFactory.getCreateTodoVM(id);
                var view = new kendo.View(createTodoView,
                    { model: CreateTodoVM });
                appLayout.showIn("#main-content", view);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    router.route("/todos/:id", function (id) {
        if (data.users.currentUser()) {
            data.todos.changeStatus(id);
        }
        else {
            router.navigate("/login");
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/login");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    console.log(err);
				});
        }
    });

    $(function () {
        appLayout.render("#app");
        router.start();
    });

    return {

        router: function () {
            return router;
        }
    }
}());
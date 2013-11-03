/// <reference path="../app.js" />
/// <reference path="../libs/jquery-2.0.3.js" />

window.vmFactory = (function () {
    var data = null;

    function getLoginViewModel(successCallback) {		
        var viewModel = {
            username: "TestUser",
            email: "user@gmail.com",
            password: "123456q",
            login: function () {
                data.users.login(this.get("username"), this.get("email"), this.get("password"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            },
            register: function () {
                data.users.register(this.get("username"), this.get("email"), this.get("password"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            }
        };
        return kendo.observable(viewModel);
    };

    function getCreateAppointmentViewModel(successCallback) {
        var viewModel = {
            subject: "Subject",
            description: "Description",
            appointmentDate: "03-09-2013",
            duration: "150",
            user: data.users.currentUser(),
            create: function () {
                data.appointments.create(this.get("subject"), this.get("description"),
                    this.get("appointmentDate"), this.get("duration"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            },
            logout: function () {
                data.users.logout();
                var router = application.router();
                router.navigate("/");
            }
        };

        return kendo.observable(viewModel);
    };

    function getAllAppointmentsViewModel(successCallback) {
        return data.appointments.all()
			.then(function (receivedData) {
			    var viewModel = {
			        appointments: receivedData,
			        message: "",
			        date: "03-09-2013",
			        user: data.users.currentUser(),
			        logout: function () {
			            data.users.logout();
			            var router = application.router();
			            router.navigate("/");
			        },
			        comming: function () {
			            var router = application.router();
			            router.navigate("/appointments/comming");
			        },
			        today: function () {
			            var router = application.router();
			            router.navigate("/appointments/today");
			        },
			        current: function () {
			            var router = application.router();
			            router.navigate("/appointments/current");
			        },
			        byDate: function () {
			        var router = application.router();
			        router.navigate("/appointments?date=" + this.get("date"));
			        },
			        create: function () {
			            var router = application.router();
			            router.navigate("/appointments/create");
			        },
			        createList: function () {
			            var router = application.router();
			            router.navigate("/lists/create");
			        },

			        viewLists: function () {
			            var router = application.router();
			            router.navigate("/lists/all");
			        },
			    };

			    return kendo.observable(viewModel);
			});
    };

    function getCommingAppointmentsViewModel(successCallback) {
        return data.appointments.comming()
			.then(function (receivedData) {
			    var viewModel = {
			        appointments: receivedData,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getByDateAppointmentsViewModel(date, successCallback) {
        return data.appointments.byDate(date)
			.then(function (receivedData) {
			    var viewModel = {
			        appointments: receivedData,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getTodayAppointmentsViewModel(successCallback) {
        return data.appointments.today()
			.then(function (receivedData) {
			    var viewModel = {
			        appointments: receivedData,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getCurrentAppointmentsViewModel(successCallback) {
        return data.appointments.current()
			.then(function (receivedData) {
			    var viewModel = {
			        appointments: receivedData,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getCreateListViewModel(successCallback) {
        var viewModel = {
            title: "list title",
            todo: "todo",
            todos: [],
            user: data.users.currentUser(),
            createList: function () {
                data.lists.create(this.get("title"), this.get("todos"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            },
            createTodo: function () {
                this.get("todos").push(this.get("todo"));
            },
            logout: function () {
            data.users.logout();
            var router = application.router();
            router.navigate("/");
        }

        };
        
        return kendo.observable(viewModel);
    };

    function getAllListsViewModel(successCallback) {
        return data.lists.all()
			.then(function (receivedData) {
			    var viewModel = {
			        lists: receivedData,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getSingleListViewModel(listId, successCallback) {
        return data.lists.getById(listId)
			.then(function (receivedData) {
			    var viewModel = {
			        list: receivedData,
			        message: "",
			        isDone: false,
			        update: function (ev) {
			            var router = application.router();
			            router.navigate("/todos/" + $(this).parents("li").first().data("id"));
			        },
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getCreateTodoViewModel(listId, successCallback) {
        var viewModel = {
            text: "text",
            user: data.users.currentUser(),
            createTodo: function () {
                data.lists.createToListWithId(listId, this.get("text"))
                .then(function () {
                    if (successCallback) {
                        successCallback();
                    }
                });
            },
            logout: function () {
                data.users.logout();
                var router = application.router();
                router.navigate("/");
            }

        };

        return kendo.observable(viewModel);
    };

    return {
        getLoginVM: getLoginViewModel,
        getCreateAppointmentVM: getCreateAppointmentViewModel,
        getAllAppointmentsVM: getAllAppointmentsViewModel,
        getCommingAppointmentsVM: getCommingAppointmentsViewModel,
        getByDateAppointmentsVM: getByDateAppointmentsViewModel,
        getTodayAppointmentsVM: getTodayAppointmentsViewModel,
        getCurrentAppointmentsVM: getCurrentAppointmentsViewModel,
        getCreateListVM: getCreateListViewModel,
        getAllListsVM: getAllListsViewModel,
        getSingleListVM: getSingleListViewModel,
        getCreateTodoVM: getCreateTodoViewModel,
        setPersister: function (persister) {
            data = persister
        }
    };
}());
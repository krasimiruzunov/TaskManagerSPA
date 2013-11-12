/// <reference path="../app.js" />
/// <reference path="../libs/jquery-2.0.3.js" />

window.vmFactory = (function () {
    var data = null;

    function getLoginViewModel(successCallback) {		
        var viewModel = {
            username: "",
            email: "",
            password: "",
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
            appointmentDate: new Date().getDate() + "." + (new Date().getMonth() + 1) + "." + new Date().getFullYear(),
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
			        date:  new Date().getDate() + "." + (new Date().getMonth() + 1)  + "." + new Date().getFullYear(),
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
			        message: "",
			        allAppointments: function () {
			            var router = new application.router();
			            router.navigate("/appointments/all");
                    }
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getByDateAppointmentsViewModel(date, successCallback) {
        return data.appointments.byDate(date)
			.then(function (receivedData) {
			    var viewModel = {
			        appointments: receivedData,
			        message: "",
			        allAppointments: function () {
			            var router = new application.router();
			            router.navigate("/appointments/all");
			        }
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getTodayAppointmentsViewModel(successCallback) {
        return data.appointments.today()
			.then(function (receivedData) {
			    var viewModel = {
			        appointments: receivedData,
			        message: "",
			        allAppointments: function () {
			            var router = new application.router();
			            router.navigate("/appointments/all");
			        }
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getCurrentAppointmentsViewModel(successCallback) {
        return data.appointments.current()
			.then(function (receivedData) {
			    var viewModel = {
			        appointments: receivedData,
			        message: "",
			        allAppointments: function () {
			            var router = new application.router();
			            router.navigate("/appointments/all");
			        }
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getCreateListViewModel(successCallback) {
        var viewModel = {
            title: "",
            todo: "todo",
            todos: [],
            user: data.users.currentUser(),
            allAppointments: function () {
                var router = new application.router();
                router.navigate("/appointments/all");
            },
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
                console.log(this.get("todos"));
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
			            var todoId = ev.data.id;
			            router.navigate("/todos/" + todoId);
			        },
			        allAppointments: function () {
			            var router = application.router();
			            router.navigate("/appointments/all");
			        },
			        addTodo: function () {
			            var router = application.router();
			            var listId = receivedData.id;
			            router.navigate("/lists/"+ listId +"/todos/create");
			        }
			    };
			    return kendo.observable(viewModel);
			});
    };

    function getChangeTodoStatusViewModel(todoId, successCallback) {
        var viewModel = {
            updateStatus: function () {
                data.todos.changeStatus(todoId)
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            }
        };

        return kendo.observable(viewModel);
    };

    function getCreateTodoViewModel(listId, successCallback) {
        var viewModel = {
            text: "",
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
        getChangeTodoStatusVM: getChangeTodoStatusViewModel,
        getCreateTodoVM: getCreateTodoViewModel,
        setPersister: function (persister) {
            data = persister
        }
    };
}());
/// <reference path="../libs/class.js" />


window.persisters = (function () {
    var loggedInUser = "";
    var sessionKey = "";
    
    function saveToLocalStorage(username, accessToken) {
        localStorage.setItem("username", username);
        localStorage.setItem("sessionKey", accessToken);
        loggedInUser = username;
        sessionKey = accessToken;
    }

    function clearLocalStorage() {
        localStorage.removeItem("username");
        localStorage.removeItem("sessionKey");
        loggedInUser = "";
        sessionKey = "";
    }

    var UsersPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        login: function (username, email, password) {
            var user = {
                username: username,
                email: email,
                authCode: CryptoJS.SHA1(password).toString()
            };
            
            return httpRequester.postJSON(this.apiUrl + "auth/token", user)
				.then(function (data) {
				    loggedInUser = data.username;
				    sessionKey = data.accessToken;
				    saveToLocalStorage(loggedInUser, sessionKey);

				    return data.username;
				}, function (err) {
				    console.log(err);
				});
        },
        register: function (username, email, password) {
            var user = {
                username: username,
                email: email,
                authCode: CryptoJS.SHA1(password).toString()
            };
            return httpRequester.postJSON(this.apiUrl + "users/register", user)
				.then(function (data) {
				    var router = application.router();
				    router.navigate("/login");
				    loggedInUser = data.username;
				    return data.username;
				}, function(err){
				    console.log(err);
				});
        },
        logout: function () {
            if (!sessionKey) {
                console.log("Logout already!");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                clearLocalStorage();
                return httpRequester.putJSON(this.apiUrl + "users", headers);
            }
        },
        currentUser: function () {
            return localStorage.getItem("username");
        }
    });

    var AppointmentsPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        create: function (subject, description,
            appointmentDate, duration) {
            if (!sessionKey) {
                console.log("Log in to create new appointment!");
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var appointment = {
                    subject: subject,
                    description: description,
                    appointmentDate: appointmentDate,
                    duration: duration
                };

                var headers = {
                    "X-accessToken": sessionKey
                };
                return httpRequester.postJSON(this.apiUrl + "appointments", appointment, headers);
            }
        },
        all: function () {
            if (!sessionKey) {
                console.log("Log in to view all appointments!");
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "appointments/all", headers);
            }
        },
        byDate: function(date){
            if (!sessionKey) {
                console.log("Log in to view appointments by date: " + date);
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "appointments?date=" + date, headers);
            }
        },
        comming: function () {
            if (!sessionKey) {
                console.log("Log in to view comming appointments!");
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "appointments/comming", headers);
            }
        },
        today: function () {
            if (!sessionKey) {
                console.log("Log in to view appointments for today", headers);
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "appointments/today", headers);
            }
        },
        current: function () {
            if (!sessionKey) {
                console.log("Log in to view current appointments");
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "appointments/current", headers);
            }
        }
    });

    var ListsPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        create: function(title, todos){
            if (!sessionKey) {
                console.log("Log in to create todo!");
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                var todo = {
                    title: title,
                    todos: todos
                }
                return httpRequester.postJSON(this.apiUrl + "lists", todo, headers);
            }
        },
        all: function(){
            if (!sessionKey) {
                console.log("Log in to view all lists!");
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "lists", headers);
            }
        },
        getById: function(listId){
            if (!sessionKey) {
                console.log("Log in to view todos of list with id: ", listId);
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "lists/" + listId + "/todos" , headers);
            }
        },
        createToListWithId: function(listId, text){
            if (!sessionKey) {
                console.log("Log in to create todo for list with id: ", listId);
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                var todo = {
                    text: text
                };
                console.log(todo);
                return httpRequester.postJSON(this.apiUrl + "lists/" + listId + "/todos" , todo, headers);
            }
        }
    });

    var TodosPersister = Class.create({
        init: function(apiUrl){
            this.apiUrl = apiUrl;
        },
        changeStatus: function(todoId){
            if (!sessionKey) {
                console.log("Log in to change status of todo with id: " + todoId);
                var router = application.router();
                router.navigate("/auth/token");
            } else {
                var headers = {
                    "X-accessToken": sessionKey
                };
                return httpRequester.putJSON(this.apiUrl + "todos/" + todoId, headers);
            }
        }
    });

    var DataPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
            this.users = new UsersPersister(apiUrl);
            this.appointments = new AppointmentsPersister(apiUrl);
            this.lists = new ListsPersister(apiUrl);        
            this.todos = new TodosPersister(apiUrl);
        }
    });

    return {
        get: function (apiUrl) {
            return new DataPersister(apiUrl);
        }
    }
}());
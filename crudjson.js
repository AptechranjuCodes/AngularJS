var app = angular.module("myApp", []);

app.controller("myController", function ($scope, $http) {
    $scope.users = [];
    $scope.newUser = {};

    // Base URL for JSON Server
    const apiUrl = "http://localhost:3000/users";

    // GET: Fetch all users
    $scope.fetchUsers = function () {
        $http.get(apiUrl)
            .then(function (response) {
                $scope.users = response.data;
            })
            .catch(function (error) {
                console.error("Error fetching users:", error);
            });
    };

    // POST: Add a new user
    $scope.addUser = function () {
        if (!$scope.newUser.Name || !$scope.newUser.Username || !$scope.newUser.Email) {
            alert("All fields are required!");
            return;
        }

        let newUser = {
            ID: $scope.users.length ? Math.max(...$scope.users.map(u => u.ID)) + 1 : 1,
            Name: $scope.newUser.Name,
            Username: $scope.newUser.Username,
            Email: $scope.newUser.Email
        };

        $http.post(apiUrl, newUser)
            .then(function (response) {
                alert("User added successfully!");
                $scope.users.push(response.data);
                $scope.newUser = {};
            })
            .catch(function (error) {
                console.error("Error adding user:", error);
            });
    };

    // PUT: Update user
    $scope.updateUser = function (user) {
        let updatedData = { ...user, Name: "Updated " + user.Name };

        $http.put(`${apiUrl}/${user.ID}`, updatedData)
            .then(function (response) {
                alert("User updated successfully!");
                user.Name = updatedData.Name;
            })
            .catch(function (error) {
                console.error("Error updating user:", error);
            });
    };

    // DELETE: Remove user
    $scope.deleteUser = function (user) {
        if (confirm("Are you sure you want to delete this user?")) {
            $http.delete(`${apiUrl}/${user.ID}`)
                .then(function () {
                    alert("User deleted successfully!");
                    $scope.users = $scope.users.filter(u => u.ID !== user.ID);
                })
                .catch(function (error) {
                    console.error("Error deleting user:", error);
                });
        }
    };
});
